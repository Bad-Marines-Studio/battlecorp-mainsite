import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/i18n";
import { setDocumentMeta } from "@/lib/seo";
import { Container } from "@/components/Container";
import { EXTERNAL_LINKS } from "@/config/links";

export default function AuthShell() {
  const { t, language, getLocalizedPath } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    setDocumentMeta({
      title: t.authShell.title,
      description: t.authShell.description,
      path: location.pathname,
      language,
    });
  }, [t.authShell.title, t.authShell.description, location.pathname, language]);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-20">
      <Container>
        <div className="max-w-md mx-auto text-center">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.authShell.title}
          </h1>

          {/* Description */}
          <p className="text-muted-foreground mb-6">
            {t.authShell.description}
          </p>

          {/* Phase Badge */}
          <div className="inline-block px-4 py-2 bg-secondary text-sm text-muted-foreground rounded-full mb-8">
            {t.authShell.phase}
          </div>

          {/* Mount point for React BC auth module */}
          <div id="reactbc-root" className="mb-8" />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={getLocalizedPath("/")}
              className="px-6 py-3 border border-border rounded-md text-foreground hover:bg-secondary transition-colors"
            >
              {t.authShell.backHome}
            </Link>
            <a
              href={EXTERNAL_LINKS.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              {t.authShell.openDiscord}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
