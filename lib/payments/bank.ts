/** Bank transfer / QR payment details — replace QR image in public/ngo/payment/ */

export const bankPayment = {
  qrImage: process.env.NEXT_PUBLIC_BANK_QR_IMAGE ?? "/ngo/payment/bank-qr.svg",
  accountName: "New Vision Nepal Foundation",
  bankName: process.env.NEXT_PUBLIC_BANK_NAME ?? "Nepal Bank Limited",
  branch: "Balbas Branch",
  accountType: "Current Account (NPR)",
  accountNumber: process.env.NEXT_PUBLIC_BANK_ACCOUNT ?? "10900106412975000001",
};

export type OnlinePaymentMethod = "esewa" | "khalti" | "card";
