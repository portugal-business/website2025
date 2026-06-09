import {
  Banknote,
  Building2,
  FileSignature,
  FileText,
  FolderUp,
  Gauge,
  Home,
  LayoutDashboard,
  Settings,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import type { ComponentType } from "react";
import type { IconKey } from "./nav-config";

export const ICONS: Record<IconKey, ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  leads: Sparkles,
  clients: Users,
  missions: FileSignature,
  documents: FileText,
  settings: Settings,
  home: Home,
  files: FolderUp,
  orgs: Building2,
  billing: Banknote,
  attribution: Target,
};

export const FALLBACK_ICON = Gauge;
