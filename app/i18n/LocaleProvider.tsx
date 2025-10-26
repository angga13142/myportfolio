"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Locale, defaultLocale } from "./config";
import { getTranslations, TranslationKeys } from "./utils";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [translations, setTranslations] = useState<TranslationKeys>(
    getTranslations(defaultLocale)
  );

  useEffect(() => {
    try {
      // Load locale from localStorage
      const stored = localStorage.getItem("locale") as Locale;
      if (stored && (stored === "en" || stored === "id")) {
        setLocaleState(stored);
        setTranslations(getTranslations(stored));
      } else {
        // Auto-detect from browser
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith("id")) {
          setLocaleState("id");
          setTranslations(getTranslations("id"));
        }
      }
    } catch (error) {
      console.error("Error loading locale:", error);
      // Fallback to default locale
      setLocaleState(defaultLocale);
      setTranslations(getTranslations(defaultLocale));
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setTranslations(getTranslations(newLocale));
    localStorage.setItem("locale", newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: translations }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
