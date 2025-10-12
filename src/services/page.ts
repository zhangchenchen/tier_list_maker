import { LandingPage, PricingPage, ShowcasePage, TextTierListMakerPage, BF6WeaponTierListPage } from "@/types/pages/landing";

export async function getLandingPage(locale: string): Promise<LandingPage> {
  return (await getPage("landing", locale)) as LandingPage;
}

export async function getPricingPage(locale: string): Promise<PricingPage> {
  return (await getPage("pricing", locale)) as PricingPage;
}

export async function getShowcasePage(locale: string): Promise<ShowcasePage> {
  return (await getPage("showcase", locale)) as ShowcasePage;
}

export async function getTextTierListMakerPage(locale: string): Promise<TextTierListMakerPage> {
  return (await getPage("text-tier-list-maker", locale)) as TextTierListMakerPage;
}

export async function getBF6WeaponTierListPage(locale: string): Promise<BF6WeaponTierListPage> {
  return (await getPage("bf6-weapon-tier-list", locale)) as BF6WeaponTierListPage;
}

export async function getPage(
  name: string,
  locale: string
): Promise<LandingPage | PricingPage | ShowcasePage | TextTierListMakerPage | BF6WeaponTierListPage> {
  try {
    if (locale === "zh-CN") {
      locale = "zh";
    }

    return await import(
      `@/i18n/pages/${name}/${locale.toLowerCase()}.json`
    ).then((module) => module.default);
  } catch (error) {
    console.warn(`Failed to load ${locale}.json, falling back to en.json`);

    return await import(`@/i18n/pages/${name}/en.json`).then(
      (module) => module.default
    );
  }
}
