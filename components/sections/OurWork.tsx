"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Section";
import { useMotion } from "@/hooks/useMotion";
import { getProgramImageUrl, getProgramImageAlt } from "@/lib/sanity/program-images";
import type { Program } from "@/lib/sanity/types";

interface OurWorkProps {
  programs: Program[];
  showHeader?: boolean;
}

export function OurWork({ programs, showHeader = true }: OurWorkProps) {
  const { transition, stagger, prefersReducedMotion } = useMotion();

  return (
    <Section className="bg-section-beige py-10 md:py-16" id="our-work">
      <Container>
        {showHeader && (
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
          className="mb-12 max-w-2xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky">Our programs</p>
          <h2 className="mt-3 text-3xl font-bold text-charcoal md:text-4xl">What we do</h2>
          <p className="mt-4 text-charcoal/75">
            Real programmes creating lasting change across Sarlahi&apos;s villages.
          </p>
        </motion.div>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" role="list">
          {programs.map((program, i) => {
            const imageUrl = getProgramImageUrl(program, 800, 600);

            return (
              <motion.div
                key={program._id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...transition, delay: i * stagger }}
                role="listitem"
                className="group"
              >
                <Link
                  href={`/work/${program.slug.current}`}
                  className="flex h-full flex-col overflow-hidden rounded-xl border border-charcoal/5 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                  aria-label={`Learn more about ${program.name}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-charcoal/10">
                    <Image
                      src={imageUrl}
                      alt={getProgramImageAlt(program)}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-grow flex-col p-6">
                    <h3 className="text-lg font-bold text-charcoal">{program.name}</h3>
                    <p className="mt-2 flex-grow text-sm leading-relaxed text-charcoal/70">
                      {program.description}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-sky">{program.stat}</p>
                    <span className="mt-5 text-sm font-bold text-charcoal underline decoration-charcoal/30 underline-offset-4 transition-colors group-hover:decoration-sky">
                      Learn more
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
