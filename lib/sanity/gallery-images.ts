import { getImageUrl } from "@/lib/sanity/image";
import type { GalleryItem } from "@/lib/sanity/types";
import {
  getVillageGalleryImageSrc,
  ngoMedia,
  villageGalleryManifest,
} from "@/lib/content/ngo-media";

const EXTRA_GALLERY_IMAGES: Record<string, string> = {
  "g-drama-1": ngoMedia.drama.streetPlay1,
  "g-drama-2": ngoMedia.drama.streetPlay2,
  "g-drama-3": ngoMedia.drama.streetPlay3,
  "g-laxmipur": ngoMedia.hero.laxmipur,
  "g-salempur": ngoMedia.hero.salempur,
};

export function getGalleryImageSrc(item: GalleryItem): string {
  const fromSanity = getImageUrl(item.image, 600, 400);
  if (fromSanity) return fromSanity;

  if (item.imageSrc) return item.imageSrc;

  if (EXTRA_GALLERY_IMAGES[item._id]) return EXTRA_GALLERY_IMAGES[item._id];

  const village = villageGalleryManifest.find((v) => v.id === item._id);
  if (village) return getVillageGalleryImageSrc(village);

  return ngoMedia.hero.sasapur;
}
