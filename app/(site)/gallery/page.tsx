import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { getGalleryItems } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and videos from New Vision Nepal Foundation field work.",
};

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments of hope"
        description="Real images from the communities we serve across Nepal."
        variant="beige"
      />
      <Section className="bg-white py-10 md:py-16">
        <Container>
          <GalleryGrid items={items} />
        </Container>
      </Section>
    </>
  );
}
