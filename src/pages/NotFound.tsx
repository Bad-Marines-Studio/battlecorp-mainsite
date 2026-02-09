import { useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Container } from "@/components/Container";
import { translations, defaultLanguage, VALID_LANGUAGES, type Language } from "@/i18n";
import { setDocumentMeta } from "@/lib/seo";

export default function NotFound() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  
  // Determine language for translations
  const language: Language = lang && VALID_LANGUAGES.includes(lang as Language)
    ? (lang as Language)
    : defaultLanguage;
  
  const t = translations[language];

  useEffect(() => {
    setDocumentMeta({
      title: `404 - ${t.notFound.title}`,
      description: t.notFound.title,
      path: location.pathname,
      language,
    });
  }, [t.notFound.title, location.pathname, language]);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-20">
      <Container>
        <div className="text-center">
          <h1 className="text-8xl md:text-9xl font-black text-primary mb-4">
            {t.notFound.code}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t.notFound.title}
          </p>
          <Link
            to={`/${language}`}
            className="inline-block px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            {t.notFound.backHome}
          </Link>
        </div>
      </Container>
    </div>
  );
}
