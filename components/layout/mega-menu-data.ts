export interface MegaMenuLink {
  label: string;
  href: string;
}

export interface MegaMenuColumn {
  title?: string;
  links: MegaMenuLink[];
}

export interface MegaMenuItem {
  id: string;
  label: string;
  href: string;
  columns: MegaMenuColumn[];
  featured: {
    title: string;
    description: string;
    cta: string;
    href: string;
    imageKey: "megaMenuFeatured";
  };
}

export const megaMenus: MegaMenuItem[] = [
  {
    id: "support",
    label: "Support us",
    href: "/get-involved",
    columns: [
      {
        links: [
          { label: "Donate once", href: "/get-involved" },
          { label: "Monthly giving", href: "/get-involved" },
          { label: "Corporate partnerships", href: "/contact" },
          { label: "Fundraise for us", href: "/get-involved" },
        ],
      },
      {
        title: "Ways to give",
        links: [
          { label: "Emergency appeals", href: "/get-involved" },
          { label: "Sponsor a programme", href: "/work/women-empowerment" },
          { label: "Leave a legacy", href: "/contact" },
          { label: "In-kind donations", href: "/contact" },
        ],
      },
    ],
    featured: {
      title: "Give where need is greatest",
      description:
        "Your gift reaches families across Sarlahi — health sessions, women's workshops, and drug awareness programmes delivered village by village.",
      cta: "DONATE NOW",
      href: "/get-involved",
      imageKey: "megaMenuFeatured",
    },
  },
  {
    id: "work",
    label: "What we do",
    href: "/work",
    columns: [
      {
        links: [{ label: "Our programs", href: "/work" }],
      },
      {
        title: "Focus areas",
        links: [
          { label: "Women empowerment", href: "/work/women-empowerment" },
          { label: "Drug rehabilitation", href: "/work/drug-rehabilitation" },
          { label: "Health awareness", href: "/work/health-awareness" },
          { label: "Community outreach", href: "/work/community-outreach" },
        ],
      },
      {
        title: "Learn more",
        links: [
          { label: "The problems we solve", href: "/problems" },
          { label: "Our impact", href: "/impact" },
          { label: "Photo gallery", href: "/gallery" },
        ],
      },
    ],
    featured: {
      title: "What we do",
      description:
        "From women empowerment to drug rehabilitation and health awareness, we work alongside Sarlahi communities for lasting change.",
      cta: "LEARN ABOUT OUR WORK",
      href: "/work",
      imageKey: "megaMenuFeatured",
    },
  },
  {
    id: "about",
    label: "About us",
    href: "/about",
    columns: [
      {
        links: [
          { label: "People & culture", href: "/about" },
          { label: "Our people", href: "/about#team" },
          { label: "What sets us apart", href: "/about" },
          { label: "Join our team", href: "/contact" },
        ],
      },
      {
        title: "NVNF",
        links: [
          { label: "Who we are", href: "/about" },
          { label: "Leadership team", href: "/about#team" },
          { label: "Our journey", href: "/about#timeline" },
        ],
      },
      {
        title: "How we operate",
        links: [
          { label: "Annual reports", href: "/impact" },
          { label: "How your money is used", href: "/impact" },
          { label: "Our governance", href: "/about" },
          { label: "Contact us", href: "/contact" },
        ],
      },
    ],
    featured: {
      title: "Discover your purpose",
      description:
        "Do you want a career driven by purpose and passion? Be part of something bigger at New Vision Nepal Foundation.",
      cta: "JOIN US",
      href: "/contact",
      imageKey: "megaMenuFeatured",
    },
  },
  {
    id: "news",
    label: "Stories & news",
    href: "/news",
    columns: [
      {
        title: "Stories",
        links: [{ label: "Latest stories", href: "/news" }],
      },
      {
        title: "Media hub",
        links: [
          { label: "News & media centre", href: "/news" },
          { label: "Press releases", href: "/news" },
          { label: "Our statements", href: "/news" },
        ],
      },
      {
        title: "Publications",
        links: [
          { label: "Annual reports", href: "/impact" },
          { label: "Impact stories", href: "/impact" },
          { label: "Policy briefs", href: "/news" },
        ],
      },
    ],
    featured: {
      title: "Stories",
      description:
        "Explore inspiring stories from Sassapur, Laxmipur, and villages across Sarlahi where NVNF programmes are making a difference.",
      cta: "READ OUR STORIES",
      href: "/news",
      imageKey: "megaMenuFeatured",
    },
  },
];
