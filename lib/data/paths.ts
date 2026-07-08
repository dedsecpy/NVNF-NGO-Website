import path from "path";

export const DATA_DIR = path.join(process.cwd(), "data");
export const LOCAL_STORE_PATH = path.join(DATA_DIR, "local-store.json");
export const CMS_PATH = path.join(DATA_DIR, "cms.json");
