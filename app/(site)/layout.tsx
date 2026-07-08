import { SiteShell } from "@/components/layout/SiteShell";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { getTickerSettings } from "@/lib/data/cms-store";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, ticker] = await Promise.all([getSiteSettings(), getTickerSettings()]);

  return (
    <SiteShell settings={settings} ticker={ticker}>
      {children}
    </SiteShell>
  );
}
