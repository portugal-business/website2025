// =====================================================================
//  CMS « Mon site » — contenu initial (seed) du tenant de démo.
//  Reprend le contenu RÉEL du site vitrine (messages/fr|en.json, FAQ home,
//  lib/site.ts, page Réglages) pour que la démo soit fidèle. À la migration
//  Supabase, ce seed devient la ligne initiale de `site_contents`.
// =====================================================================

import type { SiteContent, SitePost } from "@/platform/types";

export const SEED_SITE_CONTENT: SiteContent = {
  identity: {
    brandName: "Business Portugal",
    tagline: {
      fr: "Création & implantation d'entreprise au Portugal",
      en: "Company formation & business setup in Portugal",
    },
    legalName: "Lovelyparallel, Lda",
    nipc: "518354750",
    phone: "+351 937 424 708",
    email: "contact@portugal-business.com",
    calendlyUrl: "https://calendly.com/businessportugal",
    linkedinUrl: "https://www.linkedin.com/in/audrey-marques-97728114b/",
  },

  hero: {
    eyebrow: {
      fr: "Création & implantation d'entreprise au Portugal",
      en: "Company formation & business setup in Portugal",
    },
    title: {
      fr: "Créez votre société au Portugal,",
      en: "Set up your company in Portugal,",
    },
    titleAccent: {
      fr: "accompagnée par une vraie personne.",
      en: "guided by a real person.",
    },
    subtitle: {
      fr: "Du numéro fiscal à l'ouverture de votre compte bancaire, Audrey Marques coordonne chaque étape avec un réseau de partenaires de confiance. Pas une société « créée en 2 h », un accompagnement humain, du début à la fin.",
      en: "From your tax number to opening your bank account, Audrey Marques coordinates every step with a trusted network of partners. Not a company spun up in 2 hours, real, human support from start to finish.",
    },
    ctaPrimary: { fr: "Réserver un diagnostic gratuit", en: "Book a free assessment" },
    ctaSecondary: { fr: "Découvrir la méthode", en: "See the method" },
    trustLine: {
      fr: "Plus de 75 entrepreneurs francophones accompagnés depuis 2025.",
      en: "Over 75 French-speaking entrepreneurs supported since 2025.",
    },
  },

  services: [
    {
      id: "svc-creation",
      name: { fr: "Création de société", en: "Company formation" },
      description: {
        fr: "Du choix du statut (Lda / Unipessoal Lda) à la Certidão Permanente : statuts, immatriculation, RCBE et accompagnement bancaire.",
        en: "From choosing the legal form (Lda / Unipessoal Lda) to the Certidão Permanente: articles, registration, RCBE and bank-account support.",
      },
      priceNote: {
        fr: "Sur devis (après échange gratuit)",
        en: "On quote (after a free call)",
      },
      viaPartner: false,
    },
    {
      id: "svc-compta",
      name: { fr: "Comptabilité", en: "Accounting" },
      description: {
        fr: "Mise en relation avec un Contabilista Certificado partenaire (Raly Conseils, Joongle) pour la comptabilité obligatoire.",
        en: "Introduction to a partner Contabilista Certificado (Raly Conseils, Joongle) for the mandatory accounting.",
      },
      priceNote: {
        fr: "~ 200-250 € / mois (via partenaire)",
        en: "~ €200-250 / month (via partner)",
      },
      viaPartner: true,
    },
    {
      id: "svc-domiciliation",
      name: { fr: "Domiciliation", en: "Registered address" },
      description: {
        fr: "Adresse de siège social au Portugal pour votre société, via un partenaire local.",
        en: "Registered-office address in Portugal for your company, through a local partner.",
      },
      priceNote: {
        fr: "~ 500 € HT / an (mise en relation)",
        en: "~ €500 / year excl. VAT (introduction)",
      },
      viaPartner: true,
    },
    {
      id: "svc-fiscalite",
      name: { fr: "Fiscalité", en: "Tax" },
      description: {
        fr: "Questions fiscales fines (IFICI, conventions, résidence) traitées par des fiscalistes partenaires.",
        en: "Complex tax questions (IFICI, treaties, residence) handled by partner tax advisers.",
      },
      priceNote: { fr: "Sur devis (via partenaire)", en: "On quote (via partner)" },
      viaPartner: true,
    },
  ],

  stats: [
    {
      id: "stat-entrepreneurs",
      value: { fr: "75+", en: "75+" },
      label: {
        fr: "entrepreneurs accompagnés depuis 2025",
        en: "entrepreneurs supported since 2025",
      },
    },
    {
      id: "stat-certidao",
      value: { fr: "24-48 h", en: "24-48 h" },
      label: {
        fr: "Certidão Permanente après immatriculation",
        en: "Certidão Permanente after registration",
      },
    },
    {
      id: "stat-distance",
      value: { fr: "100 % à distance", en: "100% remote" },
      label: {
        fr: "NIF et démarches gérés depuis l'étranger",
        en: "NIF and formalities handled from abroad",
      },
    },
  ],

  // Règle YMYL du site : uniquement des avis réels, nommés et vérifiables.
  // Le site publie « pas encore d'avis affichés » plutôt que des faux ; le
  // seed reste donc vide, Audrey ajoutera les premiers avis Google réels.
  testimonials: [],

  faqs: [
    {
      id: "faq-resider",
      question: {
        fr: "Peut-on créer une société au Portugal sans y résider ?",
        en: "Can you set up a company in Portugal without living there?",
      },
      answer: {
        fr: "Oui. Aucune loi portugaise n'impose d'y résider ni d'être résident fiscal pour créer une Lda ou une Unipessoal Lda. La vraie question n'est pas l'autorisation de créer, mais le lieu où vous dirigerez réellement l'activité, c'est lui qui détermine où la société est imposée.",
        en: "Yes. No Portuguese law requires you to reside there or be a tax resident to set up a Lda or a Unipessoal Lda. The real question isn't whether you're allowed to set up, but where you'll actually run the business, that's what determines where it's taxed.",
      },
    },
    {
      id: "faq-capital",
      question: {
        fr: "Quel est le capital social minimum d'une Lda ou Unipessoal Lda ?",
        en: "What is the minimum share capital of a Lda or Unipessoal Lda?",
      },
      answer: {
        fr: "1 € par associé. Le chiffre de 5 000 €, encore souvent cité, est faux. En pratique, prévoir ~1 000 € donne de la cohérence au dossier, notamment auprès des banques. Une SA exige bien, elle, 50 000 €.",
        en: "€1 per partner. The €5,000 figure still often quoted is incorrect. In practice, planning ~€1,000 gives the file consistency, particularly with banks. An SA, however, does require €50,000.",
      },
    },
    {
      id: "faq-delai",
      question: {
        fr: "Combien de temps faut-il pour créer sa société ?",
        en: "How long does it take to set up a company?",
      },
      answer: {
        fr: "Comptez en moyenne environ 3 semaines pour un dossier complet, une fois les justificatifs réunis. La Certidão Permanente est disponible sous 24 à 48 h après l'immatriculation. Aucun cabinet sérieux ne garantit une date absolue, qui dépend des administrations et des banques.",
        en: "Allow on average about 3 weeks for a complete file, once documents are gathered. The Certidão Permanente is available within 24-48 h after registration. No serious firm guarantees an absolute date, which depends on administrations and banks.",
      },
    },
    {
      id: "faq-role",
      question: {
        fr: "Audrey est-elle comptable ou fiscaliste ?",
        en: "Is Audrey an accountant or tax adviser?",
      },
      answer: {
        fr: "Non. Audrey Marques est consultante en création et implantation d'entreprise. Elle crée la société et accompagne l'ouverture bancaire, puis vous met en relation avec un Contabilista Certificado et des fiscalistes partenaires pour les prestations réglementées.",
        en: "No. Audrey Marques is a company-formation and setup consultant. She incorporates the company and supports the bank-account opening, then connects you with a Contabilista Certificado and partner tax advisers for the regulated services.",
      },
    },
  ],
};

