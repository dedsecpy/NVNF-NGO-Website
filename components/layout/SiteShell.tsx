"use client";

import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RegistrationCertificateModal } from "@/components/layout/RegistrationCertificateModal";
import { DonationProvider } from "@/components/donate/DonationProvider";
import type { SiteSettings } from "@/lib/sanity/types";
import type { TickerSettings } from "@/lib/data/ticker-defaults";

interface SiteShellProps {
  children: ReactNode;
  settings: SiteSettings;
  ticker: TickerSettings;
}

export function SiteShell({ children, settings, ticker }: SiteShellProps) {
  return (
    <DonationProvider>
      <RegistrationCertificateModal />
      <div id="top">
        <Navbar ticker={ticker} />
        <main className="w-full max-w-full overflow-x-hidden">{children}</main>
        <Footer settings={settings} />
      </div>
    </DonationProvider>
  );
}
