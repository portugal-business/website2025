import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { LEGAL_CONTACT_EMAIL, languagesFor, urlFor } from "@/lib/site";
import { cn } from "@/lib/utils";

const PATH = "/mentions-legales";

type Field = { label: string; value: string; note?: boolean };
type Section = {
  id: string;
  num: string;
  heading: string;
  /** Paragraphes introductifs avant la liste/le corps. */
  intro?: string[];
  /** Définition (paire label / valeur), pour l'éditeur et l'hébergeur. */
  fields?: Field[];
  /** Liste à puces (droits, points). */
  bullets?: string[];
  /** Paragraphes de corps (rendus avec liens internes injectés). */
  body?: string[];
  /** Encart de note de conformité. */
  callout?: string;
};

const COPY = {
  fr: {
    metaTitle: "Mentions légales, Business Portugal",
    metaDesc:
      "Mentions légales du site Business Portugal, édité par Lovelyparallel, Lda (NIF 518354750), Lisbonne, Portugal. Éditeur, hébergeur, propriété intellectuelle et droit applicable.",
    eyebrow: "Informations légales",
    title: "Mentions légales",
    lede: "Le présent site est édité par une société portugaise ciblant une clientèle francophone. Il est soumis aux obligations d'identification de l'éditeur (directive e-commerce 2000/31/CE, transposée au Portugal par le Decreto-Lei n.º 7/2004) et au RGPD (Règlement UE 2016/679).",
    privacyLink: { label: "Politique de confidentialité", href: "/confidentialite" },
    contactCta: { label: "Réserver un diagnostic gratuit", href: "/contact" },
    footerNote:
      "Ce document a une vocation informative et est susceptible d'évoluer. Pour toute question, contactez-nous.",
    sections: [
      {
        id: "editeur",
        num: "01",
        heading: "Éditeur du site",
        intro: ["Le présent site est édité par :"],
        fields: [
          { label: "Raison sociale", value: "Lovelyparallel, Lda" },
          { label: "Nom commercial / marque", value: "Business Portugal" },
          {
            label: "Forme juridique",
            value:
              "Sociedade por Quotas (Lda), société à responsabilité limitée de droit portugais",
          },
          { label: "NIF / NIPC", value: "518354750" },
          { label: "Capital social", value: "{{CAPITAL_À_COMPLÉTER}}" },
          { label: "Siège social", value: "{{ADRESSE_SIEGE_À_COMPLÉTER}}, Lisbonne, Portugal" },
          {
            label: "Téléphone",
            value: "+351 937 424 708 (du lundi au vendredi, 9h-19h)",
          },
          { label: "Email", value: LEGAL_CONTACT_EMAIL },
          { label: "Gérante et directrice de la publication", value: "Audrey Marques" },
        ],
        callout:
          "L'adresse complète du siège ci-dessus est obligatoire au titre de l'identification légale de l'éditeur. Elle peut ne pas figurer sur les pages marketing du site, mais reste accessible sur la présente page.",
      },
      {
        id: "hebergeur",
        num: "02",
        heading: "Hébergeur",
        intro: ["Le site est hébergé par :"],
        fields: [
          {
            label: "Hébergeur",
            value: "Vercel Inc.",
          },
          {
            label: "Coordonnées de l'hébergeur",
            value:
              "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com. Hébergement sur infrastructure edge, données servies depuis des centres situés en Union européenne.",
          },
        ],
      },
      {
        id: "activite",
        num: "03",
        heading: "Activité",
        body: [
          "Business Portugal est un service de conseil et d'accompagnement à la création et à l'implantation d'entreprise au Portugal, reposant sur la mise en relation et la coordination avec des partenaires spécialisés.",
          "Business Portugal n'est pas un cabinet comptable, juridique ou fiscal réglementé. La comptabilité, le conseil juridique et le conseil fiscal sont assurés, le cas échéant, par des professionnels partenaires inscrits auprès de leurs ordres respectifs.",
        ],
      },
      {
        id: "propriete-intellectuelle",
        num: "04",
        heading: "Propriété intellectuelle",
        body: [
          "L'ensemble des contenus du site (textes, visuels, photographies, logo, charte graphique, structure et code) est protégé par le droit de la propriété intellectuelle et demeure la propriété de Lovelyparallel, Lda ou de ses partenaires et ayants droit, sauf mention contraire.",
          "Toute reproduction, représentation, modification ou diffusion, totale ou partielle, sans autorisation écrite préalable de l'éditeur, est interdite et susceptible de constituer une contrefaçon.",
        ],
      },
      {
        id: "donnees-personnelles",
        num: "05",
        heading: "Données personnelles",
        body: [
          "Le traitement des données personnelles collectées via le site est régi par le RGPD (Règlement UE 2016/679).",
          "Responsable du traitement : Lovelyparallel, Lda (Business Portugal), NIF/NIPC 518354750, {{ADRESSE_SIEGE_À_COMPLÉTER}}, Lisbonne, Portugal, contact : audrey.marques@portugal-business.com.",
          "Les finalités, bases légales, durées de conservation, destinataires et l'exercice de vos droits (accès, rectification, effacement, limitation, opposition, portabilité) sont détaillés dans notre {{LIEN_CONFIDENTIALITE}}.",
          "Vous pouvez introduire une réclamation auprès de la CNPD (Comissão Nacional de Proteção de Dados, Portugal) ou, si vous résidez en France, de la CNIL.",
        ],
      },
      {
        id: "cookies",
        num: "06",
        heading: "Cookies",
        body: [
          "Le site utilise des cookies et traceurs strictement encadrés. Vous pouvez à tout moment paramétrer vos choix via votre gestionnaire de préférences cookies.",
          "La mesure d'audience (Plausible) ne dépose pas de cookie et ne collecte pas de donnée personnelle. Le détail figure dans notre {{LIEN_CONFIDENTIALITE}}.",
        ],
      },
      {
        id: "responsabilite",
        num: "07",
        heading: "Responsabilité",
        body: [
          "Les informations publiées sur le site (notamment fiscales et juridiques) ont une vocation strictement informative et ne constituent pas un conseil personnalisé. Elles sont datées et susceptibles d'évoluer (Loi de Finances / Orçamento do Estado).",
          "Pour toute décision, prenez rendez-vous ou consultez un professionnel qualifié.",
        ],
      },
      {
        id: "droit-applicable",
        num: "08",
        heading: "Droit applicable",
        body: [
          "Le présent site et les présentes mentions légales sont régis par le droit portugais, sous réserve des dispositions impératives de protection du consommateur applicables dans votre pays de résidence.",
        ],
      },
    ] satisfies Section[],
  },
  en: {
    metaTitle: "Legal Notice, Business Portugal",
    metaDesc:
      "Legal notice for the Business Portugal website, published by Lovelyparallel, Lda (Tax ID 518354750), Lisbon, Portugal. Publisher, host, intellectual property and governing law.",
    eyebrow: "Legal information",
    title: "Legal notice",
    lede: "This website is published by a Portuguese company targeting a French-speaking audience. It is subject to the publisher-identification obligations (e-commerce Directive 2000/31/EC, transposed in Portugal by Decreto-Lei n.º 7/2004) and to the GDPR (Regulation EU 2016/679).",
    privacyLink: { label: "Privacy Policy", href: "/confidentialite" },
    contactCta: { label: "Book a free consultation", href: "/contact" },
    footerNote:
      "This document is provided for information purposes and may change over time. For any question, please contact us.",
    sections: [
      {
        id: "editeur",
        num: "01",
        heading: "Site publisher",
        intro: ["This website is published by:"],
        fields: [
          { label: "Legal name", value: "Lovelyparallel, Lda" },
          { label: "Trade name / brand", value: "Business Portugal" },
          {
            label: "Legal form",
            value: "Sociedade por Quotas (Lda), limited liability company under Portuguese law",
          },
          { label: "Tax ID (NIF / NIPC)", value: "518354750" },
          { label: "Share capital", value: "{{CAPITAL_À_COMPLÉTER}}" },
          { label: "Registered office", value: "{{ADRESSE_SIEGE_À_COMPLÉTER}}, Lisbon, Portugal" },
          {
            label: "Phone",
            value: "+351 937 424 708 (Monday to Friday, 9 a.m.-7 p.m.)",
          },
          { label: "Email", value: LEGAL_CONTACT_EMAIL },
          { label: "Manager and publication director", value: "Audrey Marques" },
        ],
        callout:
          "The full registered-office address above is mandatory for the legal identification of the publisher. It may be omitted from the site's marketing pages but remains accessible on this page.",
      },
      {
        id: "hebergeur",
        num: "02",
        heading: "Hosting provider",
        intro: ["The website is hosted by:"],
        fields: [
          {
            label: "Host",
            value: "Vercel Inc.",
          },
          {
            label: "Host contact details",
            value:
              "440 N Barranca Ave #4133, Covina, CA 91723, United States — vercel.com. Hosted on edge infrastructure, with data served from data centres located in the European Union.",
          },
        ],
      },
      {
        id: "activite",
        num: "03",
        heading: "Business activity",
        body: [
          "Business Portugal provides consulting and support services for company formation and business establishment in Portugal, based on introductions to and coordination with specialised partners.",
          "Business Portugal is not a regulated accounting, legal or tax firm. Accounting, legal and tax advice are provided, where applicable, by partner professionals registered with their respective professional bodies.",
        ],
      },
      {
        id: "propriete-intellectuelle",
        num: "04",
        heading: "Intellectual property",
        body: [
          "All website content (text, visuals, photographs, logo, graphic identity, structure and code) is protected by intellectual property law and remains the property of Lovelyparallel, Lda or its partners and rights holders, unless otherwise stated.",
          "Any reproduction, representation, modification or distribution, in whole or in part, without the publisher's prior written authorisation, is prohibited and may constitute infringement.",
        ],
      },
      {
        id: "donnees-personnelles",
        num: "05",
        heading: "Personal data",
        body: [
          "The processing of personal data collected through the website is governed by the GDPR (Regulation EU 2016/679).",
          "Data controller: Lovelyparallel, Lda (Business Portugal), Tax ID 518354750, {{ADRESSE_SIEGE_À_COMPLÉTER}}, Lisbon, Portugal, contact: audrey.marques@portugal-business.com.",
          "The purposes, legal bases, retention periods, recipients and the exercise of your rights (access, rectification, erasure, restriction, objection, portability) are detailed in our {{LIEN_CONFIDENTIALITE}}.",
          "You may lodge a complaint with the CNPD (Comissão Nacional de Proteção de Dados, Portugal) or, if you reside in France, with the CNIL.",
        ],
      },
      {
        id: "cookies",
        num: "06",
        heading: "Cookies",
        body: [
          "The website uses strictly controlled cookies and trackers. You can adjust your choices at any time via your cookie preference centre.",
          "Analytics (Plausible) sets no cookie and collects no personal data. Details are provided in our {{LIEN_CONFIDENTIALITE}}.",
        ],
      },
      {
        id: "responsabilite",
        num: "07",
        heading: "Liability",
        body: [
          "Information published on the website (including tax and legal information) is for informational purposes only and does not constitute personalised advice. It is dated and subject to change (Finance Act / Orçamento do Estado).",
          "For any decision, book a consultation or consult a qualified professional.",
        ],
      },
      {
        id: "droit-applicable",
        num: "08",
        heading: "Governing law",
        body: [
          "This website and this legal notice are governed by Portuguese law, subject to the mandatory consumer-protection provisions applicable in your country of residence.",
        ],
      },
    ] satisfies Section[],
  },
} as const;

