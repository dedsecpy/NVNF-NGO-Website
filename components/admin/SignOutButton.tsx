"use client";

import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

interface SignOutButtonProps {
  className?: string;
  variant?: "sidebar" | "bar";
}

export function SignOutButton({ className, variant = "sidebar" }: SignOutButtonProps) {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className={cn(
        variant === "sidebar"
          ? "w-full rounded-lg px-3 py-2 text-left text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          : "rounded-md px-3 py-1.5 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white",
        className
      )}
      aria-label="Sign out of admin"
    >
      Sign out
    </button>
  );
}
