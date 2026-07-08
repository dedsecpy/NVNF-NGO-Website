import { ngoMedia } from "@/lib/content/ngo-media";

/** Homepage and section imagery — sourced from E:\\NGO field archives */

/** Local hero — instant load, no external network wait */
export const HERO_IMAGE_URL = "/ngo/hero/hero-home.jpg";

/** Warm gray blur matching the hero photograph */
export const HERO_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMH/8QAHBAAAgIDAQEAAAAAAAAAAAAAAQIABBEhMQUTUf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCfAB//2Q==";

export const siteImages = {
  heroEmergency: HERO_IMAGE_URL,
  missionCard1: ngoMedia.programs.womenEmpowerment,
  missionCard2: ngoMedia.programs.healthAwareness,
  missionCard3: ngoMedia.drama.streetPlay1,
  pillarWork: ngoMedia.programs.healthAwareness,
  pillarFundraising: ngoMedia.programs.womenEmpowerment,
  pillarAdvocacy: ngoMedia.news.drugDrama,
  emergencyChild: ngoMedia.news.childHealthSassapur,
  regularDonor: ngoMedia.hero.laxmipur,
  megaMenuFeatured: ngoMedia.hero.salempur,
  news1: ngoMedia.news.childHealthSassapur,
  news2: ngoMedia.news.womenEmpowerment,
  news3: ngoMedia.news.drugDrama,
  donationModal: HERO_IMAGE_URL,
} as const;
