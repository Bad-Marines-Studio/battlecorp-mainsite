import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n";
import { PasswordResetForm } from "@/components/auth/PasswordResetForm";
import { EmailValidationForm } from "@/components/auth/EmailValidationForm";

interface AuthFlowPageProps {
  mode: "password-reset-token" | "email-validation";
}

export default function AuthFlowPage({ mode }: AuthFlowPageProps) {
  const { t, getLocalizedPath } = useLanguage();
  const authAny = t.auth as any;
  const passwordResetText = authAny.passwordReset ?? {};
  const emailValidationText = authAny.emailValidation ?? {};

  const title =
    mode === "password-reset-token"
      ? passwordResetText.tokenTitle ??
        passwordResetText.title ??
        t.auth.login.forgotPassword
      : emailValidationText.title ?? t.authShell.title;

  const content =
    mode === "password-reset-token" ? (
      <PasswordResetForm />
    ) : (
      <EmailValidationForm />
    );

  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-6 text-center">
          <Link
            to={getLocalizedPath("/")}
            className="text-sm text-primary hover:underline"
          >
            {t.authShell.backHome}
          </Link>
        </div>

        <div className="rounded-xl border border-primary/30 bg-background/95 p-6 shadow-2xl">
          <h1 className="mb-4 text-center text-2xl font-bold text-foreground">
            {title}
          </h1>
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
            {content}
          </div>
        </div>
      </div>
    </section>
  );
}
