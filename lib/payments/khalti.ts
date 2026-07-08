import { getSiteUrl } from "./site-url";

const secretKey = process.env.KHALTI_SECRET_KEY ?? "";

export const isKhaltiConfigured = Boolean(secretKey);

export function getKhaltiApiBase(): string {
  const sandbox =
    process.env.KHALTI_SANDBOX === "true" ||
    secretKey.startsWith("test_") ||
    secretKey.startsWith("live_test_");

  return sandbox
    ? "https://dev.khalti.com/api/v2"
    : "https://khalti.com/api/v2";
}

export interface KhaltiInitiateParams {
  amountNpr: number;
  purchaseOrderId: string;
  purchaseOrderName: string;
  returnUrl: string;
  customerEmail?: string;
  customerName?: string;
}

interface KhaltiInitiateResult {
  pidx: string;
  paymentUrl: string;
  expiresIn: number;
}

export async function initiateKhaltiPayment(
  params: KhaltiInitiateParams
): Promise<KhaltiInitiateResult> {
  if (!isKhaltiConfigured) {
    throw new Error("KHALTI_NOT_CONFIGURED");
  }

  const response = await fetch(`${getKhaltiApiBase()}/epayment/initiate/`, {
    method: "POST",
    headers: {
      Authorization: `Key ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      return_url: params.returnUrl,
      website_url: getSiteUrl(),
      amount: Math.round(params.amountNpr * 100),
      purchase_order_id: params.purchaseOrderId,
      purchase_order_name: params.purchaseOrderName,
      customer_info: {
        name: params.customerName ?? "NVNF Donor",
        ...(params.customerEmail ? { email: params.customerEmail } : {}),
      },
    }),
    cache: "no-store",
  });

  const data = (await response.json()) as {
    pidx: string;
    payment_url: string;
    expires_in: number;
    detail?: string;
    error_key?: string;
  };

  if (!response.ok) {
    throw new Error(data.detail ?? data.error_key ?? "Khalti payment initiation failed");
  }

  return {
    pidx: data.pidx,
    paymentUrl: data.payment_url,
    expiresIn: data.expires_in,
  };
}

export interface KhaltiLookupResult {
  pidx: string;
  totalAmount: number;
  status: string;
  transactionId: string | null;
  fee: number;
}

export async function lookupKhaltiPayment(pidx: string): Promise<KhaltiLookupResult> {
  if (!isKhaltiConfigured) {
    throw new Error("KHALTI_NOT_CONFIGURED");
  }

  const response = await fetch(`${getKhaltiApiBase()}/epayment/lookup/`, {
    method: "POST",
    headers: {
      Authorization: `Key ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pidx }),
    cache: "no-store",
  });

  const data = (await response.json()) as {
    pidx: string;
    total_amount: number;
    status: string;
    transaction_id?: string;
    fee?: number;
    detail?: string;
  };

  if (!response.ok) {
    throw new Error(data.detail ?? "Khalti lookup failed");
  }

  return {
    pidx: data.pidx,
    totalAmount: data.total_amount,
    status: data.status,
    transactionId: data.transaction_id ?? null,
    fee: data.fee ?? 0,
  };
}

export function isKhaltiPaymentSuccessful(status: string): boolean {
  return status === "Completed";
}

export function isKhaltiPaymentFailed(status: string): boolean {
  return ["Canceled", "Cancelled", "Expired", "Failed", "User canceled"].includes(status);
}
