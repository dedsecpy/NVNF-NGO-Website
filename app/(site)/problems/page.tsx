import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Problems } from "@/components/sections/Problems";
import { getProblems } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "The Problems",
  description:
    "Understanding the challenges facing Nepal — poverty, education gaps, disasters, healthcare, and unemployment.",
};

export default async function ProblemsPage() {
  const problems = await getProblems();

  return (
    <>
      <PageHero
        eyebrow="The reality"
        title="What Nepal faces"
        description="Behind the mountains lies a truth that cannot be ignored. These are the challenges driving our work every day."
        variant="beige"
      />
      <Problems problems={problems} showHeader={false} />
    </>
  );
}
