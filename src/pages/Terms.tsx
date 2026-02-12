import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n";
import { setDocumentMeta } from "@/lib/seo";
import { Container } from "@/components/Container";
import { formatLegalDate } from "@/config/legal";

export default function Terms() {
  const { t, language } = useLanguage();
  const location = useLocation();
  const legal = t.legal.terms;
  const bodyParagraphs = legal.body
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  useEffect(() => {
    setDocumentMeta({
      title: legal.title,
      description: legal.intro,
      path: location.pathname,
      language,
    });
  }, [legal.title, legal.intro, location.pathname, language]);

  return (
    <div className="py-20">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {legal.title}
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            {legal.lastUpdate} {formatLegalDate(language)}
          </p>
          <p className="text-muted-foreground mb-6">{legal.intro}</p>
          <div className="prose prose-invert max-w-none">
            {bodyParagraphs.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
