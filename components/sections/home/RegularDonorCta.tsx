"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteImages } from "@/lib/images/site-images";
import { useDonation } from "@/components/donate/DonationProvider";
import { useMotion } from "@/hooks/useMotion";

export function RegularDonorCta() {
  const { openDonation } = useDonation();
  const { transition, prefersReducedMotion } = useMotion();

  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
          className="relative overflow-hidden rounded-3xl bg-navy-deep"
        >
          <div className="grid md:grid-cols-[1.1fr_1fr]">
            <div className="relative z-10 flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                Make a difference.
                <br />
                Become a regular donor
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/90">
                Join our community of monthly supporters. Your consistent giving means we can
                plan ahead, respond faster, and stay in villages until families can stand on
                their own.
              </p>
              <button
                type="button"
                onClick={openDonation}
                className="mt-8 w-fit rounded-full bg-action px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-charcoal transition-transform hover:scale-105"
              >
                Start Giving
              </button>
            </div>

            <div className="relative min-h-[280px] md:min-h-0">
              <div
                className="absolute inset-y-0 left-0 z-10 hidden w-24 bg-navy-deep md:block"
                style={{
                  clipPath: "ellipse(80% 100% at 0% 50%)",
                }}
                aria-hidden
              />
              <div className="relative h-full min-h-[280px]">
                <Image
                  src={siteImages.regularDonor}
                  alt="Family supported by NVNF monthly giving"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              </div>
              <p className="absolute bottom-3 right-4 z-20 text-[10px] text-white/70">
                © NVNF / Community Programs
              </p>
            </div>
          </div>

          <div
            className="pointer-events-none absolute -bottom-8 left-1/4 h-32 w-32 rounded-full bg-sky-pale/30 blur-2xl"
            aria-hidden
          />
        </motion.div>
      </div>
    </section>
  );
}
