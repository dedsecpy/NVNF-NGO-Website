export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  _id, title, description, heroVideoUrl, heroImage, heroHeadline, heroSubheadline,
  livesImpacted, districtsServed, foundedYear, aboutStory, registrationNumber,
  email, phone, address, socialLinks
}`;

export const problemsQuery = `*[_type == "problem"] | order(order asc) {
  _id, title, stat, description, severity, severityLabel, image, order
}`;

export const programsQuery = `*[_type == "program"] | order(name asc) {
  _id, name, slug, icon, description, stat, image
}`;

export const programBySlugQuery = `*[_type == "program" && slug.current == $slug][0]{
  _id, name, slug, icon, description, stat, image, body
}`;

export const programSlugsQuery = `*[_type == "program"]{ "slug": slug.current }`;

export const newsPostsQuery = `*[_type == "newsPost"] | order(publishedAt desc) {
  _id, title, slug, author, publishedAt, excerpt, image
}`;

export const newsPostBySlugQuery = `*[_type == "newsPost" && slug.current == $slug][0]{
  _id, title, slug, author, publishedAt, excerpt, image, body
}`;

export const newsSlugsQuery = `*[_type == "newsPost"]{ "slug": slug.current }`;

export const galleryItemsQuery = `*[_type == "galleryItem"] | order(date desc) {
  _id, title, category, image, videoUrl, date
}`;

export const teamMembersQuery = `*[_type == "teamMember"] | order(order asc) {
  _id, name, role, bio, photo, order
}`;

export const timelineEventsQuery = `*[_type == "timelineEvent"] | order(year desc) {
  _id, year, title, description, image, order
}`;

export const donationTiersQuery = `*[_type == "donationTier"] | order(order asc) {
  _id, amount, usdEquivalent, label, description, emoji, order
}`;
