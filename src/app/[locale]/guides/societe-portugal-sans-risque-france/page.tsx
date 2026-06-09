import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { FaqList } from "@/components/faq/faq-list";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { FOUNDER_ID, LINKEDIN_URL, languagesFor, ORGANIZATION_ID, urlFor } from "@/lib/site";
import { cn } from "@/lib/utils";

const PATH = "/guides/societe-portugal-sans-risque-france";

// Dates ISO pour JSON-LD (datePublished / dateModified), à mettre à jour à
// chaque évolution réglementaire (Loi de Finances / Orçamento do Estado).
const DATE_PUBLISHED = "2026-06-09";
const DATE_MODIFIED = "2026-06-09";

type Props = { params: Promise<{ locale: string }> };

type Pillar = {
  id: string;
  kicker: string;
  title: string;
  lead: string;
  points: string[];
  takeaway: string;
};
type Faq = { q: string; a: string };
type Source = { label: string; note: string };

type Copy = {
  htmlLocale: string;
  metaTitle: string;
  metaDesc: string;

  breadcrumbHome: string;
  breadcrumbGuides: string;
  breadcrumbCurrent: string;

  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  published: string;
  updated: string;

  truthEyebrow: string;
  truthTitle: string;
  truthBody: string;
  truthChunkLabel: string;
  truthChunk: string;

  pillarsEyebrow: string;
  pillarsTitle: string;
  pillarsSubtitle: string;
  pillars: Pillar[];

  mythsEyebrow: string;
  mythsTitle: string;
  mythsSubtitle: string;
  mythGerantLabel: string;
  mythGerant: string;
  myth183Label: string;
  myth183: string;

  roleEyebrow: string;
  roleTitle: string;
  roleBody: string;
  roleItemsLabel: string;
  roleItems: string[];

  faqEyebrow: string;
  faqTitle: string;
  faqs: Faq[];

  disclaimerTitle: string;
  disclaimer: string;

  sourcesEyebrow: string;
  sourcesTitle: string;
  sourcesNote: string;
  sources: Source[];

  authorRole: string;
  authorBio: string;
  authorLink: string;

  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  ctaReassurance: string;
};

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    htmlLocale: "fr-FR",
    metaTitle: "Société au Portugal mais je vis en France : éviter le redressement",
    metaDesc:
      "Créer une société au Portugal en vivant en France : le vrai risque n'est pas la création, c'est la requalification fiscale française. Siège de direction effective, établissement stable, substance, exit tax, le guide honnête, sans « 0 risque ».",

    breadcrumbHome: "Accueil",
    breadcrumbGuides: "Guides",
    breadcrumbCurrent: "Société au Portugal sans risque en France",

    eyebrow: "Guide pilier · anti-redressement",
    title: "Société au Portugal mais je vis en France :",
    titleAccent: "le vrai risque n'est pas la création",
    lead: "Ouvrir une Unipessoal Lda au Portugal est devenu facile, une legaltech vous vend la coquille « en 2 h ». Mais si vous continuez à tout décider depuis la France, le danger n'est pas portugais : c'est l'administration fiscale française qui peut requalifier votre société et la considérer imposable en France. Ce guide explique, honnêtement, les critères qui décident vraiment, et où s'arrête mon rôle de consultante.",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Lire les 4 risques",
    published: "Publié le",
    updated: "Mis à jour le",

    truthEyebrow: "La vérité qu'on évite de vous dire",
    truthTitle: "Le risque de redressement n'est pas au Portugal, il est en France",
    truthBody:
      "Une société constituée au Portugal est portugaise sur le papier. Mais le droit fiscal ne regarde pas seulement le papier : il regarde où la société est réellement dirigée et où l'activité est réellement exercée. Si les décisions se prennent en France et que vous y travaillez, l'administration française peut considérer que la société est, en réalité, française, et réclamer l'impôt sur les sociétés correspondant, avec pénalités. La création « en 2 h » ne protège de rien : elle crée même une coquille vide, exactement ce que les administrations savent attaquer des deux côtés (abus de droit en France, règles ATAD/anti-abus au Portugal).",
    truthChunkLabel: "À retenir",
    truthChunk:
      "Vivre en France et piloter sa société portugaise depuis la France ne rend pas le montage illégal en soi, mais expose à un risque de requalification fiscale française. Le critère décisif est le lieu réel des décisions et de l'activité, pas l'adresse du siège. Aucun professionnel sérieux ne peut promettre « 0 risque » : tout dépend des faits propres à votre situation.",

    pillarsEyebrow: "Les 4 piliers de risque",
    pillarsTitle: "Ce que l'administration française regarde vraiment",
    pillarsSubtitle:
      "Ces critères s'apprécient en faisceau d'indices, jamais comme une règle binaire. Aucun seul élément ne « sauve » ni ne « condamne » un dossier : c'est la cohérence d'ensemble entre votre vie réelle et votre société qui compte.",
    pillars: [
      {
        id: "direction-effective",
        kicker: "Pilier 1, le critère qui décide tout",
        title: "Le siège de direction effective",
        lead: "Une société est résidente fiscale au Portugal si son siège social ou sa direction effective (« local de direção efetiva ») y est situé. Le lieu où se prennent les décisions stratégiques prime sur l'adresse du siège. Une Lda constituée au Portugal mais dirigée depuis la France peut donc être considérée comme résidente fiscale française, un cas de double résidence que la convention France-Portugal tranche ensuite selon le lieu de direction effective.",
        points: [
          "Ce qui compte : où sont prises les décisions de gestion (contrats, embauches, investissements, stratégie), pas la domiciliation.",
          "Tenir les organes de décision et signer les engagements importants au Portugal renforce la cohérence du dossier.",
          "Un gérant qui décide tout depuis son salon en France fragilise la résidence portugaise de la société.",
        ],
        takeaway:
          "Le siège de direction effective est le lieu où la société est réellement pilotée. S'il est en France, la société portugaise peut être imposée en France.",
      },
      {
        id: "etablissement-stable",
        kicker: "Pilier 2, le piège n°1 de la « société offshore légale »",
        title: "L'établissement stable en France",
        lead: "Même si la société reste résidente au Portugal, exercer son activité depuis une installation fixe en France (un bureau, votre domicile transformé en lieu de travail) peut créer un établissement stable français : une fraction du bénéfice devient alors imposable en France. Un établissement stable non déclaré a déjà donné lieu, en jurisprudence, à la reconstitution du chiffre d'affaires rattachable à la France.",
        points: [
          "L'établissement stable est une installation fixe d'affaires par laquelle l'activité est exercée, il n'a pas besoin d'être un local commercial dédié.",
          "L'OCDE (mise à jour 2025 sur le télétravail) évoque un repère indicatif autour de 50 % du temps de travail comme seuil de vigilance, un indice, pas un seuil légal automatique.",
          "Le risque concret : payer de l'IRC au Portugal ET de l'impôt en France sur la part rattachée à l'établissement stable.",
        ],
        takeaway:
          "Travailler régulièrement depuis la France pour votre société portugaise peut y créer un établissement stable imposable. Le pourcentage de temps n'est qu'un indice parmi d'autres.",
      },
      {
        id: "substance",
        kicker: "Pilier 3, la coquille vide est attaquable des deux côtés",
        title: "La substance économique réelle",
        lead: "Les standards BEPS et les directives ATAD I et II (transposées au Portugal par la Loi 24/2020, en vigueur depuis janvier 2022) exigent une activité économique réelle pour que les avantages fiscaux tiennent : personnel, locaux, équipements, décisions documentées. Une société sans substance, une simple boîte aux lettres, est fragile à la fois face à l'abus de droit français et aux règles anti-abus / CFC côté portugais.",
        points: [
          "La substance se prouve : contrat de domiciliation ou bureau réel, Contabilista Certificado, compte bancaire portugais actif, contrats, éventuel salarié ou prestataire local.",
          "Documenter où et par qui les décisions sont prises est aussi important que les chiffres.",
          "Plus la société a de réalité économique au Portugal, plus elle est défendable en cas de contrôle.",
        ],
        takeaway:
          "La substance économique n'est pas une option : c'est ce qui distingue une implantation défendable d'une coquille vide attaquable en France comme au Portugal.",
      },
      {
        id: "exit-tax",
        kicker: "Pilier 4, au moment de quitter la France",
        title: "L'exit tax au départ vers le Portugal",
        lead: "Si vous transférez réellement votre résidence fiscale de France vers le Portugal, l'exit tax (art. 167 bis du CGI) peut s'appliquer aux contribuables domiciliés en France au moins 6 des 10 années précédant le départ, lorsque leurs participations représentent au moins 50 % des bénéfices d'une société ou dépassent une valeur globale de 800 000 €.",
        points: [
          "Départ vers le Portugal (au sein de l'UE) : sursis de paiement automatique, sans constitution de garantie.",
          "Dégrèvement / libération après conservation des titres pendant 2 ans, ou 5 ans au-delà d'un certain seuil de valeur.",
          "Des évolutions ont été discutées en loi de finances : ce point doit impérativement être vérifié au cas par cas avant tout départ, avec un fiscaliste.",
        ],
        takeaway:
          "L'exit tax n'interdit pas le départ et bénéficie d'un sursis automatique vers l'UE, mais les seuils et la libération doivent être anticipés avec un fiscaliste avant de partir.",
      },
    ],

    mythsEyebrow: "Deux raccourcis dangereux",
    mythsTitle: "Le mythe du gérant résident et celui des 183 jours",
    mythsSubtitle:
      "Deux idées reçues circulent sur ce sujet. Toutes deux sont des raccourcis trompeurs, l'une fait dépenser pour rien, l'autre donne une fausse sécurité.",
    mythGerantLabel: "Mythe n°1, « il faut un gérant résident au Portugal »",
    mythGerant:
      "Faux. Aucune loi portugaise n'impose au gérant d'une Unipessoal Lda ou d'une Lda de résider au Portugal, d'y être de nationalité portugaise ni d'y passer 183 jours. Il vous faut un NIF (pour l'associé/gérant) et un NIPC (pour la société) ; un représentant fiscal n'est en principe nécessaire que pour les résidents hors UE/EEE. La nuance essentielle : l'absence d'obligation portugaise ne supprime pas le risque fiscal français si la société est, en réalité, dirigée depuis la France. Le mythe du gérant résident détourne l'attention du vrai sujet, le lieu des décisions.",
    myth183Label: "Mythe n°2, « moins de 183 jours en France et je suis tranquille »",
    myth183:
      "Faux pour les personnes physiques. Passer moins de 183 jours en France ne suffit pas à devenir non-résident fiscal. Les critères français (art. 4 B du CGI) sont alternatifs : foyer ou lieu de séjour principal, activité professionnelle principale, centre des intérêts économiques. La convention France-Portugal applique ensuite des critères successifs, foyer permanent, puis centre des intérêts vitaux, puis séjour habituel, puis nationalité. « La règle des 183 jours » prise isolément est un raccourci trompeur : votre famille, votre logement et le cœur de votre activité comptent davantage.",

    roleEyebrow: "Mon rôle, honnêtement",
    roleTitle: "J'alerte, je structure une implantation réelle, j'oriente vers le bon fiscaliste",
    roleBody:
      "Je suis consultante en création et implantation d'entreprise au Portugal, ni fiscaliste, ni comptable, ni avocate. Je ne vends jamais de montage, ni l'évitement de l'impôt, ni « 0 risque ». Ce que je fais : vous aider à construire une implantation réelle et documentée, vous expliquer franchement les risques côté France, et vous mettre en relation avec un fiscaliste compétent pour l'analyse de votre situation personnelle. La comptabilité réglementée est assurée par un Contabilista Certificado inscrit à l'OCC, partenaire du cabinet.",
    roleItemsLabel: "Ce que je fais, et ce que je ne fais pas",
    roleItems: [
      "Je réalise et coordonne la création de la société (NIF, statuts, Certidão Permanente, RCBE) et l'accompagnement bancaire.",
      "Je vous alerte sur les risques de requalification française et la nécessité de substance.",
      "Je vous oriente vers un fiscaliste partenaire pour la résidence fiscale, l'exit tax et le montage défendable.",
      "Je ne propose aucun montage artificiel et ne promets jamais un résultat fiscal ou « zéro impôt ».",
    ],

    faqEyebrow: "Questions fréquentes",
    faqTitle: "Société au Portugal et vie en France : vos questions",
    faqs: [
      {
        q: "Est-il illégal d'avoir une société au Portugal en vivant en France ?",
        a: "Non, ce n'est pas illégal en soi. La liberté d'établissement dans l'Union européenne vous autorise à créer une société dans un autre État membre. Le risque n'est pas la légalité de la création, mais la requalification fiscale : si la société est réellement dirigée depuis la France ou y dispose d'un établissement stable, l'administration française peut l'imposer en France. Tout dépend des faits propres à votre situation, à examiner au cas par cas.",
      },
      {
        q: "Qu'est-ce que le siège de direction effective ?",
        a: "C'est le lieu où sont réellement prises les décisions de gestion et de stratégie de la société. Le droit fiscal y attache plus d'importance qu'à l'adresse du siège social. Si votre Lda portugaise est dirigée depuis votre domicile en France, son siège de direction effective peut être considéré comme français, ce qui en ferait une résidente fiscale française. C'est le critère central de tout ce sujet.",
      },
      {
        q: "Faut-il obligatoirement un gérant résident au Portugal ?",
        a: "Non, c'est un mythe. Aucune loi portugaise n'impose au gérant d'une Unipessoal Lda ou d'une Lda de résider au Portugal ou d'y passer 183 jours. Mais attention : l'absence d'obligation portugaise ne supprime pas le risque fiscal français si vous dirigez la société depuis la France. Le vrai enjeu est le lieu des décisions, pas le statut de résidence du gérant.",
      },
      {
        q: "La règle des 183 jours suffit-elle pour ne plus être résident fiscal français ?",
        a: "Non, c'est un raccourci trompeur. Pour les personnes physiques, passer moins de 183 jours en France ne suffit pas. Les critères français sont alternatifs : foyer ou lieu de séjour principal, activité professionnelle principale, centre des intérêts économiques. La convention France-Portugal applique ensuite des critères successifs (foyer permanent, centre des intérêts vitaux, séjour habituel, nationalité). Votre famille, votre logement et votre activité comptent souvent plus que le décompte des jours.",
      },
      {
        q: "Comment réduire le risque de redressement de façon honnête ?",
        a: "En donnant de la substance réelle à la société et en prenant réellement les décisions au Portugal : bureau ou domiciliation, Contabilista Certificado, compte bancaire portugais actif, contrats, décisions documentées, éventuel personnel ou prestataire local. Et surtout en faisant analyser votre cas par un fiscaliste avant de vous lancer. Aucun professionnel honnête ne peut promettre « 0 risque » : l'objectif est une implantation défendable, pas une garantie.",
      },
      {
        q: "Devrai-je payer l'exit tax en quittant la France pour le Portugal ?",
        a: "Peut-être, selon votre situation. L'exit tax (art. 167 bis du CGI) peut concerner les personnes domiciliées en France au moins 6 des 10 dernières années, dont les participations atteignent 50 % des bénéfices d'une société ou dépassent 800 000 € de valeur globale. Un départ vers le Portugal, au sein de l'UE, ouvre droit à un sursis de paiement automatique, avec libération après quelques années de conservation des titres. Les seuils et l'application exacte doivent être vérifiés avec un fiscaliste avant le départ.",
      },
    ],

    disclaimerTitle: "Information, pas conseil personnalisé",
    disclaimer:
      "Ce guide a une vocation strictement informative et pédagogique. Il ne constitue ni un conseil juridique, comptable ou fiscal personnalisé, ni une promesse de résultat. La fiscalité internationale dépend des faits propres à chaque situation et de la convention fiscale France-Portugal du 14 janvier 1971 ; elle évolue à chaque Loi de Finances et à chaque Orçamento do Estado. Aucune formule de ce guide ne doit être lue comme une garantie de « 0 risque ». Pour analyser votre cas, faites-vous accompagner par un fiscaliste compétent : c'est précisément le type d'orientation que j'organise après un premier échange. Informations à jour en juin 2026, susceptibles d'évoluer.",

    sourcesEyebrow: "Sources & cadre",
    sourcesTitle: "Sur quoi s'appuie ce guide",
    sourcesNote:
      "Ces références encadrent les faits cités. Elles ne remplacent pas l'analyse d'un fiscaliste sur votre situation. Les liens officiels sont à consulter directement (impots.gouv.fr, bofip.impots.gouv.fr, légifrance, diariodarepublica.pt).",
    sources: [
      {
        label: "Convention fiscale France-Portugal du 14 janvier 1971",
        note: "Résidence, double imposition, établissement stable, critères successifs de résidence.",
      },
      {
        label: "BOFiP, art. 4 B et 167 bis du CGI",
        note: "Résidence fiscale des personnes physiques, exit tax, établissement stable côté France.",
      },
      {
        label: "Modèle OCDE & mise à jour 2025 sur le télétravail",
        note: "Repère indicatif (~50 % du temps) pour le risque d'établissement stable, indice, pas seuil légal.",
      },
      {
        label: "Directives ATAD I/II, Loi portugaise 24/2020 (en vigueur depuis janvier 2022)",
        note: "Exigence de substance économique réelle, règles anti-abus et CFC.",
      },
    ],

    authorRole: "Consultante en implantation & création d'entreprise au Portugal",
    authorBio:
      "Fondatrice de Business Portugal, Audrey accompagne depuis 2025 plus de 75 entrepreneurs francophones dans la création de leur société au Portugal et l'ouverture de leur compte bancaire. Sur les questions de fiscalité internationale, elle alerte, structure une implantation réelle et met en relation avec un fiscaliste, elle n'est ni comptable, ni fiscaliste, ni avocate.",
    authorLink: "En savoir plus sur Audrey",

    ctaTitle: "Avant de créer, parlons du risque France",
    ctaBody:
      "Un premier échange gratuit et sans engagement pour cadrer votre projet, évaluer la cohérence de votre future implantation et vous orienter vers le bon fiscaliste si votre situation l'exige. On avance sur des bases honnêtes.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance:
      "Sans engagement · Orientation vers un fiscaliste si besoin · Lisbonne, Portugal",
  },
  en: {
    htmlLocale: "en-GB",
    metaTitle: "A Portuguese company while living in France: avoiding a tax reassessment",
    metaDesc:
      "Setting up a company in Portugal while living in France: the real risk isn't the incorporation, it's French tax reclassification. Place of effective management, permanent establishment, substance, exit tax, the honest guide, no “zero risk”.",

    breadcrumbHome: "Home",
    breadcrumbGuides: "Guides",
    breadcrumbCurrent: "A Portuguese company without French risk",

    eyebrow: "Pillar guide · reassessment risk",
    title: "A company in Portugal while living in France:",
    titleAccent: "the real risk isn't the incorporation",
    lead: "Opening a Unipessoal Lda in Portugal has become easy, a legaltech will sell you the shell “in 2 hours”. But if you keep making every decision from France, the danger isn't Portuguese: it's the French tax authority, which can reclassify your company and treat it as taxable in France. This guide explains, honestly, the criteria that actually decide, and where my role as a consultant ends.",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "Read the 4 risks",
    published: "Published",
    updated: "Updated",

    truthEyebrow: "The truth no one tells you",
    truthTitle: "The reassessment risk isn't in Portugal, it's in France",
    truthBody:
      "A company incorporated in Portugal is Portuguese on paper. But tax law looks beyond the paper: it looks at where the company is actually run and where the activity is actually carried out. If decisions are made in France and you work from there, the French authority may consider the company effectively French, and claim the corresponding corporate tax, with penalties. The “2-hour” incorporation protects nothing: it even creates an empty shell, exactly what authorities know how to challenge on both sides (abuse of law in France, ATAD/anti-abuse rules in Portugal).",
    truthChunkLabel: "Key takeaway",
    truthChunk:
      "Living in France and running your Portuguese company from France doesn't make the arrangement illegal in itself, but it exposes you to a risk of French tax reclassification. The decisive criterion is where decisions are actually made and where the activity actually happens, not the registered address. No serious professional can promise “zero risk”: everything depends on the facts of your specific situation.",

    pillarsEyebrow: "The 4 risk pillars",
    pillarsTitle: "What the French authority really looks at",
    pillarsSubtitle:
      "These criteria are assessed as a body of evidence, never as a binary rule. No single element “saves” or “condemns” a case: what matters is the overall consistency between your real life and your company.",
    pillars: [
      {
        id: "direction-effective",
        kicker: "Pillar 1, the criterion that decides everything",
        title: "The place of effective management",
        lead: "A company is tax-resident in Portugal if its registered office or its place of effective management (“local de direção efetiva”) is located there. Where strategic decisions are made outweighs the registered address. So a Lda incorporated in Portugal but run from France can be deemed a French tax resident, a dual-residence case that the France-Portugal treaty then resolves on the basis of effective management.",
        points: [
          "What counts: where management decisions are made (contracts, hiring, investments, strategy), not where the office is registered.",
          "Holding decision-making bodies and signing major commitments in Portugal strengthens the consistency of the file.",
          "A manager who decides everything from their living room in France weakens the company's Portuguese residence.",
        ],
        takeaway:
          "The place of effective management is where the company is actually run. If that's in France, the Portuguese company may be taxed in France.",
      },
      {
        id: "etablissement-stable",
        kicker: "Pillar 2, the number-one trap of the “legal offshore company”",
        title: "A permanent establishment in France",
        lead: "Even if the company stays resident in Portugal, carrying out its activity through a fixed place of business in France (an office, your home turned into a workplace) can create a French permanent establishment: a portion of the profit then becomes taxable in France. An undeclared permanent establishment has already led, in case law, to a reconstruction of the turnover attributable to France.",
        points: [
          "A permanent establishment is a fixed place of business through which the activity is carried out, it needn't be a dedicated commercial premises.",
          "The OECD (2025 update on remote work) mentions an indicative marker around 50% of working time as a vigilance threshold, a clue, not an automatic legal threshold.",
          "The concrete risk: paying IRC in Portugal AND tax in France on the share attributed to the permanent establishment.",
        ],
        takeaway:
          "Regularly working from France for your Portuguese company can create a taxable permanent establishment there. The percentage of time is only one clue among others.",
      },
      {
        id: "substance",
        kicker: "Pillar 3, an empty shell is attackable on both sides",
        title: "Real economic substance",
        lead: "BEPS standards and the ATAD I and II directives (transposed in Portugal by Law 24/2020, in force since January 2022) require genuine economic activity for tax advantages to hold: staff, premises, equipment, documented decisions. A company without substance, a mere mailbox, is fragile both against abuse of law in France and against anti-abuse / CFC rules in Portugal.",
        points: [
          "Substance must be proven: a domiciliation contract or real office, a Contabilista Certificado, an active Portuguese bank account, contracts, possibly a local employee or contractor.",
          "Documenting where and by whom decisions are made matters as much as the figures.",
          "The more genuine economic reality the company has in Portugal, the more defensible it is in the event of an audit.",
        ],
        takeaway:
          "Economic substance is not optional: it's what separates a defensible setup from an empty shell that can be attacked in France as well as in Portugal.",
      },
      {
        id: "exit-tax",
        kicker: "Pillar 4, when you leave France",
        title: "Exit tax on departure to Portugal",
        lead: "If you genuinely move your tax residence from France to Portugal, the exit tax (art. 167 bis of the French CGI) may apply to taxpayers domiciled in France for at least 6 of the 10 years before departure, where their holdings represent at least 50% of a company's profits or exceed a total value of €800,000.",
        points: [
          "Departure to Portugal (within the EU): automatic payment deferral, with no guarantee required.",
          "Relief / discharge after holding the securities for 2 years, or 5 years above a certain value threshold.",
          "Changes have been discussed in finance bills: this point must absolutely be checked case by case with a tax adviser before any departure.",
        ],
        takeaway:
          "Exit tax doesn't prevent leaving and benefits from automatic deferral within the EU, but the thresholds and the discharge must be anticipated with a tax adviser before you go.",
      },
    ],

    mythsEyebrow: "Two dangerous shortcuts",
    mythsTitle: "The resident-manager myth and the 183-day myth",
    mythsSubtitle:
      "Two misconceptions circulate on this topic. Both are misleading shortcuts, one makes you spend for nothing, the other gives false security.",
    mythGerantLabel: "Myth 1, “you must have a manager resident in Portugal”",
    mythGerant:
      "False. No Portuguese law requires the manager of a Unipessoal Lda or a Lda to reside in Portugal, to hold Portuguese nationality, or to spend 183 days there. You need a NIF (for the partner/manager) and a NIPC (for the company); a fiscal representative is in principle only required for residents outside the EU/EEA. The essential nuance: the absence of a Portuguese obligation does not remove the French tax risk if the company is, in reality, run from France. The resident-manager myth distracts from the real issue, where decisions are made.",
    myth183Label: "Myth 2, “under 183 days in France and I'm safe”",
    myth183:
      "False for individuals. Spending fewer than 183 days in France is not enough to become a non-resident. The French criteria (art. 4 B of the CGI) are alternative: home or main place of stay, main professional activity, centre of economic interests. The France-Portugal treaty then applies successive criteria, permanent home, then centre of vital interests, then habitual abode, then nationality. “The 183-day rule” taken in isolation is a misleading shortcut: your family, your home and the core of your activity weigh more.",

    roleEyebrow: "My role, honestly",
    roleTitle: "I warn you, I help build a real setup, and I refer you to the right tax adviser",
    roleBody:
      "I'm a consultant in company formation and business setup in Portugal, not a tax adviser, not an accountant, not a lawyer. I never sell arrangements, tax avoidance, or “zero risk”. What I do: help you build a real, documented setup, explain the French-side risks frankly, and connect you with a competent tax adviser to analyse your personal situation. Regulated accounting is handled by a Contabilista Certificado registered with the OCC, a partner of the practice.",
    roleItemsLabel: "What I do, and what I don't",
    roleItems: [
      "I carry out and coordinate the company formation (NIF, articles of association, Certidão Permanente, RCBE) and the banking support.",
      "I warn you about French reclassification risks and the need for substance.",
      "I refer you to a partner tax adviser for tax residence, exit tax and a defensible setup.",
      "I never offer any artificial arrangement and never promise a tax outcome or “zero tax”.",
    ],

    faqEyebrow: "Frequently asked questions",
    faqTitle: "A Portuguese company while living in France: your questions",
    faqs: [
      {
        q: "Is it illegal to own a company in Portugal while living in France?",
        a: "No, it isn't illegal in itself. Freedom of establishment in the European Union allows you to set up a company in another member state. The risk isn't the legality of the incorporation, but tax reclassification: if the company is actually run from France or has a permanent establishment there, the French authority can tax it in France. It all depends on the facts of your situation, to be examined case by case.",
      },
      {
        q: "What is the place of effective management?",
        a: "It's where the company's management and strategic decisions are actually made. Tax law attaches more importance to this than to the registered address. If your Portuguese Lda is run from your home in France, its place of effective management may be deemed French, which would make it a French tax resident. This is the central criterion of the whole topic.",
      },
      {
        q: "Do you absolutely need a manager resident in Portugal?",
        a: "No, that's a myth. No Portuguese law requires the manager of a Unipessoal Lda or a Lda to reside in Portugal or to spend 183 days there. But beware: the absence of a Portuguese obligation does not remove the French tax risk if you run the company from France. The real issue is where decisions are made, not the manager's residence status.",
      },
      {
        q: "Is the 183-day rule enough to stop being a French tax resident?",
        a: "No, that's a misleading shortcut. For individuals, spending fewer than 183 days in France is not enough. The French criteria are alternative: home or main place of stay, main professional activity, centre of economic interests. The France-Portugal treaty then applies successive criteria (permanent home, centre of vital interests, habitual abode, nationality). Your family, your home and your activity often weigh more than the day count.",
      },
      {
        q: "How can I honestly reduce the reassessment risk?",
        a: "By giving the company real substance and genuinely making decisions in Portugal: office or domiciliation, a Contabilista Certificado, an active Portuguese bank account, contracts, documented decisions, possibly local staff or a contractor. And above all by having your case analysed by a tax adviser before you start. No honest professional can promise “zero risk”: the goal is a defensible setup, not a guarantee.",
      },
      {
        q: "Will I have to pay exit tax when leaving France for Portugal?",
        a: "Possibly, depending on your situation. The exit tax (art. 167 bis of the CGI) can apply to people domiciled in France for at least 6 of the last 10 years whose holdings reach 50% of a company's profits or exceed €800,000 in total value. A departure to Portugal, within the EU, gives entitlement to an automatic payment deferral, with discharge after a few years of holding the securities. The thresholds and exact application must be checked with a tax adviser before departure.",
      },
    ],

    disclaimerTitle: "Information, not personalised advice",
    disclaimer:
      "This guide is strictly informative and educational. It does not constitute personalised legal, accounting or tax advice, nor a promise of any result. International taxation depends on the facts of each situation and on the France-Portugal tax treaty of 14 January 1971; it changes with every Finance Act and every Orçamento do Estado. No wording in this guide should be read as a guarantee of “zero risk”. To analyse your case, work with a competent tax adviser, which is precisely the kind of referral I arrange after a first conversation. Information up to date in June 2026, subject to change.",

    sourcesEyebrow: "Sources & framework",
    sourcesTitle: "What this guide is based on",
    sourcesNote:
      "These references frame the facts cited. They do not replace a tax adviser's analysis of your situation. Official sources should be consulted directly (impots.gouv.fr, bofip.impots.gouv.fr, légifrance, diariodarepublica.pt).",
    sources: [
      {
        label: "France-Portugal tax treaty of 14 January 1971",
        note: "Residence, double taxation, permanent establishment, successive residence criteria.",
      },
      {
        label: "BOFiP, art. 4 B and 167 bis of the CGI",
        note: "Tax residence of individuals, exit tax, permanent establishment on the French side.",
      },
      {
        label: "OECD model & 2025 update on remote work",
        note: "Indicative marker (~50% of time) for permanent-establishment risk, a clue, not a legal threshold.",
      },
      {
        label: "ATAD I/II directives, Portuguese Law 24/2020 (in force since January 2022)",
        note: "Requirement of real economic substance, anti-abuse and CFC rules.",
      },
    ],

    authorRole: "Consultant in business setup & company formation in Portugal",
    authorBio:
      "Founder of Business Portugal, Audrey has supported more than 75 French-speaking entrepreneurs since 2025 in setting up their company in Portugal and opening their bank account. On international tax matters, she warns, builds a real setup and connects clients with a tax adviser, she is neither an accountant, nor a tax adviser, nor a lawyer.",
    authorLink: "More about Audrey",

    ctaTitle: "Before you incorporate, let's talk about the France risk",
    ctaBody:
      "A first free, no-commitment conversation to frame your project, assess the consistency of your future setup and refer you to the right tax adviser if your situation calls for it. We move forward on honest foundations.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · Referral to a tax adviser if needed · Lisbon, Portugal",
  },
};

