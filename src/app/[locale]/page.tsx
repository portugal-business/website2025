import { setRequestLocale } from "next-intl/server";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { Network } from "@/components/home/network";
import { Positioning } from "@/components/home/positioning";
import { Process } from "@/components/home/process";
import { TrustBar } from "@/components/home/trust-bar";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustBar />
      <Positioning />
      <Process />
      <Network />
      <FinalCta />
    </>
  );
}
