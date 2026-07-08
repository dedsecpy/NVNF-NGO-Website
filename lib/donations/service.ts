import {
  getLocalDonationById,
  getLocalDonationByPidx,
  insertLocalDonation,
  updateLocalDonationPayment,
  type LocalDonation,
} from "@/lib/data/local-store";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/client";

export interface CreateDonationInput {
  amount_npr: number;
  amount_usd?: number;
  frequency: "one_time" | "monthly";
  donor_name?: string;
  donor_email?: string;
  payment_method?: "esewa" | "khalti" | "card";
}

export interface DonationRecord {
  id: string;
  amount_npr: number;
  amount_usd: number | null;
  frequency: "one_time" | "monthly";
  status: string;
  donor_name: string | null;
  donor_email: string | null;
  payment_method: "esewa" | "khalti" | "card" | null;
  created_at: string;
  pidx?: string | null;
  transaction_id?: string | null;
  payment_provider?: "khalti" | "sandbox" | null;
}

function mapLocal(donation: LocalDonation): DonationRecord {
  return donation;
}

export async function createPendingDonation(
  input: CreateDonationInput
): Promise<DonationRecord> {
  if (isSupabaseConfigured) {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("donations")
      .insert({
        amount_npr: input.amount_npr,
        amount_usd: input.amount_usd,
        frequency: input.frequency,
        donor_email: input.donor_email,
        status: "pending",
      })
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return data as DonationRecord;
  }

  return mapLocal(await insertLocalDonation(input));
}

export async function getDonationById(id: string): Promise<DonationRecord | null> {
  if (isSupabaseConfigured) {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("donations")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error || !data) return null;
    return data as DonationRecord;
  }

  const donation = await getLocalDonationById(id);
  return donation ? mapLocal(donation) : null;
}

export async function getDonationByPidx(pidx: string): Promise<DonationRecord | null> {
  if (isSupabaseConfigured) {
    return null;
  }
  const donation = await getLocalDonationByPidx(pidx);
  return donation ? mapLocal(donation) : null;
}

export async function attachPaymentSession(
  id: string,
  data: {
    pidx: string;
    payment_provider: "khalti" | "sandbox";
  }
): Promise<DonationRecord | null> {
  if (isSupabaseConfigured) {
    return getDonationById(id);
  }

  const updated = await updateLocalDonationPayment(id, data);
  return updated ? mapLocal(updated) : null;
}

export async function markDonationPaid(
  id: string,
  data: {
    status: string;
    transaction_id?: string | null;
    pidx?: string;
  }
): Promise<DonationRecord | null> {
  if (isSupabaseConfigured) {
    const supabase = getSupabaseAdmin();
    const { data: row, error } = await supabase
      .from("donations")
      .update({
        status: data.status,
      })
      .eq("id", id)
      .select("*")
      .single();
    if (error || !row) return null;
    return row as DonationRecord;
  }

  const updated = await updateLocalDonationPayment(id, {
    status: data.status,
    transaction_id: data.transaction_id,
    pidx: data.pidx,
  });
  return updated ? mapLocal(updated) : null;
}
