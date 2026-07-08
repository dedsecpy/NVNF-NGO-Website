"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

/** Three programme bars — women, health, drug rehab */
export function ProgrammesChart() {
  const reduced = useReducedMotion();
  const bars = [
    { label: "Women", h: 72, color: "#1C9AD6", delay: 0.1 },
    { label: "Health", h: 88, color: "#1B4332", delay: 0.22 },
    { label: "Rehab", h: 56, color: "#E8690B", delay: 0.34 },
  ];

  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" role="img" aria-label="Programme areas chart">
      {bars.map((b, i) => (
        <g key={b.label}>
          <motion.rect
            x={i * 64 + 24}
            width="40"
            rx="6"
            fill={b.color}
            fillOpacity="0.15"
            y="20"
            height="80"
          />
          <motion.rect
            x={i * 64 + 24}
            width="40"
            rx="6"
            fill={b.color}
            initial={reduced ? { y: 100 - b.h, height: b.h } : { y: 100, height: 0 }}
            whileInView={{ y: 100 - b.h, height: b.h }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: b.delay, ease }}
          />
          <text
            x={i * 64 + 44}
            y="112"
            textAnchor="middle"
            fill="#1C1C1E"
            fillOpacity="0.5"
            fontSize="9"
            fontFamily="var(--font-inter), sans-serif"
          >
            {b.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Donut — funds reaching communities */
export function GiveChart() {
  const reduced = useReducedMotion();
  const size = 120;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = 0.78;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="mx-auto h-full w-full max-w-[140px]"
      role="img"
      aria-label="78 percent of donations reach programmes"
    >
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1C9AD6" strokeOpacity="0.12" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#1C9AD6"
        strokeWidth={stroke}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        strokeDasharray={circ}
        initial={reduced ? { strokeDashoffset: circ * (1 - pct) } : { strokeDashoffset: circ }}
        whileInView={{ strokeDashoffset: circ * (1 - pct) }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease }}
      />
      <text x={size / 2} y={size / 2 - 4} textAnchor="middle" fill="#1C1C1E" fontSize="22" fontWeight="700">
        78%
      </text>
      <text x={size / 2} y={size / 2 + 14} textAnchor="middle" fill="#1C1C1E" fillOpacity="0.45" fontSize="8">
        to programmes
      </text>
    </svg>
  );
}

/** Rising trend — lives impacted */
export function ImpactChart() {
  const reduced = useReducedMotion();
  const points = "20,95 50,80 80,70 110,55 140,42 170,28";
  const area = `M20,95 L50,80 L80,70 L110,55 L140,42 L170,28 L170,100 L20,100 Z`;

  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" role="img" aria-label="Growing community impact">
      <motion.path
        d={area}
        fill="#E8690B"
        fillOpacity="0.12"
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />
      <motion.polyline
        points={points}
        fill="none"
        stroke="#E8690B"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
      />
      {[
        [20, 95],
        [50, 80],
        [80, 70],
        [110, 55],
        [140, 42],
        [170, 28],
      ].map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="4"
          fill="#E8690B"
          initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 + i * 0.12 }}
        />
      ))}
      <text x="170" y="20" textAnchor="end" fill="#E8690B" fontSize="11" fontWeight="700">
        15.5K+
      </text>
    </svg>
  );
}

/** Connecting pathway lines between three steps */
export function PathwayConnector() {
  const reduced = useReducedMotion();

  return (
    <svg
      className="pointer-events-none absolute left-0 right-0 top-[88px] hidden h-8 w-full md:block"
      viewBox="0 0 1000 32"
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.path
        d="M 120 16 L 420 16"
        stroke="#1C9AD6"
        strokeOpacity="0.25"
        strokeWidth="2"
        strokeDasharray="6 4"
        fill="none"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease }}
      />
      <motion.path
        d="M 580 16 L 880 16"
        stroke="#1C9AD6"
        strokeOpacity="0.25"
        strokeWidth="2"
        strokeDasharray="6 4"
        fill="none"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5, ease }}
      />
      <motion.circle
        cx="500"
        cy="16"
        r="6"
        fill="#FFC20E"
        initial={reduced ? { scale: 1 } : { scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.6, ease }}
      />
    </svg>
  );
}
