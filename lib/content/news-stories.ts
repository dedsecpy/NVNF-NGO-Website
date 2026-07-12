import { ngoMedia } from "@/lib/content/ngo-media";

export interface NewsStorySection {
  heading: string;
  paragraphs: string[];
}

export interface NewsStory {
  when: string;
  where: string;
  what: string;
  how: string;
  impact?: string;
  sections: NewsStorySection[];
  gallery: { src: string; caption: string }[];
}

const sonamVillagePhotos = Array.from({ length: 10 }, (_, index) => ({
  src: `/ngo/news/sonam-village/photo-${index + 1}.jpg`,
  caption: `Sonam Village drug rehabilitation campaign — photo ${index + 1}`,
}));

export const newsStories: Record<string, NewsStory> = {
  "sonam-village-drug-rehabilitation": {
    when: "July 2026 · Multi-day community outreach",
    where: "Sonam Village, Sarlahi, Madhesh Province",
    what:
      "A village-wide drug rehabilitation and substance abuse awareness campaign — combining street drama (लागु औषध सदक नाटक), open community meetings, and one-on-one conversations with families.",
    how:
      "NVNF's awareness team performed educational street plays in village squares and school grounds, used mobile banners and loudspeakers to reach every ward, and connected at-risk youth and families with counselling and legal rehabilitation pathways.",
    impact:
      "Hundreds of villagers reached across Sonam Village — youth, parents, and community leaders engaged in prevention and recovery conversations.",
    sections: [
      {
        heading: "Reaching every corner of the village",
        paragraphs: [
          "Substance abuse in rural Madhesh often goes unaddressed because families do not know where to turn for help. In Sonam Village, NVNF brought the conversation directly to the community — performing in open squares, gathering families under village trees, and walking ward to ward so no household was left out.",
          "The campaign was designed for maximum accessibility: performances in Nepali and local dialect, familiar settings, and storytelling that shows how addiction affects mothers, children, and entire households.",
        ],
      },
      {
        heading: "सदक नाटक — Street drama on substance abuse",
        paragraphs: [
          "Central to the campaign were Lagu aushad सदक नाटक performances — street plays using local actors and real-life scenarios to illustrate the path from experimentation to addiction, and from despair to recovery. Youth who watched often stayed after to ask questions.",
          "A mobile awareness unit carried banners and loudspeakers through the village, ensuring that even families who could not attend a central gathering still received information about prevention and where to seek rehabilitation support.",
        ],
      },
      {
        heading: "Community dialogue and follow-up",
        paragraphs: [
          "After each performance, NVNF facilitators held open discussions with parents, teachers, and village elders. Women and children formed the majority of attendees — reflecting who is most affected when addiction enters a household.",
          "Our team documented names of at-risk individuals and referred families to counselling resources and legal rehabilitation pathways available under Nepali law. Recovery is not a single event; NVNF follows up to ensure those who need help can access it.",
        ],
      },
    ],
    gallery: sonamVillagePhotos,
  },
};

export function getNewsStory(slug: string): NewsStory | undefined {
  return newsStories[slug];
}

export function getNewsStoryHeroImage(slug: string): string | undefined {
  if (slug === "sonam-village-drug-rehabilitation") {
    return ngoMedia.news.sonamVillageDrugRehabilitation;
  }
  return undefined;
}
