"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { siteImages } from "@/lib/images/site-images";
import { useMotion } from "@/hooks/useMotion";
import { formatUSD, nprToUsd } from "@/lib/utils";
import { bankPayment, type OnlinePaymentMethod } from "@/lib/payments/bank";
import { PaymentMethodLogo } from "@/components/donate/PaymentMethodLogo";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";

const PAYMENT_METHODS: { id: OnlinePaymentMethod; label: string }[] = [
  { id: "esewa", label: "eSewa" },
  { id: "khalti", label: "Khalti" },
  { id: "card", label: "Visa or Mastercard" },
];

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function BankTransferDetails({ className }: { className?: string }) {
  return (
    <div className={cn("text-center", className)}>
      <p className="text-sm font-medium text-charcoal">Or you can pay directly via QR</p>
      <div className="mx-auto mt-3 w-fit rounded-xl border border-charcoal/10 bg-white p-3 shadow-sm">
        <Image
          src={bankPayment.qrImage}
          alt="NVNF bank account QR code for direct transfer"
          width={160}
          height={160}
          className="h-32 w-32 object-contain sm:h-36 sm:w-36"
        />
      </div>
      <div className="mx-auto mt-3 rounded-lg bg-white/80 px-3 py-2 text-left text-xs text-charcoal/75">
        <p className="font-semibold text-charcoal">{bankPayment.accountName}</p>
        <p className="mt-1">
          <span className="font-medium text-charcoal/85">Bank:</span> {bankPayment.bankName}
        </p>
        <p>
          <span className="font-medium text-charcoal/85">Branch:</span> {bankPayment.branch}
        </p>
        <p>
          <span className="font-medium text-charcoal/85">A/C Type:</span> {bankPayment.accountType}
        </p>
        <p className="mt-0.5">
          <span className="font-medium text-charcoal/85">A/C No:</span> {bankPayment.accountNumber}
        </p>
      </div>
    </div>
  );
}

export function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [donorName, setDonorName] = useState("");
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<OnlinePaymentMethod>("khalti");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { transition, prefersReducedMotion } = useMotion();

  const activeAmount = parseInt(amount, 10) || 0;
  const usdAmount = nprToUsd(activeAmount);

  async function handleDonate() {
    if (!donorName.trim() || donorName.trim().length < 2) {
      setError("Please enter your name");
      return;
    }
    if (activeAmount < 100) {
      setError("Minimum donation is NPR 100");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/donations/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount_npr: activeAmount,
          amount_usd: usdAmount,
          donor_name: donorName.trim(),
          donor_email: email || undefined,
          donor_message: message.trim() || undefined,
          payment_method: paymentMethod,
        }),
      });

      const data = (await res.json()) as {
        error?: string;
        paymentUrl?: string;
      };

      if (!res.ok) {
        throw new Error(data.error ?? "Payment could not be started");
      }

      if (!data.paymentUrl) {
        throw new Error("No payment URL returned");
      }

      window.location.href = data.paymentUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  function handleClose() {
    onClose();
    setError("");
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Donation form"
          onClick={handleClose}
        >
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96, y: 20 }}
            transition={transition}
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/15 bg-white text-charcoal hover:bg-charcoal/5"
              aria-label="Close donation form"
            >
              ✕
            </button>

            <div className="flex w-full flex-col md:w-[42%]">
              <div className="relative h-48 shrink-0 md:h-56">
                <Image
                  src={siteImages.donationModal}
                  alt="Children supported by NVNF programs"
                  fill
                  className="object-cover grayscale"
                  sizes="400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h2 className="text-lg font-bold leading-tight md:text-xl">
                    Donate Where the Need is Greatest
                  </h2>
                  <p className="mt-1 text-xs text-white/85 md:text-sm">
                    Help NVNF reach families wherever the need is greatest across Nepal.
                  </p>
                </div>
              </div>
              <div className="bg-section-beige p-5 md:flex-1">
                <BankTransferDetails />
              </div>
            </div>

            <div className="flex w-full flex-1 flex-col overflow-y-auto p-6 md:p-8">
              <div className="space-y-4">
                <div>
                  <label htmlFor="donor-name" className="mb-1.5 block text-sm font-medium text-charcoal">
                    Your name
                  </label>
                  <input
                    id="donor-name"
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Full name"
                    className="w-full rounded-lg border border-charcoal/20 px-4 py-3 text-sm text-charcoal focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20"
                  />
                </div>

                <div>
                  <label htmlFor="donor-amount" className="mb-1.5 block text-sm font-medium text-charcoal">
                    Donation amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-charcoal/50">
                      NPR
                    </span>
                    <input
                      id="donor-amount"
                      type="number"
                      min={100}
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="1000"
                      className="w-full rounded-lg border border-charcoal/20 py-3 pl-14 pr-4 text-charcoal focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20"
                    />
                  </div>
                  {activeAmount > 0 && (
                    <p className="mt-1 text-xs text-charcoal/50">≈ {formatUSD(usdAmount)} USD</p>
                  )}
                </div>

                <div>
                  <label htmlFor="donor-email" className="mb-1.5 block text-sm font-medium text-charcoal">
                    Email <span className="font-normal text-charcoal/50">(optional)</span>
                  </label>
                  <input
                    id="donor-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-charcoal/20 px-4 py-3 text-sm text-charcoal focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20"
                  />
                </div>

                <div>
                  <label htmlFor="donor-message" className="mb-1.5 block text-sm font-medium text-charcoal">
                    Message <span className="font-normal text-charcoal/50">(optional)</span>
                  </label>
                  <Textarea
                    id="donor-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share why you're donating or a note for our team"
                    rows={2}
                    maxLength={500}
                    className="min-h-[4.5rem] py-2 text-sm"
                  />
                </div>

                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-charcoal">Payment method</legend>
                  <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Payment method">
                    {PAYMENT_METHODS.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        role="radio"
                        aria-checked={paymentMethod === method.id}
                        aria-label={method.label}
                        onClick={() => setPaymentMethod(method.id)}
                        className={cn(
                          "flex h-14 items-center justify-center rounded-xl border-2 px-1.5 transition-colors sm:h-16 sm:px-2",
                          paymentMethod === method.id
                            ? "border-navy-deep bg-white ring-2 ring-navy-deep/15"
                            : "border-charcoal/15 bg-white hover:border-navy-deep/40"
                        )}
                      >
                        <PaymentMethodLogo method={method.id} />
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-charcoal/50">
                    You&apos;ll complete payment securely via Khalti (supports eSewa, Khalti wallet, and cards).
                  </p>
                </fieldset>

                {error ? (
                  <p className="text-xs text-urgency" role="alert">
                    {error}
                  </p>
                ) : null}

                <button
                  type="button"
                  onClick={handleDonate}
                  disabled={loading}
                  className="w-full rounded-lg bg-sky py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-sky/90 disabled:opacity-60"
                >
                  {loading ? "Redirecting to payment…" : "Donate Now →"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
