import { createClient, type QueryParams } from "next-sanity";
import { projectId, dataset, apiVersion, isSanityConfigured } from "@/sanity/env";

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  token: process.env.SANITY_API_TOKEN,
});

export const revalidate = 60;

export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<T> {
  if (!isSanityConfigured) {
    throw new Error("SANITY_NOT_CONFIGURED");
  }

  return client.fetch<T>(query, params, {
    next: {
      revalidate,
      tags,
    },
  });
}
