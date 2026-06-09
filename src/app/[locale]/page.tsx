import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HomeFaq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { Network } from "@/components/home/network";
import { Positioning } from "@/components/home/positioning";
import { Process } from "@/components/home/process";
import { HomeTools } from "@/components/home/tools";
import { TrustBar } from "@/components/home/trust-bar";
import { languagesFor, urlFor } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const title = isEn
    ? "Set up your company in Portugal, with one French-speaking contact"
    : "Créer votre société au Portugal, accompagné·e par une vraie personne";
  const description = isEn
    ? "One French-speaking point of contact to create and establish your company in Portugal: NIF, company, bank account, and a vetted network of accounting and tax partners. ~75 entrepreneurs supported since 2025."
    : "Un seul interlocuteur francophone pour créer et implanter votre entreprise au Portugal : NIF, société, compte bancaire et un réseau de partenaires comptables et fiscaux. ~75 entrepreneurs accompagnés depuis 2025.";
  return {
    title,
    description,
    alternates: { canonical: urlFor(locale, "/"), languages: languagesFor("/") },
    openGraph: {
      title,
      description,
      url: urlFor(locale, "/"),
      siteName: "Business Portugal",
      locale: isEn ? "en_GB" : "fr_FR",
      type: "website",
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustBar />
      <Positioning />
      <HomeTools />
      <Process />
      <Network />
      <HomeFaq />
      <FinalCta />
    </>
  );
}
