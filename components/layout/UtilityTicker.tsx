"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotion } from "@/hooks/useMotion";
import type { TickerSettings } from "@/lib/data/ticker-defaults";
import { defaultTicker } from "@/lib/data/ticker-defaults";

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-3 w-3", className)}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 2.5l4 3.5-4 3.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface UtilityTickerProps {
  hidden?: boolean;
  ticker?: TickerSettings;
}

export function UtilityTicker({
  hidden = false,
  ticker = defaultTicker,
}: UtilityTickerProps) {
  const { prefersReducedMotion } = useMotion();

  if (!ticker.enabled) return null;

  function TickerItem() {
    return (
      <Link
        href={ticker.href}
        className="group inline-flex shrink-0 items-center gap-1.5 px-10 text-[12px] leading-none text-charcoal transition-opacity hover:opacity-70"
      >
        <span>{ticker.message}</span>
        <span className="font-medium text-sky group-hover:underline">Learn more</span>
        <ChevronRight className="text-charcoal/50" />
      </Link>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden bg-[#f5f5f7]",
        hidden ? "h-0 border-b-0 opacity-0" : "h-11 border-b border-charcoal/[0.08] opacity-100",
        !prefersReducedMotion && "transition-[height,opacity] duration-300 ease-in-out",
        hidden && "pointer-events-none"
      )}
      aria-hidden={hidden}
    >
      <div className="flex h-11 items-center" role="region" aria-label="Announcement">
          {prefersReducedMotion ? (
            <div className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
              <TickerItem />
            </div>
          ) : (
            <motion.div
              className="flex w-max items-center will-change-transform"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 48,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="flex shrink-0 items-center">
                <TickerItem />
                <TickerItem />
                <TickerItem />
              </div>
              <div className="flex shrink-0 items-center" aria-hidden>
                <TickerItem />
                <TickerItem />
                <TickerItem />
              </div>
            </motion.div>
          )}
      </div>
    </div>
  );
}