type Props = { params: Promise<{ locale: string }> };
const pick = (l: string) => (l === "en" ? COPY.en : COPY.fr);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = pick(locale);
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: {
      canonical: urlFor(locale, PATH),
      languages: languagesFor(PATH),
    },
    robots: { index: true, follow: true },
  };
}

/** Rend un paragraphe en remplaçant le jeton {{LIEN_CONFIDENTIALITE}} par un vrai <Link>. */
function BodyParagraph({
  text,
  privacyLink,
}: {
  text: string;
  privacyLink: { label: string; href: string };
}) {
  const token = "{{LIEN_CONFIDENTIALITE}}";
  if (!text.includes(token)) {
    return <p className="leading-relaxed text-muted-foreground">{text}</p>;
  }
  const [before, after] = text.split(token);
  return (
    <p className="leading-relaxed text-muted-foreground">
      {before}
      <Link
        href={privacyLink.href}
        className="text-foreground underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
      >
        {privacyLink.label}
      </Link>
      {after}
    </p>
  );
}

export default async function MentionsLegalesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = pick(locale);

  return (
    <article className="mx-auto max-w-3xl px-5 py-24 lg:px-8 lg:py-32">
      <header>
        <Reveal>
          <p className="eyebrow">{c.eyebrow}</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 font-serif text-4xl leading-[1.05] sm:text-5xl">{c.title}</h1>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-8 rule-brass" />
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">{c.lede}</p>
        </Reveal>
      </header>

      <div className="mt-16 space-y-16">
        {(c.sections as Section[]).map((section) => (
          <Reveal key={section.id}>
            <section id={section.id} className="scroll-mt-24">
              <div className="flex items-baseline gap-4">
                <span className="index-num text-sm text-accent">{section.num}</span>
                <h2 className="font-serif text-2xl leading-tight sm:text-3xl">{section.heading}</h2>
              </div>

              <div className="mt-6 space-y-5">
                {section.intro?.map((p) => (
                  <p key={p} className="leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}

                {section.fields ? (
                  <dl className="border-t border-border">
                    {section.fields.map((f) => (
                      <div
                        key={f.label}
                        className="grid gap-1 border-b border-border py-3.5 sm:grid-cols-[0.42fr_0.58fr] sm:gap-6"
                      >
                        <dt className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                          {f.label}
                        </dt>
                        <dd className="text-[1.02rem] text-foreground">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}

                {section.callout ? (
                  <div className="border-l border-accent bg-card py-4 pl-5 pr-4">
                    <p className="text-[0.97rem] italic leading-relaxed text-muted-foreground">
                      {section.callout}
                    </p>
                  </div>
                ) : null}

                {section.body?.map((p) => (
                  <BodyParagraph key={p} text={p} privacyLink={c.privacyLink} />
                ))}

                {section.bullets ? (
                  <ul className="space-y-2.5">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex gap-3 leading-relaxed text-muted-foreground">
                        <span
                          className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-accent"
                          aria-hidden
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <footer className="mt-20 border-t border-border pt-10">
          <p className="text-[0.97rem] italic leading-relaxed text-muted-foreground">
            {c.footerNote}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href={c.contactCta.href}
              className={cn(buttonVariants({ variant: "primary", size: "md" }), "group")}
            >
              {c.contactCta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={c.privacyLink.href}
              className="font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] hover:underline"
            >
              {c.privacyLink.label}
            </Link>
          </div>
        </footer>
      </Reveal>
    </article>
  );
}
