"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useMotion } from "@/hooks/useMotion";

const OPEN_DELAY_MS = 1000;

export function RegistrationCertificateModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { transition, prefersReducedMotion } = useMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, OPEN_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  function handleClose() {
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

            <div className="relative overflow-hidden rounded-2xl shadow-card">
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
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl border-[3px] border-action sm:border-4"
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