const pick = (l: string): Copy => (l === "en" ? COPY.en : COPY.fr);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = pick(locale);
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    authors: [{ name: "Audrey Marques", url: urlFor(locale, "/a-propos") }],
    alternates: {
      canonical: urlFor(locale, PATH),
      languages: languagesFor(PATH),
    },
    openGraph: {
      type: "article",
      title: c.metaTitle,
      description: c.metaDesc,
      url: urlFor(locale, PATH),
      publishedTime: DATE_PUBLISHED,
      modifiedTime: DATE_MODIFIED,
      authors: ["Audrey Marques"],
    },
  };
}

function formatDate(iso: string, htmlLocale: string): string {
  return new Date(iso).toLocaleDateString(htmlLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function GuideSocietePortugalSansRisquePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = pick(locale);

  const pageUrl = urlFor(locale, PATH);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.metaTitle,
    description: c.metaDesc,
    inLanguage: locale,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    author: { "@id": FOUNDER_ID },
    publisher: { "@id": ORGANIZATION_ID },
    about: [
      "Siège de direction effective",
      "Établissement stable",
      "Substance économique",
      "Exit tax",
      "Résidence fiscale France-Portugal",
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: c.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: c.breadcrumbHome, item: urlFor(locale, "/") },
      {
        "@type": "ListItem",
        position: 2,
        name: c.breadcrumbGuides,
        item: urlFor(locale, "/guides"),
      },
      { "@type": "ListItem", position: 3, name: c.breadcrumbCurrent, item: pageUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique sérialisé côté serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
        <div className="site-frame grid items-center gap-16 py-24 lg:grid-cols-[1.18fr_0.82fr] lg:py-32">
          <div>
            <Reveal>
              <nav
                aria-label="Breadcrumb"
                className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground"
              >
                <Link
                  href="/guides"
                  className="underline-offset-[6px] hover:text-foreground hover:underline"
                >
                  {c.breadcrumbGuides}
                </Link>
              </nav>
            </Reveal>
            <Reveal delay={60}>
              <p className="eyebrow mt-6">{c.eyebrow}</p>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="mt-6 font-serif text-[2.4rem] leading-[1.07] sm:text-5xl lg:text-[3.4rem]">
                <span className="block">{c.title}</span>
                <span className="block italic text-accent">{c.titleAccent}</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {c.lead}
              </p>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group")}
                >
                  {c.ctaPrimary}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="#risques"
                  className="font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] hover:underline"
                >
                  {c.ctaSecondary}
                </a>
              </div>
            </Reveal>
            <Reveal delay={340}>
              <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <span>
                  {c.published}{" "}
                  <time dateTime={DATE_PUBLISHED}>{formatDate(DATE_PUBLISHED, c.htmlLocale)}</time>
                </span>
                <span className="inline-block h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden />
                <span>
                  {c.updated}{" "}
                  <time dateTime={DATE_MODIFIED}>{formatDate(DATE_MODIFIED, c.htmlLocale)}</time>
                </span>
              </div>
            </Reveal>
          </div>

          {/* Bloc auteur */}
          <Reveal delay={200}>
            <aside className="border border-border bg-card">
              <div className="rule-brass" />
              <div className="p-7">
                {/* TODO : remplacer par la photo HD d'Audrey (alt descriptif) */}
                <div className="flex items-start gap-5">
                  <div className="h-14 w-14 shrink-0 rounded-full bg-muted" aria-hidden />
                  <div>
                    <p className="font-serif text-lg">Audrey Marques</p>
                    <p className="mt-1 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                      {c.authorRole}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{c.authorBio}</p>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] hover:underline"
                >
                  {c.authorLink}
                </a>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* La vérité + chunk extractible */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.truthEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.truthTitle}
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="text-lg leading-relaxed text-muted-foreground">{c.truthBody}</p>
              </Reveal>
              <Reveal delay={80}>
                <aside className="mt-10 border border-border bg-background p-7">
                  <p className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
                    {c.truthChunkLabel}
                  </p>
                  <p className="mt-4 text-[1.05rem] leading-relaxed text-foreground/90">
                    {c.truthChunk}
                  </p>
                </aside>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Les 4 piliers de risque */}
      <section id="risques" className="scroll-mt-24 border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{c.pillarsEyebrow}</p>
            <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.pillarsTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {c.pillarsSubtitle}
            </p>
          </Reveal>

          <div className="mt-14 border-t border-border">
            {c.pillars.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <article
                  id={p.id}
                  className="scroll-mt-24 grid gap-8 border-b border-border py-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16"
                >
                  <div className="lg:sticky lg:top-28 lg:self-start">
                    <span className="index-num text-3xl text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-4 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                      {p.kicker}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl leading-snug sm:text-[1.7rem]">
                      {p.title}
                    </h3>
                  </div>
                  <div>
                    <p className="text-lg leading-relaxed text-muted-foreground">{p.lead}</p>
                    <ul className="mt-6 space-y-3">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-baseline gap-3 text-[1.02rem]">
                          <span
                            className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-accent"
                            aria-hidden
                          />
                          <span className="leading-relaxed">{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-7 border-l-2 border-accent pl-5 text-[1.02rem] leading-relaxed text-foreground/90">
                      {p.takeaway}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Les deux mythes */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{c.mythsEyebrow}</p>
            <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.mythsTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.mythsSubtitle}</p>
          </Reveal>

          <div className="mt-14 grid gap-px border border-border bg-border lg:grid-cols-2">
            <Reveal className="bg-card">
              <div className="h-full p-8">
                <span className="inline-block h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden />
                <p className="mt-5 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                  {c.mythGerantLabel}
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">{c.mythGerant}</p>
              </div>
            </Reveal>
            <Reveal delay={80} className="bg-card">
              <div className="h-full p-8">
                <span className="inline-block h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden />
                <p className="mt-5 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                  {c.myth183Label}
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">{c.myth183}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mon rôle */}
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.roleEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.roleTitle}
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="text-lg leading-relaxed text-muted-foreground">{c.roleBody}</p>
              </Reveal>
              <Reveal delay={80}>
                <p className="mt-10 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                  {c.roleItemsLabel}
                </p>
              </Reveal>
              <div className="mt-4 border-t border-border">
                {c.roleItems.map((it, i) => (
                  <Reveal key={it} delay={i * 60}>
                    <div className="flex items-baseline gap-5 border-b border-border py-4">
                      <span className="index-num text-sm text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[1.05rem] leading-relaxed">{it}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{c.faqEyebrow}</p>
            <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.faqTitle}</h2>
          </Reveal>
          <Reveal delay={80} className="mt-12 lg:mt-16">
            <FaqList items={c.faqs.map((f) => ({ q: f.q, a: f.a }))} />
          </Reveal>
        </div>
      </section>

      {/* Sources + disclaimer YMYL renforcé */}
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.sourcesEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.sourcesTitle}
                </h2>
                <p className="mt-5 leading-relaxed text-muted-foreground">{c.sourcesNote}</p>
              </Reveal>
            </div>
            <div>
              <div className="border-t border-border">
                {c.sources.map((s, i) => (
                  <Reveal key={s.label} delay={i * 60}>
                    <div className="grid gap-2 border-b border-border py-6 sm:grid-cols-[0.46fr_0.54fr] sm:gap-8">
                      <p className="font-serif text-lg leading-snug">{s.label}</p>
                      <p className="leading-relaxed text-muted-foreground">{s.note}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={80}>
                <aside className="mt-10 border-l-2 border-accent bg-card py-6 pl-6 pr-6">
                  <p className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
                    {c.disclaimerTitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {c.disclaimer}
                  </p>
                </aside>
              </Reveal>
            </div>
          </div>
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
