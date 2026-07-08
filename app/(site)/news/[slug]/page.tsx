import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui/Section";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import { getNewsPostBySlug, getNewsSlugs } from "@/lib/sanity/fetch";
import { getNewsImageUrl } from "@/lib/sanity/news-images";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) notFound();

  const imageUrl = getNewsImageUrl(post, 1200, 600);

  return (
    <>
      <Section className="bg-section-beige pt-8 pb-8 md:pt-12">
        <Container className="max-w-3xl">
          <Link href="/news" className="prose-link text-sm">
            ← Back to news
          </Link>
          <time className="mt-6 block text-xs font-medium uppercase tracking-wider text-charcoal/50">
            {new Date(post.publishedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <h1 className="mt-4 text-3xl font-bold text-charcoal md:text-4xl">{post.title}</h1>
          {post.author && <p className="mt-2 text-sm text-charcoal/60">By {post.author}</p>}
        </Container>
      </Section>

      {imageUrl && (
        <div className="relative mx-auto h-64 max-w-5xl px-4 md:h-96">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="rounded-xl object-cover"
            sizes="100vw"
          />
        </div>
      )}

      <Section className="bg-white py-8 md:py-12">
        <Container className="max-w-3xl">
          {post.body && post.body.length > 0 ? (
            <PortableTextRenderer value={post.body} />
          ) : (
            <p className="text-charcoal/75">{post.excerpt}</p>
          )}
        </Container>
      </Section>
    </>
  );
}
