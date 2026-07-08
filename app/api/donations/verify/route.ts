import { z } from "zod";
import { NextResponse } from "next/server";
import {
  getDonationById,
  getDonationByPidx,
  markDonationPaid,
} from "@/lib/donations/service";
import {
  isKhaltiConfigured,
  isKhaltiPaymentFailed,
  isKhaltiPaymentSuccessful,
  lookupKhaltiPayment,
} from "@/lib/payments/khalti";

const verifySchema = z.object({
  donation_id: z.string().uuid(),
  pidx: z.string().min(1),
  sandbox_confirm: z.boolean().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { donation_id, pidx, sandbox_confirm } = verifySchema.parse(body);

    const donation = await getDonationById(donation_id);
    if (!donation) {
      return NextResponse.json({ error: "Donation not found" }, { status: 404 });
    }

    if (donation.status === "completed") {
      return NextResponse.json({
        success: true,
        status: "completed",
        donation,
        alreadyCompleted: true,
      });
    }

    if (pidx.startsWith("sandbox-")) {
      if (!sandbox_confirm) {
        return NextResponse.json({ error: "Sandbox confirmation required" }, { status: 400 });
      }

      const updated = await markDonationPaid(donation_id, {
        status: "completed",
        transaction_id: `sandbox-txn-${Date.now()}`,
        pidx,
      });

      return NextResponse.json({
        success: true,
        status: "completed",
        donation: updated,
        provider: "sandbox",
      });
    }

    if (!isKhaltiConfigured) {
      return NextResponse.json({ error: "Khalti is not configured" }, { status: 503 });
    }

    const lookup = await lookupKhaltiPayment(pidx);
    const linked = await getDonationByPidx(pidx);
    if (linked && linked.id !== donation_id) {
      return NextResponse.json({ error: "Payment reference mismatch" }, { status: 400 });
    }

    const expectedPaisa = Math.round(Number(donation.amount_npr) * 100);
    if (lookup.totalAmount !== expectedPaisa) {
      return NextResponse.json({ error: "Payment amount mismatch" }, { status: 400 });
    }

    if (isKhaltiPaymentSuccessful(lookup.status)) {
      const updated = await markDonationPaid(donation_id, {
        status: "completed",
        transaction_id: lookup.transactionId,
        pidx,
      });

      return NextResponse.json({
        success: true,
        status: "completed",
        donation: updated,
        provider: "khalti",
      });
    }

    if (isKhaltiPaymentFailed(lookup.status)) {
      await markDonationPaid(donation_id, {
        status: "failed",
        pidx,
      });

      return NextResponse.json({
        success: false,
        status: "failed",
        khaltiStatus: lookup.status,
      });
    }

    return NextResponse.json({
      success: false,
      status: "pending",
      khaltiStatus: lookup.status,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message }, { status: 400 });
    }
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
