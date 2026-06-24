import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { FaqItem } from "@/components/faq/faq-list";
import { FaqList } from "@/components/faq/faq-list";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { BUSINESS_ID, languagesFor, ORGANIZATION_ID, urlFor, WEBSITE_ID } from "@/lib/site";
import { cn } from "@/lib/utils";

const PATH = "/faq";

type Props = { params: Promise<{ locale: string }> };

type Group = { heading: string; items: FaqItem[] };

type Copy = {
  metaTitle: string;
  metaDesc: string;
  eyebrow: string;
  title: string;
  intro: string;
  updatedLabel: string;
  updatedDate: string;
  groups: Group[];
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  disclaimerTitle: string;
  disclaimer: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  pageName: string;
};

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    metaTitle: "FAQ création société au Portugal : 30 réponses claires",
    metaDesc:
      "Créer une société au Portugal depuis la France : coûts, délais, NIF, statuts, IRC, IFICI, banque, risque de requalification. 30 réponses claires et à jour 2026.",
    eyebrow: "Questions fréquentes",
    title: "Questions fréquentes sur la création et l'implantation d'entreprise au Portugal",
    intro:
      "Vous trouverez ici des réponses courtes et honnêtes aux questions que se posent le plus souvent les francophones qui veulent créer ou implanter leur entreprise au Portugal : démarches, coûts, NIF, statuts, fiscalité, banque, et le vrai sujet que beaucoup oublient, le risque fiscal si l'on gère sa société portugaise depuis la France. Les chiffres cités sont à jour de 2026 et donnés à titre informatif ; ils ne remplacent pas une analyse de votre situation. Si votre cas est particulier, le plus simple reste un premier échange gratuit et sans engagement.",
    updatedLabel: "Mis à jour le",
    updatedDate: "9 juin 2026",
    groups: [
      {
        heading: "Création & démarches",
        items: [
          {
            q: "Peut-on créer une société au Portugal sans y résider ni être résident fiscal ?",
            a: "Oui. Aucune loi portugaise n'impose de résider au Portugal pour y créer une Lda ou une Unipessoal Lda, ni d'y être résident fiscal. Un ressortissant de l'Union européenne, comme un Français, obtient son NIF à distance et n'a pas besoin de résider au Portugal pour créer. En revanche, la signature des statuts et l'ouverture du compte bancaire se font en personne au Portugal : prévoyez une venue. La vraie question n'est pas l'autorisation de créer, mais le lieu où vous dirigerez réellement l'activité, c'est ce point qui détermine où votre société sera imposée.",
          },
          {
            q: "Comment créer une société au Portugal depuis la France, avec un minimum de déplacements ?",
            a: "Le parcours combine des étapes à distance et une venue sur place. À distance : obtention du NIF des associés, choix du nom et de l'objet social, cadrage du projet en visio. En personne au Portugal : la signature des statuts (puis émission de la Certidão Permanente sous 24 à 48 heures, déclaration du RCBE par notre avocat partenaire) et l'ouverture du compte bancaire professionnel. Chez Business Portugal, Audrey réalise elle-même la création et vous accompagne sur place ; comptez en général une venue à Lisbonne, que nous préparons pour qu'elle soit unique.",
          },
          {
            q: "Quelles sont les démarches pour immatriculer une société au Portugal ?",
            a: "Il faut un NIF pour chaque associé et gérant, un nom de société validé, un objet social (activité principale et activités secondaires), un capital social et l'identité des associés. La société est ensuite constituée par la signature des statuts en personne au Portugal, puis vous recevez la Certidão Permanente, le RCBE (déclaré par notre avocat partenaire) et les statuts ; le compte bancaire s'ouvre sur place, lors de la même venue. C'est un enchaînement de formalités simple sur le papier, mais où une erreur de paramétrage peut coûter cher ensuite, d'où l'intérêt d'être accompagné dès le départ.",
          },
          {
            q: "Qu'est-ce que l'Empresa na Hora et comment ça marche ?",
            a: "L'Empresa na Hora est un dispositif officiel qui permet de constituer une société portugaise en une séance, à partir de statuts types et d'un nom pré-approuvé. C'est rapide, mais cela suppose d'être présent sur place et de se contenter de statuts standardisés, ce qui ne convient pas à toutes les situations (associés à l'étranger, objet social sur mesure, montage à plusieurs). La vitesse n'est pas toujours un avantage : une coquille créée trop vite, sans paramétrage adapté ni substance réelle, peut poser des problèmes par la suite.",
          },
          {
            q: "Quels documents faut-il fournir pour créer sa société et obtenir son NIF ?",
            a: "Pour le NIF, on demande généralement une pièce d'identité ou un passeport et un justificatif de domicile récent. Pour la création de société, il faut les informations sur l'entreprise (adresse, capital social, objet principal et activités secondaires) et l'identité des associés et gérants. Pour la banque, on utilise les documents de la société créée (Certidão Permanente, RCBE, statuts), le numéro fiscal du gérant dans son pays et les justificatifs propres à la banque.",
          },
        ],
      },
      {
        heading: "Coûts & délais",
        items: [
          {
            q: "Combien coûte réellement la création d'une société au Portugal ?",
            a: "Le coût se compose des frais administratifs d'immatriculation, de l'obtention du NIF, et, selon votre cas, de la domiciliation et de la comptabilité mensuelle. Business Portugal ne publie pas de grille figée car chaque projet est différent : le tarif est communiqué sur devis, après un premier échange gratuit, frais administratifs inclus dans le package. Méfiez-vous des prix d'appel très bas affichés par certaines plateformes : ils excluent souvent le NIF, la banque ou la comptabilité, et masquent le vrai budget.",
          },
          {
            q: "Combien de temps faut-il pour créer une société au Portugal ?",
            a: "Comptez en moyenne environ trois semaines pour un dossier complet, une fois tous les éléments réunis (NIF, identité des associés, objet social, justificatifs). Après l'immatriculation, la Certidão Permanente est disponible sous 24 à 48 heures. Ce délai dépend de la réactivité du client à fournir ses documents et des banques pour la partie compliance : aucun cabinet sérieux ne peut garantir une date absolue, car elle dépend en partie des administrations.",
          },
          {
            q: "Quel est le capital social minimum pour ouvrir une Lda ou une Unipessoal Lda au Portugal ?",
            a: "Le capital social minimum légal d'une Lda ou d'une Unipessoal Lda est de 1 € par associé. C'est un point régulièrement faux dans les contenus francophones, qui citent encore 5 000 € : ce chiffre est erroné. En pratique, Audrey recommande souvent de prévoir un capital plus réaliste, de l'ordre de 1 000 €, pour donner de la cohérence au dossier, notamment auprès des banques. Une SA (Sociedade Anónima), elle, exige bien un capital de 50 000 €.",
          },
          {
            q: "Combien coûte un comptable pour une société au Portugal chaque mois ?",
            a: "Au Portugal, une société doit obligatoirement avoir un comptable agréé (Contabilista Certificado), ce qui représente un coût mensuel récurrent. Pour une petite structure, le budget se situe généralement autour de 200 à 250 € par mois, variable selon le volume d'opérations et la complexité du dossier. Business Portugal ne fait pas la comptabilité elle-même : Audrey vous met en relation avec des partenaires comptables de confiance (Raly Conseils, Joongle).",
          },
        ],
      },
      {
        heading: "NIF, NIPC & représentant fiscal",
        items: [
          {
            q: "Comment obtenir un NIF au Portugal en tant que non-résident, à distance ?",
            a: "Le NIF (numéro d'identification fiscale des particuliers) s'obtient à distance, via un représentant fiscal au Portugal, sur présentation d'une pièce d'identité et d'un justificatif de domicile. C'est la première brique de tout projet : sans NIF, on ne peut ni créer de société, ni ouvrir de compte, ni signer de bail. Business Portugal s'occupe de cette démarche pour vous sans que vous ayez à vous déplacer ; le NIF est la seule étape entièrement à distance, la signature des statuts et l'ouverture du compte se faisant ensuite en personne au Portugal.",
          },
          {
            q: "Quelle est la différence entre le NIF et le NIPC au Portugal ?",
            a: "Le NIF (Número de Identificação Fiscal) identifie une personne physique auprès de l'administration fiscale portugaise. Le NIPC (Número de Identificação de Pessoa Coletiva) identifie une personne morale, c'est-à-dire une société. Concrètement, chaque associé et gérant a son NIF, et la société, une fois créée, reçoit son NIPC ; les deux numéros servent ensuite pour toutes les démarches fiscales et bancaires.",
          },
          {
            q: "Faut-il un représentant fiscal pour obtenir un NIF ou créer une société quand on est non-résident ?",
            a: "Pour un résident de l'Union européenne ou de l'EEE, comme un Français, un représentant fiscal n'est en principe plus obligatoire depuis l'assouplissement des règles : vous pouvez obtenir un NIF sans représentant. L'obligation de représentant fiscal concerne surtout les personnes résidant hors UE/EEE. C'est un point qui crée souvent de la confusion ; le mieux est de vérifier votre cas précis lors de l'échange, car la situation diffère selon votre pays de résidence.",
          },
          {
            q: "Comment obtenir son numéro de sécurité sociale (NISS) au Portugal ?",
            a: "Le NISS (Número de Identificação de Segurança Social) est le numéro de sécurité sociale portugais, distinct du NIF. Il devient nécessaire dès que vous exercez une activité soumise à cotisations (indépendant, gérant rémunéré, salarié) ou que vous embauchez. La démarche se fait auprès de la Segurança Social et fait partie des étapes que Business Portugal peut coordonner selon votre situation, en lien avec le comptable partenaire.",
          },
        ],
      },
      {
        heading: "Statuts juridiques",
        items: [
          {
            q: "Quelle forme juridique choisir au Portugal : ENI, Trabalhador Independente, Unipessoal Lda ou Lda ?",
            a: "Le choix dépend de votre activité, de votre chiffre d'affaires et de votre besoin de protéger votre patrimoine. L'ENI (Empresário em Nome Individual) et le statut de Trabalhador Independente conviennent à un démarrage en solo et à faible volume, mais sans séparation entre patrimoine personnel et professionnel. La Unipessoal Lda (société unipersonnelle à responsabilité limitée) protège votre patrimoine et reste accessible avec un seul associé ; la Lda est sa version à plusieurs associés. Le bon arbitrage se fait au cas par cas, lors du premier échange.",
          },
          {
            q: "Quelle est la différence entre une Lda et une Unipessoal Lda ?",
            a: "Les deux sont des sociétés à responsabilité limitée qui protègent le patrimoine personnel de l'associé. La différence tient au nombre d'associés : la Unipessoal Lda a un associé unique, tandis que la Lda en compte au moins deux. Le capital minimum est de 1 € par associé dans les deux cas, et les obligations comptables sont équivalentes. On choisit l'une ou l'autre selon que vous lancez votre activité seul ou à plusieurs.",
          },
          {
            q: "Quel est l'équivalent de la SARL ou de l'EURL au Portugal ?",
            a: "Il n'y a pas d'équivalence parfaite, et il vaut mieux raisonner avec les statuts portugais qu'avec les sigles français. La Unipessoal Lda est l'analogue le plus proche de l'EURL (société à responsabilité limitée à associé unique), et la Lda celui de la SARL (plusieurs associés). Attention : parler de « SARL », « EURL » ou « auto-entrepreneur » pour décrire le Portugal entretient des confusions juridiques et fiscales, les règles portugaises ne sont pas calquées sur les françaises.",
          },
          {
            q: "À partir de quel chiffre d'affaires vaut-il mieux créer une société plutôt que rester ENI ou indépendant ?",
            a: "Il n'y a pas de seuil universel : tout dépend de votre marge, de votre besoin de protection patrimoniale et de votre fiscalité globale. En pratique, passer d'un statut individuel (ENI / Trabalhador Independente) à une société (Unipessoal Lda) devient pertinent quand l'activité se développe, que les revenus montent ou que vous voulez séparer clairement patrimoine personnel et professionnel. C'est typiquement une décision à chiffrer avec un comptable ; Business Portugal vous oriente vers le bon interlocuteur pour la simulation.",
          },
        ],
      },
      {
        heading: "Fiscalité & IFICI",
        items: [
          {
            q: "Quel est le taux de l'impôt sur les sociétés (IRC) au Portugal en 2026 ?",
            a: "En 2026, le taux général de l'IRC (impôt sur les sociétés) est de 19 %. Les PME bénéficient d'un taux réduit de 15 % sur les premiers 50 000 € de bénéfice imposable, le surplus étant taxé à 19 %. S'y ajoutent une derrama municipale (jusqu'à 1,5 % selon la commune) et, seulement au-delà de 1,5 M€ de bénéfice, une derrama d'État qui ne concerne pas la plupart des PME. (Taux 2026, susceptibles d'évoluer avec la loi de finances.)",
          },
          {
            q: "Quelle est la différence entre l'IRS, l'IRC et l'IVA au Portugal ?",
            a: "L'IRS est l'impôt sur le revenu des personnes physiques (salariés, indépendants, retraités). L'IRC est l'impôt sur le bénéfice des sociétés. L'IVA est la TVA portugaise, dont le taux standard est de 23 %. Ces trois impôts répondent à des logiques et des déclarations différentes ; le comptable agréé de votre société s'occupe de l'IRC et de l'IVA, tandis que l'IRS relève de votre situation personnelle.",
          },
          {
            q: "Qu'est-ce que l'IFICI (RNH 2.0) et qui peut en bénéficier en 2026 ?",
            a: "L'IFICI (Incentivo Fiscal à Investigação Científica e Inovação) est le régime fiscal qui a remplacé l'ancien RNH ; « RNH 2.0 » n'en est qu'un surnom marketing, pas son nom légal (art. 58-A du Código dos Benefícios Fiscais, Portaria 352/2024). Il réserve un taux d'IRS de 20 % sur les revenus d'activité éligible (catégories A et B) pendant 10 ans non renouvelables, à condition de ne pas avoir été résident fiscal au Portugal lors des 5 dernières années. Il vise des profils actifs qualifiés (enseignants-chercheurs, professions hautement qualifiées dans des entreprises exportatrices, startups certifiées, R&D). Audrey vous alerte sur l'éligibilité et vous met en relation avec le bon fiscaliste ; elle ne réalise pas l'analyse elle-même.",
          },
          {
            q: "Les retraités peuvent-ils encore bénéficier du RNH au Portugal en 2026 ?",
            a: "Non. C'est le changement majeur par rapport à l'ancien RNH : l'IFICI exclut totalement les pensions de retraite étrangères, et il n'existe plus d'avantage forfaitaire pour les retraités. Une pension privée française devient imposable au Portugal au barème progressif de l'IRS (catégorie H), tandis qu'une pension publique de fonctionnaire reste imposable en France au titre de la convention fiscale du 14 janvier 1971. Seuls les bénéficiaires inscrits au RNH avant fin 2023 conservent leurs anciens avantages jusqu'à la fin de leurs 10 ans.",
          },
          {
            q: "Comment demander l'IFICI et quelle est la date limite ?",
            a: "La demande se dépose sur le Portal das Finanças, jusqu'au 15 janvier de l'année qui suit celle où vous devenez résident fiscal au Portugal (par exemple : résidence fiscale en 2026 → demande avant le 15 janvier 2027). Ce délai est strict : une demande tardive ne produit effet qu'à partir de l'année de dépôt et vous fait perdre une ou plusieurs des 10 années d'avantage. Pour les profils dont l'entité ou le projet doit être reconnu au préalable, il faut s'y prendre bien en amont ; c'est un point que le fiscaliste partenaire sécurise avec vous.",
          },
          {
            q: "Dois-je facturer l'IVA et qu'est-ce que la franchise sous 15 000 € ?",
            a: "L'IVA (TVA portugaise) au taux standard de 23 % s'applique à la plupart des ventes et prestations. Les petites structures peuvent bénéficier d'une franchise (isenção) tant que leur chiffre d'affaires de l'année précédente reste sous le seuil d'environ 15 000 €, ce qui les dispense de facturer l'IVA. Pour le e-commerce intra-UE, des règles spécifiques s'appliquent (seuil de 10 000 € et guichet OSS). Le périmètre exact dépend de votre activité ; votre comptable agréé le cadre précisément.",
          },
        ],
      },
      {
        heading: "Banque & opérationnel",
        items: [
          {
            q: "Comment ouvrir un compte bancaire professionnel au Portugal pour sa société ?",
            a: "L'ouverture d'un compte professionnel se fait après la création de la société, avec la Certidão Permanente, le RCBE, les statuts, le NIF du gérant et les justificatifs demandés par la banque. C'est souvent l'étape la plus délicate, à cause de la compliance (vérifications anti-blanchiment), surtout pour les profils non-résidents ou non-européens. C'est justement un savoir-faire de Business Portugal : Audrey réalise elle-même l'accompagnement bancaire, avec Millennium comme partenaire, là où beaucoup d'entrepreneurs se retrouvent bloqués seuls.",
          },
          {
            q: "Un compte Revolut ou Wise suffit-il pour ma société portugaise ?",
            a: "Pour les opérations courantes, ces comptes peuvent dépanner, mais ils ne remplacent pas un compte bancaire local portugais. Un IBAN étranger (par exemple lituanien pour Revolut Business) est souvent inadapté pour régler l'État portugais, IVA, IRC, cotisations à la Segurança Social, qui attend des prélèvements depuis un compte domestique. Un compte local reste donc, en pratique, indispensable pour une société qui exerce réellement au Portugal.",
          },
        ],
      },
      {
        heading: "Vivre/travailler depuis la France & requalification",
        items: [
          {
            q: "Un Français peut-il créer une société au Portugal tout en continuant à vivre en France ?",
            a: "Oui, c'est possible, et fréquent : il faut une adresse de domiciliation au Portugal et, le plus souvent, pouvoir justifier d'une partie de l'activité en local. Le point de vigilance, trop souvent passé sous silence, reste la direction effective. Si vous dirigez réellement votre société depuis la France, c'est là que se prennent les décisions et que vous travaillez, sans aucune substance au Portugal, l'administration française peut considérer que le siège de direction effective est en France et imposer la société en France, voire y voir un établissement stable non déclaré. Le danger n'est pas la création de la société, qui est simple, mais sa requalification fiscale ultérieure. Audrey alerte sur ce point et vous oriente vers un fiscaliste ; elle ne réalise pas elle-même le montage fiscal.",
          },
          {
            q: "Faut-il un gérant qui réside au Portugal pour ma société portugaise ?",
            a: "Non, c'est un mythe : aucune loi portugaise n'impose que le gérant d'une Lda ou d'une Unipessoal Lda réside au Portugal ou y passe un nombre minimum de jours. En revanche, l'absence d'obligation portugaise ne supprime pas le risque fiscal côté français : si la société est réellement pilotée depuis la France, elle peut y être rattachée fiscalement. Autrement dit, ce n'est pas une case juridique à cocher, mais une question de substance réelle de l'activité, où elle est dirigée, où elle a ses moyens.",
          },
          {
            q: "La règle des 183 jours suffit-elle pour ne plus être imposé en France ?",
            a: "Non, c'est l'un des raccourcis les plus trompeurs de l'expatriation. Passer moins de 183 jours en France ne suffit pas à devenir non-résident : l'administration française regarde aussi votre foyer (où vit votre famille), votre centre des intérêts vitaux et votre activité professionnelle principale, qui sont des critères alternatifs. On peut donc rester résident fiscal français malgré moins de 183 jours sur le territoire. La résidence fiscale se détermine par un faisceau d'indices, pas par un simple compteur de jours, un point à valider avec un fiscaliste.",
          },
        ],
      },
      {
        heading: "Accompagnement & garanties",
        items: [
          {
            q: "Pourquoi se faire accompagner par Business Portugal plutôt que faire les démarches seul ?",
            a: "Parce que créer la société n'est qu'une partie du chemin : il faut aussi obtenir le NIF, débloquer la banque, choisir le bon statut, trouver un comptable agréé et éviter les pièges fiscaux côté France, le tout en portugais et avec plusieurs interlocuteurs. Business Portugal vous offre un seul point de contact francophone : Audrey réalise elle-même la création et l'accompagnement bancaire, et vous connecte aux bons experts (comptable, fiscaliste, juridique, recrutement) au lieu de vous laisser jongler seul dans une langue étrangère. C'est le modèle du chef d'orchestre d'implantation, plutôt que dix prestataires à coordonner vous-même.",
          },
          {
            q: "Comment être sûr que ce n'est pas une arnaque et que l'accompagnement est fiable ?",
            a: "Quelques repères simples permettent de juger : un interlocuteur humain identifié et joignable, une transparence sur ce qui est inclus ou non, et le recours à un Contabilista Certificado inscrit au registre public de l'OCC (l'ordre portugais des comptables), un comptable agréé étant d'ailleurs obligatoire pour toute société. Business Portugal s'appuie sur des preuves concrètes : environ 75 entrepreneurs accompagnés depuis 2025, des partenaires nommés (Millennium pour la banque, Raly Conseils et Joongle pour la comptabilité) et un premier échange gratuit pour juger sans engagement. Fuyez à l'inverse les promesses du type « zéro impôt garanti » ou « société en 2 heures sans rien vérifier » : sur la fiscalité, l'honnêteté vaut mieux que les superlatifs.",
          },
        ],
      },
    ],
    ctaTitle: "Une question qui n'est pas ici ?",
    ctaBody:
      "Chaque projet a ses particularités. Le premier échange est gratuit et sans engagement, en français, pour faire le point sur votre situation et vous dire honnêtement ce qui est faisable.",
    ctaButton: "Réserver un diagnostic gratuit",
    disclaimerTitle: "Avertissement",
    disclaimer:
      "Cette page est informative et pédagogique. Elle ne constitue pas un conseil juridique, fiscal ou comptable personnalisé, ni une promesse de résultat. La fiscalité et le droit des sociétés évoluent (notamment avec la loi de finances portugaise et la loi de finances française) ; les montants et taux indiqués sont à jour de 2026 et doivent être vérifiés au regard de votre situation. Audrey Marques est consultante en création et implantation d'entreprise au Portugal ; pour les questions fiscales, juridiques et comptables, elle vous met en relation avec des professionnels qualifiés. Pour toute décision, faites valider votre cas par le professionnel compétent.",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "FAQ",
    pageName: "Questions fréquentes sur la création et l'implantation d'entreprise au Portugal",
  },
  en: {
    metaTitle: "Portugal company formation FAQ: 30 clear answers",
    metaDesc:
      "Setting up a company in Portugal from abroad: costs, timelines, NIF, legal forms, IRC, IFICI, banking, reclassification risk. 30 clear answers, up to date for 2026.",
    eyebrow: "Frequently asked questions",
    title: "Frequently asked questions on setting up and establishing a business in Portugal",
    intro:
      "Here you'll find short, honest answers to the questions most often asked by people wanting to set up or establish their business in Portugal: procedures, costs, NIF, legal forms, taxation, banking, and the real issue many forget, the tax risk of running a Portuguese company from abroad. The figures quoted are up to date for 2026 and provided for information only; they do not replace an analysis of your situation. If your case is specific, the simplest route is a first conversation, free and with no commitment.",
    updatedLabel: "Updated on",
    updatedDate: "9 June 2026",
    groups: [
      {
        heading: "Formation & procedures",
        items: [
          {
            q: "Can you set up a company in Portugal without living there or being a tax resident?",
            a: "Yes. No Portuguese law requires you to reside in Portugal to set up a Lda or a Unipessoal Lda, nor to be a tax resident there. An EU national, such as a French citizen, obtains their NIF remotely and doesn't need to be resident to set up. However, signing the articles and opening the bank account are done in person in Portugal: plan a visit. The real question isn't whether you're allowed to set up, but where you will actually run the business, that's what determines where your company will be taxed.",
          },
          {
            q: "How do you set up a company in Portugal from abroad with minimal travel?",
            a: "The process combines remote steps and one on-site visit. Remotely: obtaining the partners' NIF, choosing the name and business object, framing the project by video call. In person in Portugal: signing the articles (then the Certidão Permanente is issued within 24 to 48 hours, and our partner lawyer files the RCBE) and opening the business bank account. At Business Portugal, Audrey carries out the incorporation herself and supports you on site; plan, as a rule, for one trip to Lisbon, which we prepare so it is single.",
          },
          {
            q: "What are the steps to register a company in Portugal?",
            a: "You need a NIF for each partner and manager, an approved company name, a business object (main and secondary activities), share capital and the identity of the partners. The company is then incorporated by signing the articles in person in Portugal, after which you receive the Certidão Permanente, the RCBE (filed by our partner lawyer) and the articles of association; the bank account is opened on site, during the same visit. It's a sequence of formalities that looks simple on paper, but where a setup error can prove costly later, which is why it pays to be supported from the start.",
          },
          {
            q: "What is Empresa na Hora and how does it work?",
            a: "Empresa na Hora is an official scheme that lets you incorporate a Portuguese company in a single session, using template articles of association and a pre-approved name. It's fast, but it means being present on site and accepting standardised articles, which doesn't suit every situation (partners abroad, bespoke business object, multi-partner structures). Speed isn't always an advantage: a shell set up too quickly, without proper configuration or real substance, can cause problems down the line.",
          },
          {
            q: "What documents are needed to set up your company and obtain your NIF?",
            a: "For the NIF, you'll generally be asked for an ID document or passport and a recent proof of address. For company formation, you need information about the business (address, share capital, main object and secondary activities) and the identity of the partners and managers. For the bank, you use the documents of the incorporated company (Certidão Permanente, RCBE, articles), the manager's tax number in their home country and the bank's own supporting documents.",
          },
        ],
      },
      {
        heading: "Costs & timelines",
        items: [
          {
            q: "How much does it really cost to set up a company in Portugal?",
            a: "The cost is made up of the administrative registration fees, obtaining the NIF, and, depending on your case, domiciliation and monthly accounting. Business Portugal doesn't publish a fixed price list because every project is different: the fee is given by quote, after a free first conversation, with administrative fees included in the package. Be wary of very low headline prices shown by some platforms: they often exclude the NIF, the bank or the accounting, and hide the real budget.",
          },
          {
            q: "How long does it take to set up a company in Portugal?",
            a: "Allow on average around three weeks for a complete file, once all the elements are gathered (NIF, partners' identity, business object, supporting documents). After registration, the Certidão Permanente is available within 24 to 48 hours. This timeline depends on how quickly the client provides their documents and on the banks for the compliance part: no serious firm can guarantee an absolute date, as it partly depends on the administrations.",
          },
          {
            q: "What is the minimum share capital to open a Lda or a Unipessoal Lda in Portugal?",
            a: "The legal minimum share capital of a Lda or a Unipessoal Lda is €1 per partner. This is a point regularly stated wrongly in French-language content, which still quotes €5,000: that figure is incorrect. In practice, Audrey often recommends planning a more realistic capital, in the region of €1,000, to give the file consistency, particularly with banks. An SA (Sociedade Anónima), on the other hand, does require €50,000 of capital.",
          },
          {
            q: "How much does an accountant for a company in Portugal cost each month?",
            a: "In Portugal, a company must have a certified accountant (Contabilista Certificado), which is a recurring monthly cost. For a small structure, the budget is generally around €200 to €250 per month, varying with the volume of transactions and the complexity of the file. Business Portugal does not do the accounting itself: Audrey connects you with trusted accounting partners (Raly Conseils, Joongle).",
          },
        ],
      },
      {
        heading: "NIF, NIPC & fiscal representative",
        items: [
          {
            q: "How do you obtain a NIF in Portugal as a non-resident, remotely?",
            a: "The NIF (an individual's tax identification number) is obtained remotely, through a tax representative in Portugal, on presentation of an ID document and a proof of address. It's the first building block of any project: without a NIF, you can't set up a company, open an account or sign a lease. Business Portugal handles this step for you without you having to travel; the NIF is the only fully remote step, as signing the articles and opening the account are then done in person in Portugal.",
          },
          {
            q: "What is the difference between the NIF and the NIPC in Portugal?",
            a: "The NIF (Número de Identificação Fiscal) identifies a natural person with the Portuguese tax authority. The NIPC (Número de Identificação de Pessoa Coletiva) identifies a legal person, i.e. a company. In practice, each partner and manager has their NIF, and the company, once created, receives its NIPC; both numbers then serve for all tax and banking procedures.",
          },
          {
            q: "Do you need a fiscal representative to obtain a NIF or set up a company as a non-resident?",
            a: "For a resident of the European Union or the EEA, such as a French citizen, a fiscal representative is in principle no longer mandatory since the rules were relaxed: you can obtain a NIF without a representative. The fiscal-representative requirement mainly concerns people residing outside the EU/EEA. This is a point that often causes confusion; it's best to check your specific case during the conversation, as the situation differs depending on your country of residence.",
          },
          {
            q: "How do you obtain your social security number (NISS) in Portugal?",
            a: "The NISS (Número de Identificação de Segurança Social) is the Portuguese social security number, separate from the NIF. It becomes necessary as soon as you carry out an activity subject to contributions (self-employed, paid manager, employee) or take on staff. The procedure is done with the Segurança Social and is one of the steps Business Portugal can coordinate depending on your situation, together with the partner accountant.",
          },
        ],
      },
      {
        heading: "Legal forms",
        items: [
          {
            q: "Which legal form to choose in Portugal: ENI, Trabalhador Independente, Unipessoal Lda or Lda?",
            a: "The choice depends on your activity, your turnover and your need to protect your personal assets. The ENI (Empresário em Nome Individual) and the Trabalhador Independente status suit a solo, low-volume start, but with no separation between personal and business assets. The Unipessoal Lda (single-member limited-liability company) protects your assets and is accessible with a single partner; the Lda is its multi-partner version. The right call is made on a case-by-case basis, during the first conversation.",
          },
          {
            q: "What is the difference between a Lda and a Unipessoal Lda?",
            a: "Both are limited-liability companies that protect the partner's personal assets. The difference lies in the number of partners: the Unipessoal Lda has a single partner, whereas the Lda has at least two. The minimum capital is €1 per partner in both cases, and the accounting obligations are equivalent. You choose one or the other depending on whether you launch your activity alone or with others.",
          },
          {
            q: "What is the equivalent of a French SARL or EURL in Portugal?",
            a: 'There is no perfect equivalence, and it\'s better to reason with the Portuguese forms than with French acronyms. The Unipessoal Lda is the closest analogue to the EURL (single-member limited-liability company), and the Lda to the SARL (several partners). Be careful: describing Portugal in terms of "SARL", "EURL" or "auto-entrepreneur" maintains legal and tax confusion, the Portuguese rules are not modelled on the French ones.',
          },
          {
            q: "From what turnover is it better to set up a company rather than stay an ENI or sole trader?",
            a: "There's no universal threshold: it all depends on your margin, your need for asset protection and your overall taxation. In practice, moving from an individual status (ENI / Trabalhador Independente) to a company (Unipessoal Lda) becomes relevant when the activity grows, income rises or you want to clearly separate personal and business assets. This is typically a decision to model with an accountant; Business Portugal points you to the right person for the simulation.",
          },
        ],
      },
      {
        heading: "Taxation & IFICI",
        items: [
          {
            q: "What is the corporate income tax (IRC) rate in Portugal in 2026?",
            a: "In 2026, the general IRC (corporate income tax) rate is 19%. SMEs benefit from a reduced rate of 15% on the first €50,000 of taxable profit, with the excess taxed at 19%. On top of this come a municipal derrama (up to 1.5% depending on the municipality) and, only above €1.5M of profit, a state derrama that does not concern most SMEs. (2026 rates, subject to change with the finance act.)",
          },
          {
            q: "What is the difference between IRS, IRC and IVA in Portugal?",
            a: "IRS is the income tax on natural persons (employees, self-employed, retirees). IRC is the tax on companies' profit. IVA is Portuguese VAT, whose standard rate is 23%. These three taxes follow different logics and returns; your company's certified accountant handles IRC and IVA, while IRS falls under your personal situation.",
          },
          {
            q: "What is the IFICI (NHR 2.0) and who can benefit from it in 2026?",
            a: 'The IFICI (Incentivo Fiscal à Investigação Científica e Inovação) is the tax regime that replaced the former NHR; "NHR 2.0" is only a marketing nickname, not its legal name (art. 58-A of the Código dos Benefícios Fiscais, Portaria 352/2024). It grants a 20% IRS rate on eligible activity income (categories A and B) for 10 non-renewable years, provided you haven\'t been a tax resident in Portugal in the previous 5 years. It targets active, qualified profiles (academic researchers, highly qualified professions in exporting companies, certified startups, R&D). Audrey flags eligibility and connects you with the right tax adviser; she does not carry out the analysis herself.',
          },
          {
            q: "Can retirees still benefit from the NHR in Portugal in 2026?",
            a: "No. This is the major change from the former NHR: the IFICI completely excludes foreign retirement pensions, and there is no longer a flat-rate advantage for retirees. A French private pension becomes taxable in Portugal under the progressive IRS scale (category H), while a public civil-service pension remains taxable in France under the tax treaty of 14 January 1971. Only those registered for the NHR before the end of 2023 keep their former advantages until the end of their 10 years.",
          },
          {
            q: "How do you apply for the IFICI and what is the deadline?",
            a: "The application is filed on the Portal das Finanças, until 15 January of the year following the one in which you become a tax resident in Portugal (for example: tax residence in 2026 → application before 15 January 2027). This deadline is strict: a late application only takes effect from the year it is filed and makes you lose one or more of the 10 years of benefit. For profiles whose entity or project must be recognised beforehand, you need to start well in advance; this is a point the partner tax adviser secures with you.",
          },
          {
            q: "Do I have to charge IVA, and what is the exemption under €15,000?",
            a: "IVA (Portuguese VAT) at the standard rate of 23% applies to most sales and services. Small structures can benefit from an exemption (isenção) as long as their previous-year turnover stays below the threshold of around €15,000, which exempts them from charging IVA. For intra-EU e-commerce, specific rules apply (€10,000 threshold and OSS one-stop shop). The exact scope depends on your activity; your certified accountant frames it precisely.",
          },
        ],
      },
      {
        heading: "Banking & operations",
        items: [
          {
            q: "How do you open a business bank account in Portugal for your company?",
            a: "Opening a business account is done after the company is set up, with the Certidão Permanente, the RCBE, the articles, the manager's NIF and the supporting documents requested by the bank. It's often the trickiest step, because of compliance (anti-money-laundering checks), especially for non-resident or non-European profiles. This is precisely a Business Portugal speciality: Audrey carries out the banking support herself, with Millennium as a partner, where many entrepreneurs end up stuck on their own.",
          },
          {
            q: "Is a Revolut or Wise account enough for my Portuguese company?",
            a: "For everyday transactions, these accounts can help out, but they don't replace a local Portuguese bank account. A foreign IBAN (for example Lithuanian for Revolut Business) is often unsuitable for paying the Portuguese state, IVA, IRC, Segurança Social contributions, which expects direct debits from a domestic account. A local account therefore remains, in practice, indispensable for a company genuinely operating in Portugal.",
          },
        ],
      },
      {
        heading: "Living/working from abroad & reclassification",
        items: [
          {
            q: "Can a French resident set up a company in Portugal while continuing to live in France?",
            a: "Yes, it's possible, and common: you need a registered address in Portugal and, most often, to be able to show part of the activity takes place locally. The point to watch, too often left unsaid, is effective management. If you actually run your company from France, that's where decisions are made and where you work, with no substance in Portugal, the French authorities may consider that the place of effective management is in France and tax the company in France, or even see an undeclared permanent establishment. The danger isn't setting up the company, which is simple, but its later tax reclassification. Audrey flags this point and points you to a tax adviser; she does not carry out the tax structuring herself.",
          },
          {
            q: "Do you need a manager who resides in Portugal for your Portuguese company?",
            a: "No, that's a myth: no Portuguese law requires the manager of a Lda or a Unipessoal Lda to reside in Portugal or spend a minimum number of days there. However, the absence of a Portuguese obligation does not remove the tax risk on the French side: if the company is genuinely run from France, it may be attached there for tax purposes. In other words, it's not a legal box to tick, but a question of the real substance of the activity, where it's run, where it has its resources.",
          },
          {
            q: "Is the 183-day rule enough to no longer be taxed in France?",
            a: "No, it's one of the most misleading shortcuts of expatriation. Spending fewer than 183 days in France is not enough to become a non-resident: the French authorities also look at your home (where your family lives), your centre of vital interests and your main professional activity, which are alternative criteria. You can therefore remain a French tax resident despite fewer than 183 days on the territory. Tax residence is determined by a body of evidence, not by a simple day counter, a point to validate with a tax adviser.",
          },
        ],
      },
      {
        heading: "Support & guarantees",
        items: [
          {
            q: "Why be supported by Business Portugal rather than handle the procedures alone?",
            a: "Because setting up the company is only part of the journey: you also need to obtain the NIF, unlock the bank, choose the right status, find a certified accountant and avoid the tax pitfalls on the French side, all in Portuguese and with several contacts. Business Portugal gives you a single French-speaking point of contact: Audrey carries out the formation and banking support herself, and connects you with the right experts (accounting, tax, legal, recruitment) instead of leaving you to juggle alone in a foreign language. It's the model of an establishment conductor, rather than ten providers for you to coordinate yourself.",
          },
          {
            q: "How can I be sure it's not a scam and that the support is reliable?",
            a: 'A few simple markers help you judge: an identified, reachable human contact, transparency about what\'s included or not, and the use of a Contabilista Certificado listed on the OCC public register (the Portuguese order of accountants), a certified accountant being mandatory for any company. Business Portugal relies on concrete evidence: around 75 entrepreneurs supported since 2025, named partners (Millennium for banking, Raly Conseils and Joongle for accounting) and a free first conversation so you can judge without commitment. Conversely, run from promises like "guaranteed zero tax" or "a company in 2 hours with no checks": on taxation, honesty beats superlatives.',
          },
        ],
      },
    ],
    ctaTitle: "A question that isn't here?",
    ctaBody:
      "Every project has its specifics. The first conversation is free and with no commitment, to review your situation and tell you honestly what's feasible.",
    ctaButton: "Book a free assessment",
    disclaimerTitle: "Disclaimer",
    disclaimer:
      "This page is for information and educational purposes. It does not constitute personalised legal, tax or accounting advice, nor a promise of results. Taxation and company law evolve (notably with the Portuguese and French finance acts); the amounts and rates indicated are up to date for 2026 and must be checked against your situation. Audrey Marques is a consultant in company formation and establishment in Portugal; for tax, legal and accounting questions, she connects you with qualified professionals. For any decision, have your case validated by the relevant professional.",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "FAQ",
    pageName: "Frequently asked questions on setting up and establishing a business in Portugal",
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

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = pick(locale);

  const allItems = c.groups.flatMap((g) => g.items);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${urlFor(locale, PATH)}#faqpage`,
    inLanguage: locale,
    url: urlFor(locale, PATH),
    name: c.pageName,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    provider: { "@id": BUSINESS_ID },
    mainEntity: allItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
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
        item: urlFor(locale, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique sérialisé côté serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="site-frame py-24 lg:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 className="mt-6 font-serif text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
            {c.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{c.intro}</p>
          <p className="mt-7 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {c.updatedLabel} {c.updatedDate}
          </p>
        </Reveal>

        <div className="mt-16 space-y-16 lg:mt-24 lg:space-y-24">
          {c.groups.map((group, gi) => (
            <Reveal key={group.heading} delay={gi === 0 ? 0 : 60}>
              <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <span className="inline-block h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden />
                  <h2 className="mt-5 font-serif text-2xl leading-[1.15] sm:text-3xl">
                    {group.heading}
                  </h2>
                </div>
                <FaqList items={[...group.items]} />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={60}>
          <div className="mt-16 border-t border-border pt-8 lg:mt-24">
            <p className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {c.disclaimerTitle}
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {c.disclaimer}
            </p>
          </div>
        </Reveal>
      </section>

      <section className="px-5 pb-24 lg:px-8 lg:pb-32">
        <Reveal>
          <div className="mx-auto max-w-5xl border border-border bg-primary px-8 py-16 text-center text-primary-foreground lg:px-16 lg:py-20">
            <h2 className="font-serif text-3xl sm:text-4xl">{c.ctaTitle}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
              {c.ctaBody}
            </p>
            <div className="mt-9 flex justify-center">
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group")}
              >
                {c.ctaButton}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
