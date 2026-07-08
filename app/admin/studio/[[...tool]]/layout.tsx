import Link from "next/link";
import { SignOutButton } from "@/components/admin/SignOutButton";

export const metadata = {
  title: "Content Studio | NVNF Admin",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-charcoal">
      <header className="flex h-11 shrink-0 items-center justify-between border-b border-white/10 px-4">
        <Link
          href="/admin"
          className="text-sm font-medium text-white/80 transition-colors hover:text-white"
        >
          ← Dashboard
        </Link>
        <p className="hidden text-sm text-white/50 sm:block">Content Studio</p>
        <SignOutButton variant="bar" />
      </header>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
