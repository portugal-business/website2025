import { getTranslations } from "next-intl/server";

export async function TrustBar() {
  const t = await getTranslations("trust");
  const items = t.raw("items") as { value: string; label: string }[];

  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-3">
        {items.map((it) => (
          <div key={it.label} className="text-center sm:text-left">
            <div className="font-display text-3xl text-primary">{it.value}</div>
            <p className="mt-1 text-sm text-muted-foreground">{it.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
