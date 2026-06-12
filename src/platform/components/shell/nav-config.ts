// Configuration de navigation (données sérialisables → passables à un client component).

export type IconKey =
  | "dashboard"
  | "leads"
  | "clients"
  | "missions"
  | "documents"
  | "site"
  | "settings"
  | "home"
  | "files";

export interface NavItem {
  label: string;
  href: string;
  icon: IconKey;
  /** match exact (sinon préfixe) */
  exact?: boolean;
}

export type SpaceKey = "app" | "portal";

export const CONSULTANT_NAV: NavItem[] = [
  { label: "Tableau de bord", href: "/app", icon: "dashboard", exact: true },
  { label: "Leads", href: "/app/leads", icon: "leads" },
  { label: "Clients", href: "/app/clients", icon: "clients" },
  { label: "Missions", href: "/app/missions", icon: "missions" },
  { label: "Documents", href: "/app/documents", icon: "documents" },
  { label: "Mon site", href: "/app/site", icon: "site" },
  { label: "Réglages", href: "/app/settings", icon: "settings" },
];

export const PORTAL_NAV: NavItem[] = [
  { label: "Mon dossier", href: "/portal", icon: "home", exact: true },
  { label: "Mes documents", href: "/portal/documents", icon: "documents" },
  { label: "Mes pièces", href: "/portal/pieces", icon: "files" },
];

export const SPACES: { key: SpaceKey; label: string; href: string; desc: string }[] = [
  {
    key: "app",
    label: "Consultant",
    href: "/app",
    desc: "Espace d'Audrey, CRM, missions, documents",
  },
  { key: "portal", label: "Client", href: "/portal", desc: "Portail du client final" },
];
