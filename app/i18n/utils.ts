import { Locale } from "./config";
import en from "./locales/en.json";
import id from "./locales/id.json";

const translations = { en, id };

export type TranslationKeys = typeof en;

export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale] || translations.en;
}

// Nested key access helper
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type TranslationPath = NestedKeyOf<TranslationKeys>;

export function t(
  locale: Locale,
  key: TranslationPath,
  params?: Record<string, string | number>
): string {
  const translations = getTranslations(locale);

  // Navigate nested object
  const keys = key.split(".");
  let value: any = translations;

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }

  if (typeof value !== "string") {
    console.warn(`Translation key is not a string: ${key}`);
    return key;
  }

  // Replace parameters like {{name}}
  if (params) {
    return value.replace(/\{\{(\w+)\}\}/g, (_, paramKey) => {
      return String(params[paramKey] ?? `{{${paramKey}}}`);
    });
  }

  return value;
}

// Hook for use in client components
export function useTranslation(locale: Locale) {
  return {
    t: (key: TranslationPath, params?: Record<string, string | number>) =>
      t(locale, key, params),
    locale,
  };
}
