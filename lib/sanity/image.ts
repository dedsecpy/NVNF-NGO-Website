import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

type SanityImageSource = Parameters<ReturnType<typeof createImageUrlBuilder>["image"]>[0];

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function getImageUrl(
  source: SanityImageSource | undefined,
  width = 1200,
  height = 800
): string | undefined {
  if (!source) return undefined;
  return urlFor(source).width(width).height(height).auto("format").url();
}

export function getBlurDataUrl(source: SanityImageSource | undefined): string | undefined {
  if (!source) return undefined;
  return urlFor(source).width(20).height(20).blur(50).url();
}