export const SEED_SITE_POSTS: SitePost[] = [
  {
    id: "post-creation-distance",
    orgId: "org-bp",
    slug: "creer-societe-portugal-a-distance",
    status: "published",
    title: {
      fr: "Créer sa société au Portugal à distance : ce qui est vraiment possible en 2026",
      en: "Setting up your Portuguese company remotely: what is actually possible in 2026",
    },
    excerpt: {
      fr: "NIF, constitution, compte bancaire : ce qui se fait à 100 % à distance, ce qui demande une procuration, et les délais réalistes.",
      en: "NIF, incorporation, bank account: what can be done fully remotely, what requires a power of attorney, and realistic timelines.",
    },
    body: {
      fr: "## L'essentiel\n\nCréer une société portugaise (Lda ou Unipessoal Lda) sans vivre au Portugal est légal et courant. Le NIF s'obtient à distance, la constitution se fait par procuration, et la Certidão Permanente arrive sous 24 à 48 h après l'immatriculation.\n\n## Les étapes\n\n- Obtention du NIF (numéro fiscal portugais)\n- Constitution de la société (capital légal : 1 € par associé)\n- Certidão Permanente, RCBE et statuts\n- Ouverture du compte bancaire professionnel\n- Mise en relation avec un Contabilista Certificado\n\n## Le délai réaliste\n\nEnviron 3 semaines pour un dossier complet, une fois les justificatifs réunis. Méfiez-vous des promesses de « société en 2 heures ».\n\n*Informations datées de 2026, données à titre indicatif : la fiscalité dépend de votre situation et doit être validée par un fiscaliste.*",
      en: '## The essentials\n\nSetting up a Portuguese company (Lda or Unipessoal Lda) without living in Portugal is legal and common. The NIF can be obtained remotely, incorporation is done by power of attorney, and the Certidão Permanente arrives within 24-48 h after registration.\n\n## The steps\n\n- Obtaining the NIF (Portuguese tax number)\n- Incorporating the company (legal capital: €1 per partner)\n- Certidão Permanente, RCBE and articles of association\n- Opening the business bank account\n- Introduction to a Contabilista Certificado\n\n## A realistic timeline\n\nAbout 3 weeks for a complete file, once supporting documents are gathered. Beware of promises of a "company in 2 hours".\n\n*Information dated 2026, provided for guidance: taxation depends on your situation and must be validated by a tax adviser.*',
    },
    category: "Création",
    readingMinutes: 4,
    createdAt: "2026-05-12T09:00:00.000Z",
    updatedAt: "2026-05-20T10:30:00.000Z",
    publishedAt: "2026-05-20T10:30:00.000Z",
  },
  {
    id: "post-ifici-points-cles",
    orgId: "org-bp",
    slug: "ifici-2026-points-cles",
    status: "draft",
    title: {
      fr: "IFICI 2026 : les points clés avant de déménager",
      en: "IFICI 2026: the key points before you relocate",
    },
    excerpt: {
      fr: "Le régime IFICI (ex-RNH) ne concerne que certaines activités et exclut totalement les retraités. Les points à vérifier avant de partir.",
      en: "The IFICI regime (former NHR) only covers certain activities and entirely excludes retirees. What to check before moving.",
    },
    body: {
      fr: "## Ce que l'IFICI n'est pas\n\nL'IFICI n'est pas l'ancien RNH : les pensions de retraite étrangères en sont totalement exclues. C'est le changement majeur, et il est définitif.\n\n## Qui peut en bénéficier\n\nLe régime vise des activités à forte valeur ajoutée exercées au Portugal. L'éligibilité dépend de votre activité réelle, pas de votre statut sur le papier.\n\n## Avant de déménager\n\nFaites valider votre situation par un fiscaliste avant toute décision : résidence fiscale, convention applicable, calendrier d'inscription. Notre test d'éligibilité donne une première orientation, pas un avis fiscal.\n\n*Brouillon de travail : à faire valider par le fiscaliste partenaire avant publication.*",
      en: "## What the IFICI is not\n\nThe IFICI is not the former NHR: foreign retirement pensions are entirely excluded. That is the major change, and it is final.\n\n## Who can benefit\n\nThe regime targets high-value-added activities carried out in Portugal. Eligibility depends on your actual activity, not your status on paper.\n\n## Before relocating\n\nHave your situation validated by a tax adviser before any decision: tax residence, applicable treaty, registration timeline. Our eligibility test gives a first orientation, not tax advice.\n\n*Working draft: to be validated by the partner tax adviser before publishing.*",
    },
    category: "Fiscalité",
    readingMinutes: 3,
    createdAt: "2026-06-02T14:00:00.000Z",
    updatedAt: "2026-06-05T16:45:00.000Z",
  },
];
