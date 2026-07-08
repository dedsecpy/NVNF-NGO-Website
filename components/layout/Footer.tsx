"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { SiteSettings } from "@/lib/sanity/types";
import { useMotion } from "@/hooks/useMotion";

interface FooterProps {
  settings: SiteSettings;
}

const footerNavCol1 = [
  { href: "/get-involved", label: "Support us" },
  { href: "/news", label: "Stories & news" },
  { href: "/get-involved", label: "Appeals" },
  { href: "/about", label: "NVNF Youth" },
  { href: "/about", label: "About NVNF" },
];

const footerNavCol2 = [
  { href: "/work", label: "What we do" },
  { href: "/about#team", label: "Our people" },
  { href: "/contact", label: "Volunteer" },
  { href: "/news", label: "Media centre" },
  { href: "/contact", label: "Contact us" },
];

const legalLinks = [
  { href: "/contact", label: "Privacy policy" },
  { href: "/contact", label: "Tax receipts" },
  { href: "/contact", label: "Refund procedure" },
  { href: "/contact", label: "Complaints" },
  { href: "/sitemap.xml", label: "Sitemap" },
  { href: "/contact", label: "FAQs" },
];

export function Footer({ settings }: FooterProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const leftRef = useRef<HTMLDivElement>(null);
  const [formHeight, setFormHeight] = useState<number | null>(null);
  const { transition, prefersReducedMotion } = useMotion();

  const syncHeight = useCallback(() => {
    if (leftRef.current && window.innerWidth >= 1024) {
      setFormHeight(leftRef.current.offsetHeight);
    } else {
      setFormHeight(null);
    }
  }, []);

  useEffect(() => {
    syncHeight();
    const el = leftRef.current;
    if (!el) return;
    const observer = new ResizeObserver(syncHeight);
    observer.observe(el);
    window.addEventListener("resize", syncHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeight);
    };
  }, [syncHeight]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <footer className="bg-sky text-white" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-end">
          <a
            href="#top"
            className="text-xs font-bold uppercase tracking-wider text-sky-pale hover:underline"
          >
            Back to top ↑
          </a>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
          <div ref={leftRef}>
            <div className="flex items-center gap-3 border-b border-white/20 pb-6">
              <span className="text-lg font-bold leading-snug md:text-xl">
                New Vision Nepal Foundation
              </span>
              <span className="border-l border-white/40 pl-3 text-sm font-light lowercase">
                for every child
              </span>
            </div>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <ul className="space-y-2 text-sm" role="list">
                {footerNavCol1.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2 text-sm" role="list">
                {footerNavCol2.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex gap-3">
              {[
                { name: "Facebook", href: settings.socialLinks?.facebook },
                { name: "Instagram", href: settings.socialLinks?.instagram },
                { name: "Twitter", href: settings.socialLinks?.twitter },
              ]
                .filter((s): s is { name: string; href: string } => Boolean(s.href))
                .map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-bold text-sky hover:bg-white/90"
                    aria-label={social.name}
                  >
                    {social.name[0]}
                  </a>
                ))}
            </div>

            <div className="mt-8 space-y-2 text-xs text-white/85">
              {settings.address && <p>{settings.address}</p>}
              {settings.registrationNumber && (
                <p>Registration: {settings.registrationNumber}</p>
              )}
              <p>Donations may be tax deductible where applicable.</p>
            </div>
          </div>

          <motion.form
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transition}
            onSubmit={handleSubmit}
            className="flex flex-col rounded-2xl bg-sky-light p-6 lg:p-8"
            style={formHeight ? { height: formHeight } : undefined}
            aria-label="Newsletter signup"
          >
            <h2 className="text-lg font-bold">Stay connected with NVNF</h2>
            {submitted ? (
              <p className="mt-6 flex flex-1 items-center text-sm text-white/90">
                Thank you for subscribing. We will be in touch.
              </p>
            ) : (
              <>
                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="footer-first" className="text-xs text-white/90">
                      First Name
                    </label>
                    <input
                      id="footer-first"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="mt-1 w-full rounded-lg border-0 bg-white px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="footer-last" className="text-xs text-white/90">
                      Last Name
                    </label>
                    <input
                      id="footer-last"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="mt-1 w-full rounded-lg border-0 bg-white px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="footer-email" className="text-xs text-white/90">
                      Email
                    </label>
                    <input
                      id="footer-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 w-full rounded-lg border-0 bg-white px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                </div>
                <div className="mt-auto flex justify-center pt-3">
                  <button
                    type="submit"
                    className="rounded-full bg-navy-deep px-8 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-navy"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </motion.form>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-6 text-xs text-white/80">
          <ul className="flex flex-wrap gap-4" role="list">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p>© {new Date().getFullYear()} New Vision Nepal Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
