import { fr, type TranslationKeys } from "./fr";
import { en } from "./en";

export type Language = "fr" | "en";

// Regex qui matche /fr ou /en seulement quand suivi de / ou fin de chaine
const LANG_PREFIX_RE = /^\/(fr|en)(?=\/|$)/;

export const VALID_LANGUAGES: Language[] = ["fr", "en"];
export const defaultLanguage: Language = "fr";

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
