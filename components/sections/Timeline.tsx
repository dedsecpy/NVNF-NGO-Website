"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Section";
import { useMotion } from "@/hooks/useMotion";
import type { TimelineEvent } from "@/lib/sanity/types";

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  const { transition, stagger, prefersReducedMotion } = useMotion();

  return (
    <Section className="bg-section-beige py-10 md:py-16" id="timeline">
      <Container>
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
          className="mb-12 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky">Our journey</p>
          <h2 className="mt-3 text-3xl font-bold text-charcoal md:text-4xl">Timeline</h2>
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          <div
            className="absolute left-4 top-0 h-full w-0.5 -translate-x-1/2 bg-sky/30"
            aria-hidden="true"
          />

          {events.map((event, i) => (
            <motion.article
              key={event._id}
              initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ...transition, delay: i * stagger }}
              className="relative mb-10 flex items-start last:mb-0"
            >
              <div className="relative z-10 flex w-8 shrink-0 justify-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky shadow-sm">
                  <span className="h-3 w-3 rounded-full bg-white" />
                </div>
              </div>
              <div className="mt-4 h-0.5 w-10 shrink-0 bg-sky/30 md:w-14" aria-hidden="true" />
              <div className="min-w-0 flex-1 pl-4 md:pl-6">
                <span className="text-2xl font-bold text-sky">{event.year}</span>
                <h3 className="mt-1 text-lg font-bold text-charcoal">{event.title}</h3>
                {event.description && (
                  <p className="mt-2 text-sm text-charcoal/70">{event.description}</p>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
