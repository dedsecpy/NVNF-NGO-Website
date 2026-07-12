import type {
  SiteSettings,
  Problem,
  Program,
  NewsPost,
  GalleryItem,
  TeamMember,
  TimelineEvent,
  DonationTier,
} from "./types";
import {
  siteSettingsQuery,
  problemsQuery,
  programsQuery,
  programBySlugQuery,
  programSlugsQuery,
  newsPostsQuery,
  newsPostBySlugQuery,
  newsSlugsQuery,
  galleryItemsQuery,
  teamMembersQuery,
  timelineEventsQuery,
  donationTiersQuery,
} from "./queries";
import { sanityFetch } from "./client";
import { getCmsData } from "@/lib/data/cms-store";
import { isSanityConfigured } from "@/sanity/env";
import {
  getVillageGalleryImageSrc,
  ngoMedia,
  villageGalleryManifest,
} from "@/lib/content/ngo-media";

const fallbackSiteSettings: SiteSettings = {
  _id: "fallback",
  title: "New Vision Nepal Foundation",
  description:
    "Grassroots NGO in Sarlahi, Nepal — empowering communities through education, health awareness, women empowerment, and drug rehabilitation since 2072 B.S.",
  heroVideoUrl: "",
  heroHeadline: "Stand With Sarlahi's Vulnerable Communities",
  heroSubheadline:
    "Your support helps protect children, empower women, and restore dignity across Ishwarpur and surrounding villages.",
  livesImpacted: 15500,
  districtsServed: 5,
  foundedYear: 2015,
  registrationNumber: "Registered NGO, Sarlahi",
  email: "newvisionnepalfoundation@gmail.com",
  phone: "9840040150",
  address: "Ishworpur-06, Sarlahi, Nepal 45802",
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
};

const fallbackProblems: Problem[] = [
  {
    _id: "p1",
    title: "Drug Abuse",
    stat: "Growing substance abuse among youth in Madhesh",
    description:
      "In Sarlahi's villages, addiction destroys families faster than poverty itself. NVNF runs street dramas, counseling, and rehabilitation support under Nepal's drug laws.",
    severity: 85,
    severityLabel: "of at-risk youth lack access to rehab services",
    order: 1,
  },
  {
    _id: "p2",
    title: "Limited Health Access",
    stat: "Many villages rely on distant health posts",
    description:
      "Families in Rajghat, Sekhauna, and remote wards walk hours to reach basic care. We bring health awareness and connect communities to local health posts.",
    severity: 78,
    severityLabel: "of rural wards lack adequate clinic access",
    order: 2,
  },
  {
    _id: "p3",
    title: "Women's Inequality",
    stat: "Women lack equal education and economic opportunity",
    description:
      "In communities like Laxmipur and Sasapur, women are often excluded from decision-making. Our empowerment programs build skills, confidence, and leadership.",
    severity: 72,
    severityLabel: "of women in target wards lack livelihood training",
    order: 3,
  },
  {
    _id: "p4",
    title: "Rural Poverty",
    stat: "Persistent poverty across Sarlahi's villages",
    description:
      "In 25 documented villages, families struggle with income, education, and basic services. NVNF works village by village for lasting change.",
    severity: 80,
    severityLabel: "of households live below the poverty line",
    order: 4,
  },
];

const fallbackPrograms: Program[] = [
  {
    _id: "pr1",
    name: "Women Empowerment",
    slug: { current: "women-empowerment" },
    description:
      "Empowering Nepali women through education, skill development, and equal opportunities in Sarlahi communities.",
    stat: "18,500 women reached · Goal 32,000",
  },
  {
    _id: "pr2",
    name: "Drug Rehabilitation Act",
    slug: { current: "drug-rehabilitation" },
    description:
      "Care, counseling, and recovery support for drug-affected individuals — including community street dramas (सदक नाटक) on substance abuse.",
    stat: "17 rehabilitated · Goal 500",
  },
  {
    _id: "pr3",
    name: "Health Awareness",
    slug: { current: "health-awareness" },
    description:
      "Raising awareness on child health, vaccination, and maternal care — from Sassapur to health posts across Sarlahi.",
    stat: "Rs 84,600 raised · Goal Rs 100,000",
  },
  {
    _id: "pr4",
    name: "Community Field Outreach",
    slug: { current: "community-outreach" },
    description:
      "Documented programs across 25 villages in Sarlahi — health post visits, community meetings, and grassroots development since 2018.",
    stat: "25 villages served",
  },
];

