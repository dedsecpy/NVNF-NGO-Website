import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/ui/Section";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import type { Program } from "@/lib/sanity/types";
import type { ProgramStory } from "@/lib/content/program-stories";
import { getProgramImageUrl, getProgramImageAlt } from "@/lib/sanity/program-images";

interface ProgramDetailViewProps {
  program: Program;
  story: ProgramStory;
}

function MetaBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-charcoal/10 bg-white p-5 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-charcoal md:text-base">{value}</p>
    </div>
  );
}

export function ProgramDetailView({ program, story }: ProgramDetailViewProps) {
  const heroImage = getProgramImageUrl(program, 1600, 900);
  const heroAlt = getProgramImageAlt(program);

  return (
    <article>
      {/* Full-view hero image */}
      <div className="relative w-full bg-charcoal">
        <div className="relative mx-auto aspect-[16/9] max-h-[min(72vh,720px)] w-full max-w-7xl md:aspect-[21/9]">
          <Image
            src={heroImage}
            alt={heroAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <p className="absolute bottom-3 right-4 z-10 text-[10px] text-white/80 md:bottom-4 md:right-6">
            {heroAlt}
          </p>
        </div>
      </div>

      <Section className="bg-section-beige py-8 md:py-12">
        <Container className="max-w-3xl">
          <Link
            href="/work"
            className="text-sm font-bold text-sky underline decoration-sky/30 underline-offset-4 hover:decoration-sky"
          >
            ← Back to our programmes
          </Link>

          <header className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky">Field story</p>
            <h1 className="mt-3 text-3xl font-bold text-charcoal md:text-4xl lg:text-5xl">
              {program.name}
            </h1>
            {program.stat && (
              <p className="mt-4 inline-block rounded-full bg-sky/10 px-4 py-1.5 text-sm font-semibold text-sky">
                {program.stat}
              </p>
            )}
            <p className="mt-6 text-lg leading-relaxed text-charcoal/80">{program.description}</p>
          </header>

          {/* What · Where · When · How */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <MetaBlock label="When" value={story.when} />
            <MetaBlock label="Where" value={story.where} />
            <MetaBlock label="What we did" value={story.what} />
            <MetaBlock label="How we did it" value={story.how} />
          </div>

          {story.impact && (
            <div className="mt-8 rounded-xl bg-sky px-6 py-5 text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                Impact so far
              </p>
              <p className="mt-2 text-lg font-bold">{story.impact}</p>
            </div>
          )}
        </Container>
      </Section>

      {/* Detailed blog sections */}
      <Section className="bg-white py-8 md:py-14">
        <Container className="max-w-3xl">
          <div className="max-w-none">
            {story.sections.map((section) => (
              <div key={section.heading} className="mb-12 last:mb-0">
                <h2 className="text-2xl font-bold text-charcoal md:text-3xl">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-base leading-relaxed text-charcoal/80 md:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {program.body && program.body.length > 0 && (
              <div className="mt-12 border-t border-charcoal/10 pt-12">
                <PortableTextRenderer value={program.body} />
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Photo gallery from the field */}
      {story.extraImages && story.extraImages.length > 0 && (
        <Section className="border-t border-charcoal/10 bg-section-beige py-8 md:py-12">
          <Container>
            <h2 className="text-2xl font-bold text-charcoal md:text-3xl">Photos from the field</h2>
            <p className="mt-2 text-charcoal/70">
              Documented during NVNF programmes across Sarlahi.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {story.extraImages.map((img) => (
                <figure
                  key={img.src}
                  className="overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-charcoal/5"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={img.src}
                      alt={img.caption}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <figcaption className="p-4 text-sm font-medium text-charcoal/75">
                    {img.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section className="bg-sky py-8 text-white md:py-12">
        <Container className="max-w-3xl text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Support this programme</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Your donation helps NVNF continue this work in Sarlahi&apos;s villages.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/get-involved"
              className="rounded-full bg-action px-8 py-3 text-sm font-bold uppercase tracking-wide text-charcoal transition-transform hover:scale-105"
            >
              Donate now
            </Link>
            <Link
              href="/gallery"
              className="rounded-full border-2 border-white px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-sky"
            >
              View gallery
            </Link>
          </div>
        </Container>
      </Section>
    </article>
  );
}
