import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { AppContextProvider } from "@/contexts/app";
import { Metadata } from "next";
import { NextAuthSessionProvider } from "@/auth/session";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/providers/theme";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  
  const siteUrl = process.env.NEXT_PUBLIC_WEB_URL || "https://tierlist-maker.com";
  const title = t("metadata.title") || "Tier List Maker - Free Online Tier List Creator";
  const description = t("metadata.description") || "Create and share professional tier lists in seconds. 100% free, no sign-up required.";
  const keywords = t("metadata.keywords") || "tier list maker, tier list creator, ranking tool";

  return {
    title: {
      template: `%s`,
      default: title,
    },
    description: description,
    keywords: keywords,
    authors: [{ name: "Tier List Maker" }],
    creator: "Tier List Maker",
    publisher: "Tier List Maker",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        zh: "/zh",
        ja: "/ja",
      },
    },
    openGraph: {
      type: "website",
      locale: locale,
      url: siteUrl,
      title: title,
      description: description,
      siteName: "Tier List Maker",
      images: [
        {
          url: `${siteUrl}/preview.png`,
          width: 1200,
          height: 630,
          alt: "Tier List Maker Preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [`${siteUrl}/preview.png`],
      creator: "@tierlistmaker",
      site: "@tierlistmaker",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <NextAuthSessionProvider>
        <AppContextProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AppContextProvider>
      </NextAuthSessionProvider>
    </NextIntlClientProvider>
  );
}
