import { z } from "zod";
import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/client";
import { insertLocalDonation } from "@/lib/data/local-store";

const donationSchema = z.object({
  amount_npr: z.number().min(100),
  amount_usd: z.number().optional(),
  donor_email: z.string().email().optional(),
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
    const data = donationSchema.parse(body);

    if (!isSupabaseConfigured) {
      const donation = await insertLocalDonation({
        amount_npr: data.amount_npr,
        amount_usd: data.amount_usd,
        frequency: "one_time",
        donor_email: data.donor_email,
      });
      return NextResponse.json({ success: true, id: donation.id });
    }

    const supabase = getSupabaseAdmin();
    const { data: donation, error } = await supabase
      .from("donations")
      .insert({
        amount_npr: data.amount_npr,
        amount_usd: data.amount_usd,
        frequency: "one_time",
        donor_email: data.donor_email,
        status: "pending",
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: donation.id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
