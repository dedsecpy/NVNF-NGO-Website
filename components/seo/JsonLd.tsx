interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function getOrganizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "New Vision Nepal Foundation",
    alternateName: "NVNF",
    url: process.env.NEXTAUTH_URL ?? "https://newvisionnepal.org",
    logo: `${process.env.NEXTAUTH_URL ?? "https://newvisionnepal.org"}/opengraph-image`,
    description:
      "Rebuilding Nepal through education, disaster relief, and community welfare programs.",
    foundingDate: "2015",
    areaServed: {
      "@type": "Country",
      name: "Nepal",
    },
    nonprofitStatus: "NonprofitANBI",
    sameAs: [
      "https://facebook.com",
      "https://instagram.com",
    ],
  };
}
