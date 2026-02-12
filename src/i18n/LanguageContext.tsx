import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  translations,
  defaultLanguage,
  VALID_LANGUAGES,
  getSwitchLanguagePath,
  getLocalizedPath as getLocalizedPathFn,
  type Language,
} from "./translations";
import type { TranslationKeys } from "./fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
  getLocalizedPath: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const language: Language = useMemo(() => {
    if (lang && VALID_LANGUAGES.includes(lang as Language)) {
      return lang as Language;
    }
    return defaultLanguage;
  }, [lang]);

  const t = useMemo(() => translations[language], [language]);

  // Update document lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);


  const setLanguage = (targetLang: Language) => {
    if (targetLang === language) return;

    const newPath = getSwitchLanguagePath(
      location.pathname,
      language,
      targetLang
    );
    
    // Preserve search and hash
    const fullPath = `${newPath}${location.search}${location.hash}`;
    navigate(fullPath, { replace: true });
  };

  const getLocalizedPath = (path: string) => {
    return getLocalizedPathFn(path, language);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    getLocalizedPath,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
