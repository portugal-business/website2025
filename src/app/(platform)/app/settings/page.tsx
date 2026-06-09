import { Banknote, Building2, Handshake } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/platform/components/ui/badge";
import { Card, CardBody, CardHeader } from "@/platform/components/ui/card";
import { Field, Input } from "@/platform/components/ui/field";
import { PageHeader } from "@/platform/components/ui/page-header";
import { PLAN } from "@/platform/lib/constants";
import { formatCents } from "@/platform/lib/format";
import { getConsultantSession } from "@/platform/lib/session";

export const metadata: Metadata = { title: "Réglages" };

const SERVICES = [
  { name: "Création de société", price: "Sur devis (après échange gratuit)" },
  { name: "Domiciliation", price: "~ 500 € HT / an (mise en relation)" },
  { name: "Comptabilité", price: "~ 200-250 € / mois (via partenaire)" },
];

const PARTNERS = [
  { name: "Raly Conseils", role: "Comptabilité (Contabilista Certificado)" },
  { name: "Joongle", role: "Comptabilité (partenaire secondaire)" },
  { name: "Millennium", role: "Banque (ouverture de compte pro)" },
];

export default async function SettingsPage() {
  const { org } = await getConsultantSession();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Configuration"
        title="Réglages"
        description="Informations de l'organisation, services, partenaires et abonnement."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Organisation */}
        <Card>
          <CardHeader title="Organisation" description="Vos informations légales" />
          <CardBody className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Marque">
                <Input defaultValue={org.brandName} />
              </Field>
              <Field label="Raison sociale">
                <Input defaultValue={org.name} />
              </Field>
              <Field label="NIF / NIPC">
                <Input defaultValue={org.vatId} />
              </Field>
              <Field label="Localisation">
                <Input defaultValue={org.location} />
              </Field>
            </div>
            <Button variant="outline" size="sm">
              <Building2 className="h-4 w-4" /> Enregistrer
            </Button>
          </CardBody>
        </Card>

        {/* Abonnement */}
        <Card>
          <CardHeader title="Abonnement" description="Ce que vous réglez à Propul'SEO" />
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Formule</span>
              <Badge tone="accent">{PLAN[org.plan].label}</Badge>
            </div>
            <div className="flex items-center justify-between border-border border-t pt-3">
              <div>
                <div className="font-sans text-sm font-semibold text-foreground">
                  Abonnement mensuel
                </div>
                <div className="text-xs text-muted-foreground">Accès plateforme</div>
              </div>
              <span className="display text-xl text-foreground tnum">
                {formatCents(org.monthlyFeeCents)}
              </span>
            </div>
            <div className="flex items-center justify-between border-border border-t pt-3">
              <div>
                <div className="font-sans text-sm font-semibold text-foreground">
                  Par client signé
                </div>
                <div className="text-xs text-muted-foreground">
                  Lead inbound uniquement, à la signature
                </div>
              </div>
              <span className="display text-xl text-foreground tnum">
                {formatCents(org.perClientFeeCents)}
              </span>
            </div>
            <Button variant="outline" size="sm">
              <Banknote className="h-4 w-4" /> Gérer l'abonnement
            </Button>
          </CardBody>
        </Card>

        {/* Services */}
        <Card>
          <CardHeader
            title="Services & tarifs"
            description="Affichés sur devis, pas de grille publique"
          />
          <div className="divide-y divide-border">
            {SERVICES.map((s) => (
              <div key={s.name} className="flex items-center justify-between gap-3 px-5 py-3">
                <span className="font-sans text-sm font-semibold text-foreground">{s.name}</span>
                <span className="text-right text-xs text-muted-foreground">{s.price}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Partenaires */}
        <Card>
          <CardHeader
            title="Réseau de partenaires"
            description="Mise en relation, Audrey ne réalise pas ces prestations"
          />
          <div className="divide-y divide-border">
            {PARTNERS.map((p) => (
              <div key={p.name} className="flex items-center gap-3 px-5 py-3">
                <span className="grid h-8 w-8 flex-none place-items-center rounded-sm bg-muted text-muted-foreground">
                  <Handshake className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-sans text-sm font-semibold text-foreground">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.role}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <p className="text-xs text-muted-foreground">
        Audrey Marques est consultante en création et implantation, pas comptable, fiscaliste ni
        avocate. La comptabilité, la fiscalité et le juridique sont assurés par les partenaires.
      </p>
    </div>
  );
}
