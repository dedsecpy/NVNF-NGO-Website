"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useMotion } from "@/hooks/useMotion";

const segments = [
  {
    label: "Programs & services",
    value: 78,
    color: "#F7C852",
    desc: "Directly funds meals, education, healthcare, and emergency relief in communities across Sarlahi.",
  },
  {
    label: "Fundraising",
    value: 15,
    color: "#58A9E1",
    desc: "Covers outreach, donor communications, and campaigns that bring more support to those in need.",
  },
  {
    label: "Administration",
    value: 7,
    color: "#3A4B96",
    desc: "Essential operations, compliance, and governance that keep NVNF accountable and effective.",
  },
];

const CHART_SIZE = 280;
const STROKE = 48;
const RADIUS = (CHART_SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ease = [0.25, 0.1, 0.25, 1] as const;

function CountUp({
  to,
  duration = 1.1,
  delay = 0,
}: {
  to: number;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? to : 0);

  useEffect(() => {
    if (!isInView) return;
    if (reduced) {
      setValue(to);
      return;
    }

    const delayMs = delay * 1000;
    const startAt = performance.now() + delayMs;
    let frame = 0;

    const tick = (now: number) => {
      if (now < startAt) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const elapsed = (now - startAt) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(eased * to));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, to, duration, delay, reduced]);

  return <span ref={ref}>{value}</span>;
}

function AnimatedDonutChart({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  let offset = 0;

  return (
    <svg
      width={CHART_SIZE}
      height={CHART_SIZE}
      viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}
      className="mx-auto"
      role="img"
      aria-label="How every Rs 100 donated is allocated"
    >
      <g transform={`rotate(-90 ${CHART_SIZE / 2} ${CHART_SIZE / 2})`}>
        {segments.map((seg, i) => {
          const dash = (seg.value / 100) * CIRCUMFERENCE;
          const segmentOffset = offset;
          offset += dash;

          return (
            <motion.circle
              key={seg.label}
              cx={CHART_SIZE / 2}
              cy={CHART_SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke={seg.color}
              strokeWidth={STROKE}
              strokeLinecap="butt"
              strokeDashoffset={-segmentOffset}
              initial={
                reduced
                  ? { strokeDasharray: `${dash} ${CIRCUMFERENCE - dash}` }
                  : { strokeDasharray: `0 ${CIRCUMFERENCE}` }
              }
              animate={
                active || reduced
                  ? { strokeDasharray: `${dash} ${CIRCUMFERENCE - dash}` }
                  : { strokeDasharray: `0 ${CIRCUMFERENCE}` }
              }
              transition={{
                duration: reduced ? 0 : 0.85,
                delay: reduced ? 0 : i * 0.18,
                ease,
              }}
            />
          );
        })}
      </g>
    </svg>
  );
}

export function SpendingChart() {
  const { transition, stagger, prefersReducedMotion } = useMotion();
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInView = useInView(chartRef, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
          className="max-w-3xl"
        >
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            How we spend your money
          </h2>
          <p className="mt-6 text-base leading-relaxed text-charcoal/80">
            We are committed to transparency. For every Rs 100 you give, the majority goes
            directly to programmes in Sarlahi — not overhead.
          </p>
          <p className="mt-4 text-base leading-relaxed text-charcoal/80">
            When families need support, we mobilise quickly. Your donation funds health sessions,
            empowerment workshops, and field programmes across our villages.
          </p>
        </motion.div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            ref={chartRef}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="relative flex items-center justify-center"
          >
            <AnimatedDonutChart active={chartInView} />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold tabular-nums text-charcoal md:text-5xl">
                Rs <CountUp to={100} duration={1.2} />
              </span>
            </div>
          </motion.div>

          <div className="space-y-8">
            <h3 className="text-xl font-bold text-charcoal">
              How we use every Rs 100 you donate
            </h3>
            {segments.map((seg, i) => (
              <motion.div
                key={seg.label}
                initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ ...transition, delay: i * stagger }}
              >
                <div className="flex items-center gap-3">
                  <motion.span
                    className="h-4 w-4 shrink-0 rounded-full"
                    style={{ backgroundColor: seg.color }}
                    initial={prefersReducedMotion ? false : { scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.2 + i * 0.15, ease }}
                    aria-hidden
                  />
                  <span className="text-2xl font-bold tabular-nums text-charcoal">
                    Rs{" "}
                    <CountUp to={seg.value} duration={1} delay={0.25 + i * 0.18} />
                  </span>
                </div>
                <motion.p
                  className="mt-2 pl-7 text-sm leading-relaxed text-charcoal/75"
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                >
                  {seg.desc}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
