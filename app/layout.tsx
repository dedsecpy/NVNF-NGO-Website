import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";
import { JsonLd, getOrganizationSchema } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const siteUrl = process.env.NEXTAUTH_URL ?? "https://newvisionnepal.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "New Vision Nepal Foundation",
    template: "%s | New Vision Nepal Foundation",
  },
  description:
    "Rebuilding Nepal through education, disaster relief, and community welfare. One life at a time.",
  keywords: ["Nepal", "NGO", "charity", "donation", "education", "disaster relief"],
  authors: [{ name: "New Vision Nepal Foundation" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "New Vision Nepal Foundation",
    title: "New Vision Nepal Foundation",
    description: "Rebuilding Nepal. One Life at a Time.",
  },
  twitter: {
    card: "summary_large_image",
    title: "New Vision Nepal Foundation",
    description: "Rebuilding Nepal. One Life at a Time.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <JsonLd data={getOrganizationSchema()} />
        <link
          rel="preload"
          as="image"
          href="/ngo/hero/hero-home.jpg"
          type="image/jpeg"
          fetchPriority="high"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var w=window.matchMedia('(min-width:768px)').matches;document.documentElement.style.setProperty('--nav-height',w?'104px':'64px');})();`,
          }}
        />
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="font-body antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
