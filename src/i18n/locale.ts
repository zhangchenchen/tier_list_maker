import { Pathnames } from "next-intl/routing";

export const locales = ["en", "zh", "ja", "ko", "fr", "es", "tw"];

export const localeNames: any = {
  en: "English",
  zh: "简体中文",
  ja: "日本語",
  ko: "한국어",
  fr: "Français",
  es: "Español",
  tw: "繁體中文",
};

export const defaultLocale = "en";

export const localePrefix = "as-needed";

export const localeDetection =
  process.env.NEXT_PUBLIC_LOCALE_DETECTION === "true";
