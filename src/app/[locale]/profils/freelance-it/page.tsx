import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { BUSINESS_ID, languagesFor, SITE_URL, urlFor } from "@/lib/site";
import { cn } from "@/lib/utils";

const PATH = "/profils/freelance-it";
const IFICI_TEST_PATH = "/outils/test-eligibilite-ifici";
const IFICI_GUIDE_PATH = "/guides/ifici-2026";
const CREATION_PATH = "/creation-societe";
const FISCALITE_PATH = "/services/fiscalite";
const FAQ_PATH = "/faq";

type Props = { params: Promise<{ locale: string }> };

type Topic = {
  term: string;
  value: string;
  href?: string;
  linkLabel?: string;
};
type Step = { title: string; description: string };
type Faq = { q: string; a: string };

type Copy = {
  metaTitle: string;
  metaDesc: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trust: string;

  asideEyebrow: string;
  asidePoints: string[];

  tiEyebrow: string;
  tiTitle: string;
  tiSubtitle: string;
  tiTopics: Topic[];

  invoiceEyebrow: string;
  invoiceTitle: string;
  invoiceBody: string;
  invoicePoints: string[];

  ificiEyebrow: string;
  ificiTitle: string;
  ificiBody: string;
  ificiYes: { title: string; body: string };
  ificiNo: { title: string; body: string };
  ificiNote: string;
  ificiTestLabel: string;
  ificiGuideLabel: string;

  ldaEyebrow: string;
  ldaTitle: string;
  ldaSubtitle: string;
  ldaSteps: Step[];
  ldaLinkLabel: string;

  wordEyebrow: string;
  wordTitle: string;
  wordBody: string;

  faqEyebrow: string;
  faqTitle: string;
  faq: Faq[];

  disclaimerLabel: string;
  disclaimer: string;

  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  ctaReassurance: string;

  breadcrumbHome: string;
  breadcrumbProfiles: string;
  breadcrumbCurrent: string;
  serviceName: string;
};

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    metaTitle: "Freelance IT au Portugal : Trabalhador Independente, recibos verdes & IFICI",
    metaDesc:
      "Consultants IT et développeurs freelance : s'installer au Portugal, facturer ses clients FR/UE en conformité (Trabalhador Independente, recibos verdes), et savoir si l'IFICI vous concerne vraiment. Accompagnement honnête, premier échange gratuit.",
    eyebrow: "Profils accompagnés · Tech & IT",
    title: "Consultants IT & développeurs freelance :",
    titleAccent: "s'installer au Portugal et facturer en conformité",
    lead: "Vous êtes développeur, ingénieur logiciel, consultant cloud ou data, et vous envisagez le Portugal. La bonne nouvelle : votre profil tech qualifie souvent pour le statut le plus simple, le Trabalhador Independente. La nuance honnête : l'IFICI (le « RNH 2.0 ») n'est pas automatique, et le piège du client 100 % étranger en exclut beaucoup. Je suis consultante en création et implantation, je crée votre structure, je vous accompagne à la banque, et je vous mets en relation avec un Contabilista Certificado pour la compta et les recibos verdes.",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Voir le statut indépendant",
    trust: "75+ entrepreneurs accompagnés depuis 2025 · Lisbonne, Portugal",

    asideEyebrow: "En bref pour un freelance IT",
    asidePoints: [
      "Statut Trabalhador Independente (catégorie B), régime simplifié sous 200 000 €/an",
      "Recibos verdes électroniques obligatoires pour chaque facture",
      "Revenus mondiaux imposables au Portugal, clients FR/UE inclus",
      "IFICI 20 % possible, mais à vérifier, pas garanti",
    ],

    tiEyebrow: "Le statut le plus courant",
    tiTitle: "Trabalhador Independente : régime simplifié & recibos verdes",
    tiSubtitle:
      "Pour démarrer seul·e en tant que freelance tech, le Trabalhador Independente (catégorie B de l'IRS) est presque toujours le point de départ. Voici les repères 2026 en terminologie portugaise, des ordres de grandeur, pas un calcul de votre cas, que chiffre le Contabilista Certificado partenaire.",
    tiTopics: [
      {
        term: "Trabalhador Independente (catégorie B)",
        value:
          "Le statut d'indépendant rattaché à votre NIF personnel : pas de société, pas de capital, ouverture d'activité (« início de atividade ») auprès de l'Autoridade Tributária. C'est l'équivalent fonctionnel d'un freelance en nom propre, à ne pas confondre avec une Unipessoal Lda.",
      },
      {
        term: "Régime simplifié (regime simplificado)",
        value:
          "Accessible tant que votre chiffre d'affaires reste sous 200 000 €/an. Pas de comptabilité organisée obligatoire : l'imposition se calcule sur une base forfaitaire, ce qui simplifie nettement la gestion à vos débuts.",
      },
      {
        term: "Coefficient ~0,75 pour les services",
        value:
          "Pour les prestations de services, un coefficient d'environ 0,75 s'applique : l'IRS se calcule sur ~75 % du chiffre d'affaires (soit un abattement forfaitaire d'environ 25 %), puis le barème progressif de l'IRS s'applique. C'est un repère, pas votre taux réel.",
      },
      {
        term: "Recibos verdes (recibos eletrónicos)",
        value:
          "Chaque prestation se facture via un recibo verde électronique émis sur le portail des Finanças. C'est l'obligation centrale du Trabalhador Independente : sans recibo verde émis, pas de facture conforme.",
      },
      {
        term: "Retenues à la source (retenção na fonte)",
        value:
          "Selon votre situation et votre client, des retenues à la source peuvent s'appliquer sur vos factures. Les règles varient (seuils, première année d'activité, clients particuliers ou professionnels) : c'est un point à cadrer avec le comptable partenaire.",
      },
      {
        term: "Sécurité sociale (Segurança Social)",
        value:
          "Le Trabalhador Independente cotise à la Segurança Social sur une base de revenu déterminée trimestriellement. Une exonération de cotisations s'applique généralement la première année d'activité. Les montants dépendent de vos revenus déclarés.",
      },
    ],

    invoiceEyebrow: "Vos clients à l'étranger",
    invoiceTitle: "Facturer ses clients FR/UE depuis le Portugal",
    invoiceBody:
      "La plupart des freelances tech que j'accompagne gardent des clients en France ou ailleurs en UE. C'est parfaitement possible, mais il y a une règle de base à comprendre : une fois résident fiscal portugais, vos revenus mondiaux sont imposables au Portugal, y compris ce que vous facturez à un client français. Le lieu de votre client ne change pas votre lieu d'imposition ; votre résidence fiscale, si.",
    invoicePoints: [
      "Résident fiscal portugais : revenus mondiaux déclarés au Portugal, clients FR/UE inclus",
      "Facturation intra-UE : NIF/NIPC valide, mentions et numéro de TVA selon votre situation IVA",
      "Le régime IVA (assujetti ou franchise) dépend de votre chiffre d'affaires et du type de client",
      "La convention France-Portugal de 1971 évite la double imposition, lecture au cas par cas",
    ],

    ificiEyebrow: "La question qui fâche, traitée honnêtement",
    ificiTitle: "IFICI : y avez-vous vraiment droit ?",
    ificiBody:
      "L'IFICI (Incentivo Fiscal à Investigação Científica e Inovação, surnommé « RNH 2.0 ») offre un taux d'IRS de 20 % sur les revenus d'activité éligible, pendant 10 ans, à condition de ne pas avoir été résident fiscal portugais lors des 5 années précédentes. Pour un profil tech, c'est attirant, mais ce n'est pas automatique, et beaucoup de nomades découvrent trop tard qu'ils n'y sont pas éligibles. Voici la vérité, sans promesse.",
    ificiYes: {
      title: "Ce qui joue en votre faveur",
      body: "Les développeurs et profils techniques qualifiés figurent probablement parmi les professions hautement qualifiées de l'Anexo I (ingénieurs, spécialistes des TIC). Si vous exercez une de ces professions listées, dans le bon cadre, l'IFICI peut s'appliquer.",
    },
    ificiNo: {
      title: "Le piège du client 100 % étranger",
      body: "Beaucoup de freelances tech ne sont PAS éligibles : profession hors de la liste, ou activité tournée à 100 % vers un employeur/client étranger sans rattachement à une entreprise portugaise éligible. Être développeur ne suffit pas, c'est le cadre exact de votre activité qui décide.",
    },
    ificiNote:
      "Je ne suis pas fiscaliste et je ne tranche jamais votre éligibilité à votre place. Mon rôle : poser les bonnes questions, vous donner un repère honnête, et vous mettre en relation avec un fiscaliste partenaire pour la décision réglementée.",
    ificiTestLabel: "Faire le test d'éligibilité IFICI",
    ificiGuideLabel: "Lire le guide IFICI 2026",

    ldaEyebrow: "Quand le freelance grandit",
    ldaTitle: "Quand passer en Unipessoal Lda",
    ldaSubtitle:
      "Le Trabalhador Independente est idéal pour démarrer, mais il a ses limites quand l'activité grossit. Passer en société (Unipessoal Lda) devient pertinent dans plusieurs cas. Voici les signaux que je regarde avec vous, la décision finale se prend avec le comptable et le fiscaliste partenaires.",
    ldaSteps: [
      {
        title: "Votre chiffre d'affaires monte",
        description:
          "Au-delà d'un certain niveau de bénéfice, l'IRC d'une Unipessoal Lda (19 %, ou 15 % PME sur les premiers 50 000 € de bénéfice imposable) peut devenir plus avantageux que le barème progressif de l'IRS sur ~75 % de votre CA.",
      },
      {
        title: "Vos clients exigent une société",
        description:
          "Certains donneurs d'ordre, grands comptes ou plateformes préfèrent contractualiser avec une personne morale (NIPC) plutôt qu'avec un indépendant. La Unipessoal Lda répond à cette attente.",
      },
      {
        title: "Vous voulez séparer patrimoine et activité",
        description:
          "La Unipessoal Lda crée une personne morale distincte avec un capital social d'1 € par associé. La responsabilité est en principe limitée aux apports, ce qui distingue nettement votre patrimoine personnel de l'activité.",
      },
      {
        title: "Vous structurez votre rémunération",
        description:
          "Salaire, dividendes, réinvestissement : une société ouvre des arbitrages de rémunération qu'un Trabalhador Independente n'a pas. Ces arbitrages relèvent d'une analyse fiscale personnalisée, pas d'une règle générale.",
      },
    ],
    ldaLinkLabel: "Voir la création de société",

    wordEyebrow: "Le bon mot",
    wordTitle: "« Trabalhador Independente », pas « auto-entrepreneur »",
    wordBody:
      "Au Portugal, on ne parle pas d'auto-entrepreneur, d'EURL ni d'expert-comptable. On dit Trabalhador Independente (l'indépendant en catégorie B), Unipessoal Lda (la société à associé unique, capital 1 €), NIF (votre numéro fiscal de particulier) et NIPC (celui de la société), recibos verdes (vos factures électroniques) et Contabilista Certificado (le comptable inscrit à l'Ordem dos Contabilistas Certificados). Employer le bon terme, dès le départ, vous évite des malentendus coûteux avec l'administration et vos partenaires.",

    faqEyebrow: "Questions fréquentes",
    faqTitle: "Ce que me demandent les freelances tech",
    faq: [
      {
        q: "Dois-je créer une société pour facturer en freelance au Portugal ?",
        a: "Non, pas nécessairement. La plupart des freelances tech démarrent en Trabalhador Independente (catégorie B), sans société ni capital : il suffit d'ouvrir une activité (« início de atividade ») et d'émettre des recibos verdes. La société (Unipessoal Lda) devient pertinente quand l'activité grossit, un point qu'on regarde ensemble.",
      },
      {
        q: "Je facture des clients français : où suis-je imposé ?",
        a: "Si vous êtes résident fiscal portugais, vos revenus mondiaux sont imposables au Portugal, y compris ce que vous facturez à des clients français ou de l'UE. Le lieu de votre client ne change pas votre lieu d'imposition. La convention France-Portugal de 1971 évite la double imposition, mais sa lecture dépend de votre cas : c'est un sujet pour le fiscaliste partenaire.",
      },
      {
        q: "En tant que développeur, ai-je droit à l'IFICI à 20 % ?",
        a: "Peut-être, mais ce n'est pas automatique. Les développeurs et profils techniques qualifiés figurent probablement parmi les professions de l'Anexo I, ce qui est un point favorable. Mais beaucoup de freelances n'y sont pas éligibles, notamment ceux dont l'activité est tournée à 100 % vers un client ou employeur étranger sans rattachement éligible. Faites le test d'éligibilité, puis validez avec un fiscaliste partenaire, je ne tranche jamais à votre place.",
      },
      {
        q: "Comment fonctionne le régime simplifié pour un freelance IT ?",
        a: "Tant que votre chiffre d'affaires reste sous 200 000 €/an, vous pouvez relever du régime simplifié : pour les services, un coefficient d'environ 0,75 s'applique, l'IRS se calcule donc sur environ 75 % de votre CA (abattement forfaitaire d'environ 25 %), puis le barème progressif de l'IRS s'applique. C'est un repère, pas votre taux réel : le Contabilista Certificado partenaire chiffre votre situation.",
      },
      {
        q: "Êtes-vous comptable ou fiscaliste ?",
        a: "Non. Audrey Marques est consultante en création et implantation d'entreprise au Portugal, ni comptable, ni fiscaliste, ni avocate. Je crée votre structure, je vous accompagne à l'ouverture de compte bancaire, et je vous mets en relation avec un Contabilista Certificado (inscrit à l'Ordem dos Contabilistas Certificados) pour la comptabilité et les recibos verdes, et avec un fiscaliste pour les sujets fiscaux.",
      },
    ],

    disclaimerLabel: "Avertissement",
    disclaimer:
      "Cette page a une vocation informative et ne constitue pas un conseil juridique, comptable ou fiscal personnalisé. Business Portugal n'est ni un cabinet comptable ni un cabinet fiscal : la comptabilité (recibos verdes inclus) est assurée par un Contabilista Certificado partenaire et les sujets fiscaux par un fiscaliste partenaire. Les chiffres cités (coefficient simplifié, seuil de 200 000 €, IRC 19 %/15 %, IVA 23 %, IFICI 20 %) sont à jour en 2026 et susceptibles d'évoluer à chaque Loi de Finances (Orçamento do Estado). Votre situation dépend de votre cas individuel et de la convention fiscale France-Portugal de 1971. Pour une analyse de votre projet, prenez rendez-vous.",

    ctaTitle: "Parlons de votre installation",
    ctaBody:
      "Un premier échange gratuit et sans engagement pour cadrer votre statut (Trabalhador Independente ou Unipessoal Lda), votre facturation FR/UE et votre éligibilité réelle à l'IFICI. On regarde votre situation, on identifie les bons partenaires, on avance ensemble.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Sans engagement · Accompagnement freelance tech · Lisbonne, Portugal",

    breadcrumbHome: "Accueil",
    breadcrumbProfiles: "Profils",
    breadcrumbCurrent: "Freelance IT & développeurs",
    serviceName: "Accompagnement à l'installation des freelances IT au Portugal",
  },
  en: {
    metaTitle: "IT freelancers in Portugal: Trabalhador Independente, recibos verdes & IFICI",
    metaDesc:
      "IT consultants and freelance developers: settle in Portugal, invoice your FR/EU clients compliantly (Trabalhador Independente, recibos verdes), and find out whether the IFICI really applies to you. Honest guidance, first conversation free.",
    eyebrow: "Profiles we support · Tech & IT",
    title: "IT consultants & freelance developers:",
    titleAccent: "settle in Portugal and invoice compliantly",
    lead: "You are a developer, software engineer, cloud or data consultant, and you are considering Portugal. The good news: your tech profile often qualifies for the simplest status, the Trabalhador Independente. The honest caveat: the IFICI (the “NHR 2.0”) is not automatic, and the 100% foreign-client trap excludes many of them. I am a consultant in company formation and setup, I create your structure, I support you at the bank, and I connect you with a Contabilista Certificado for accounting and recibos verdes.",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "See the self-employed status",
    trust: "75+ entrepreneurs supported since 2025 · Lisbon, Portugal",

    asideEyebrow: "In short for an IT freelancer",
    asidePoints: [
      "Trabalhador Independente status (category B), simplified regime below €200,000/year",
      "Electronic recibos verdes required for every invoice",
      "Worldwide income taxable in Portugal, FR/EU clients included",
      "IFICI 20% possible, but to be checked, not guaranteed",
    ],

    tiEyebrow: "The most common status",
    tiTitle: "Trabalhador Independente: simplified regime & recibos verdes",
    tiSubtitle:
      "To start out as a solo tech freelancer, the Trabalhador Independente (category B of the IRS) is almost always the starting point. Here are the 2026 reference points in Portuguese terminology, orders of magnitude, not a calculation of your case, which the partner Contabilista Certificado quantifies.",
    tiTopics: [
      {
        term: "Trabalhador Independente (category B)",
        value:
          "The self-employed status tied to your personal NIF: no company, no capital, just an opening of activity (“início de atividade”) with the Autoridade Tributária. It is the functional equivalent of a sole-trader freelancer, not to be confused with a Unipessoal Lda.",
      },
      {
        term: "Simplified regime (regime simplificado)",
        value:
          "Available as long as your turnover stays below €200,000/year. No organised bookkeeping required: tax is computed on a flat-rate base, which clearly simplifies management in your early days.",
      },
      {
        term: "~0.75 coefficient for services",
        value:
          "For services, a coefficient of about 0.75 applies: IRS is computed on ~75% of turnover (i.e. a flat-rate deduction of about 25%), then the progressive IRS scale applies. This is a reference point, not your actual rate.",
      },
      {
        term: "Recibos verdes (recibos eletrónicos)",
        value:
          "Each service is invoiced via an electronic recibo verde issued on the Finanças portal. It is the central obligation of the Trabalhador Independente: with no recibo verde issued, there is no compliant invoice.",
      },
      {
        term: "Withholding at source (retenção na fonte)",
        value:
          "Depending on your situation and your client, withholding at source may apply to your invoices. The rules vary (thresholds, first year of activity, private or professional clients): a point to frame with the partner accountant.",
      },
      {
        term: "Social security (Segurança Social)",
        value:
          "The Trabalhador Independente contributes to Segurança Social on an income base set quarterly. An exemption from contributions usually applies in the first year of activity. The amounts depend on your declared income.",
      },
    ],

    invoiceEyebrow: "Your clients abroad",
    invoiceTitle: "Invoicing your FR/EU clients from Portugal",
    invoiceBody:
      "Most of the tech freelancers I support keep clients in France or elsewhere in the EU. That is perfectly possible, but there is a basic rule to understand: once you are a Portuguese tax resident, your worldwide income is taxable in Portugal, including what you invoice to a French client. Your client's location does not change where you are taxed; your tax residence does.",
    invoicePoints: [
      "Portuguese tax resident: worldwide income declared in Portugal, FR/EU clients included",
      "Intra-EU invoicing: valid NIF/NIPC, mentions and VAT number depending on your IVA situation",
      "Your IVA regime (registered or exemption) depends on your turnover and client type",
      "The 1971 France-Portugal treaty avoids double taxation, read case by case",
    ],

    ificiEyebrow: "The awkward question, handled honestly",
    ificiTitle: "IFICI: are you really entitled to it?",
    ificiBody:
      "The IFICI (Incentivo Fiscal à Investigação Científica e Inovação, nicknamed “NHR 2.0”) offers a 20% IRS rate on eligible activity income, for 10 years, provided you have not been a Portuguese tax resident in the previous 5 years. For a tech profile, it is appealing, but it is not automatic, and many nomads discover too late that they are not eligible. Here is the truth, with no promise.",
    ificiYes: {
      title: "What works in your favour",
      body: "Developers and qualified technical profiles probably feature among the highly qualified professions of Anexo I (engineers, ICT specialists). If you practise one of these listed professions, in the right framework, the IFICI may apply.",
    },
    ificiNo: {
      title: "The 100% foreign-client trap",
      body: "Many tech freelancers are NOT eligible: a profession outside the list, or an activity geared 100% towards a foreign employer/client without a link to an eligible Portuguese company. Being a developer is not enough, it is the exact framework of your activity that decides.",
    },
    ificiNote:
      "I am not a tax adviser and I never decide your eligibility for you. My role: ask the right questions, give you an honest reference point, and connect you with a partner tax adviser for the regulated decision.",
    ificiTestLabel: "Take the IFICI eligibility test",
    ificiGuideLabel: "Read the IFICI 2026 guide",

    ldaEyebrow: "When the freelancer grows",
    ldaTitle: "When to move to a Unipessoal Lda",
    ldaSubtitle:
      "The Trabalhador Independente is ideal to start with, but it has its limits as the activity grows. Moving to a company (Unipessoal Lda) becomes relevant in several cases. Here are the signals I look at with you, the final decision is made with the partner accountant and tax adviser.",
    ldaSteps: [
      {
        title: "Your turnover rises",
        description:
          "Above a certain level of profit, the IRC of a Unipessoal Lda (19%, or 15% SME on the first €50,000 of taxable profit) can become more favourable than the progressive IRS scale on ~75% of your turnover.",
      },
      {
        title: "Your clients require a company",
        description:
          "Some principals, large accounts or platforms prefer to contract with a legal entity (NIPC) rather than a self-employed individual. The Unipessoal Lda meets that expectation.",
      },
      {
        title: "You want to separate assets and activity",
        description:
          "The Unipessoal Lda creates a separate legal entity with a share capital of €1 per partner. Liability is in principle limited to contributions, which clearly separates your personal assets from the activity.",
      },
      {
        title: "You structure your remuneration",
        description:
          "Salary, dividends, reinvestment: a company opens remuneration trade-offs that a Trabalhador Independente does not have. These trade-offs require a personalised tax analysis, not a general rule.",
      },
    ],
    ldaLinkLabel: "See company formation",

    wordEyebrow: "The right word",
    wordTitle: "“Trabalhador Independente”, not “auto-entrepreneur”",
    wordBody:
      "In Portugal, there is no auto-entrepreneur, EURL or expert-comptable. You say Trabalhador Independente (the self-employed in category B), Unipessoal Lda (the single-partner company, €1 capital), NIF (your personal tax number) and NIPC (the company's), recibos verdes (your electronic invoices) and Contabilista Certificado (the accountant registered with the Ordem dos Contabilistas Certificados). Using the right term from the start spares you costly misunderstandings with the administration and your partners.",

    faqEyebrow: "Frequently asked questions",
    faqTitle: "What tech freelancers ask me",
    faq: [
      {
        q: "Do I need a company to invoice as a freelancer in Portugal?",
        a: "No, not necessarily. Most tech freelancers start as Trabalhador Independente (category B), with no company or capital: you simply open an activity (“início de atividade”) and issue recibos verdes. A company (Unipessoal Lda) becomes relevant as the activity grows, a point we look at together.",
      },
      {
        q: "I invoice French clients: where am I taxed?",
        a: "If you are a Portuguese tax resident, your worldwide income is taxable in Portugal, including what you invoice to French or EU clients. Your client's location does not change where you are taxed. The 1971 France-Portugal treaty avoids double taxation, but its reading depends on your case: that is a topic for the partner tax adviser.",
      },
      {
        q: "As a developer, am I entitled to the 20% IFICI?",
        a: "Maybe, but it is not automatic. Developers and qualified technical profiles probably feature among the Anexo I professions, which is a favourable point. But many freelancers are not eligible, particularly those whose activity is geared 100% towards a foreign client or employer without an eligible link. Take the eligibility test, then confirm with a partner tax adviser, I never decide for you.",
      },
      {
        q: "How does the simplified regime work for an IT freelancer?",
        a: "As long as your turnover stays below €200,000/year, you can fall under the simplified regime: for services, a coefficient of about 0.75 applies, so IRS is computed on about 75% of your turnover (flat-rate deduction of about 25%), then the progressive IRS scale applies. This is a reference point, not your actual rate: the partner Contabilista Certificado quantifies your situation.",
      },
      {
        q: "Are you an accountant or a tax adviser?",
        a: "No. Audrey Marques is a consultant in company formation and setup in Portugal, not an accountant, tax adviser or lawyer. I create your structure, I support you at the bank-account opening, and I connect you with a Contabilista Certificado (registered with the Ordem dos Contabilistas Certificados) for accounting and recibos verdes, and with a tax adviser for tax matters.",
      },
    ],

    disclaimerLabel: "Disclaimer",
    disclaimer:
      "This page is for information only and does not constitute personalised legal, accounting or tax advice. Business Portugal is neither an accounting nor a tax practice: accounting (recibos verdes included) is handled by a partner Contabilista Certificado and tax matters by a partner tax adviser. The figures quoted (simplified coefficient, €200,000 threshold, IRC 19%/15%, IVA 23%, IFICI 20%) are current as of 2026 and subject to change with each Finance Act (Orçamento do Estado). Your situation depends on your individual case and on the 1971 France-Portugal tax treaty. For an analysis of your project, book a meeting.",

    ctaTitle: "Let's talk about your move",
    ctaBody:
      "A first free conversation, with no commitment, to frame your status (Trabalhador Independente or Unipessoal Lda), your FR/EU invoicing and your real IFICI eligibility. We look at your situation, identify the right partners, and move forward together.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · Tech freelancer support · Lisbon, Portugal",

    breadcrumbHome: "Home",
    breadcrumbProfiles: "Profiles",
    breadcrumbCurrent: "IT freelancers & developers",
    serviceName: "Setup support for IT freelancers in Portugal",
  },
};

