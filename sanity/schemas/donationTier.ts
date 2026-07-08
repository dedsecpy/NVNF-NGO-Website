import { defineField, defineType } from "sanity";

export const donationTier = defineType({
  name: "donationTier",
  title: "Donation Tier",
  type: "document",
  fields: [
    defineField({ name: "amount", title: "Amount (NPR)", type: "number", validation: (r) => r.required() }),
    defineField({ name: "usdEquivalent", title: "USD Equivalent", type: "number" }),
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "string" }),
    defineField({ name: "emoji", title: "Emoji", type: "string" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Amount", name: "amountAsc", by: [{ field: "amount", direction: "asc" }] }],
});
