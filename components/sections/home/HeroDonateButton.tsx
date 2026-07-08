"use client";

import { useDonation } from "@/components/donate/DonationProvider";

export function HeroDonateButton() {
  const { openDonation } = useDonation();

  return (
    <button
      type="button"
      onClick={openDonation}
      className="hero-launch__cta mt-6 rounded-full bg-action px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-charcoal transition-transform hover:scale-105"
    >
      Donate Now
    </button>
  );
}
