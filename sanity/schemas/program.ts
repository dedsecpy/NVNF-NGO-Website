import { defineField, defineType } from "sanity";

export const program = defineType({
  name: "program",
  title: "Program",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Program Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "icon", title: "Icon (emoji)", type: "string" }),
    defineField({ name: "description", title: "Short Description", type: "text" }),
    defineField({ name: "stat", title: "Key Stat", type: "string" }),
    defineField({ name: "image", title: "Featured Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "body",
      title: "Full Content",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
  ],
});