const fallbackNews: NewsPost[] = [
  {
    _id: "n5",
    title: "Sonam Village Drug Rehabilitation Campaign",
    slug: { current: "sonam-village-drug-rehabilitation" },
    author: "NVNF Rehabilitation Team",
    publishedAt: "2026-07-12T00:00:00Z",
    excerpt:
      "Community street drama and awareness sessions in Sonam Village — educating families on substance abuse prevention and connecting at-risk youth to rehabilitation support.",
  },
  {
    _id: "n1",
    title: "Children Health Awareness in Sassapur",
    slug: { current: "child-health-sassapur" },
    author: "NVNF Health Team",
    publishedAt: "2022-10-15T00:00:00Z",
    excerpt:
      "Raising children's health awareness in Sassapur through interactive workshops, maternal-child education, and community health volunteers.",
  },
  {
    _id: "n2",
    title: "Women Empowerment Programme",
    slug: { current: "women-empowerment-programme" },
    author: "NVNF Programmes",
    publishedAt: "2024-07-20T00:00:00Z",
    excerpt:
      "Skill development and leadership training for women in Laxmipur and surrounding communities — building economic independence.",
  },
  {
    _id: "n3",
    title: "Drug Abuse Awareness Street Drama",
    slug: { current: "drug-abuse-street-drama" },
    author: "NVNF Awareness Team",
    publishedAt: "2022-03-26T00:00:00Z",
    excerpt:
      "Lagu aushad सदक नाटक performances reached schools and village squares in Mahottari District, Samsi Village Municipality, educating youth on substance abuse prevention.",
  },
  {
    _id: "n4",
    title: "Vaccination Education Campaign",
    slug: { current: "vaccination-education" },
    author: "NVNF Health Team",
    publishedAt: "2024-01-12T00:00:00Z",
    excerpt:
      "Community sessions on vaccination importance, reaching families who previously lacked accurate health information.",
  },
];

const fallbackGallery: GalleryItem[] = [
  ...villageGalleryManifest.map((v) => ({
    _id: v.id,
    title: `${v.title} — Field Visit`,
    category: "photo" as const,
    imageSrc: getVillageGalleryImageSrc(v),
    date: "2018-04-01",
  })),
  {
    _id: "g-drama-1",
    title: "Drug Awareness Street Drama",
    category: "photo",
    imageSrc: ngoMedia.drama.streetPlay1,
    date: "2022-03-24",
  },
  {
    _id: "g-drama-2",
    title: "Community Awareness Session",
    category: "photo",
    imageSrc: ngoMedia.drama.streetPlay2,
    date: "2022-03-24",
  },
  {
    _id: "g-drama-3",
    title: "Youth Drug Prevention Programme",
    category: "photo",
    imageSrc: ngoMedia.drama.streetPlay3,
    date: "2022-03-26",
  },
  {
    _id: "g-laxmipur",
    title: "Laxmipur Community Meeting",
    category: "photo",
    imageSrc: ngoMedia.hero.laxmipur,
    date: "2017-06-28",
  },
  {
    _id: "g-salempur",
    title: "Salempur Team Photo",
    category: "photo",
    imageSrc: ngoMedia.hero.salempur,
    date: "2017-07-02",
  },
];

const fallbackTeam: TeamMember[] = [
  {
    _id: "t1",
    name: "Susmita Giri",
    role: "Chairperson",
    bio: "Founding chairperson since 2072 B.S. Leading women's empowerment and community development across Sarlahi.",
    order: 1,
  },
  {
    _id: "t2",
    name: "Nagina Devi Mahara",
    role: "Vice-Chairperson",
    bio: "Ishwarpur-2, Sarlahi. Supports program coordination and community outreach.",
    order: 2,
  },
  {
    _id: "t3",
    name: "Vishnu Narayan Chaudhary",
    role: "Secretary",
    bio: "Ishwarpur-2, Sarlahi. Manages organizational records and field program administration.",
    order: 3,
  },
  {
    _id: "t4",
    name: "Tej Kumari",
    role: "Treasurer",
    bio: "Shankarpur-9, Sarlahi. Oversees financial transparency and social audit compliance.",
    order: 4,
  },
  {
    _id: "t5",
    name: "Bindeshwar Ram",
    role: "Joint Secretary",
    bio: "Ishwarpur-2, Sarlahi. Coordinates volunteer activities and local partnerships.",
    order: 5,
  },
  {
    _id: "t7",
    name: "Madhav Pr. Bhattarai",
    role: "Board Member",
    bio: "Raniganj-2. Advises on education and rural development initiatives.",
    order: 7,
  },
  {
    _id: "t8",
    name: "Purna Shankar Giri",
    role: "Board Member",
    bio: "Ishwarpur-2, Sarlahi. Leads drug awareness and rehabilitation advocacy.",
    order: 8,
  },
  {
    _id: "t9",
    name: "Saroj Thakur",
    role: "Board Member",
    bio: "Ishwarpur-2, Sarlahi. Supports health awareness and field program logistics.",
    order: 9,
  },
];

