"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useMotion } from "@/hooks/useMotion";

interface AnimatedGlowingFrameProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedGlowingFrame({ children, className }: AnimatedGlowingFrameProps) {
  const { prefersReducedMotion } = useMotion();

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl shadow-card ring-[3px] ring-action sm:ring-4",
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <div className={cn("glow-frame w-full", className)}>
      <div className="glow-frame__orbit glow-frame__orbit--bloom" aria-hidden="true">
        <div className="glow-frame__spin" />
      </div>
      <div className="glow-frame__orbit glow-frame__orbit--trail" aria-hidden="true">
        <div className="glow-frame__spin" />
      </div>
      <div className="glow-frame__orbit glow-frame__orbit--core" aria-hidden="true">
        <div className="glow-frame__spin" />
      </div>

      <div className="glow-frame__content">{children}</div>
    </div>
  );
}
