import CTA from "@/components/blocks/cta";
import FAQ from "@/components/blocks/faq";
import Feature from "@/components/blocks/feature";
import Feature1 from "@/components/blocks/feature1";
import Feature2 from "@/components/blocks/feature2";
import Feature3 from "@/components/blocks/feature3";
import Stats from "@/components/blocks/stats";
import Testimonial from "@/components/blocks/testimonial";
import { Badge } from "@/components/ui/badge";
import TextTierListMaker from "@/components/blocks/hero/text-tier-list-maker";
import HeroBg from "@/components/blocks/hero/bg";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getTextTierListMakerPage } from "@/services/page";

export const revalidate = 60;
export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = await getTextTierListMakerPage(locale);
  
  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/text-tier-list-maker`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}/text-tier-list-maker`;
  }

  return {
    title: page.hero?.title || "Text Tier List Maker",
    description: page.hero?.description || "Create text-based tier lists online",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

function HeroSection({ hero }: { hero: any }) {
  const t = useTranslations("text_tier_list_maker");
  
  return (
    <>
      <HeroBg />
      <section className="py-24">
        <div className="container">
          <div className="text-center">
            {hero.announcement && (
              <div className="mx-auto mb-3 inline-flex items-center gap-3 rounded-full border px-2 py-1 text-sm">
                {hero.announcement.label && <Badge>{hero.announcement.label}</Badge>}
                {hero.announcement.title}
              </div>
            )}

            <h1 className="mx-auto mb-3 mt-4 max-w-6xl text-balance text-4xl font-bold lg:mb-7 lg:text-7xl">
              {hero.title_part1}
              <span className="bg-linear-to-r from-primary via-primary to-primary bg-clip-text text-transparent">
                {hero.highlight}
              </span>
              {hero.title_part2}
            </h1>

            <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
              {hero.description}
            </p>
            
            {/* Text Tier List Maker Interactive Component */}
            <div className="mt-12 mb-12">
              <TextTierListMaker />
            </div>

            {hero.tip && (
              <p className="mt-8 text-md text-muted-foreground">{hero.tip}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default async function TextTierListMakerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = await getTextTierListMakerPage(locale);

  return (
    <>
      {page.hero && <HeroSection hero={page.hero} />}
      {page.introduce && <Feature1 section={page.introduce} />}
      {page.benefit && <Feature2 section={page.benefit} />}
      {page.usage && <Feature3 section={page.usage} />}
      {page.feature && <Feature section={page.feature} />}
      {page.stats && <Stats section={page.stats} />}
      {page.testimonial && <Testimonial section={page.testimonial} />}
      {page.faq && <FAQ section={page.faq} />}
      {page.cta && <CTA section={page.cta} />}
    </>
  );
}
