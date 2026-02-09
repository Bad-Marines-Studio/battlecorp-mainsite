export const LEGAL_LAST_UPDATED_ISO = "2026-02-06";

export function formatLegalDate(locale: "fr" | "en"): string {
  return new Intl.DateTimeFormat(
    locale === "fr" ? "fr-FR" : "en-US",
    { year: "numeric", month: "long", day: "2-digit", timeZone: "UTC" }
  ).format(new Date(LEGAL_LAST_UPDATED_ISO));
}
