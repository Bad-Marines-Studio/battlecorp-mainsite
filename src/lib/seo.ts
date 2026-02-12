import type { Language } from "@/i18n";

interface SEOMeta {
  title: string;
  description: string;
  path: string;
  language: Language;
  baseUrl?: string;
}

const BASE_PATH = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL.slice(0, -1)
  : import.meta.env.BASE_URL;

const LOCALE_MAP: Record<Language, string> = {
  fr: "fr_FR",
  en: "en_US",
};

function getDefaultBaseUrl(): string {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}${BASE_PATH}`;
}

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

function getOrCreateMetaProperty(property: string): HTMLMetaElement {
  const selector = `meta[property="${property}"]`;
  return getOrCreateElement<HTMLMetaElement>(selector, "meta", { property });
}

function getOrCreateMetaName(name: string): HTMLMetaElement {
  const selector = `meta[name="${name}"]`;
  return getOrCreateElement<HTMLMetaElement>(selector, "meta", { name });
}

export function setDocumentMeta({ title, description, path, language, baseUrl }: SEOMeta): void {
  const base = baseUrl || getDefaultBaseUrl();
  const currentUrl = `${base}${path}`;
  const alternateLanguage: Language = language === "fr" ? "en" : "fr";
  const ogImageUrl = `${base}/og-image.jpg`;

  // Build alternate path by replacing language prefix
  const alternatePath = path.replace(/^\/(fr|en)/, `/${alternateLanguage}`);
  const alternateUrl = `${base}${alternatePath}`;
  const defaultUrl = `${base}/fr${path.replace(/^\/(fr|en)/, "")}`;

  // Update title
  document.title = title;

  // Update or create meta description
  const metaDesc = getOrCreateMetaName("description");
  metaDesc.setAttribute("content", description);

  // Open Graph
  const ogTitle = getOrCreateMetaProperty("og:title");
  ogTitle.setAttribute("content", title);

  const ogDesc = getOrCreateMetaProperty("og:description");
  ogDesc.setAttribute("content", description);

  const ogUrl = getOrCreateMetaProperty("og:url");
  ogUrl.setAttribute("content", currentUrl);

  const ogLocale = getOrCreateMetaProperty("og:locale");
  ogLocale.setAttribute("content", LOCALE_MAP[language]);

  const ogLocaleAlt = getOrCreateMetaProperty("og:locale:alternate");
  ogLocaleAlt.setAttribute("content", LOCALE_MAP[alternateLanguage]);

  const ogImage = getOrCreateMetaProperty("og:image");
  ogImage.setAttribute("content", ogImageUrl);

  // Twitter Card
  const twitterCard = getOrCreateMetaName("twitter:card");
  twitterCard.setAttribute("content", "summary_large_image");

  const twitterTitle = getOrCreateMetaName("twitter:title");
  twitterTitle.setAttribute("content", title);

  const twitterDescription = getOrCreateMetaName("twitter:description");
  twitterDescription.setAttribute("content", description);

  const twitterImage = getOrCreateMetaName("twitter:image");
  twitterImage.setAttribute("content", ogImageUrl);

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