const pick = (l: string): Copy => (l === "en" ? COPY.en : COPY.fr);

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
    openGraph: {
      title: c.metaTitle,
      description: c.metaDesc,
      type: "website",
      url: urlFor(locale, PATH),
    },
  };
}

export default async function FreelanceItPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = pick(locale);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.serviceName,
    serviceType: c.serviceName,
    description: c.metaDesc,
    inLanguage: locale,
    url: urlFor(locale, PATH),
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "Country", name: "Portugal" },
    audience: {
      "@type": "Audience",
      audienceType:
        locale === "en"
          ? "IT freelancers and software developers"
          : "Freelances IT et développeurs",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: c.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: c.breadcrumbHome,
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: c.breadcrumbProfiles,
        item: `${SITE_URL}/${locale}/profils`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: c.breadcrumbCurrent,
        item: urlFor(locale, PATH),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique sérialisé côté serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique sérialisé côté serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique sérialisé côté serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="site-frame grid items-center gap-16 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:py-32">
          <div>
            <Reveal>
              <p className="eyebrow">{c.eyebrow}</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-serif text-[2.4rem] leading-[1.07] sm:text-5xl lg:text-[3.4rem]">
                <span className="block">{c.title}</span>
                <span className="block italic text-accent">{c.titleAccent}</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {c.lead}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group")}
                >
                  {c.ctaPrimary}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="#statut"
                  className="font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] hover:underline"
                >
                  {c.ctaSecondary}
                </a>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <p className="mt-9 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {c.trust}
              </p>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <aside className="border border-border bg-card">
              <div className="rule-brass" />
              <div className="p-8">
                <p className="eyebrow">{c.asideEyebrow}</p>
                <div className="mt-6 divide-y divide-border">
                  {c.asidePoints.map((it, i) => (
                    <div key={it} className="flex items-baseline gap-4 py-3">
                      <span className="index-num text-sm text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.98rem] leading-relaxed">{it}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Trabalhador Independente : régime simplifié & recibos verdes */}
      <section id="statut" className="scroll-mt-24 border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.tiEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.tiTitle}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.tiSubtitle}</p>
              </Reveal>
            </div>
            <div>
              <dl className="border-t border-border">
                {c.tiTopics.map((t, i) => (
                  <Reveal key={t.term} delay={i * 60}>
                    <div className="grid gap-2 border-b border-border py-6 sm:grid-cols-[0.4fr_0.6fr] sm:gap-8">
                      <dt className="font-serif text-lg">{t.term}</dt>
                      <dd className="leading-relaxed text-muted-foreground">{t.value}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Facturer ses clients FR/UE */}
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.invoiceEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.invoiceTitle}
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="text-lg leading-relaxed text-muted-foreground">{c.invoiceBody}</p>
              </Reveal>
              <Reveal delay={80}>
                <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2">
                  {c.invoicePoints.map((p, i) => (
                    <div key={p} className="flex items-baseline gap-4 bg-card p-6">
                      <span className="index-num text-sm text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-relaxed">{p}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={160}>
                <Link
                  href={FISCALITE_PATH}
                  className="mt-8 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.14em] text-accent underline-offset-[6px] hover:underline"
                >
                  {locale === "en" ? "Tax topics & introductions" : "Fiscalité & mise en relation"}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* IFICI : y avez-vous vraiment droit ? */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.ificiEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.ificiTitle}
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="text-lg leading-relaxed text-muted-foreground">{c.ificiBody}</p>
              </Reveal>
              <Reveal delay={80}>
                <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2">
                  <div className="bg-card p-7">
                    <span className="inline-block h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden />
                    <h3 className="mt-4 font-serif text-xl">{c.ificiYes.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{c.ificiYes.body}</p>
                  </div>
                  <div className="bg-card p-7">
                    <span className="inline-block h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden />
                    <h3 className="mt-4 font-serif text-xl">{c.ificiNo.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{c.ificiNo.body}</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-7 border-l-2 border-accent pl-5 text-sm italic leading-relaxed text-muted-foreground">
                  {c.ificiNote}
                </p>
              </Reveal>
              <Reveal delay={220}>
                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Link
                    href={IFICI_TEST_PATH}
                    className={cn(buttonVariants({ variant: "outline", size: "md" }), "group")}
                  >
                    {c.ificiTestLabel}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href={IFICI_GUIDE_PATH}
                    className="inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.14em] text-accent underline-offset-[6px] hover:underline"
                  >
                    {c.ificiGuideLabel}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Quand passer en Unipessoal Lda */}
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.ldaEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl sm:text-4xl">{c.ldaTitle}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.ldaSubtitle}
                </p>
                <Reveal delay={120}>
                  <Link
                    href={CREATION_PATH}
                    className="mt-6 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.14em] text-accent underline-offset-[6px] hover:underline"
                  >
                    {c.ldaLinkLabel}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </Reveal>
              </Reveal>
            </div>
            <div className="border-t border-border">
              {c.ldaSteps.map((s, i) => (
                <Reveal key={s.title} delay={i * 60}>
                  <div className="grid grid-cols-[auto_1fr] gap-6 border-b border-border py-8">
                    <span className="index-num text-2xl text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl">{s.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-muted-foreground">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Le bon mot */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <Reveal className="mx-auto max-w-3xl">
            <p className="eyebrow">{c.wordEyebrow}</p>
            <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.wordTitle}</h2>
            <div className="rule-brass mt-8 w-24" />
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">{c.wordBody}</p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.faqEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.faqTitle}</h2>
                <Reveal delay={120}>
                  <Link
                    href={FAQ_PATH}
                    className="mt-6 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.14em] text-accent underline-offset-[6px] hover:underline"
                  >
                    {locale === "en"
                      ? "All frequently asked questions"
                      : "Toutes les questions fréquentes"}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </Reveal>
              </Reveal>
            </div>
            <div>
              <dl className="border-t border-border">
                {c.faq.map((f, i) => (
                  <Reveal key={f.q} delay={i * 50}>
                    <div className="border-b border-border py-6">
                      <dt className="font-serif text-lg">{f.q}</dt>
                      <dd className="mt-2.5 leading-relaxed text-muted-foreground">{f.a}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer YMYL */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-16 lg:py-20">
          <Reveal className="max-w-3xl">
            <p className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
              {c.disclaimerLabel}
            </p>
            <p className="mt-4 border-l-2 border-accent pl-5 text-sm italic leading-relaxed text-muted-foreground">
              {c.disclaimer}
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-5 py-24 lg:px-8 lg:py-32">
        <Reveal>
          <div className="mx-auto max-w-5xl border border-border bg-primary px-8 py-20 text-center text-primary-foreground lg:px-16 lg:py-24">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl">{c.ctaTitle}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
              {c.ctaBody}
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group")}
              >
                {c.ctaButton}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <p className="mt-7 font-sans text-xs uppercase tracking-[0.16em] text-primary-foreground/55">
              {c.ctaReassurance}
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
