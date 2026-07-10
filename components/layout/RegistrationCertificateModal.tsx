"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedGlowingFrame } from "@/components/ui/AnimatedGlowingFrame";
import { useMotion } from "@/hooks/useMotion";

const STORAGE_KEY = "nvnf-registration-cert-dismissed";

export function RegistrationCertificateModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { transition, prefersReducedMotion } = useMotion();

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (dismissed) return;

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, []);

  function handleClose() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={transition}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-charcoal/60 p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="registration-cert-title"
          onClick={handleClose}
        >
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
            transition={transition}
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="registration-cert-title" className="sr-only">
              Certificate of Registration — New Vision Nepal Foundation
            </h2>

            <button
              type="button"
              onClick={handleClose}
              className="absolute -right-2 -top-2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-sky/30 bg-white text-navy-deep shadow-md transition-colors hover:border-urgency hover:bg-urgency hover:text-white sm:-right-3 sm:-top-3"
              aria-label="Close certificate"
            >
              ✕
            </button>

            <AnimatedGlowingFrame>
              <Image
                src="/ngo/certificates/registration.jpeg"
                alt="Official registration certificate of New Vision Nepal Foundation"
                width={1036}
                height={1315}
                quality={95}
                className="block h-auto w-full"
                sizes="(max-width: 640px) 90vw, 448px"
                priority
              />
            </AnimatedGlowingFrame>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
