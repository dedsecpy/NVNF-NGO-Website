import { defineField, defineType } from "sanity";

export const problem = defineType({
  name: "problem",
  title: "Problem",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "stat", title: "Bold Stat", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", validation: (r) => r.required() }),
    defineField({
      name: "severity",
      title: "Severity (0-100)",
      type: "number",
      validation: (r) => r.required().min(0).max(100),
    }),
    defineField({ name: "severityLabel", title: "Severity Label", type: "string" }),
    defineField({ name: "image", title: "Background Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
