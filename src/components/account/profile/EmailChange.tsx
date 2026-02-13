import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n";
import { EMAIL_FORBIDDEN_DOMAINS, EMAIL_REGEXP } from "@/constants/auth";
import { ApiSingletons } from "@/api/apiSingletons";
import type { UserEmailChangeDto } from "@bad-marines-studio/bch-react-rest-client";
import { Logger } from "@/utils/logger";
import { useAuth } from "@/hooks/useAuth";

export function EmailChange() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const accountText = (t.auth as any).account ?? {};

  const [newEmail, setNewEmail] = useState("");
  const [errorNewEmail, setErrorNewEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (newEmail) {
      setSuccessMsg("");
      setErrorMsg("");
    }

    if (newEmail && !EMAIL_REGEXP.test(newEmail)) {
      setErrorNewEmail(t.validation.invalidEmail);
      return;
    }

    if (newEmail && user?.email && newEmail === user.email) {
      setErrorNewEmail(accountText.emailChangeSimilarError ?? t.common.error);
      return;
    }

    const emailDomain = newEmail.split("@").pop();
    if (emailDomain && EMAIL_FORBIDDEN_DOMAINS.includes(emailDomain)) {
      setErrorNewEmail(accountText.forbiddenDomain ?? t.common.error);
      return;
    }

    setErrorNewEmail("");
  }, [newEmail, user?.email, t.validation.invalidEmail, accountText.emailChangeSimilarError, accountText.forbiddenDomain, t.common.error]);

  const handleEmailChange = async () => {
    if (!newEmail || errorNewEmail) return;

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const payload: UserEmailChangeDto = { email: newEmail };

    try {
      const response = await ApiSingletons.UsersAccountApi().userAccountControllerPrivateEmailChange(payload);
      if (response.status === 201) {
        setSuccessMsg(accountText.emailChangeSuccess ?? t.common.success);
        setNewEmail("");
      } else {
        setErrorMsg(t.common.error);
      }
    } catch (error: any) {
      Logger.error(error);
      setErrorMsg(error?.response?.data?.message || t.common.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-foreground">
        {accountText.emailChangeTitle ?? "Change email"}
      </h3>

      <div className="space-y-2">
        <label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {accountText.newEmail ?? "New email"}
        </label>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder={accountText.newEmailPlaceholder ?? t.auth.login.email}
          className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-primary/60 focus:outline-none"
          disabled={loading}
        />
        {errorNewEmail && <p className="text-xs text-red-400">{errorNewEmail}</p>}
      </div>

      <button
        type="button"
        onClick={handleEmailChange}
        disabled={!newEmail || Boolean(errorNewEmail) || loading}
        className="w-full rounded-md border border-primary/40 bg-primary/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-colors hover:border-primary/70 hover:bg-primary/25 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {accountText.emailChangeButton ?? t.common.save}
      </button>

      {loading && <p className="text-xs text-muted-foreground">{t.common.loading}</p>}
      {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}
      {successMsg && <p className="text-xs text-emerald-400">{successMsg}</p>}
    </div>
  );
}
