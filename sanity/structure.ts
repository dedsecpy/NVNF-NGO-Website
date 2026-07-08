import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      S.documentTypeListItem("program").title("Programs"),
      S.documentTypeListItem("problem").title("Problems / Pillars"),
      S.documentTypeListItem("newsPost").title("News & Stories"),
      S.documentTypeListItem("galleryItem").title("Gallery"),
      S.documentTypeListItem("teamMember").title("Team"),
      S.documentTypeListItem("timelineEvent").title("Timeline"),
      S.documentTypeListItem("donationTier").title("Donation Tiers"),
    ]);
