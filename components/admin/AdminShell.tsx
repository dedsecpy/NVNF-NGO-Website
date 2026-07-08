"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@/components/admin/SignOutButton";

const baseNavItems = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/content", label: "Site content" },
  { href: "/admin/donations", label: "Donations" },
  { href: "/admin/contacts", label: "Messages" },
] as const;

const sanityNavItem = { href: "/admin/studio", label: "Sanity Studio" } as const;

function getNavItems() {
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return [...baseNavItems, sanityNavItem];
  }
  return baseNavItems;
}

function NavLink({
  href,
  label,
  exact,
}: {
  href: string;
  label: string;
  exact?: boolean;
}) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-saffron/20 text-saffron"
          : "text-white/70 hover:bg-white/10 hover:text-white"
      )}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-section-beige">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside
          className="shrink-0 border-b border-white/10 bg-charcoal lg:w-64 lg:border-b-0 lg:border-r"
          aria-label="Admin navigation"
        >
          <div className="flex items-center justify-between px-4 py-5 lg:block lg:px-5">
            <div>
              <p className="font-display text-lg font-bold text-white">NVNF Admin</p>
              <p className="text-xs text-white/50">New Vision Nepal Foundation</p>
            </div>
            <Link
              href="/"
              className="text-xs text-sky hover:underline lg:mt-3 lg:inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              View site ↗
            </Link>
          </div>

          <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-4 lg:pb-0">
            {getNavItems().map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>

          <div className="hidden border-t border-white/10 p-4 lg:block">
            <SignOutButton />
          </div>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-charcoal/10 bg-white px-4 py-3 lg:hidden">
            <p className="text-sm font-semibold text-charcoal">Admin</p>
            <SignOutButton variant="bar" className="!text-charcoal/70 hover:!bg-charcoal/5" />
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
