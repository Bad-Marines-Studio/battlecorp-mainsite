import { Component, type ReactNode, type ErrorInfo } from "react";
import { defaultLanguage, VALID_LANGUAGES, type Language } from "@/i18n";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

function getLanguageFromPath(): Language {
  const pathSegments = window.location.pathname.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];
  if (firstSegment && VALID_LANGUAGES.includes(firstSegment as Language)) {
    return firstSegment as Language;
  }
  return defaultLanguage;
}

const messages = {
  fr: {
    title: "Une erreur est survenue",
    description: "Quelque chose s'est mal passé. Veuillez réessayer.",
    reload: "Recharger la page",
    home: "Retour à l'accueil",
  },
  en: {
    title: "Something went wrong",
    description: "An unexpected error occurred. Please try again.",
    reload: "Reload page",
    home: "Go home",
  },
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, info.componentStack);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleGoHome = (): void => {
    const lang = getLanguageFromPath();
    window.location.href = `/${lang}`;
  };

  render(): ReactNode {
    if (this.state.hasError) {
      const lang = getLanguageFromPath();
      const t = messages[lang];

      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-muted-foreground mb-8">
              {t.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={this.handleReload}
                className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
              >
                {t.reload}
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="px-6 py-3 border border-border text-foreground font-medium rounded-md hover:bg-secondary transition-colors"
              >
                {t.home}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
