import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container, Section } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { getNewsPosts } from "@/lib/sanity/fetch";
import { getNewsImageUrl } from "@/lib/sanity/news-images";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Latest news and updates from New Vision Nepal Foundation.",
};

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <>
      <PageHero
        eyebrow="Stories & news"
        title="Updates from the field"
        description="Emergency updates, explainers, and stories of impact from Sarlahi and across Nepal."
        variant="beige"
      />
      <Section className="bg-white py-10 md:py-16">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const imageUrl = getNewsImageUrl(post);

              return (
                <article
                  key={post._id}
                  className="group overflow-hidden rounded-xl bg-white shadow-card transition-shadow hover:shadow-card-hover"
                >
                  <Link href={`/news/${post.slug.current}`} className="block">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <span className="absolute left-3 top-3 rounded bg-navy-deep px-2 py-1 text-[10px] font-bold uppercase text-white">
                        Stories
                      </span>
                    </div>
                    <div className="p-6">
                      <time className="text-[10px] font-medium uppercase tracking-wider text-charcoal/50">
                        {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                      <h2 className="mt-2 text-lg font-bold text-charcoal group-hover:text-sky">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-2 line-clamp-3 text-sm text-charcoal/70">{post.excerpt}</p>
                      )}
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
