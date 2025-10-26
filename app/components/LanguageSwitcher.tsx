"use client";

import { useState, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import {
  Locale,
  locales,
  localeNames,
  localeFlags,
  defaultLocale,
} from "@/app/i18n/config";
import { trackLanguageSwitch } from "@/app/lib/analytics";

interface LanguageSwitcherProps {
  currentLocale?: Locale;
  className?: string;
}

export default function LanguageSwitcher({
  currentLocale,
  className = "",
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>(currentLocale || defaultLocale);

  useEffect(() => {
    // Get locale from localStorage or browser
    const storedLocale = localStorage.getItem("locale") as Locale;
    if (storedLocale && locales.includes(storedLocale)) {
      setLocale(storedLocale);
    } else if (currentLocale) {
      setLocale(currentLocale);
    } else {
      // Auto-detect from browser
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("id")) {
        setLocale("id");
      }
    }
  }, [currentLocale]);

  const handleLanguageChange = (newLocale: Locale) => {
    const previousLocale = locale;

    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
    setIsOpen(false);

    // Track language switch
    trackLanguageSwitch(previousLocale, newLocale);

    // Reload page to apply new locale
    // In future: use URL-based routing (/en, /id)
    window.location.reload();
  };

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".language-switcher")) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <div className={`language-switcher relative ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-200 group"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-zinc-600 dark:text-zinc-400 group-hover:text-green-500 transition-colors" />
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {localeFlags[locale]} {localeNames[locale]}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden z-50 animate-fade-in">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLanguageChange(loc)}
              className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors ${
                locale === loc ? "bg-green-50 dark:bg-green-900/20" : ""
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">{localeFlags[loc]}</span>
                <span
                  className={`text-sm font-medium ${
                    locale === loc
                      ? "text-green-600 dark:text-green-400"
                      : "text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  {localeNames[loc]}
                </span>
              </span>
              {locale === loc && (
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
