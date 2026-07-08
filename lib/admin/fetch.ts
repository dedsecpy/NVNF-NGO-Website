import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  getLocalContacts,
  getLocalDonations,
  type LocalContact,
  type LocalDonation,
} from "@/lib/data/local-store";

export type DonationRow = LocalDonation;
export type ContactRow = LocalContact;

export interface AdminStats {
  donationCount: number;
  totalNpr: number;
  pendingCount: number;
  contactCount: number;
  recentDonations: DonationRow[];
  recentContacts: ContactRow[];
  dataSource: "supabase" | "local";
}

export async function fetchDonations(): Promise<{ data: DonationRow[]; error?: string }> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase
        .from("donations")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);

      if (error) return { data: [], error: error.message };
      return { data: (data ?? []) as DonationRow[] };
    } catch {
      return { data: await getLocalDonations() };
    }
  }

  return { data: await getLocalDonations() };
}

export async function fetchContacts(): Promise<{ data: ContactRow[]; error?: string }> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);

      if (error) return { data: [], error: error.message };
      return { data: (data ?? []) as ContactRow[] };
    } catch {
      return { data: await getLocalContacts() };
    }
  }

  return { data: await getLocalContacts() };
}

export async function getAdminStats(): Promise<AdminStats> {
  const [donations, contacts] = await Promise.all([fetchDonations(), fetchContacts()]);

  const totalNpr = donations.data.reduce((sum, row) => sum + Number(row.amount_npr), 0);
  const pendingCount = donations.data.filter((row) => row.status === "pending").length;

  return {
    donationCount: donations.data.length,
    totalNpr,
    pendingCount,
    contactCount: contacts.data.length,
    recentDonations: donations.data.slice(0, 5),
    recentContacts: contacts.data.slice(0, 5),
    dataSource: isSupabaseConfigured ? "supabase" : "local",
  };
}
