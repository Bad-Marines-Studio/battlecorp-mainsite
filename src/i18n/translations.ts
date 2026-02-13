import { fr } from "./fr";
import { en } from "./en";
import { TranslationKeys } from "./translationKeys";

export type Language = "fr" | "en";

// Regex qui matche /fr ou /en seulement quand suivi de / ou fin de chaine
const LANG_PREFIX_RE = /^\/(fr|en)(?=\/|$)/;

export const VALID_LANGUAGES: Language[] = ["fr", "en"];

function normalizeLanguageTag(value: string): Language | null {
  const lowered = value.toLowerCase();
  if (lowered.startsWith("fr")) return "fr";
  if (lowered.startsWith("en")) return "en";
  return null;
}

function resolveDefaultLanguage(): Language {
  if (typeof navigator === "undefined") return "en";

  const candidates = Array.isArray(navigator.languages) && navigator.languages.length > 0
    ? navigator.languages
    : [navigator.language];

  for (const candidate of candidates) {
    const normalized = normalizeLanguageTag(candidate);
    if (normalized) return normalized;
  }

  return "en";
}

export const defaultLanguage: Language = resolveDefaultLanguage();

export const translations: Record<Language, TranslationKeys> = {
  fr,
  en,
};

export function getLanguageFromPath(pathname: string): Language {
  const segments = pathname.split("/").filter(Boolean);
  const langSegment = segments[0];

  if (langSegment && VALID_LANGUAGES.includes(langSegment as Language)) {
    return langSegment as Language;
  }

  return defaultLanguage;
}

export function getLocalizedPath(path: string, language: Language): string {
  // Remove leading slash for processing
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const segments = cleanPath.split("/").filter(Boolean);

  // Check if first segment is a language
  if (segments[0] && VALID_LANGUAGES.includes(segments[0] as Language)) {
    segments[0] = language;
  } else {
    segments.unshift(language);
  }

  return "/" + segments.join("/");
}

export function getSwitchLanguagePath(
  currentPath: string,
  _currentLanguage: Language,
  targetLanguage: Language
): string {
  // Utilise la regex pour un remplacement précis
  if (LANG_PREFIX_RE.test(currentPath)) {
    return currentPath.replace(LANG_PREFIX_RE, `/${targetLanguage}`);
  }

  return `/${targetLanguage}`;
}

export function stripLanguagePrefix(path: string): string {
  return path.replace(LANG_PREFIX_RE, "") || "/";
}
