"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteImages } from "@/lib/images/site-images";
import { useMotion } from "@/hooks/useMotion";

const cards = [
  {
    title: "Women's Empowerment",
    description:
      "Building skills, confidence, and economic independence for women in Laxmipur and surrounding villages.",
    image: siteImages.missionCard1,
    alt: "Women's empowerment programme in Sarlahi",
    href: "/work/women-empowerment",
    // sky blue
    tint: "from-sky/80 via-sky/25",
    accent: "text-sky group-hover:text-sky-light",
  },
  {
    title: "Health Awareness",
    description:
      "Community sessions at Rajghat and Sekhauna health posts — vaccination, maternal care, and child health.",
    image: siteImages.missionCard2,
    alt: "Community health awareness at Rajghat health post",
    href: "/work/health-awareness",
    // forest green
    tint: "from-forest/80 via-forest/25",
    accent: "text-forest group-hover:text-forest/80",
  },
  {
    title: "Drug Rehabilitation",
    description:
      "Street dramas and counselling programmes helping families recover from substance abuse across Sarlahi.",
    image: siteImages.missionCard3,
    alt: "Drug awareness street drama performance",
    href: "/work/drug-rehabilitation",
    // saffron
    tint: "from-saffron/80 via-saffron/25",
    accent: "text-saffron group-hover:text-saffron/80",
  },
];

const cardHover = {
  y: -8,
  transition: { type: "spring", stiffness: 320, damping: 26, mass: 0.6 },
} as const;

export function MissionSection() {
  const { transition, stagger, prefersReducedMotion } = useMotion();

  return (
    <section className="bg-section-beige py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
          className="max-w-3xl"
        >
          <h2 className="text-3xl font-bold leading-tight text-charcoal md:text-4xl lg:text-5xl">
            For every community in Sarlahi. No matter what.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-charcoal/80">
            New Vision Nepal Foundation works at the intersection of women&apos;s empowerment,
            health awareness, and drug rehabilitation — reaching villages across Sarlahi where
            government services are scarce. Since 2072 B.S., we have changed over 15,500 lives.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {cards.map((card, i) => (
            <motion.article
              key={card.href}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transition, delay: i * stagger }}
              whileHover={prefersReducedMotion ? undefined : cardHover}
              className="group"
            >
              <Link
                href={card.href}
                className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-charcoal/5 transition-shadow duration-300 ease-out hover:shadow-card-hover"
                aria-label={`Learn more about ${card.title}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    className="object-cover transition-transform duration-[600ms] ease-out will-change-transform group-hover:scale-[1.06]"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />

                  {/* Base readability gradient (always on) */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent"
                    aria-hidden
                  />

                  {/* Matching color fade — eases in on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${card.tint} to-transparent opacity-0 mix-blend-multiply transition-opacity duration-500 ease-out group-hover:opacity-100`}
                    aria-hidden
                  />

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="mb-2 inline-block rounded bg-white/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-charcoal backdrop-blur-sm">
                      Our programmes
                    </span>
                    <h3 className="text-xl font-bold leading-snug text-white drop-shadow-sm md:text-2xl">
                      {card.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="flex-1 text-sm leading-relaxed text-charcoal/75">
                    {card.description}
                  </p>
                  <span
                    className={`mt-4 inline-flex items-center gap-1.5 text-sm font-bold transition-colors duration-300 ${card.accent}`}
                  >
                    Learn more
                    <span
                      className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                      aria-hidden
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
