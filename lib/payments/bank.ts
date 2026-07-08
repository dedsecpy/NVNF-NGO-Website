/** Bank transfer / QR payment details — replace QR image in public/ngo/payment/ */

export const bankPayment = {
  qrImage: process.env.NEXT_PUBLIC_BANK_QR_IMAGE ?? "/ngo/payment/bank-qr.svg",
  accountName: "New Vision Nepal Foundation",
  bankName: process.env.NEXT_PUBLIC_BANK_NAME ?? "Nepal Bank Ltd.",
  accountNumber: process.env.NEXT_PUBLIC_BANK_ACCOUNT ?? "0123456789012345",
};

export type OnlinePaymentMethod = "esewa" | "khalti" | "card";
