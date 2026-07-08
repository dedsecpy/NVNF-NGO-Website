"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { DonationModal } from "@/components/donate/DonationModal";

interface DonationContextValue {
  openDonation: () => void;
  closeDonation: () => void;
  isOpen: boolean;
}

const DonationContext = createContext<DonationContextValue | null>(null);

export function DonationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDonation = useCallback(() => setIsOpen(true), []);
  const closeDonation = useCallback(() => setIsOpen(false), []);

  return (
    <DonationContext.Provider value={{ openDonation, closeDonation, isOpen }}>
      {children}
      <DonationModal isOpen={isOpen} onClose={closeDonation} />
    </DonationContext.Provider>
  );
}

export function useDonation() {
  const ctx = useContext(DonationContext);
  if (!ctx) {
    throw new Error("useDonation must be used within DonationProvider");
  }
  return ctx;
}
