"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteImages } from "@/lib/images/site-images";
import { useMotion } from "@/hooks/useMotion";
import type { NewsPost } from "@/lib/sanity/types";
import { getNewsImageUrl } from "@/lib/sanity/news-images";

interface NewsCarouselProps {
  posts: NewsPost[];
}

const fallbackStories = [
  {
    _id: "n1",
    title: "Children Health Awareness in Sassapur",
    excerpt:
      "Raising children's health awareness through interactive workshops and community health volunteers.",
    slug: { current: "child-health-sassapur" },
    publishedAt: "2022-10-15",
    image: siteImages.news1,
  },
  {
    _id: "n2",
    title: "Women Empowerment Programme",
    excerpt:
      "Skill development and leadership training for women in Laxmipur and surrounding communities.",
    slug: { current: "women-empowerment-programme" },
    publishedAt: "2024-07-20",
    image: siteImages.news2,
  },
  {
    _id: "n3",
    title: "Drug Abuse Awareness Street Drama",
    excerpt:
      "Lagu aushad सदक नाटक performances reached schools and village squares across Sarlahi.",
    slug: { current: "drug-abuse-street-drama" },
    publishedAt: "2022-03-26",
    image: siteImages.news3,
  },
];

export function NewsCarousel({ posts }: NewsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { transition, prefersReducedMotion } = useMotion();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const stories =
    posts.length > 0
      ? posts.map((p) => ({
          _id: p._id,
          title: p.title,
          excerpt: p.excerpt ?? "",
          href: `/news/${p.slug.current}`,
          date: new Date(p.publishedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }).toUpperCase(),
          image: getNewsImageUrl(p),
        }))
      : fallbackStories.map((s) => ({
          _id: s._id,
          title: s.title,
          excerpt: s.excerpt,
          href: `/news/${s.slug.current}`,
          date: new Date(s.publishedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }).toUpperCase(),
          image: s.image,
        }));

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -340 : 340, behavior: "smooth" });
    setTimeout(updateScrollState, 300);
  }

  return (
    <section className="bg-section-news py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transition}
          >
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Emergency updates, explainers and stories of impact
            </h2>
          </motion.div>
          <Link
            href="/news"
            className="text-sm font-bold text-charcoal underline decoration-charcoal/40 underline-offset-4 hover:decoration-charcoal"
          >
            View all news
          </Link>
        </div>

        <div className="relative mt-10">
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scroll("left")}
              className="absolute -left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-sky/30 bg-white text-sky shadow-md hover:bg-sky/5"
              aria-label="Scroll stories left"
            >
              ‹
            </button>
          )}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scroll("right")}
              className="absolute -right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-sky/30 bg-white text-sky shadow-md hover:bg-sky/5"
              aria-label="Scroll stories right"
            >
              ›
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            role="list"
            aria-label="News stories"
          >
            {stories.map((story, i) => (
              <motion.article
                key={story._id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...transition, delay: i * 0.08 }}
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                className="w-[min(320px,85vw)] shrink-0 snap-start overflow-hidden rounded-lg bg-white shadow-card"
                role="listitem"
              >
                <Link href={story.href} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={story.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="320px"
                    />
                    <span className="absolute left-3 top-3 rounded bg-navy-deep px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                      Stories
                    </span>
                  </div>
                  <div className="p-5">
                    <time className="text-[10px] font-medium uppercase tracking-wider text-charcoal/50">
                      {story.date}
                    </time>
                    <h3 className="mt-2 text-base font-bold leading-snug text-charcoal">
                      {story.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-charcoal/70">{story.excerpt}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
