import { Plus } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { LeadsExplorer } from "@/platform/components/leads/leads-explorer";
import { PageHeader } from "@/platform/components/ui/page-header";
import { listLeads } from "@/platform/data";
import { getConsultantSession } from "@/platform/lib/session";

export const metadata: Metadata = { title: "Leads" };

export default async function LeadsPage() {
  const { org } = await getConsultantSession();
  const leads = await listLeads(org.id);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="CRM"
        title="Leads"
        description="Toutes les demandes entrantes, formulaire, outils gratuits, Calendly et réseau. La source détermine l'attribution."
        actions={
          <Button variant="primary" size="sm">
            <Plus className="h-4 w-4" />
            Nouveau lead
          </Button>
        }
      />
      <LeadsExplorer leads={leads} />
    </div>
  );
}
