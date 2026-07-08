import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Site Title", type: "string" }),
    defineField({ name: "description", title: "Site Description", type: "text" }),
    defineField({ name: "heroVideoUrl", title: "Hero Video URL", type: "url" }),
    defineField({ name: "heroImage", title: "Hero Fallback Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroHeadline", title: "Hero Headline", type: "string" }),
    defineField({ name: "heroSubheadline", title: "Hero Subheadline", type: "string" }),
    defineField({ name: "livesImpacted", title: "Lives Impacted", type: "number" }),
    defineField({ name: "districtsServed", title: "Districts Served", type: "number" }),
    defineField({ name: "foundedYear", title: "Founded Year", type: "number" }),
    defineField({ name: "aboutStory", title: "About Story", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "registrationNumber", title: "NGO Registration Number", type: "string" }),
    defineField({ name: "email", title: "Contact Email", type: "string" }),
    defineField({ name: "phone", title: "Contact Phone", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text" }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "facebook", type: "url", title: "Facebook" }),
        defineField({ name: "instagram", type: "url", title: "Instagram" }),
        defineField({ name: "twitter", type: "url", title: "Twitter" }),
      ],
    }),
  ],
});
