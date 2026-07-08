"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteImages } from "@/lib/images/site-images";
import { useDonation } from "@/components/donate/DonationProvider";
import { useMotion } from "@/hooks/useMotion";

export function EmergencyBanner() {
  const { openDonation } = useDonation();
  const { transition, prefersReducedMotion } = useMotion();

  return (
    <section className="bg-sky-light py-10 md:py-14">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={transition}
        >
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Health &amp; Safety for Children
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/95">
            Help starts with you. From Sassapur to Rajghat and Sekhauna health posts, children
            and families need health awareness and community support. Your donation funds
            field programmes across Sarlahi.
          </p>
          <button
            type="button"
            onClick={openDonation}
            className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-sky-light"
          >
            Donate Now →
          </button>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.15 }}
          className="relative"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src={siteImages.emergencyChild}
              alt="Child health awareness programme in Sassapur"
              fill
              className="object-cover grayscale"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </div>
          <p className="mt-2 text-xs text-white/80">© NVNF / Child Health Awareness, Sassapur</p>
        </motion.div>
      </div>
    </section>
  );
}
