"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export type FaqItem = { q: string; a: string };

/**
 * Liste FAQ en accordéons sobres (filets divide-y, pas de carte).
 * Accessible : chaque entête est un <button aria-expanded> qui contrôle
 * un panneau identifié par id. Une seule ouverte à la fois.
 */
export function FaqList({ items }: { items: FaqItem[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <dl className="border-t border-border">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const btnId = `${baseId}-button-${i}`;
        return (
          <div key={item.q} className="border-b border-border">
            <dt>
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-baseline gap-5 py-6 text-left transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="index-num shrink-0 text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-serif text-xl leading-snug sm:text-2xl">{item.q}</span>
                <Plus
                  aria-hidden
                  className={cn(
                    "mt-1 h-5 w-5 shrink-0 text-accent transition-transform duration-300",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
            </dt>
            <dd id={panelId} hidden={!isOpen} className="pl-10 pr-9 pb-7 sm:pl-11">
              <p className="max-w-2xl text-[1.05rem] leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
