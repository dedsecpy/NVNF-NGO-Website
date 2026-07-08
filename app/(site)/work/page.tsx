import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { OurWork } from "@/components/sections/OurWork";
import { getPrograms } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Explore NVNF programs — scholarships, disaster relief, mobile health clinics, and more.",
};

export default async function WorkPage() {
  const programs = await getPrograms();

  return (
    <>
      <PageHero
        eyebrow="Our programs"
        title="What we do"
        description="From emergency relief to long-term development, we work alongside communities to ensure every child is healthy, educated, and safe."
      />
      <OurWork programs={programs} showHeader={false} />
    </>
  );
}
