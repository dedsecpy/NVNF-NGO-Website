"use client";

import { useReducedMotion } from "framer-motion";
import { animation } from "@/lib/design-tokens";

export function useMotion() {
  const prefersReducedMotion = useReducedMotion();

  return {
    prefersReducedMotion: !!prefersReducedMotion,
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration: animation.duration.entrance, ease: animation.ease },
    stagger: prefersReducedMotion ? 0 : animation.stagger,
  };
}
