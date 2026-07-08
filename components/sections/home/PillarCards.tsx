"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMotion } from "@/hooks/useMotion";
import {
  ProgrammesChart,
  GiveChart,
  ImpactChart,
  PathwayConnector,
} from "@/components/sections/home/pillars/PathwayCharts";

const pathways = [
  {
    step: "01",
    title: "Our programmes",
    subtitle: "What we do on the ground",
    description:
      "Women empowerment, health awareness, and drug rehabilitation across 25 documented villages in Sarlahi.",
    href: "/work",
    cta: "Explore programmes",
    Chart: ProgrammesChart,
    accent: "border-sky/20 bg-sky/5",
    badge: "bg-sky text-white",
    link: "text-sky hover:text-sky-light",
  },
  {
    step: "02",
    title: "Your support",
    subtitle: "How you can give",
    description:
      "One-time gifts, monthly giving, or corporate partnerships — 78% of every rupee reaches families directly.",
    href: "/get-involved",
    cta: "Ways to give",
    Chart: GiveChart,
    accent: "border-forest/20 bg-forest/5",
    badge: "bg-forest text-white",
    link: "text-forest hover:text-forest/80",
  },
  {
    step: "03",
    title: "Community impact",
    subtitle: "Lives we measure together",
    description:
      "Field stories, health sessions, and street dramas — see how Sarlahi communities are changing.",
    href: "/news",
    cta: "Read our stories",
    Chart: ImpactChart,
    accent: "border-saffron/25 bg-saffron/5",
    badge: "bg-saffron text-white",
    link: "text-saffron hover:text-saffron/80",
  },
];

export function PillarCards() {
  const { transition, stagger, prefersReducedMotion } = useMotion();

  return (
    <section className="bg-section-beige py-10 md:py-16" aria-labelledby="pathways-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky">How it works</p>
          <h2 id="pathways-heading" className="mt-3 text-3xl font-bold text-charcoal md:text-4xl">
            Three pathways to impact
          </h2>
          <p className="mt-4 text-charcoal/75">
            From programmes in the field, through your support, to measurable change in
            Sarlahi — every step connects.
          </p>
        </motion.div>

        {/* Animated pathway flow */}
        <div className="relative mt-14">
          <PathwayConnector />

          <div className="grid gap-8 md:grid-cols-3">
            {pathways.map((path, i) => (
              <motion.article
                key={path.step}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...transition, delay: i * stagger }}
                whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                className="group relative"
              >
                <Link
                  href={path.href}
                  className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover ${path.accent}`}
                >
                  {/* Step badge */}
                  <div className="flex items-center justify-between px-5 pt-5">
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${path.badge}`}
                    >
                      {path.step}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-charcoal/40">
                      Pathway {path.step}
                    </span>
                  </div>

                  {/* Animated chart */}
                  <div className="mx-5 mt-2 h-36 rounded-xl bg-white p-3">
                    <path.Chart />
                  </div>

                  {/* Copy */}
                  <div className="flex flex-1 flex-col p-5 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                      {path.subtitle}
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-charcoal">{path.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/70">
                      {path.description}
                    </p>
                    <span
                      className={`mt-5 inline-flex items-center gap-1.5 text-sm font-bold transition-colors ${path.link}`}
                    >
                      {path.cta}
                      <span
                        className="transition-transform duration-300 group-hover:translate-x-1.5"
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

        {/* Mobile pathway line */}
        <div className="mx-auto mt-8 flex max-w-xs items-center justify-center gap-3 md:hidden" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-sky" />
          <span className="h-px flex-1 border-t-2 border-dashed border-sky/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-action" />
          <span className="h-px flex-1 border-t-2 border-dashed border-sky/40" />
          <span className="h-2 w-2 rounded-full bg-saffron" />
        </div>
      </div>
    </section>
  );
}
