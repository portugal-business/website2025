import { Bot, Calendar, Mail, MessageSquare, Phone, RefreshCw } from "lucide-react";
import type { ComponentType } from "react";
import { formatDateTime } from "@/platform/lib/format";
import type { ActivityType, LeadActivity } from "@/platform/types";

const ICON: Record<ActivityType, ComponentType<{ className?: string }>> = {
  note: MessageSquare,
  status_change: RefreshCw,
  email: Mail,
  call: Phone,
  meeting: Calendar,
  system: Bot,
};

export function LeadTimeline({ activities }: { activities: LeadActivity[] }) {
  if (activities.length === 0) {
    return <p className="px-1 text-sm text-muted-foreground">Aucune activité pour l'instant.</p>;
  }
  return (
    <ol className="relative space-y-4">
      {activities.map((a, i) => {
        const Icon = ICON[a.type];
        const last = i === activities.length - 1;
        return (
          <li key={a.id} className="relative flex gap-3">
            {!last ? (
              <span
                className="absolute left-[15px] top-8 h-[calc(100%-0.5rem)] w-px bg-border"
                aria-hidden
              />
            ) : null}
            <span className="grid h-8 w-8 flex-none place-items-center rounded-full border border-border bg-card text-muted-foreground">
              <Icon className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0 flex-1 pb-1">
              <p className="text-sm text-foreground">{a.body}</p>
              <p className="mt-0.5 font-sans text-xs text-muted-foreground">
                {a.author} · {formatDateTime(a.createdAt)}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
