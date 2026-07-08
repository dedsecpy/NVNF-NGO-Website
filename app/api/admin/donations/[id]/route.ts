import { z } from "zod";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/session";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase/client";
import { updateLocalDonationStatus } from "@/lib/data/local-store";

const statusSchema = z.object({
  status: z.enum(["pending", "completed", "failed"]),
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { status } = statusSchema.parse(body);

    if (isSupabaseConfigured) {
      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase
        .from("donations")
        .update({ status })
        .eq("id", params.id)
        .select("*")
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true, data });
    }

    const updated = await updateLocalDonationStatus(params.id, status);
    if (!updated) {
      return NextResponse.json({ error: "Donation not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