const fallbackTimeline: TimelineEvent[] = [
  {
    _id: "tl1",
    year: 2015,
    title: "Foundation Established (2072 B.S.)",
    description: "New Vision Nepal Foundation registered in Ishwarpur, Sarlahi.",
    order: 1,
  },
  {
    _id: "tl2",
    year: 2017,
    title: "Naya Dristi Nepal Field Work",
    description: "Community programs in Laxmipur, Salempur, and Sasapur Lalbandi.",
    order: 2,
  },
  {
    _id: "tl3",
    year: 2018,
    title: "25-Village Documentation",
    description: "Systematic field visits and photo documentation across Sarlahi.",
    order: 3,
  },
  {
    _id: "tl4",
    year: 2022,
    title: "Drug Awareness Street Drama",
    description:
      "Lagu aushad सदक नाटक performances in Mahottari District, Samsi Village Municipality.",
    order: 4,
  },
  {
    _id: "tl5",
    year: 2024,
    title: "15,500+ Lives Changed",
    description: "Reached milestone in women empowerment, health, and rehabilitation programs.",
    order: 5,
  },
];

const fallbackDonationTiers: DonationTier[] = [
  {
    _id: "d1",
    amount: 500,
    usdEquivalent: 3.75,
    label: "Health awareness materials",
    description: "Supplies for a village health session",
    order: 1,
  },
  {
    _id: "d2",
    amount: 2000,
    usdEquivalent: 15,
    label: "Women's skill workshop",
    description: "Training materials for one empowerment session",
    order: 2,
  },
  {
    _id: "d3",
    amount: 5000,
    usdEquivalent: 37.5,
    label: "Street drama performance",
    description: "Fund one drug awareness सदक नाटक event",
    order: 3,
  },
  {
    _id: "d4",
    amount: 25000,
    usdEquivalent: 187.5,
    label: "Village outreach programme",
    description: "Full field visit to a Sarlahi village",
    order: 4,
  },
];

async function fetchWithFallback<T>(query: string, fallback: T, params?: Record<string, string>): Promise<T> {
  try {
    return await sanityFetch<T>({ query, params });
  } catch {
    return fallback;
  }
}

async function withCmsSiteSettings(base: SiteSettings): Promise<SiteSettings> {
  if (isSanityConfigured) return base;
  const cms = await getCmsData();
  return { ...base, ...cms.siteSettings };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const base = await fetchWithFallback(siteSettingsQuery, fallbackSiteSettings);
  return withCmsSiteSettings(base);
}

export async function getProblems(): Promise<Problem[]> {
  return fetchWithFallback(problemsQuery, fallbackProblems);
}

export async function getPrograms(): Promise<Program[]> {
  return fetchWithFallback(programsQuery, fallbackPrograms);
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  const fallback = fallbackPrograms.find((p) => p.slug.current === slug) ?? null;
  return fetchWithFallback(programBySlugQuery, fallback, { slug });
}

export async function getProgramSlugs(): Promise<string[]> {
  try {
    const slugs = await sanityFetch<{ slug: string }[]>({ query: programSlugsQuery });
    return slugs.map((s) => s.slug);
  } catch {
    return fallbackPrograms.map((p) => p.slug.current);
  }
}

export async function getNewsPosts(): Promise<NewsPost[]> {
  return fetchWithFallback(newsPostsQuery, fallbackNews);
}

export async function getNewsPostBySlug(slug: string): Promise<NewsPost | null> {
  const fallback = fallbackNews.find((n) => n.slug.current === slug) ?? null;
  return fetchWithFallback(newsPostBySlugQuery, fallback, { slug });
}

export async function getNewsSlugs(): Promise<string[]> {
  try {
    const slugs = await sanityFetch<{ slug: string }[]>({ query: newsSlugsQuery });
    return slugs.map((s) => s.slug);
  } catch {
    return fallbackNews.map((n) => n.slug.current);
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  return fetchWithFallback(galleryItemsQuery, fallbackGallery);
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return fetchWithFallback(teamMembersQuery, fallbackTeam);
}

export async function getTimelineEvents(): Promise<TimelineEvent[]> {
  return fetchWithFallback(timelineEventsQuery, fallbackTimeline);
}

export async function getDonationTiers(): Promise<DonationTier[]> {
  return fetchWithFallback(donationTiersQuery, fallbackDonationTiers);
}
