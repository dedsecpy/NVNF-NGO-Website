"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Section";
import { useDonation } from "@/components/donate/DonationProvider";
import { useMotion } from "@/hooks/useMotion";

const ways = [
  {
    title: "Donate",
    description:
      "Fund meals, education, and emergency relief in the communities that need it most.",
    cta: "Give now",
    action: "donate" as const,
  },
  {
    title: "Volunteer",
    description:
      "Lend your time on the ground or remotely — every skill has a place in our mission.",
    href: "/contact",
    cta: "Reach out",
  },
  {
    title: "Partner",
    description:
      "Institutions and corporations — build sustained impact across Nepal together.",
    href: "/contact",
    cta: "Start a conversation",
  },
];

export function GetInvolvedWays() {
  const { openDonation } = useDonation();
  const { transition, stagger, prefersReducedMotion } = useMotion();

  return (
    <Section className="bg-white py-10 md:py-16" id="ways-to-give">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          {ways.map((item, i) => {
            const cardClassName =
              "group flex h-full flex-col overflow-hidden rounded-xl bg-white p-8 text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover";

            const content = (
              <>
                <h2 className="text-xl font-bold text-charcoal">{item.title}</h2>
                <p className="mt-4 flex-grow text-sm leading-relaxed text-charcoal/70">
                  {item.description}
                </p>
                <span className="mt-8 text-sm font-bold text-charcoal underline decoration-charcoal/30 underline-offset-4 transition-colors group-hover:decoration-sky">
                  {item.cta}
                </span>
              </>
            );

            return (
              <motion.div
                key={item.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...transition, delay: i * stagger }}
                className="h-full"
              >
                {item.action === "donate" ? (
                  <button
                    type="button"
                    onClick={openDonation}
                    className={cardClassName}
                    aria-label={`${item.title}: ${item.cta}`}
                  >
                    {content}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cardClassName}
                    aria-label={`${item.title}: ${item.cta}`}
                  >
                    {content}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
