import { promises as fs } from "fs";
import { DATA_DIR, LOCAL_STORE_PATH } from "./paths";

export interface LocalDonation {
  id: string;
  amount_npr: number;
  amount_usd: number | null;
  frequency: "one_time" | "monthly";
  status: string;
  donor_name: string | null;
  donor_email: string | null;
  donor_message: string | null;
  payment_method: "esewa" | "khalti" | "card" | null;
  created_at: string;
  pidx?: string | null;
  transaction_id?: string | null;
  payment_provider?: "khalti" | "sandbox" | null;
}

export interface LocalContact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface LocalStoreFile {
  donations: LocalDonation[];
  contacts: LocalContact[];
}

const defaultStore: LocalStoreFile = {
  donations: [
    {
      id: "seed-donation-1",
      amount_npr: 5000,
      amount_usd: 38,
      frequency: "one_time",
      status: "pending",
      donor_name: null,
      donor_email: "supporter@example.com",
      donor_message: null,
      payment_method: "khalti",
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "seed-donation-2",
      amount_npr: 1000,
      amount_usd: null,
      frequency: "monthly",
      status: "completed",
      donor_name: null,
      donor_email: null,
      donor_message: null,
      payment_method: null,
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  contacts: [
    {
      id: "seed-contact-1",
      name: "Rita Sharma",
      email: "rita.sharma@example.com",
      message:
        "I would like to volunteer for the riverside flood relief campaign in Sarlahi. Please let me know how I can help.",
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
};

async function ensureStore(): Promise<LocalStoreFile> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(LOCAL_STORE_PATH, "utf8");
    return JSON.parse(raw) as LocalStoreFile;
  } catch {
    await fs.writeFile(LOCAL_STORE_PATH, JSON.stringify(defaultStore, null, 2), "utf8");
    return defaultStore;
  }
}

async function writeStore(store: LocalStoreFile): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(LOCAL_STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

export async function getLocalDonations(): Promise<LocalDonation[]> {
  const store = await ensureStore();
  return [...store.donations].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getLocalContacts(): Promise<LocalContact[]> {
  const store = await ensureStore();
  return [...store.contacts].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function insertLocalDonation(input: {
  amount_npr: number;
  amount_usd?: number;
  frequency: "one_time" | "monthly";
  donor_name?: string;
  donor_email?: string;
  donor_message?: string;
  payment_method?: "esewa" | "khalti" | "card";
}): Promise<LocalDonation> {
  const store = await ensureStore();
  const donation: LocalDonation = {
    id: crypto.randomUUID(),
    amount_npr: input.amount_npr,
    amount_usd: input.amount_usd ?? null,
    frequency: input.frequency,
    status: "pending",
    donor_name: input.donor_name ?? null,
    donor_email: input.donor_email ?? null,
    donor_message: input.donor_message ?? null,
    payment_method: input.payment_method ?? null,
    created_at: new Date().toISOString(),
  };
  store.donations.unshift(donation);
  await writeStore(store);
  return donation;
}

export async function insertLocalContact(input: {
  name: string;
  email: string;
  message: string;
}): Promise<LocalContact> {
  const store = await ensureStore();
  const contact: LocalContact = {
    id: crypto.randomUUID(),
    name: input.name,
    email: input.email,
    message: input.message,
    created_at: new Date().toISOString(),
  };
  store.contacts.unshift(contact);
  await writeStore(store);
  return contact;
}

export async function getLocalDonationById(id: string): Promise<LocalDonation | null> {
  const store = await ensureStore();
  return store.donations.find((d) => d.id === id) ?? null;
}

export async function getLocalDonationByPidx(pidx: string): Promise<LocalDonation | null> {
  const store = await ensureStore();
  return store.donations.find((d) => d.pidx === pidx) ?? null;
}

export async function updateLocalDonationPayment(
  id: string,
  data: {
    pidx?: string;
    status?: string;
    transaction_id?: string | null;
    payment_provider?: "khalti" | "sandbox";
  }
): Promise<LocalDonation | null> {
  const store = await ensureStore();
  const index = store.donations.findIndex((d) => d.id === id);
  if (index === -1) return null;
  store.donations[index] = { ...store.donations[index], ...data };
  await writeStore(store);
  return store.donations[index];
}

export async function updateLocalDonationStatus(
  id: string,
  status: string
): Promise<LocalDonation | null> {
  const store = await ensureStore();
  const index = store.donations.findIndex((d) => d.id === id);
  if (index === -1) return null;
  store.donations[index] = { ...store.donations[index], status };
  await writeStore(store);
  return store.donations[index];
}
