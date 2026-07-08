import { z } from "zod";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/session";
import { getCmsData, saveCmsData } from "@/lib/data/cms-store";

const cmsSchema = z.object({
  siteSettings: z
    .object({
      title: z.string().min(1).optional(),
      description: z.string().optional(),
      heroHeadline: z.string().min(1).optional(),
      heroSubheadline: z.string().optional(),
      livesImpacted: z.number().min(0).optional(),
      districtsServed: z.number().min(0).optional(),
      foundedYear: z.number().min(1900).optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      address: z.string().optional(),
      registrationNumber: z.string().optional(),
    })
    .optional(),
  ticker: z
    .object({
      message: z.string().min(1),
      href: z.string().min(1),
      enabled: z.boolean(),
    })
    .optional(),
});

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cms = await getCmsData();
  return NextResponse.json(cms);
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = cmsSchema.parse(body);
    const current = await getCmsData();
    const saved = await saveCmsData({
      siteSettings: { ...current.siteSettings, ...parsed.siteSettings },
      ticker: { ...current.ticker, ...parsed.ticker },
    });

    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, data: saved });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
