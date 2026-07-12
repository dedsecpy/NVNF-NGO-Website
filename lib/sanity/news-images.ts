import { getImageUrl } from "@/lib/sanity/image";
import type { NewsPost } from "@/lib/sanity/types";
import { ngoMedia } from "@/lib/content/ngo-media";

const NEWS_FALLBACK_IMAGES: Record<string, string> = {
  "sonam-village-drug-rehabilitation": ngoMedia.news.sonamVillageDrugRehabilitation,
  "child-health-sassapur": ngoMedia.news.childHealthSassapur,
  "women-empowerment-programme": ngoMedia.news.womenEmpowerment,
  "drug-abuse-street-drama": ngoMedia.news.drugDrama,
  "vaccination-education": ngoMedia.news.vaccination,
};

const DEFAULT_NEWS_IMAGE = ngoMedia.news.childHealthSassapur;

export function getNewsImageUrl(post: NewsPost, width = 600, height = 400): string {
  const fromSanity = getImageUrl(post.image, width, height);
  if (fromSanity) return fromSanity;

  return NEWS_FALLBACK_IMAGES[post.slug.current] ?? DEFAULT_NEWS_IMAGE;
}
