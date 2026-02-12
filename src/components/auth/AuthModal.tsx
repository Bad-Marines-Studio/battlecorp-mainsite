import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useLanguage } from "@/i18n";
import { useAuth } from "@/hooks/useAuth";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { PasswordResetRequestForm } from "./PasswordResetRequestForm";
import { PasswordResetForm } from "./PasswordResetForm";
import { EmailValidationForm } from "./EmailValidationForm";
import { APP_SEARCH_PARAM_HOME_ACTIONS, APP_SEARCH_PARAM_HOME_KEYS, APP_SEARCH_PARAM_TOKEN } from "@/constants/auth";

const MODAL_ACTIONS = new Set<string>([
  APP_SEARCH_PARAM_HOME_ACTIONS.LOGIN,
  APP_SEARCH_PARAM_HOME_ACTIONS.REGISTER,
  APP_SEARCH_PARAM_HOME_ACTIONS.PASSWORD_RESET,
  "password-reset-token",
  "email-validation",
]);

export function AuthModal() {
  const { t, getLocalizedPath } = useLanguage();
  const { authenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const action = searchParams.get(APP_SEARCH_PARAM_HOME_KEYS.ACTION);
  const isOpen = Boolean(action && MODAL_ACTIONS.has(action));

  const closeModal = () => {
    const nextParams = new URLSearchParams(location.search);
    nextParams.delete(APP_SEARCH_PARAM_HOME_KEYS.ACTION);
    nextParams.delete(APP_SEARCH_PARAM_TOKEN);
    const nextSearch = nextParams.toString();
    const nextPath = `${location.pathname}${nextSearch ? `?${nextSearch}` : ""}${location.hash}`;
    navigate(nextPath, { replace: true });
  };

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!authenticated || !isOpen) return;
    navigate(getLocalizedPath("/app"), { replace: true });
  }, [authenticated, isOpen, navigate, getLocalizedPath]);

  if (!isOpen || !action) return null;

  const authAny = t.auth as any;
  const registerText = authAny.register ?? authAny.signup ?? {};
  const passwordResetText = authAny.passwordReset ?? {};
  const emailValidationText = authAny.emailValidation ?? {};

  const handleLoginSuccess = () => {
    navigate(getLocalizedPath("/app"), { replace: true });
  };

  let title = t.auth.login.title;
  let content = <LoginForm onSuccess={handleLoginSuccess} />;

  if (action === APP_SEARCH_PARAM_HOME_ACTIONS.REGISTER) {
    title = registerText.title ?? t.nav.signup;
    content = <RegisterForm />;
  } else if (action === APP_SEARCH_PARAM_HOME_ACTIONS.PASSWORD_RESET) {
    title = passwordResetText.title ?? t.auth.login.forgotPassword;
    content = <PasswordResetRequestForm />;
  } else if (action === "password-reset-token") {
    title = passwordResetText.tokenTitle ?? passwordResetText.title ?? t.auth.login.forgotPassword;
    content = <PasswordResetForm />;
  } else if (action === "email-validation") {
    title = emailValidationText.title ?? t.authShell.title;
    content = <EmailValidationForm />;
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={closeModal}
        aria-label={t.common.close}
      />

      <div
        className="relative z-10 w-full max-w-md rounded-xl border border-primary/30 bg-background/95 p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label={t.common.close}
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="mb-4 text-center text-2xl font-bold text-foreground">{title}</h2>
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">{content}</div>
      </div>
    </div>
  );
}
