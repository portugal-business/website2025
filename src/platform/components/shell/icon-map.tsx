import {
  FileSignature,
  FileText,
  FolderUp,
  Gauge,
  Globe,
  Home,
  LayoutDashboard,
  Settings,
  Sparkles,
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
  site: Globe,
  settings: Settings,
  home: Home,
  files: FolderUp,
};

export const FALLBACK_ICON = Gauge;
