import type { MetadataRoute } from "next";
import { getNewsSlugs, getProgramSlugs } from "@/lib/sanity/fetch";

const siteUrl = process.env.NEXTAUTH_URL ?? "https://newvisionnepal.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [newsSlugs, programSlugs] = await Promise.all([
    getNewsSlugs(),
    getProgramSlugs(),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/problems",
    "/work",
    "/impact",
    "/get-involved",
    "/news",
    "/gallery",
    "/contact",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const newsRoutes = newsSlugs.map((slug) => ({
    url: `${siteUrl}/news/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const programRoutes = programSlugs.map((slug) => ({
    url: `${siteUrl}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...newsRoutes, ...programRoutes];
}
