import { z } from "zod";
import { NextResponse } from "next/server";
import { createPendingDonation, attachPaymentSession } from "@/lib/donations/service";
import {
  initiateKhaltiPayment,
  isKhaltiConfigured,
} from "@/lib/payments/khalti";
import { getSiteUrl } from "@/lib/payments/site-url";

const initiateSchema = z.object({
  amount_npr: z.number().min(100),
  amount_usd: z.number().optional(),
  donor_name: z.string().min(2),
  donor_email: z.string().email().optional(),
  donor_message: z.string().max(500).optional(),
  payment_method: z.enum(["esewa", "khalti", "card"]),
});

const ipAttempts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, max = 10, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const entry = ipAttempts.get(ip);

  if (!entry || now > entry.resetAt) {
    ipAttempts.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const data = initiateSchema.parse(body);

    const donation = await createPendingDonation({
      amount_npr: data.amount_npr,
      amount_usd: data.amount_usd,
      frequency: "one_time",
      donor_name: data.donor_name,
      donor_email: data.donor_email,
      donor_message: data.donor_message,
      payment_method: data.payment_method,
    });

    const returnUrl = `${getSiteUrl()}/donate/complete?donation_id=${donation.id}`;

    if (isKhaltiConfigured) {
      const khalti = await initiateKhaltiPayment({
        amountNpr: data.amount_npr,
        purchaseOrderId: donation.id,
        purchaseOrderName: `NVNF Donation — ${data.donor_name}`,
        returnUrl,
        customerEmail: data.donor_email,
        customerName: data.donor_name,
      });

      await attachPaymentSession(donation.id, {
        pidx: khalti.pidx,
        payment_provider: "khalti",
      });

      return NextResponse.json({
        success: true,
        donationId: donation.id,
        paymentUrl: khalti.paymentUrl,
        pidx: khalti.pidx,
        provider: "khalti",
      });
    }

    const sandboxPidx = `sandbox-${donation.id}`;
    await attachPaymentSession(donation.id, {
      pidx: sandboxPidx,
      payment_provider: "sandbox",
    });

    return NextResponse.json({
      success: true,
      donationId: donation.id,
      paymentUrl: `${getSiteUrl()}/donate/sandbox?donation_id=${donation.id}`,
      pidx: sandboxPidx,
      provider: "sandbox",
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message }, { status: 400 });
    }
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Payment initiation failed" }, { status: 500 });
  }
}
