import type { Language } from "@/i18n";

interface SEOMeta {
  title: string;
  description: string;
  path: string;
  language: Language;
  baseUrl?: string;
}

const DEFAULT_BASE_URL = "https://id-preview--18946607-4aa7-4632-8a1e-78a1aa722341.lovable.app";

const LOCALE_MAP: Record<Language, string> = {
  fr: "fr_FR",
  en: "en_US",
};

function getOrCreateElement<T extends HTMLElement>(
  selector: string,
  tagName: string,
  attributes: Record<string, string>
): T {
  let element = document.querySelector<T>(selector);
  if (!element) {
    element = document.createElement(tagName) as T;
    Object.entries(attributes).forEach(([key, value]) => {
      element!.setAttribute(key, value);
    });
    document.head.appendChild(element);
  }
  return element;
}

function getOrCreateLink(rel: string, hreflang?: string): HTMLLinkElement {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;
  
  const attrs: Record<string, string> = { rel };
  if (hreflang) attrs.hreflang = hreflang;
  
  return getOrCreateElement<HTMLLinkElement>(selector, "link", attrs);
}

function getOrCreateMeta(property: string): HTMLMetaElement {
  const selector = `meta[property="${property}"]`;
  return getOrCreateElement<HTMLMetaElement>(selector, "meta", { property });
}

export function setDocumentMeta({ title, description, path, language, baseUrl }: SEOMeta): void {
  const base = baseUrl || DEFAULT_BASE_URL;
  const currentUrl = `${base}${path}`;
  const alternateLanguage: Language = language === "fr" ? "en" : "fr";
  
  // Build alternate path by replacing language prefix
  const alternatePath = path.replace(/^\/(fr|en)/, `/${alternateLanguage}`);
  const alternateUrl = `${base}${alternatePath}`;
  const defaultUrl = `${base}/fr${path.replace(/^\/(fr|en)/, "")}`;

  // Update title
  document.title = title;

  // Update or create meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement("meta");
    metaDesc.setAttribute("name", "description");
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute("content", description);

  // Update or create og:title
  const ogTitle = getOrCreateMeta("og:title");
  ogTitle.setAttribute("content", title);

  // Update or create og:description
  const ogDesc = getOrCreateMeta("og:description");
  ogDesc.setAttribute("content", description);

  // Update or create og:url
  const ogUrl = getOrCreateMeta("og:url");
  ogUrl.setAttribute("content", currentUrl);

  // Update or create og:locale
  const ogLocale = getOrCreateMeta("og:locale");
  ogLocale.setAttribute("content", LOCALE_MAP[language]);

  // Update or create og:locale:alternate
  const ogLocaleAlt = getOrCreateMeta("og:locale:alternate");
  ogLocaleAlt.setAttribute("content", LOCALE_MAP[alternateLanguage]);

  // Canonical link
  const canonical = getOrCreateLink("canonical");
  canonical.setAttribute("href", currentUrl);

  // Hreflang links
  const hreflangFr = getOrCreateLink("alternate", "fr");
  hreflangFr.setAttribute("href", language === "fr" ? currentUrl : alternateUrl);

  const hreflangEn = getOrCreateLink("alternate", "en");
  hreflangEn.setAttribute("href", language === "en" ? currentUrl : alternateUrl);

  const hreflangDefault = getOrCreateLink("alternate", "x-default");
  hreflangDefault.setAttribute("href", defaultUrl);
}
