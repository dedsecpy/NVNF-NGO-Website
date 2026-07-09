"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Section";
import { useMotion } from "@/hooks/useMotion";

interface ChairpersonSpotlightProps {
  foundedYear: number;
  livesImpacted: number;
  districtsServed: number;
}

export function ChairpersonSpotlight({
  foundedYear,
  livesImpacted,
  districtsServed,
}: ChairpersonSpotlightProps) {
  const { transition, prefersReducedMotion } = useMotion();

  const stats = [
    { value: `${foundedYear}`, label: "Founded" },
    { value: `${livesImpacted.toLocaleString()}+`, label: "Lives impacted" },
    { value: `${districtsServed}`, label: "Districts served" },
  ];

  return (
    <Section className="bg-white py-12 md:py-16" id="chairperson">
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <motion.figure
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transition}
            className="relative mx-auto w-full max-w-[320px]"
          >
            <span
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl bg-sky/10"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-2xl ring-4 ring-sky/20">
              <Image
                src="/ngo/team/chairperson-susmita-giri.jpg"
                alt="Susmita Giri, Chairperson and Founder of New Vision Nepal Foundation"
                width={1498}
                height={1723}
                quality={90}
                className="h-auto w-full object-contain"
                sizes="(max-width: 1024px) 320px, 320px"
                priority
              />
            </div>
            <figcaption className="mt-4 text-center">
              <p className="text-lg font-bold text-charcoal">Susmita Giri</p>
              <p className="text-sm font-semibold text-sky">Chairperson &amp; Founder</p>
            </figcaption>
          </motion.figure>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: 0.1 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky">
              Our leadership
            </p>
            <h2 className="mb-6 mt-3 text-3xl font-bold text-charcoal md:text-4xl">
              Meet Susmita Giri
            </h2>

            <div className="space-y-4 text-justify text-base leading-relaxed text-charcoal/70">
              <p>
                Susmita Giri founded New Vision Nepal Foundation with a simple but
                unshakeable belief — that every Nepali child, family, and community
                deserves the dignity of opportunity. What began as a grassroots
                response to hardship has grown, under her stewardship, into a
                foundation reaching communities across {districtsServed} districts.
              </p>
              <p>
                As Chairperson, Susmita leads with a hands-on approach. She works
                directly with the field teams, listens to the communities NVNF
                serves, and ensures that every rupee donated translates into real,
                measurable change — from classrooms and clean water to livelihoods
                and healthcare. Her leadership blends compassion with accountability,
                keeping the organisation transparent, focused, and true to its mission.
              </p>
            </div>

            <blockquote className="mt-6 border-l-4 border-sky pl-5 text-lg italic leading-relaxed text-charcoal">
              &ldquo;We don&apos;t just deliver aid — we build lasting hope. Our work is
              measured not by what we give, but by the futures we help people build
              for themselves.&rdquo;
            </blockquote>

            <dl className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-section-beige p-4 text-center"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-2xl font-bold text-sky md:text-3xl">{stat.value}</dd>
                  <p className="mt-1 text-xs font-medium text-charcoal/60">{stat.label}</p>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
