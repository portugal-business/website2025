import { getLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";

// FAQ condensée d'accueil (chunks extractibles par les moteurs IA) + JSON-LD FAQPage.
// Reprend les questions à plus forte intention ; la FAQ complète (30 Q) vit sur /faq.
type Faq = { q: string; a: string };
type Copy = { eyebrow: string; title: string; faq: Faq[]; moreCta: string };

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    eyebrow: "Questions fréquentes",
    title: "Les réponses, sans détour",
    faq: [
      {
        q: "Peut-on créer une société au Portugal sans y résider ?",
        a: "Oui. Aucune loi portugaise n'impose d'y résider ni d'être résident fiscal pour créer une Lda ou une Unipessoal Lda. La vraie question n'est pas l'autorisation de créer, mais le lieu où vous dirigerez réellement l'activité, c'est lui qui détermine où la société est imposée.",
      },
      {
        q: "Quel est le capital social minimum d'une Lda ou Unipessoal Lda ?",
        a: "1 € par associé. Le chiffre de 5 000 €, encore souvent cité, est faux. En pratique, prévoir ~1 000 € donne de la cohérence au dossier, notamment auprès des banques. Une SA exige bien, elle, 50 000 €.",
      },
      {
        q: "Combien de temps faut-il pour créer sa société ?",
        a: "Comptez en moyenne environ 3 semaines pour un dossier complet, une fois les justificatifs réunis. La Certidão Permanente est disponible sous 24 à 48 h après l'immatriculation. Aucun cabinet sérieux ne garantit une date absolue, qui dépend des administrations et des banques.",
      },
      {
        q: "Les retraités peuvent-ils bénéficier de l'IFICI (ex-RNH) ?",
        a: "Non. L'IFICI exclut totalement les pensions de retraite étrangères : c'est le changement majeur par rapport à l'ancien RNH. Une pension privée relève du barème IRS portugais, une pension publique reste imposée en France (convention de 1971).",
      },
      {
        q: "Un Français peut-il gérer sa société portugaise depuis la France ?",
        a: "C'est exactement là qu'est le vrai risque. Si la société est réellement dirigée depuis la France, l'administration peut l'imposer en France (siège de direction effective, établissement stable). Le danger n'est pas la création, simple, mais la requalification fiscale ultérieure.",
      },
      {
        q: "Audrey est-elle comptable ou fiscaliste ?",
        a: "Non. Audrey Marques est consultante en création et implantation d'entreprise. Elle crée la société et accompagne l'ouverture bancaire, puis vous met en relation avec un Contabilista Certificado et des fiscalistes partenaires pour les prestations réglementées.",
      },
    ],
    moreCta: "Voir les 30 questions",
  },
  en: {
    eyebrow: "Frequently asked questions",
    title: "Straight answers, no spin",
    faq: [
      {
        q: "Can you set up a company in Portugal without living there?",
        a: "Yes. No Portuguese law requires you to reside there or be a tax resident to set up a Lda or a Unipessoal Lda. The real question isn't whether you're allowed to set up, but where you'll actually run the business, that's what determines where it's taxed.",
      },
      {
        q: "What is the minimum share capital of a Lda or Unipessoal Lda?",
        a: "€1 per partner. The €5,000 figure still often quoted is incorrect. In practice, planning ~€1,000 gives the file consistency, particularly with banks. An SA, however, does require €50,000.",
      },
      {
        q: "How long does it take to set up a company?",
        a: "Allow on average about 3 weeks for a complete file, once documents are gathered. The Certidão Permanente is available within 24-48 h after registration. No serious firm guarantees an absolute date, which depends on administrations and banks.",
      },
      {
        q: "Can retirees benefit from the IFICI (former NHR)?",
        a: "No. The IFICI entirely excludes foreign retirement pensions: that's the major change from the former NHR. A private pension falls under the Portuguese IRS scale, while a public pension remains taxed in France (1971 treaty).",
      },
      {
        q: "Can a French resident run their Portuguese company from France?",
        a: "That's exactly where the real risk lies. If the company is genuinely run from France, the authorities may tax it in France (place of effective management, permanent establishment). The danger isn't setting up, that's simple, but the later tax reclassification.",
      },
      {
        q: "Is Audrey an accountant or tax adviser?",
        a: "No. Audrey Marques is a company-formation and setup consultant. She incorporates the company and supports the bank-account opening, then connects you with a Contabilista Certificado and partner tax advisers for the regulated services.",
      },
    ],
    moreCta: "See all 30 questions",
  },
} as const;

export async function HomeFaq() {
  const locale = await getLocale();
  const c = locale === "en" ? COPY.en : COPY.fr;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="border-t border-border bg-card">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique sérialisé côté serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow">{c.eyebrow}</p>
              <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl lg:text-[2.9rem]">
                {c.title}
              </h2>
              <Reveal delay={120}>
                <Link
                  href="/faq"
                  className="mt-7 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] hover:underline"
                >
                  {c.moreCta}
                </Link>
              </Reveal>
            </Reveal>
          </div>
          <div>
            <dl className="border-t border-border">
              {c.faq.map((f, i) => (
                <Reveal key={f.q} delay={i * 50}>
                  <div className="border-b border-border py-6">
                    <dt className="font-serif text-lg sm:text-xl">{f.q}</dt>
                    <dd className="mt-2.5 leading-relaxed text-muted-foreground">{f.a}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
