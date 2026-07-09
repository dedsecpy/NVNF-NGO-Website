"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotion } from "@/hooks/useMotion";
import { useDonation } from "@/components/donate/DonationProvider";
import { megaMenus } from "@/components/layout/mega-menu-data";
import { UtilityTicker } from "@/components/layout/UtilityTicker";
import { siteImages } from "@/lib/images/site-images";

import type { TickerSettings } from "@/lib/data/ticker-defaults";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={cn("h-3 w-3", className)} viewBox="0 0 12 12" fill="currentColor" aria-hidden>
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function Navbar({ ticker }: { ticker?: TickerSettings }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { openDonation } = useDonation();
  const { scrollY } = useScroll();
  const { transition, prefersReducedMotion } = useMotion();
  const navRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 48);
  });

  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const updateHeight = () => {
      document.documentElement.style.setProperty("--nav-height", `${el.offsetHeight}px`);
    };
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [activeMenu, mobileOpen, scrolled]);

  const activeMega = megaMenus.find((m) => m.id === activeMenu);
  const utilityHidden = scrolled;

  return (
    <>
    <header
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] m-0 flex w-full flex-col gap-0 p-0",
        scrolled && "shadow-lg"
      )}
    >
      <UtilityTicker hidden={utilityHidden} ticker={ticker} />

      {/* Main nav */}
      <div className="bg-sky">
        <nav
          className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="group flex min-w-0 flex-1 items-center gap-2.5 text-white lg:flex-none lg:gap-3.5"
            aria-label="New Vision Nepal Foundation — Home"
          >
            <Image
              src="/logo.png"
              alt=""
              width={112}
              height={112}
              quality={100}
              className="h-12 w-12 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 lg:h-14 lg:w-14"
              priority
            />
            <span className="hidden h-9 w-px shrink-0 bg-white/25 lg:block" aria-hidden="true" />
            <span className="flex min-w-0 flex-col justify-center">
              <span className="whitespace-nowrap font-body text-[17px] font-bold leading-none tracking-[-0.01em] text-white lg:text-xl">
                न्यू भिजन नेपाल फाउण्डेशन
              </span>
              <span className="mt-1 whitespace-nowrap font-body text-[9px] font-semibold uppercase leading-none tracking-[0.165em] text-white/65 lg:text-[10.5px] lg:tracking-[0.19em]">
                New Vision Nepal Foundation
              </span>
            </span>
          </Link>

          <ul className="hidden flex-1 items-center justify-center gap-1 lg:flex" role="list">
            {megaMenus.map((item) =>
              item.hasDropdown ? (
                <li key={item.id} className="relative">
                  <button
                    type="button"
                    onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 text-sm font-medium text-white transition-colors hover:text-white/90",
                      activeMenu === item.id && "border-b-2 border-white"
                    )}
                    aria-expanded={activeMenu === item.id}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "transition-transform",
                        activeMenu === item.id && "rotate-180"
                      )}
                    />
                  </button>
                </li>
              ) : (
                <li key={item.id} className="relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-2 text-sm font-medium text-white transition-colors hover:text-white/90",
                      pathname === item.href && "border-b-2 border-white"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={openDonation}
              className="hidden rounded-full bg-action px-5 py-2 text-xs font-bold uppercase tracking-wide text-charcoal transition-transform hover:scale-105 lg:block"
            >
              Donate
            </button>
            <button
              type="button"
              className="relative flex h-10 w-10 flex-col items-center justify-center text-white lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <span className={cn("block h-0.5 w-6 bg-current transition-all", mobileOpen && "translate-y-2 rotate-45")} />
              <span className={cn("mt-1.5 block h-0.5 w-6 bg-current transition-opacity", mobileOpen && "opacity-0")} />
              <span className={cn("mt-1.5 block h-0.5 w-6 bg-current transition-all", mobileOpen && "-translate-y-2 -rotate-45")} />
            </button>
          </div>
        </nav>

        {/* Mega menu */}
        <AnimatePresence>
          {activeMega && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
              transition={transition}
              className="hidden overflow-hidden border-t border-white/20 bg-sky lg:block"
            >
              <div className="mx-auto grid max-w-7xl grid-cols-[1fr_320px] gap-8 px-4 py-8 sm:px-6 lg:px-8">
                <div>
                  <Link
                    href={activeMega.href}
                    className="mb-6 flex items-center gap-2 text-xl font-bold text-white hover:underline"
                    onClick={() => setActiveMenu(null)}
                  >
                    {activeMega.label} →
                  </Link>
                  <div className="grid grid-cols-3 gap-8">
                    {activeMega.columns.map((col, i) => (
                      <div key={i}>
                        {col.title && (
                          <p className="mb-3 text-sm font-bold text-white">{col.title}</p>
                        )}
                        <ul className="space-y-2" role="list">
                          {col.links.map((link) => (
                            <li key={link.href + link.label}>
                              <Link
                                href={link.href}
                                className="text-sm text-white/90 hover:text-white hover:underline"
                                onClick={() => setActiveMenu(null)}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...transition, delay: 0.1 }}
                  className="flex flex-col rounded-xl bg-navy-deep p-6 text-white"
                >
                  <div className="relative mx-auto mb-4 h-28 w-28 overflow-hidden rounded-[40%] bg-white/10">
                    <Image
                      src={siteImages.megaMenuFeatured}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                  <h3 className="font-bold">{activeMega.featured.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-white/85">
                    {activeMega.featured.description}
                  </p>
                  <Link
                    href={activeMega.featured.href}
                    onClick={() => setActiveMenu(null)}
                    className="mt-4 inline-flex w-fit rounded-full border-2 border-white px-5 py-2 text-xs font-bold uppercase tracking-wide transition-colors hover:bg-white hover:text-navy-deep"
                  >
                    {activeMega.featured.cta}
                  </Link>
                </motion.div>
              </div>
              <div className="border-t border-white/20 bg-sky/90 px-4 py-3 text-sm text-white sm:px-6 lg:px-8">
                Helpful Links:{" "}
                <Link href="/contact" className="font-bold underline" onClick={() => setActiveMenu(null)}>
                  Contact us
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={prefersReducedMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={prefersReducedMotion ? undefined : { x: "100%" }}
            transition={transition}
            className="fixed inset-x-0 bottom-0 z-[55] overflow-y-auto bg-sky lg:hidden"
            style={{ top: "var(--nav-height, 64px)" }}
          >
            <ul className="space-y-1 p-4" role="list">
              {megaMenus.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...transition, delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="block rounded-lg px-4 py-3 text-lg font-semibold text-white hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="p-4">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openDonation();
                }}
                className="w-full rounded-full bg-action py-3 text-sm font-bold uppercase text-charcoal"
              >
                Donate
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    <div className="h-[var(--nav-height,64px)] shrink-0" aria-hidden="true" />
    </>
  );
}
