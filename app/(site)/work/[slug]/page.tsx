import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgramDetailView } from "@/components/programs/ProgramDetailView";
import { getProgramStory } from "@/lib/content/program-stories";
import { getProgramBySlug, getProgramSlugs } from "@/lib/sanity/fetch";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getProgramSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return { title: "Program Not Found" };
  return {
    title: program.name,
    description: program.description,
  };
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program) notFound();

  const story =
    getProgramStory(slug) ?? {
      when: "See programme updates on our news page",
      where: "Sarlahi, Madhesh Province, Nepal",
      what: program.description,
      how: "Through community-led field programmes delivered by NVNF teams and local volunteers.",
      sections: [
        {
          heading: "About this programme",
          paragraphs: [program.description],
        },
      ],
    };

  return <ProgramDetailView program={program} story={story} />;
}
