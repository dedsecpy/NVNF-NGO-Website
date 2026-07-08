"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SandboxPaymentClientProps {
  donationId: string;
  pidx: string;
  amountNpr: number;
}

export function SandboxPaymentClient({
  donationId,
  pidx,
  amountNpr,
}: SandboxPaymentClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function completePayment() {
    setLoading(true);
    setError("");

    const res = await fetch("/api/donations/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        donation_id: donationId,
        pidx,
        sandbox_confirm: true,
      }),
    });

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? "Could not complete test payment");
      setLoading(false);
      return;
    }

    router.push(`/donate/complete?donation_id=${donationId}&pidx=${encodeURIComponent(pidx)}`);
  }

  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-charcoal/50">
        Test payment mode
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold text-charcoal">Sandbox checkout</h1>
      <p className="mt-4 text-sm text-charcoal/70">
        Khalti keys are not configured yet. Use this screen to simulate a successful NPR{" "}
        {amountNpr.toLocaleString()} donation in development.
      </p>

      {error ? (
        <p className="mt-4 text-sm text-urgency" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="button"
        onClick={completePayment}
        disabled={loading}
        className="mt-8 w-full rounded-lg bg-sky py-4 text-sm font-bold text-white disabled:opacity-60"
      >
        {loading ? "Processing…" : "Complete test payment"}
      </button>

      <Link href="/" className="mt-4 inline-block text-sm text-charcoal/60 hover:underline">
        Cancel
      </Link>
    </div>
  );
}
