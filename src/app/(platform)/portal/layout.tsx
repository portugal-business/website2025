import type { ReactNode } from "react";
import { AppShell } from "@/platform/components/shell/app-shell";
import { PORTAL_NAV } from "@/platform/components/shell/nav-config";
import { getClientSession } from "@/platform/lib/session";

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const { user, org } = await getClientSession();
  return (
    <AppShell
      brand={org.brandName}
      badge="Portail client"
      items={PORTAL_NAV}
      user={user}
      space="portal"
    >
      {children}
    </AppShell>
  );
}
