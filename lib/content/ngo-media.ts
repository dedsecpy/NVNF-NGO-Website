/** Local static assets copied from E:\NGO into public/ngo */

export const ngoMedia = {
  logo: "/ngo/logo.png",
  hero: {
    sasapur: "/ngo/hero/sasapur-lalbandi.jpg",
    laxmipur: "/ngo/hero/laxmipur.jpg",
    salempur: "/ngo/hero/salempur.jpg",
  },
  programs: {
    womenEmpowerment: "/ngo/programs/women-empowerment.jpg",
    drugRehabilitation: "/ngo/programs/drug-rehabilitation.jpg",
    healthAwareness: "/ngo/programs/health-awareness.jpg",
  },
  news: {
    sonamVillageDrugRehabilitation: "/ngo/news/sonam-village-drug-rehabilitation.jpg",
    childHealthSassapur: "/ngo/news/child-health-sassapur.jpg",
    womenEmpowerment: "/ngo/news/women-empowerment.jpg",
    drugDrama: "/ngo/news/drug-drama.jpg",
    vaccination: "/ngo/news/vaccination.jpg",
  },
  drama: {
    streetPlay1: "/ngo/drama/street-play-1.jpg",
    streetPlay2: "/ngo/drama/street-play-2.jpg",
    streetPlay3: "/ngo/drama/street-play-3.jpg",
  },
  team: {
    susmita: "/ngo/team/Susma.jpg",
    nagina: "/ngo/team/Nagina.jpg",
    bindeshwor: "/ngo/team/Bindeshwor.jpg",
    purna: "/ngo/team/Purna.jpg",
    tezKumari: "/ngo/team/Tez Kumari.jpg",
  },
} as const;

/** Gallery: one representative photo per Sarlahi village (Apr 2018 field documentation) */
export const villageGalleryManifest: {
  id: string;
  title: string;
  folder: string;
  file: string;
}[] = [
  { id: "g-atrauli", title: "Atrauli", folder: "atrauli", file: "IMG20180411141703.jpg" },
  { id: "g-barahatwa", title: "Barahatwa", folder: "barahatwa", file: "IMG_20180413_125642.jpg" },
  { id: "g-chhataul", title: "Chhataul", folder: "chhataul", file: "IMG20180408151539.jpg" },
  { id: "g-dhungrekholaa", title: "Dhungrekholaa", folder: "dhungrekholaa", file: "IMG20180408151654.jpg" },
  { id: "g-ghurkauli", title: "Ghurkauli", folder: "ghurkauli", file: "IMG20180409165921.jpg" },
  { id: "g-goiyahi", title: "Goiyahi Khoriyaa", folder: "goiyahi khoriyaa", file: "IMG20180409120628.jpg" },
  { id: "g-haripur", title: "Haripur", folder: "Haripur", file: "IMG20180417134022.jpg" },
  { id: "g-hempur", title: "Hempur", folder: "hempur", file: "IMG_20180425_142100.jpg" },
  { id: "g-jankinagar", title: "Jankinagar", folder: "Jankinagar", file: "IMG_20180405_113212.jpg" },
  { id: "g-karmaiyaa", title: "Karmaiyaa", folder: "karmaiyaa", file: "IMG_20180408_163233.jpg" },
  { id: "g-kisanpur", title: "Kisanpur", folder: "kisanpur", file: "IMG20180410133028.jpg" },
  { id: "g-mainathpur", title: "Mainathpur", folder: "mainathpur", file: "IMG20180408122536.jpg" },
  { id: "g-manpur", title: "Manpur", folder: "manpur", file: "IMG20180415115540.jpg" },
  { id: "g-mohanpur", title: "Mohanpur", folder: "mohanpur", file: "IMG20180413121522.jpg" },
  { id: "g-motipur", title: "Motipur", folder: "motipur", file: "IMG20180405143223.jpg" },
  { id: "g-musaili", title: "Musaili", folder: "Musaili", file: "FB_IMG_15252479989137384.jpg" },
  { id: "g-pattharko", title: "Pattharko", folder: "pattharko", file: "IMG20180423124901.jpg" },
  { id: "g-pipariya", title: "Pipariya", folder: "pipariya", file: "IMG20180407115802.jpg" },
  { id: "g-rajghat", title: "Rajghat Health Post", folder: "Rajghat", file: "IMG_20180405_142528.jpg" },
  { id: "g-ramban", title: "Ramban", folder: "ramban", file: "IMG20180410103903.jpg" },
  { id: "g-sahorwa", title: "Sahorwa", folder: "sahorwa", file: "IMG_20180406_123255.jpg" },
  { id: "g-solti", title: "Sankarpur Solti", folder: "sankarpur solti", file: "IMG_20180405_125138.jpg" },
  { id: "g-sekhauna", title: "Sekhauna Health Post", folder: "sekhauna healthpost", file: "IMG20180411121104.jpg" },
  { id: "g-sisausita", title: "Sisausita", folder: "sisausita", file: "IMG20180406_130656.jpg" },
  { id: "g-veli", title: "Veli", folder: "veli", file: "IMG20180412121700.jpg" },
];

export function villageGalleryImageSrc(folder: string, file: string): string {
  const segments = folder.split("/").map((s) => encodeURIComponent(s));
  return `/ngo/gallery/villages/${segments.join("/")}/${encodeURIComponent(file)}`;
}

export function getVillageGalleryImageSrc(item: (typeof villageGalleryManifest)[number]): string {
  return villageGalleryImageSrc(item.folder, item.file);
}
