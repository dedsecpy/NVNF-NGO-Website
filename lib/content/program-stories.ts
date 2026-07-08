import { ngoMedia } from "@/lib/content/ngo-media";

export interface ProgramStorySection {
  heading: string;
  paragraphs: string[];
}

export interface ProgramStory {
  when: string;
  where: string;
  what: string;
  how: string;
  impact?: string;
  sections: ProgramStorySection[];
  extraImages?: { src: string; caption: string }[];
}

export const programStories: Record<string, ProgramStory> = {
  "women-empowerment": {
    when: "Ongoing since 2072 B.S. (2015) · Major sessions in Laxmipur, July 2024",
    where: "Laxmipur, Ishwarpur-06, and surrounding wards across Sarlahi, Madhesh Province",
    what:
      "Women's skill development, leadership training, and economic empowerment for rural women excluded from decision-making and livelihood opportunities.",
    how:
      "NVNF organises community group meetings, hands-on skill workshops, and mentorship circles led by local women leaders and board members including Chairperson Susmita Giri.",
    impact: "18,500+ women reached across Sarlahi · Goal: 32,000",
    sections: [
      {
        heading: "Why we started",
        paragraphs: [
          "In villages like Laxmipur and Sasapur, women carry the heaviest burden of household labour yet are often left out of community decisions and income-generating work. New Vision Nepal Foundation was founded in 2072 B.S. with women's empowerment at its core.",
          "Our programmes address this gap by creating safe spaces where women learn practical skills, build confidence, and take on leadership roles within their families and communities.",
        ],
      },
      {
        heading: "What happens in a typical session",
        paragraphs: [
          "Sessions begin with a community circle where women share challenges — from limited access to education to economic dependence. Trained facilitators then lead skill-building activities tailored to local needs, such as sewing, small business planning, and cooperative savings groups.",
          "Participants are encouraged to mentor one another. Many women who complete the programme go on to support new groups in neighbouring villages, creating a ripple effect across Sarlahi.",
        ],
      },
      {
        heading: "Looking ahead",
        paragraphs: [
          "We are expanding reach to additional wards in Ishwarpur and Shankarpur, with a goal of empowering 32,000 women. Your support funds training materials, facilitator travel to remote villages, and seed grants for women's cooperatives.",
        ],
      },
    ],
    extraImages: [
      { src: ngoMedia.hero.laxmipur, caption: "Community meeting in Laxmipur, 2017" },
      { src: ngoMedia.news.womenEmpowerment, caption: "Women's empowerment programme session" },
    ],
  },

  "health-awareness": {
    when: "Field documentation April 2018 · Child health sessions in Sassapur, October 2022 · Ongoing",
    where:
      "Rajghat-6 Health Post, Sekhauna Health Post, Sassapur, and 25 documented villages across Sarlahi",
    what:
      "Raising awareness on child health, vaccination, maternal care, and connecting remote families to local health posts.",
    how:
      "NVNF teams conduct door-to-door visits, community health sessions at village chowks and health posts, and maternal-child education workshops with local health workers.",
    impact: "Rs 84,600 raised for health programmes · Goal: Rs 100,000",
    sections: [
      {
        heading: "Reaching villages without care",
        paragraphs: [
          "Many families in Sarlahi's rural wards walk hours to reach a health post. During our April 2018 field documentation, NVNF teams visited 25 villages — from Atrauli to Veli — photographing conditions and meeting community leaders to understand health access gaps.",
          "At Rajghat-6 and Sekhauna health posts, we work alongside local staff to bring accurate health information to families who previously relied on word-of-mouth or had no information at all.",
        ],
      },
      {
        heading: "Child health in Sassapur",
        paragraphs: [
          "In October 2022, our health team ran children's health awareness sessions in Sassapur. Through interactive workshops, mothers and caregivers learned about nutrition, hygiene, and when to seek medical help for their children.",
          "Community health volunteers were identified and trained to continue sharing information after our team left — ensuring the programme's impact lasts beyond a single visit.",
        ],
      },
      {
        heading: "Vaccination education",
        paragraphs: [
          "Misinformation about vaccination remains a barrier in remote Madhesh communities. NVNF runs dedicated education campaigns explaining the importance of immunisation, working with parents who may have previously declined vaccines due to fear or lack of accurate information.",
        ],
      },
    ],
    extraImages: [
      { src: ngoMedia.programs.healthAwareness, caption: "Health awareness at Rajghat Health Post" },
      { src: ngoMedia.news.childHealthSassapur, caption: "Children's health session, Sassapur" },
      { src: ngoMedia.news.vaccination, caption: "Vaccination education campaign" },
    ],
  },

  "drug-rehabilitation": {
    when: "Street drama performances 24–26 March 2022 · Advocacy ongoing since 2072 B.S.",
    where: "Schools, village squares, and public gatherings across Sarlahi district",
    what:
      "Drug abuse awareness and rehabilitation support — including community street dramas (लागु औषध सदक नाटक) and counselling for affected youth and families.",
    how:
      "NVNF performs educational street plays in schools and communities, provides counselling referrals, and advocates for recovery under Nepal's drug rehabilitation laws.",
    impact: "17 individuals rehabilitated · Goal: 500",
    sections: [
      {
        heading: "The crisis in Sarlahi",
        paragraphs: [
          "Substance abuse among youth in Madhesh is destroying families faster than poverty alone. In Sarlahi's villages, addiction often goes untreated because rehabilitation services are distant, expensive, or simply unknown to affected families.",
          "New Vision Nepal Foundation responds through prevention and recovery — meeting communities where they gather, in language they understand, through drama and direct conversation.",
        ],
      },
      {
        heading: "सदक नाटक — Street drama performances",
        paragraphs: [
          "From 24 to 26 March 2022, NVNF's awareness team performed Lagu aushad सदक नाटक (street plays on substance abuse) across schools and village squares in Sarlahi. These performances use local actors, familiar settings, and powerful storytelling to show how addiction affects families.",
          "Youth who watch the dramas often stay after to ask questions. Our team connects at-risk individuals and families with counselling resources and information about legal rehabilitation pathways available under Nepali law.",
        ],
      },
      {
        heading: "Recovery and follow-up",
        paragraphs: [
          "Rehabilitation is not a single event — it requires sustained support. NVNF board member Purna Shankar Giri leads advocacy in this area, and our team follows up with families after awareness events to ensure those who need help can access it.",
          "With greater funding, we aim to rehabilitate 500 individuals and expand street drama tours to every ward in Sarlahi.",
        ],
      },
    ],
    extraImages: [
      { src: ngoMedia.drama.streetPlay1, caption: "Drug awareness street drama, March 2022" },
      { src: ngoMedia.drama.streetPlay2, caption: "Community awareness session" },
      { src: ngoMedia.drama.streetPlay3, caption: "Youth drug prevention programme" },
      { src: ngoMedia.news.drugDrama, caption: "School performance, Sarlahi" },
    ],
  },

  "community-outreach": {
    when: "April 2018 (25-village documentation) · Field work since 2017",
    where:
      "25 villages across Sarlahi — Atrauli, Barahatwa, Rajghat, Sekhauna, Laxmipur, Salempur, and more",
    what:
      "Grassroots field visits documenting village conditions, holding community meetings, and building long-term relationships with local leaders.",
    how:
      "NVNF teams travel ward by ward, photograph field conditions, meet women's groups and village elders, and identify where health, empowerment, or rehabilitation programmes are most needed.",
    impact: "25 villages documented · 15,500+ lives changed since founding",
    sections: [
      {
        heading: "Naya Dristi field work, 2017",
        paragraphs: [
          "Before the systematic 2018 documentation, NVNF conducted early field work in communities including Laxmipur, Salempur, and Sasapur Lalbandi. These visits established trust with local families and shaped the foundation's long-term programme priorities.",
        ],
      },
      {
        heading: "25 villages, April 2018",
        paragraphs: [
          "In April 2018, NVNF undertook a comprehensive documentation project across 25 Sarlahi villages. Teams visited health posts, schools, and homes — creating a photographic record of rural life in Madhesh and identifying communities most in need of support.",
          "This documentation directly informs where we deploy health awareness, women's empowerment, and drug rehabilitation programmes today.",
        ],
      },
      {
        heading: "Village by village",
        paragraphs: [
          "Our approach is deliberately local. Rather than running programmes from a district office, NVNF goes to each village, listens first, and designs interventions with community input. This is how lasting change happens in Sarlahi.",
        ],
      },
    ],
    extraImages: [
      { src: ngoMedia.hero.sasapur, caption: "Sasapur Lalbandi field visit" },
      { src: ngoMedia.hero.salempur, caption: "Salempur team photo, 2017" },
      { src: ngoMedia.hero.laxmipur, caption: "Laxmipur community meeting" },
    ],
  },
};

export function getProgramStory(slug: string): ProgramStory | null {
  return programStories[slug] ?? null;
}
