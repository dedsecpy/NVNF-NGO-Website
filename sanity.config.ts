import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";
import { projectId, dataset } from "./sanity/env";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "new-vision-nepal",
  title: "New Vision Nepal Foundation",
  projectId: projectId || "placeholder",
  dataset,
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
});
