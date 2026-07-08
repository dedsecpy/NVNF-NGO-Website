import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { SpendingChart } from "@/components/sections/home/SpendingChart";
import { getSiteSettings } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Our Impact",
  description: "See the measurable impact of New Vision Nepal Foundation across Nepal.",
};

export default async function ImpactPage() {
  const settings = await getSiteSettings();

  const stats = [
    { value: `${settings.livesImpacted.toLocaleString()}+`, label: "Lives impacted" },
    { value: String(settings.districtsServed), label: "Districts served" },
    {
      value: `${new Date().getFullYear() - settings.foundedYear}+`,
      label: "Years of service",
    },
    { value: "100%", label: "Program transparency" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Impact"
        title="Numbers that tell a story"
        description="Every number represents a real person — a child in school, a family fed, a village healed."
        centered
      />
      <Section className="bg-section-beige py-10 md:py-16">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white p-6 text-center shadow-card">
                <p className="text-3xl font-bold text-sky md:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm text-charcoal/70">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-xl bg-sky p-8 text-center text-white md:p-12">
            <h2 className="text-2xl font-bold">Where we work</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/90">
              Our programs span {settings.districtsServed} districts across Nepal — from the Terai
              lowlands to the high Himalayas. We go where the need is greatest and stay until
              communities can stand on their own.
            </p>
          </div>
        </Container>
      </Section>
      <SpendingChart />
    </>
  );
}
