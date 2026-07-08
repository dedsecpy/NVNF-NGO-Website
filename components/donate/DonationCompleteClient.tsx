"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatNPR } from "@/lib/utils";

interface VerifyResponse {
  success: boolean;
  status: string;
  khaltiStatus?: string;
  donation?: { amount_npr: number };
  error?: string;
}

interface DonationCompleteClientProps {
  donationId?: string;
  pidx?: string;
}

export function DonationCompleteClient({
  donationId,
  pidx,
}: DonationCompleteClientProps) {
  const [state, setState] = useState<"loading" | "success" | "failed" | "pending" | "error">(
    "loading"
  );
  const [amount, setAmount] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!donationId || !pidx) {
      setState("error");
      setMessage("Missing payment reference. Please contact us if you were charged.");
      return;
    }

    async function verify() {
      const res = await fetch("/api/donations/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ donation_id: donationId, pidx }),
      });

      const data = (await res.json()) as VerifyResponse;

      if (data.donation?.amount_npr) {
        setAmount(Number(data.donation.amount_npr));
      }

      if (data.success && data.status === "completed") {
        setState("success");
        return;
      }

      if (data.status === "pending") {
        setState("pending");
        setMessage("Your payment is still processing. We will update you once it clears.");
        return;
      }

      setState("failed");
      setMessage(data.khaltiStatus ?? data.error ?? "Payment was not completed.");
    }

    void verify();
  }, [donationId, pidx]);

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      {state === "loading" && (
        <>
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-sky border-t-transparent" />
          <p className="mt-4 text-charcoal/70">Confirming your payment…</p>
        </>
      )}

      {state === "success" && (
        <>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest/10 text-2xl text-forest">
            ✓
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold text-charcoal">Thank you</h1>
          <p className="mt-3 text-charcoal/70">
            Your donation{amount ? ` of ${formatNPR(amount)}` : ""} was received successfully.
            Together we can reach more families in Sarlahi.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-sky px-8 py-3 text-sm font-bold text-white"
          >
            Back to home
          </Link>
        </>
      )}

      {state === "pending" && (
        <>
          <h1 className="font-display text-2xl font-bold text-charcoal">Payment pending</h1>
          <p className="mt-3 text-charcoal/70">{message}</p>
          <Link href="/" className="mt-8 inline-block text-sky hover:underline">
            Return home
          </Link>
        </>
      )}

      {(state === "failed" || state === "error") && (
        <>
          <h1 className="font-display text-2xl font-bold text-charcoal">Payment not completed</h1>
          <p className="mt-3 text-charcoal/70">{message}</p>
          <Link
            href="/get-involved"
            className="mt-8 inline-block rounded-full bg-sky px-8 py-3 text-sm font-bold text-white"
          >
            Try again
          </Link>
        </>
      )}
    </div>
  );
}
