import type { Metadata } from "next";
import { UploadList } from "@/platform/components/portal/upload-list";
import { PageHeader } from "@/platform/components/ui/page-header";
import { listClientFiles } from "@/platform/data";
import { FILE_REQUIREMENTS } from "@/platform/lib/constants";
import { getClientSession } from "@/platform/lib/session";
import type { ClientFile } from "@/platform/types";

export const metadata: Metadata = { title: "Mes pièces" };

export default async function PortalPieces() {
  const { mission, org } = await getClientSession();
  let files = await listClientFiles(mission.id);

  // Repli : si aucune pièce enregistrée, on présente la checklist standard (toutes attendues).
  if (files.length === 0) {
    files = FILE_REQUIREMENTS.map((r, i) => ({
      id: `req-${i}`,
      orgId: org.id,
      missionId: mission.id,
      kind: r.kind,
      label: r.label,
      hint: r.hint,
      status: "requested",
    })) satisfies ClientFile[];
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Documents"
        title="Mes pièces à fournir"
        description="Déposez les documents nécessaires à la création de votre société. Vous êtes guidé·e à chaque étape."
      />
      <UploadList initial={files} />
    </div>
  );
}
