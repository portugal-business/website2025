import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { languagesFor, urlFor } from "@/lib/site";
import { cn } from "@/lib/utils";

const PATH = "/confidentialite";

type Field = { label: string; value: string };
type Table = { head: string[]; rows: string[][] };
type SubSection = {
  num: string;
  heading: string;
  body?: string[];
  /** Liste de définitions inline (Finalité, Base légale, Durée…). */
  defs?: { term: string; desc: string }[];
};
type Section = {
  id: string;
  num: string;
  heading: string;
  intro?: string[];
  fields?: Field[];
  bullets?: string[];
  table?: Table;
  body?: string[];
  subs?: SubSection[];
  note?: string;
};

const COPY = {
  fr: {
    metaTitle: "Politique de confidentialité, Business Portugal",
    metaDesc:
      "Comment Lovelyparallel, Lda (Business Portugal) collecte, utilise et protège vos données personnelles, conformément au RGPD et à la loi portugaise n° 58/2019.",
    eyebrow: "Protection des données",
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour : {{À_COMPLÉTER, date de mise en ligne}}",
    lede: "La présente politique explique comment Lovelyparallel, Lda, exerçant sous le nom commercial « Business Portugal », collecte, utilise et protège vos données personnelles lorsque vous utilisez le site et ses formulaires, conformément au Règlement général sur la protection des données (RGPD, Règlement UE 2016/679) et à la loi portugaise n° 58/2019.",
    noticeLink: { label: "Mentions légales", href: "/mentions-legales" },
    contactCta: { label: "Réserver un diagnostic gratuit", href: "/contact" },
    footerNote:
      "Nous pouvons mettre à jour cette politique pour refléter des évolutions légales ou techniques. La date de dernière mise à jour indiquée en haut du document est alors actualisée.",
    sections: [
      {
        id: "responsable",
        num: "01",
        heading: "Responsable du traitement",
        intro: ["Le responsable du traitement de vos données personnelles est :"],
        fields: [
          {
            label: "Raison sociale",
            value: "Lovelyparallel, Lda (nom commercial « Business Portugal »)",
          },
          { label: "Forme juridique", value: "Sociedade por Quotas (Lda) de droit portugais" },
          { label: "NIF / NIPC", value: "518354750" },
          {
            label: "Siège",
            value:
              "Lisbonne, Portugal (adresse complète non publiée à la demande de l'éditeur ; communiquée sur demande légitime, notamment en cas d'exercice de vos droits)",
          },
          { label: "Gérante / Directrice de la publication", value: "Audrey Marques" },
          {
            label: "Email de contact (protection des données)",
            value: "{{À_COMPLÉTER, email pro sur le domaine retenu}}",
          },
          {
            label: "Téléphone",
            value: "+351 937 424 708 (lundi-vendredi, 9h-19h, heure de Lisbonne)",
          },
        ],
        body: [
          "Aucun délégué à la protection des données (DPO) n'a été désigné, la désignation n'étant pas obligatoire au regard de l'activité ; toute question relative à vos données peut être adressée à l'email ci-dessus.",
        ],
      },
      {
        id: "donnees-collectees",
        num: "02",
        heading: "Quelles données nous collectons et d'où elles proviennent",
        intro: [
          "Nous ne collectons que les données strictement nécessaires aux finalités décrites ci-dessous. Selon votre usage du site, il peut s'agir de :",
        ],
        table: {
          head: ["Catégorie de données", "Exemples", "Source"],
          rows: [
            [
              "Données d'identification et de contact",
              "Prénom, nom, adresse email, numéro de téléphone (facultatif)",
              "Vous, via le formulaire de contact / qualification",
            ],
            [
              "Données relatives à votre projet",
              "Type de projet (ex. création de société), pays de résidence, échéance souhaitée, message libre",
              "Vous, via le formulaire de qualification",
            ],
            [
              "Données de rendez-vous",
              "Nom, email, créneau réservé, fuseau horaire, éventuelles réponses aux questions de réservation",
              "Vous, via Calendly",
            ],
            [
              "Données de communication",
              "Contenu des emails échangés, statut d'ouverture/clic des emails transactionnels",
              "Vous + outil d'emailing Brevo",
            ],
            [
              "Données de mesure d'audience",
              "Pages vues, source de la visite, type d'appareil, pays, agrégées et sans identification",
              "Collecte automatique via Plausible (sans cookie)",
            ],
          ],
        },
        body: [
          "Nous ne collectons pas de catégories particulières de données (données dites « sensibles ») via le site, ni de données fiscales détaillées : les échanges précis sur votre situation ont lieu lors du rendez-vous ou par un canal direct, jamais via les formulaires publics.",
        ],
      },
      {
        id: "finalites",
        num: "03",
        heading: "Finalités, bases légales et durées de conservation",
        intro: [
          "Pour chaque traitement, nous précisons la finalité, la base légale (article 6 du RGPD) et la durée de conservation.",
        ],
        subs: [
          {
            num: "3.1",
            heading: "Formulaire de contact / qualification",
            defs: [
              {
                term: "Finalité",
                desc: "recevoir et traiter votre demande, qualifier votre projet, vous recontacter et préparer un éventuel premier échange gratuit.",
              },
              {
                term: "Outils / destinataires",
                desc: "envoi d'une notification par email via Brevo (email transactionnel) ; enregistrement de la demande dans une base de données Supabase (table « leads », protégée par des règles d'accès au niveau ligne, Row Level Security).",
              },
              {
                term: "Base légale",
                desc: "mesures précontractuelles prises à votre demande (art. 6.1.b RGPD) pour les champs nécessaires au traitement de la demande ; consentement (art. 6.1.a) pour les champs facultatifs et pour toute sollicitation commerciale ultérieure.",
              },
              {
                term: "Durée de conservation",
                desc: "3 ans à compter de votre dernier contact si la relation ne se concrétise pas. Au-delà, les données sont supprimées ou anonymisées.",
              },
            ],
          },
          {
            num: "3.2",
            heading: "Prise de rendez-vous",
            defs: [
              {
                term: "Finalité",
                desc: "organiser et confirmer le créneau de votre consultation.",
              },
              { term: "Outil / destinataire", desc: "Calendly." },
              {
                term: "Base légale",
                desc: "mesures précontractuelles à votre demande (art. 6.1.b RGPD).",
              },
              {
                term: "Durée de conservation",
                desc: "les données de réservation sont conservées chez Calendly pendant la durée de la relation puis intégrées, le cas échéant, à la fiche prospect (durée de 3 ans, voir 3.1). Les rendez-vous obsolètes sont purgés régulièrement.",
              },
            ],
          },
          {
            num: "3.3",
            heading: "Communication par email",
            defs: [
              {
                term: "Finalité",
                desc: "échanger avec vous, répondre à vos questions, assurer le suivi de votre dossier et, le cas échéant, vous adresser des informations sur nos services.",
              },
              { term: "Outil / destinataire", desc: "Brevo." },
              {
                term: "Base légale",
                desc: "exécution de mesures précontractuelles / du contrat (art. 6.1.b) pour le suivi de votre demande ; intérêt légitime (art. 6.1.f) pour le suivi commercial d'un prospect/client existant ; consentement (art. 6.1.a) pour toute newsletter ou prospection à laquelle vous vous seriez inscrit(e). Vous pouvez retirer votre consentement ou vous désinscrire à tout moment (lien de désinscription dans chaque email, ou demande à l'email de contact).",
              },
              {
                term: "Durée de conservation",
                desc: "pendant la relation, puis 3 ans après le dernier contact pour les prospects ; pour la prospection par email, le consentement est conservé tant qu'il n'est pas retiré et au maximum 3 ans après le dernier contact actif.",
              },
            ],
          },
          {
            num: "3.4",
            heading: "Mesure d'audience",
            defs: [
              { term: "Finalité", desc: "comprendre l'usage du site et l'améliorer." },
              {
                term: "Outil / destinataire",
                desc: "Plausible Analytics, sans cookie et sans collecte de donnée personnelle directement identifiante (statistiques agrégées).",
              },
              {
                term: "Base légale",
                desc: "intérêt légitime (art. 6.1.f RGPD) à mesurer l'audience de manière respectueuse de la vie privée. La mesure étant sans cookie et sans donnée identifiante, elle ne nécessite pas de consentement préalable.",
              },
              {
                term: "Durée de conservation",
                desc: "statistiques agrégées conservées {{À_COMPLÉTER, durée, ex. 24 mois}} ; aucune donnée individuelle identifiable n'est stockée.",
              },
            ],
          },
          {
            num: "3.5",
            heading: "Gestion du consentement aux cookies",
            defs: [
              {
                term: "Finalité",
                desc: "recueillir, enregistrer et respecter vos choix en matière de cookies/traceurs.",
              },
              {
                term: "Outil",
                desc: "bannière de consentement maison, conforme aux recommandations de la CNIL et à la position de la CNPD.",
              },
              {
                term: "Base légale",
                desc: "obligation légale (art. 6.1.c RGPD, en lien avec l'article 5.3 de la directive ePrivacy) de conserver la preuve du consentement.",
              },
              {
                term: "Durée de conservation",
                desc: "votre choix est conservé 6 mois maximum, à l'issue desquels le consentement vous est à nouveau demandé.",
              },
            ],
          },
          {
            num: "3.6",
            heading: "Obligations comptables et légales",
            defs: [
              {
                term: "Finalité",
                desc: "respecter nos obligations comptables, fiscales et légales lorsque vous devenez client.",
              },
              { term: "Base légale", desc: "obligation légale (art. 6.1.c RGPD)." },
              {
                term: "Durée de conservation",
                desc: "selon les durées légales applicables au Portugal (en règle générale 10 ans pour les documents comptables).",
              },
            ],
          },
        ],
      },
      {
        id: "destinataires",
        num: "04",
        heading: "Destinataires et sous-traitants",
        intro: [
          "Vos données sont traitées par Lovelyparallel, Lda et par les sous-traitants suivants, qui agissent sur nos instructions et avec lesquels un accord de traitement (DPA) est en place :",
        ],
        table: {
          head: ["Sous-traitant", "Rôle", "Localisation principale du traitement"],
          rows: [
            [
              "Brevo (Sendinblue SAS)",
              "Emails transactionnels et suivi de communication",
              "Union européenne (France)",
            ],
            [
              "Supabase",
              "Base de données hébergeant la table « leads » (avec RLS)",
              "{{À_COMPLÉTER, région du projet, ex. UE (Francfort)}}",
            ],
            ["Calendly", "Prise de rendez-vous", "États-Unis (voir §5)"],
            ["Plausible Analytics", "Mesure d'audience sans cookie", "Union européenne"],
            [
              "{{HÉBERGEUR_À_CONFIRMER, défaut : Coolify sur VPS Propul'SEO}}",
              "Hébergement du site et des données",
              "{{À_COMPLÉTER, pays du datacenter, ex. UE}}",
            ],
          ],
        },
        body: [
          "Avec votre accord et uniquement pour traiter votre demande, certaines informations peuvent être transmises à un partenaire spécialisé de notre réseau (ex. comptable, fiscaliste, banque partenaire, partenaire recrutement). Ces partenaires agissent en tant que responsables de traitement distincts et appliquent leur propre politique de confidentialité.",
          "Nous ne vendons pas vos données et ne les transmettons à aucun tiers à des fins publicitaires.",
        ],
      },
      {
        id: "transferts",
        num: "05",
        heading: "Transferts de données hors de l'Union européenne",
        intro: [
          "Certains de nos prestataires peuvent traiter des données en dehors de l'Union européenne, notamment :",
        ],
        bullets: ["Calendly (société établie aux États-Unis)."],
        body: [
          "Lorsqu'un transfert hors UE a lieu, il est encadré par des garanties appropriées au sens du chapitre V du RGPD, à savoir principalement les Clauses Contractuelles Types (CCT) de la Commission européenne et, le cas échéant, l'adhésion du prestataire au EU-US Data Privacy Framework. Une copie des garanties applicables peut être demandée à l'adresse de contact indiquée au §1.",
        ],
      },
      {
        id: "vos-droits",
        num: "06",
        heading: "Vos droits",
        intro: [
          "Conformément au RGPD, vous disposez à tout moment des droits suivants sur vos données :",
        ],
        bullets: [
          "Droit d'accès : obtenir la confirmation que des données vous concernant sont traitées et en recevoir une copie.",
          "Droit de rectification : corriger des données inexactes ou incomplètes.",
          "Droit à l'effacement (« droit à l'oubli ») : demander la suppression de vos données dans les cas prévus par la loi.",
          "Droit à la limitation du traitement.",
          "Droit d'opposition, notamment au traitement fondé sur l'intérêt légitime et à la prospection commerciale.",
          "Droit à la portabilité : recevoir les données que vous nous avez fournies dans un format structuré et lisible par machine.",
          "Droit de retirer votre consentement à tout moment, sans que cela n'affecte la licéité des traitements effectués avant ce retrait.",
          "Droit de définir des directives relatives au sort de vos données après votre décès.",
        ],
        body: [
          "Comment exercer vos droits : adressez votre demande par email à {{À_COMPLÉTER, email pro}}, en précisant votre demande. Nous pourrons vous demander un justificatif d'identité en cas de doute raisonnable. Nous répondons dans un délai d'un mois (prolongeable de deux mois pour les demandes complexes).",
          "Réclamation auprès d'une autorité de contrôle : si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de l'autorité chef de file, la CNPD, Comissão Nacional de Proteção de Dados (Portugal, www.cnpd.pt), et, si vous résidez en France, auprès de la CNIL, Commission Nationale de l'Informatique et des Libertés (www.cnil.fr).",
        ],
      },
      {
        id: "cookies",
        num: "07",
        heading: "Cookies et traceurs",
        intro: [
          "Le site utilise un gestionnaire de consentement maison, conforme aux recommandations de la CNIL. À votre arrivée, une bannière vous permet d'accepter, refuser ou personnaliser le dépôt de traceurs non strictement nécessaires.",
        ],
        bullets: [
          "La mesure d'audience Plausible ne dépose aucun cookie et ne collecte aucune donnée personnelle identifiante : elle peut donc fonctionner sans votre consentement.",
          "Des cookies tiers peuvent être déposés par Calendly uniquement lorsque vous interagissez avec le module de réservation, et avec votre consentement.",
          "Les cookies strictement nécessaires au fonctionnement du site (ex. mémorisation de votre choix de consentement) sont déposés sans consentement préalable, conformément à la loi.",
        ],
        table: {
          head: ["Cookie / traceur", "Finalité", "Durée", "Dépôt"],
          rows: [
            [
              "bp-cookie-consent (stockage local)",
              "Mémorise votre choix de consentement aux cookies",
              "6 mois",
              "Nécessaire",
            ],
            [
              "theme, bp-intro-seen (stockage local / session)",
              "Mémorise le thème clair/sombre et l'animation d'arrivée déjà vue",
              "Persistant / session",
              "Nécessaire",
            ],
            [
              "Plausible Analytics",
              "Mesure d'audience agrégée et anonyme",
              "Aucun cookie déposé",
              "Sans consentement (sans cookie)",
            ],
            [
              "Cookies Calendly (calendly.com)",
              "Fonctionnement du module de réservation en ligne",
              "Définie par Calendly",
              "Avec votre consentement uniquement",
            ],
          ],
        },
        body: [
          "Vous pouvez à tout moment modifier ou retirer vos choix via le lien « Gérer mes cookies » présent en pied de page.",
        ],
      },
      {
        id: "securite",
        num: "08",
        heading: "Sécurité des données",
        intro: [
          "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données, notamment :",
        ],
        bullets: [
          "chiffrement des communications (HTTPS/TLS) entre votre navigateur et le site ;",
          "Row Level Security (RLS) sur la base de données Supabase, restreignant l'accès aux seules personnes et services autorisés ;",
          "accès restreint aux données aux seules personnes habilitées, sur la base du besoin d'en connaître ;",
          "sauvegardes régulières et journalisation des accès ;",
          "recours à des sous-traitants offrant des garanties de conformité au RGPD.",
        ],
        body: [
          "En cas de violation de données susceptible d'engendrer un risque élevé pour vos droits, nous notifierons la CNPD et, le cas échéant, les personnes concernées, dans les conditions prévues par le RGPD.",
        ],
      },
      {
        id: "modifications",
        num: "09",
        heading: "Modifications de la présente politique",
        body: [
          "Nous pouvons mettre à jour cette politique pour refléter des évolutions légales ou techniques. Toute modification importante sera signalée sur cette page, et la date de dernière mise à jour indiquée en haut du document sera actualisée.",
        ],
      },
    ] satisfies Section[],
  },
  en: {
    metaTitle: "Privacy Policy, Business Portugal",
    metaDesc:
      "How Lovelyparallel, Lda (Business Portugal) collects, uses and protects your personal data, in accordance with the GDPR and Portuguese Law No. 58/2019.",
    eyebrow: "Data protection",
    title: "Privacy Policy",
    updated: "Last updated: {{À_COMPLÉTER, go-live date}}",
    lede: "This policy explains how Lovelyparallel, Lda, trading as « Business Portugal », collects, uses and protects your personal data when you use the website and its forms, in accordance with the General Data Protection Regulation (GDPR, EU Regulation 2016/679) and Portuguese Law No. 58/2019.",
    noticeLink: { label: "Legal notice", href: "/mentions-legales" },
    contactCta: { label: "Book a free consultation", href: "/contact" },
    footerNote:
      "We may update this policy to reflect legal or technical changes. The last-updated date at the top of the document is then revised.",
    sections: [
      {
        id: "responsable",
        num: "01",
        heading: "Data controller",
        intro: ["The controller of your personal data is:"],
        fields: [
          { label: "Legal name", value: "Lovelyparallel, Lda (trading as « Business Portugal »)" },
          { label: "Legal form", value: "Sociedade por Quotas (Lda) under Portuguese law" },
          { label: "Tax ID (NIF / NIPC)", value: "518354750" },
          {
            label: "Office",
            value:
              "Lisbon, Portugal (full address not published at the publisher's request; available upon legitimate request, in particular when you exercise your rights)",
          },
          { label: "Manager / Publication director", value: "Audrey Marques" },
          {
            label: "Contact email (data protection)",
            value: "{{À_COMPLÉTER, business email on the chosen domain}}",
          },
          {
            label: "Phone",
            value: "+351 937 424 708 (Monday-Friday, 9 a.m.-7 p.m., Lisbon time)",
          },
        ],
        body: [
          "No Data Protection Officer (DPO) has been appointed, as this is not mandatory given the activity; any question regarding your data may be sent to the email above.",
        ],
      },
      {
        id: "donnees-collectees",
        num: "02",
        heading: "What data we collect and where it comes from",
        intro: [
          "We only collect data that is strictly necessary for the purposes described below. Depending on how you use the site, this may include:",
        ],
        table: {
          head: ["Data category", "Examples", "Source"],
          rows: [
            [
              "Identification and contact data",
              "First name, last name, email address, phone number (optional)",
              "You, via the contact / qualification form",
            ],
            [
              "Project data",
              "Project type (e.g. company formation), country of residence, desired timeline, free-text message",
              "You, via the qualification form",
            ],
            [
              "Appointment data",
              "Name, email, booked slot, time zone, answers to booking questions",
              "You, via Calendly",
            ],
            [
              "Communication data",
              "Content of exchanged emails, open/click status of transactional emails",
              "You + the Brevo email tool",
            ],
            [
              "Audience measurement data",
              "Page views, traffic source, device type, country, aggregated and non-identifying",
              "Automatic collection via Plausible (cookieless)",
            ],
          ],
        },
        body: [
          "We do not collect special categories of data (« sensitive data ») through the site, nor detailed tax data: detailed discussions about your situation take place during the consultation or through a direct channel, never via the public forms.",
        ],
      },
      {
        id: "finalites",
        num: "03",
        heading: "Purposes, legal bases and retention periods",
        intro: [
          "For each processing activity, we set out the purpose, the legal basis (Article 6 GDPR) and the retention period.",
        ],
        subs: [
          {
            num: "3.1",
            heading: "Contact / qualification form",
            defs: [
              {
                term: "Purpose",
                desc: "receive and handle your request, qualify your project, follow up and prepare a possible first free consultation.",
              },
              {
                term: "Tools / recipients",
                desc: "email notification sent via Brevo (transactional email); request stored in a Supabase database (table « leads », protected by Row Level Security).",
              },
              {
                term: "Legal basis",
                desc: "pre-contractual steps taken at your request (Art. 6(1)(b) GDPR) for the fields needed to handle the request; consent (Art. 6(1)(a)) for optional fields and any later commercial outreach.",
              },
              {
                term: "Retention period",
                desc: "3 years from your last contact if no relationship materialises. After that, data is deleted or anonymised.",
              },
            ],
          },
          {
            num: "3.2",
            heading: "Appointment booking",
            defs: [
              { term: "Purpose", desc: "organise and confirm your consultation slot." },
              { term: "Tool / recipient", desc: "Calendly." },
              {
                term: "Legal basis",
                desc: "pre-contractual steps at your request (Art. 6(1)(b) GDPR).",
              },
              {
                term: "Retention period",
                desc: "booking data is kept by Calendly for the duration of the relationship and then, where relevant, merged into the prospect record (3-year period, see 3.1). Obsolete appointments are purged regularly.",
              },
            ],
          },
          {
            num: "3.3",
            heading: "Email communication",
            defs: [
              {
                term: "Purpose",
                desc: "correspond with you, answer your questions, follow up on your case and, where relevant, send you information about our services.",
              },
              { term: "Tool / recipient", desc: "Brevo." },
              {
                term: "Legal basis",
                desc: "performance of pre-contractual steps / contract (Art. 6(1)(b)) for handling your request; legitimate interest (Art. 6(1)(f)) for commercial follow-up of an existing prospect/client; consent (Art. 6(1)(a)) for any newsletter or marketing you subscribed to. You may withdraw consent or unsubscribe at any time (unsubscribe link in every email, or request to the contact email).",
              },
              {
                term: "Retention period",
                desc: "for the duration of the relationship, then 3 years after the last contact for prospects; for email marketing, consent is kept until withdrawn and for a maximum of 3 years after the last active contact.",
              },
            ],
          },
          {
            num: "3.4",
            heading: "Audience measurement",
            defs: [
              { term: "Purpose", desc: "understand how the site is used and improve it." },
              {
                term: "Tool / recipient",
                desc: "Plausible Analytics, cookieless and without collecting directly identifying personal data (aggregated statistics).",
              },
              {
                term: "Legal basis",
                desc: "legitimate interest (Art. 6(1)(f) GDPR) in privacy-friendly audience measurement. As it is cookieless and non-identifying, no prior consent is required.",
              },
              {
                term: "Retention period",
                desc: "aggregated statistics kept for {{À_COMPLÉTER, period, e.g. 24 months}}; no identifiable individual data is stored.",
              },
            ],
          },
          {
            num: "3.5",
            heading: "Cookie consent management",
            defs: [
              {
                term: "Purpose",
                desc: "collect, record and respect your cookie/tracker choices.",
              },
              {
                term: "Tool",
                desc: "in-house consent banner, aligned with CNIL recommendations and the CNPD position.",
              },
              {
                term: "Legal basis",
                desc: "legal obligation (Art. 6(1)(c) GDPR, in connection with Article 5(3) of the ePrivacy Directive) to keep proof of consent.",
              },
              {
                term: "Retention period",
                desc: "your choice is kept for a maximum of 6 months, after which consent is requested again.",
              },
            ],
          },
          {
            num: "3.6",
            heading: "Accounting and legal obligations",
            defs: [
              {
                term: "Purpose",
                desc: "comply with our accounting, tax and legal obligations once you become a client.",
              },
              { term: "Legal basis", desc: "legal obligation (Art. 6(1)(c) GDPR)." },
              {
                term: "Retention period",
                desc: "according to the statutory periods applicable in Portugal (generally 10 years for accounting records).",
              },
            ],
          },
        ],
      },
      {
        id: "destinataires",
        num: "04",
        heading: "Recipients and processors",
        intro: [
          "Your data is processed by Lovelyparallel, Lda and by the following processors, acting on our instructions and bound by a data processing agreement (DPA):",
        ],
        table: {
          head: ["Processor", "Role", "Main processing location"],
          rows: [
            [
              "Brevo (Sendinblue SAS)",
              "Transactional emails and communication tracking",
              "European Union (France)",
            ],
            [
              "Supabase",
              "Database hosting the « leads » table (with RLS)",
              "{{À_COMPLÉTER, project region, e.g. EU (Frankfurt)}}",
            ],
            ["Calendly", "Appointment booking", "United States (see §5)"],
            ["Plausible Analytics", "Cookieless audience measurement", "European Union"],
            [
              "{{HÉBERGEUR_À_CONFIRMER, default: Coolify on Propul'SEO VPS}}",
              "Website and data hosting",
              "{{À_COMPLÉTER, datacenter country, e.g. EU}}",
            ],
          ],
        },
        body: [
          "With your consent and solely to handle your request, certain information may be shared with a specialised partner from our network (e.g. accountant, tax adviser, partner bank, recruitment partner). These partners act as separate controllers and apply their own privacy policy.",
          "We do not sell your data and do not share it with any third party for advertising purposes.",
        ],
      },
      {
        id: "transferts",
        num: "05",
        heading: "Transfers outside the European Union",
        intro: [
          "Some of our providers may process data outside the European Union, in particular:",
        ],
        bullets: ["Calendly (a company established in the United States)."],
        body: [
          "Where a transfer outside the EU takes place, it is governed by appropriate safeguards within the meaning of Chapter V GDPR, primarily the European Commission's Standard Contractual Clauses (SCCs) and, where applicable, the provider's certification under the EU-US Data Privacy Framework. A copy of the applicable safeguards may be requested at the contact address in §1.",
        ],
      },
      {
        id: "vos-droits",
        num: "06",
        heading: "Your rights",
        intro: ["Under the GDPR, you have the following rights over your data at any time:"],
        bullets: [
          "Right of access to your data and a copy of it.",
          "Right to rectification of inaccurate or incomplete data.",
          "Right to erasure (« right to be forgotten ») in the cases provided by law.",
          "Right to restriction of processing.",
          "Right to object, in particular to processing based on legitimate interest and to direct marketing.",
          "Right to data portability: receive the data you provided in a structured, machine-readable format.",
          "Right to withdraw consent at any time, without affecting the lawfulness of processing carried out before withdrawal.",
          "Right to set instructions regarding the fate of your data after your death.",
        ],
        body: [
          "How to exercise your rights: send your request by email to {{À_COMPLÉTER, business email}}, stating your request. We may ask for proof of identity in case of reasonable doubt. We respond within one month (extendable by two months for complex requests).",
          "Complaint to a supervisory authority: if you believe your rights are not respected, you may lodge a complaint with the lead authority, the CNPD, Comissão Nacional de Proteção de Dados (Portugal, www.cnpd.pt), and, if you reside in France, with the CNIL, Commission Nationale de l'Informatique et des Libertés (www.cnil.fr).",
        ],
      },
      {
        id: "cookies",
        num: "07",
        heading: "Cookies and trackers",
        intro: [
          "The site uses an in-house consent manager, aligned with CNIL recommendations. On arrival, a banner lets you accept, refuse or customise the placement of non-strictly-necessary trackers.",
        ],
        bullets: [
          "Plausible analytics sets no cookies and collects no identifying personal data: it can therefore operate without your consent.",
          "Third-party cookies may be set by Calendly only when you interact with the booking module, and with your consent.",
          "Strictly necessary cookies (e.g. storing your consent choice) are set without prior consent, as permitted by law.",
        ],
        table: {
          head: ["Cookie / tracker", "Purpose", "Duration", "Placement"],
          rows: [
            [
              "bp-cookie-consent (local storage)",
              "Stores your cookie consent choice",
              "6 months",
              "Necessary",
            ],
            [
              "theme, bp-intro-seen (local / session storage)",
              "Stores your light/dark theme and whether the intro animation was seen",
              "Persistent / session",
              "Necessary",
            ],
            [
              "Plausible Analytics",
              "Aggregated, anonymous audience measurement",
              "No cookie set",
              "No consent required (cookieless)",
            ],
            [
              "Calendly cookies (calendly.com)",
              "Operation of the online booking module",
              "Set by Calendly",
              "Only with your consent",
            ],
          ],
        },
        body: [
          "You can change or withdraw your choices at any time via the « Manage cookies » link in the footer.",
        ],
      },
      {
        id: "securite",
        num: "08",
        heading: "Data security",
        intro: [
          "We implement appropriate technical and organisational measures to protect your data, including:",
        ],
        bullets: [
          "encryption of communications (HTTPS/TLS) between your browser and the site;",
          "Row Level Security (RLS) on the Supabase database, restricting access to authorised people and services only;",
          "restricted access to data on a need-to-know basis;",
          "regular backups and access logging;",
          "use of processors offering GDPR-compliance guarantees.",
        ],
        body: [
          "In the event of a data breach likely to result in a high risk to your rights, we will notify the CNPD and, where applicable, the affected individuals, as required by the GDPR.",
        ],
      },
      {
        id: "modifications",
        num: "09",
        heading: "Changes to this policy",
        body: [
          "We may update this policy to reflect legal or technical changes. Any material change will be flagged on this page, and the last-updated date at the top of the document will be revised.",
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

function Paragraphs({ items }: { items: string[] }) {
  return (
    <>
      {items.map((p) => (
        <p key={p} className="leading-relaxed text-muted-foreground">
          {p}
        </p>
      ))}
    </>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((b) => (
        <li key={b} className="flex gap-3 leading-relaxed text-muted-foreground">
          <span
            className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-accent"
            aria-hidden
          />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

function DataTable({ table }: { table: Table }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-[0.95rem]">
        <thead>
          <tr>
            {table.head.map((h) => (
              <th
                key={h}
                scope="col"
                className="border-b border-foreground/20 py-3 pr-5 align-bottom font-sans text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground last:pr-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.join("|")} className="align-top">
              {row.map((cell, ci) => (
                <td
                  key={cell}
                  className={cn(
                    "border-b border-border py-4 pr-5 leading-relaxed last:pr-0",
                    ci === 0 ? "font-medium text-foreground" : "text-muted-foreground",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function ConfidentialitePage({ params }: Props) {
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
        <Reveal delay={120}>
          <p className="mt-5 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {c.updated}
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-8 rule-brass" />
        </Reveal>
        <Reveal delay={180}>
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

              <div className="mt-6 space-y-6">
                {section.intro ? <Paragraphs items={section.intro} /> : null}

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

                {section.table ? <DataTable table={section.table} /> : null}

                {section.subs ? (
                  <div className="space-y-8">
                    {section.subs.map((sub) => (
                      <div key={sub.num} className="border-l border-border pl-5">
                        <h3 className="flex items-baseline gap-3 font-serif text-xl leading-tight">
                          <span className="index-num text-sm text-accent">{sub.num}</span>
                          <span>{sub.heading}</span>
                        </h3>
                        {sub.body ? (
                          <div className="mt-3 space-y-3">
                            <Paragraphs items={sub.body} />
                          </div>
                        ) : null}
                        {sub.defs ? (
                          <dl className="mt-3 space-y-2.5">
                            {sub.defs.map((d) => (
                              <div key={d.term} className="leading-relaxed">
                                <dt className="inline font-medium text-foreground">{d.term} : </dt>
                                <dd className="inline text-muted-foreground">{d.desc}</dd>
                              </div>
                            ))}
                          </dl>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}

                {section.bullets ? <Bullets items={section.bullets} /> : null}

                {section.body ? <Paragraphs items={section.body} /> : null}
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
              href={c.noticeLink.href}
              className="font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] hover:underline"
            >
              {c.noticeLink.label}
            </Link>
          </div>
        </footer>
      </Reveal>
    </article>
  );
}
