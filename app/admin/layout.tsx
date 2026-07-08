import { AdminProviders } from "@/components/admin/AdminProviders";

export const metadata = {
  title: "Admin | NVNF",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminProviders>{children}</AdminProviders>;
}
