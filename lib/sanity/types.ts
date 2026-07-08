import type { PortableTextBlock } from "@portabletext/types";

export type SanityImageSource = {
  _type?: string;
  asset?: { _ref: string; _type?: string };
};

export interface SiteSettings {
  _id: string;
  title: string;
  description: string;
  heroVideoUrl?: string;
  heroImage?: SanityImageSource;
  heroHeadline: string;
  heroSubheadline: string;
  livesImpacted: number;
  districtsServed: number;
  foundedYear: number;
  aboutStory?: PortableTextBlock[];
  registrationNumber?: string;
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface Problem {
  _id: string;
  title: string;
  stat: string;
  description: string;
  severity: number;
  severityLabel?: string;
  image?: SanityImageSource;
  order?: number;
}

export interface Program {
  _id: string;
  name: string;
  slug: { current: string };
  icon?: string;
  description: string;
  stat: string;
  image?: SanityImageSource;
  body?: PortableTextBlock[];
}

export interface NewsPost {
  _id: string;
  title: string;
  slug: { current: string };
  author?: string;
  publishedAt: string;
  excerpt?: string;
  image?: SanityImageSource;
  body?: PortableTextBlock[];
}

export interface GalleryItem {
  _id: string;
  title: string;
  category: "photo" | "video";
  image?: SanityImageSource;
  imageSrc?: string;
  videoUrl?: string;
  date?: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  photo?: SanityImageSource;
  order?: number;
}

export interface TimelineEvent {
  _id: string;
  year: number;
  title: string;
  description?: string;
  image?: SanityImageSource;
  order?: number;
}

export interface DonationTier {
  _id: string;
  amount: number;
  usdEquivalent?: number;
  label: string;
  description?: string;
  emoji?: string;
  order?: number;
}
