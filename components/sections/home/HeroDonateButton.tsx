"use client";

import { useDonation } from "@/components/donate/DonationProvider";

export function HeroDonateButton() {
  const { openDonation } = useDonation();

  return (
    <button
      type="button"
      onClick={openDonation}
      className="hero-launch__cta group relative mt-6 overflow-hidden rounded-full border border-action/70 bg-action px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-charcoal shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:border-sky-pale hover:shadow-lg hover:shadow-sky-pale/35"
    >
      <span
        className="absolute inset-0 bg-gradient-to-r from-cream via-sky-pale to-sky-light translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"
        aria-hidden="true"
      />
      <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true">
        <span className="absolute -left-1/4 top-0 h-full w-1/3 -skew-x-12 bg-white/25 blur-md transition-transform duration-700 ease-out group-hover:translate-x-[320%]" />
      </span>
      <span className="relative z-10 transition-colors duration-300 group-hover:text-navy-deep">
        Donate Now
      </span>
    </button>
  );
}
