import { useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/i18n";
import { setDocumentMeta } from "@/lib/seo";
import { Container } from "@/components/Container";
import { EXTERNAL_LINKS } from "@/config/links";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { PasswordResetRequestForm } from "@/components/auth/PasswordResetRequestForm";
import { PasswordResetForm } from "@/components/auth/PasswordResetForm";
import { EmailValidationForm } from "@/components/auth/EmailValidationForm";
import { APP_SEARCH_PARAM_HOME_KEYS, APP_SEARCH_PARAM_HOME_ACTIONS } from "@/constants/auth";

export default function AuthShell() {
  const { t, language, getLocalizedPath } = useLanguage();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const action = searchParams.get(APP_SEARCH_PARAM_HOME_KEYS.ACTION) || APP_SEARCH_PARAM_HOME_ACTIONS.LOGIN;

  useEffect(() => {
    setDocumentMeta({
      title: t.authShell.title,
      description: t.authShell.description,
      path: location.pathname,
      language,
    });
  }, [t.authShell.title, t.authShell.description, location.pathname, language]);

  const renderAuthForm = () => {
    switch (action) {
      case APP_SEARCH_PARAM_HOME_ACTIONS.REGISTER:
        return <RegisterForm />;
      case APP_SEARCH_PARAM_HOME_ACTIONS.PASSWORD_RESET:
        return <PasswordResetRequestForm />;
      case 'password-reset-token':
        return <PasswordResetForm />;
      case 'email-validation':
        return <EmailValidationForm />;
      case APP_SEARCH_PARAM_HOME_ACTIONS.LOGIN:
      default:
        return <LoginForm />;
    }
  };

  const getFormTitle = () => {
    switch (action) {
      case APP_SEARCH_PARAM_HOME_ACTIONS.REGISTER:
        return t.auth.register.title;
      case APP_SEARCH_PARAM_HOME_ACTIONS.PASSWORD_RESET:
        return t.auth.passwordReset.title;
      case 'password-reset-token':
        return t.auth.passwordReset.tokenTitle;
      case 'email-validation':
        return t.auth.emailValidation.title;
      case APP_SEARCH_PARAM_HOME_ACTIONS.LOGIN:
      default:
        return t.auth.login.title;
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-20">
      <Container>
        <div className="max-w-md mx-auto">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">
            {getFormTitle()}
          </h1>

          {/* Form Container */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-6 mt-8">
            {renderAuthForm()}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={getLocalizedPath("/")}
              className="px-6 py-3 border border-border rounded-md text-foreground hover:bg-secondary transition-colors text-center"
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
