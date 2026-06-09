import type { ReactNode } from "react";
import { AppShell } from "@/platform/components/shell/app-shell";
import { CONSULTANT_NAV } from "@/platform/components/shell/nav-config";
import { getConsultantSession } from "@/platform/lib/session";

export default async function ConsultantLayout({ children }: { children: ReactNode }) {
  const { user, org } = await getConsultantSession();
  return (
    <AppShell
      brand={org.brandName}
      badge="Espace consultant"
      items={CONSULTANT_NAV}
      user={user}
      space="app"
    >
      {children}
    </AppShell>
  );
}
