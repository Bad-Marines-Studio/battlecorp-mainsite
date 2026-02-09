import type { Language } from "@/i18n";

export const EXTERNAL_LINKS = {
  whitepaper: {
    fr: "https://battlecorp.gitbook.io/whitepaper/",
    en: "https://battlecorp.gitbook.io/whitepaper/",
  },
  wiki: "https://battlecorp.fandom.com/fr/wiki/Home",
  support: "https://buymeacoffee.com/badmarinesstudio",
  discord: "https://discord.com/invite/SXSFC5pm59",
  facebook: "https://www.facebook.com/battlecorp/",
} as const;

export function getWhitepaperUrl(lang: Language): string {
  return EXTERNAL_LINKS.whitepaper[lang];
}
