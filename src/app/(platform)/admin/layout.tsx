import type { ReactNode } from "react";
import { AppShell } from "@/platform/components/shell/app-shell";
import { ADMIN_NAV } from "@/platform/components/shell/nav-config";
import { getAdminSession } from "@/platform/lib/session";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { user } = await getAdminSession();
  return (
    <AppShell brand="Propul'SEO" badge="Plateforme" items={ADMIN_NAV} user={user} space="admin">
      {children}
    </AppShell>
  );
}
