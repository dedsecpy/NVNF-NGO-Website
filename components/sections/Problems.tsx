"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Section";
import { useMotion } from "@/hooks/useMotion";
import { getProblemImageUrl, getProblemImageAlt } from "@/lib/sanity/problem-images";
import type { Problem } from "@/lib/sanity/types";

interface ProblemsProps {
  problems: Problem[];
  showHeader?: boolean;
}

export function Problems({ problems, showHeader = true }: ProblemsProps) {
  const { transition, stagger, prefersReducedMotion } = useMotion();

  return (
    <Section className="bg-white py-10 md:py-16" id="problems">
      <Container>
        {showHeader && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transition}
            className="mb-12 max-w-2xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky">The reality</p>
            <h2 className="mt-3 text-3xl font-bold text-charcoal md:text-4xl">What Nepal faces</h2>
            <p className="mt-4 text-charcoal/75">
              Behind the mountains lies a truth that cannot be ignored.
            </p>
          </motion.div>
        )}

        <div className="grid gap-8 md:grid-cols-2" role="list">
          {problems.map((problem, i) => (
            <motion.article
              key={problem._id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transition, delay: i * stagger }}
              className="overflow-hidden rounded-xl bg-white shadow-card"
              role="listitem"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={getProblemImageUrl(problem, 800, 500)}
                  alt={getProblemImageAlt(problem)}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
                <span className="absolute left-4 top-4 rounded bg-navy-deep px-2 py-1 text-[10px] font-bold uppercase text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-charcoal">{problem.title}</h3>
                <p className="mt-2 text-sm font-semibold text-sky">{problem.stat}</p>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{problem.description}</p>
                <div className="mt-5">
                  <div className="mb-1 flex justify-between text-xs text-charcoal/50">
                    <span>Severity</span>
                    <span>{problem.severity}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-charcoal/10">
                    <motion.div
                      initial={prefersReducedMotion ? false : { width: 0 }}
                      whileInView={{ width: `${problem.severity}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full bg-sky"
                    />
                  </div>
                  {problem.severityLabel && (
                    <p className="mt-1 text-xs text-charcoal/45">{problem.severityLabel}</p>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
