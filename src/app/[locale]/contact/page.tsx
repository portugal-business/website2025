import { CalendarClock, Linkedin, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ContactForm, type FormCopy } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { CALENDLY_URL, LINKEDIN_URL, languagesFor, PHONE, PHONE_E164, urlFor } from "@/lib/site";
import { cn } from "@/lib/utils";

const PATH = "/contact";
// Coordonnées dérivées de la source unique @/lib/site.
const PHONE_DISPLAY = PHONE;
const PHONE_HREF = `tel:${PHONE_E164}`;

const COPY = {
  fr: {
    metaTitle: "Contact",
    metaDesc:
      "Échangez avec Audrey Marques sur votre projet d'implantation au Portugal. Premier échange gratuit et sans engagement, formulaire de qualification ou réservation en ligne.",
    eyebrow: "Contact",
    title: "Parlons de votre projet au Portugal",
    intro:
      "Décrivez votre situation en quelques lignes : je reviens vers vous pour cadrer les étapes et vous orienter vers les bons interlocuteurs. Premier échange gratuit et sans engagement, 30 minutes, en français.",
    formEyebrow: "Demande de qualification",
    formTitle: "Votre demande",
    form: {
      firstName: "Prénom",
      lastName: "Nom",
      email: "Email",
      projectType: "Type de projet",
      projectTypeHint:
        "Pour la fiscalité et la comptabilité, je vous oriente vers nos partenaires.",
      projectOptions: [
        { value: "creation", label: "Création de société" },
        { value: "comptabilite", label: "Comptabilité" },
        { value: "fiscalite", label: "Fiscalité" },
        { value: "domiciliation", label: "Domiciliation" },
        { value: "recrutement", label: "Recrutement" },
        { value: "autre", label: "Autre" },
      ],
      country: "Pays de résidence",
      timeframe: "Échéance",
      timeframeOptions: [
        { value: "immediate", label: "Dès que possible" },
        { value: "trimestre", label: "Dans les 3 mois" },
        { value: "semestre", label: "Dans les 6 mois" },
        { value: "exploration", label: "Je me renseigne" },
      ],
      message: "Votre projet",
      messageHint: "Activité envisagée, structure, situation actuelle… ce qui vous aiderait.",
      required: "Tous les champs sont requis",
      submit: "Envoyer ma demande",
      sending: "Envoi…",
      successTitle: "Demande bien reçue",
      successBody:
        "Merci. Je reviens vers vous très rapidement, généralement sous un jour ouvré. Pour un échange plus direct, vous pouvez aussi réserver un créneau via Calendly.",
      formError:
        "L'envoi n'a pas abouti. Réessayez dans un instant, ou écrivez-nous directement par email.",
      errors: {
        firstName: "Indiquez votre prénom.",
        lastName: "Indiquez votre nom.",
        emailRequired: "Indiquez votre email.",
        emailInvalid: "Cet email semble invalide.",
        projectType: "Sélectionnez un type de projet.",
        country: "Indiquez votre pays de résidence.",
        timeframe: "Sélectionnez une échéance.",
        message: "Décrivez votre projet en quelques mots (10 caractères min.).",
        generic: "Ce champ est invalide.",
      },
    },
    asideEyebrow: "Autres moyens",
    callTitle: "Réserver un échange",
    callBody:
      "Premier échange gratuit et sans engagement, 30 minutes, en français. Choisissez directement un créneau en ligne.",
    calendlyCta: "Réserver via Calendly",
    contactTitle: "Coordonnées",
    phoneLabel: "Téléphone",
    linkedinLabel: "LinkedIn",
    locationLabel: "Localisation",
    location: "Lisbonne, Portugal",
    hours: "Du lundi au vendredi, 9h-19h (heure de Lisbonne).",
    entity: "Lovelyparallel, Lda · NIF 518354750",
  },
  en: {
    metaTitle: "Contact",
    metaDesc:
      "Talk to Audrey Marques about setting up your business in Portugal. First conversation free and with no commitment, qualification form or online booking.",
    eyebrow: "Contact",
    title: "Let's talk about your project in Portugal",
    intro:
      "Tell me about your situation in a few lines: I'll get back to you to frame the steps and point you to the right people. First conversation free and with no commitment, 30 minutes, in French.",
    formEyebrow: "Qualification request",
    formTitle: "Your request",
    form: {
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      projectType: "Project type",
      projectTypeHint: "For tax and accounting matters, I connect you with our partners.",
      projectOptions: [
        { value: "creation", label: "Company formation" },
        { value: "comptabilite", label: "Accounting" },
        { value: "fiscalite", label: "Tax" },
        { value: "domiciliation", label: "Domiciliation" },
        { value: "recrutement", label: "Recruitment" },
        { value: "autre", label: "Other" },
      ],
      country: "Country of residence",
      timeframe: "Timeframe",
      timeframeOptions: [
        { value: "immediate", label: "As soon as possible" },
        { value: "trimestre", label: "Within 3 months" },
        { value: "semestre", label: "Within 6 months" },
        { value: "exploration", label: "Just exploring" },
      ],
      message: "Your project",
      messageHint: "Planned activity, structure, current situation… anything that helps.",
      required: "All fields are required",
      submit: "Send my request",
      sending: "Sending…",
      successTitle: "Request received",
      successBody:
        "Thank you. I'll get back to you very quickly, usually within one business day. For a more direct exchange, you can also book a slot via Calendly.",
      formError: "The message couldn't be sent. Please try again shortly, or email us directly.",
      errors: {
        firstName: "Please enter your first name.",
        lastName: "Please enter your last name.",
        emailRequired: "Please enter your email.",
        emailInvalid: "This email looks invalid.",
        projectType: "Please select a project type.",
        country: "Please enter your country of residence.",
        timeframe: "Please select a timeframe.",
        message: "Tell me about your project in a few words (10 characters min.).",
        generic: "This field is invalid.",
      },
    },
    asideEyebrow: "Other ways",
    callTitle: "Book a conversation",
    callBody:
      "First conversation free and with no commitment, 30 minutes, in French. Pick a slot online directly.",
    calendlyCta: "Book via Calendly",
    contactTitle: "Contact details",
    phoneLabel: "Phone",
    linkedinLabel: "LinkedIn",
    locationLabel: "Location",
    location: "Lisbon, Portugal",
    hours: "Monday to Friday, 9am-7pm (Lisbon time).",
    entity: "Lovelyparallel, Lda · NIF 518354750",
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
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = pick(locale);
  const formCopy: FormCopy = c.form;

  return (
    <section className="site-frame py-24 lg:py-32">
      <Reveal className="max-w-2xl">
        <p className="eyebrow">{c.eyebrow}</p>
        <h1 className="mt-6 font-serif text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
          {c.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{c.intro}</p>
      </Reveal>

      <div className="mt-16 grid gap-14 lg:grid-cols-[1.18fr_0.82fr] lg:gap-20">
        {/* Formulaire de qualification */}
        <div>
          <Reveal>
            <p className="eyebrow">{c.formEyebrow}</p>
            <h2 className="mt-4 font-serif text-2xl sm:text-3xl">{c.formTitle}</h2>
          </Reveal>
          <Reveal delay={80} className="mt-9">
            <ContactForm copy={formCopy} />
          </Reveal>
        </div>

        {/* Calendly + coordonnées */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <div className="border border-border bg-card">
              <div className="rule-brass" />
              <div className="p-8">
                <span
                  className="inline-grid h-11 w-11 place-items-center rounded-sm border border-accent text-accent"
                  aria-hidden
                >
                  <CalendarClock className="h-5 w-5" />
                </span>
                <h2 className="mt-5 font-serif text-2xl">{c.callTitle}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{c.callBody}</p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-7 w-full")}
                >
                  {c.calendlyCta}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={90} className="mt-8">
            <p className="eyebrow">{c.contactTitle}</p>
            <dl className="mt-5 divide-y divide-border border-t border-border">
              <div className="flex items-start gap-4 py-4">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <div>
                  <dt className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {c.phoneLabel}
                  </dt>
                  <dd className="mt-1">
                    <a href={PHONE_HREF} className="hover:text-accent">
                      {PHONE_DISPLAY}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-4 py-4">
                <Linkedin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <div>
                  <dt className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {c.linkedinLabel}
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent"
                    >
                      Audrey Marques
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-4 py-4">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <div>
                  <dt className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {c.locationLabel}
                  </dt>
                  <dd className="mt-1">{c.location}</dd>
                </div>
              </div>
            </dl>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{c.hours}</p>
            <p className="mt-2 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {c.entity}
            </p>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}
