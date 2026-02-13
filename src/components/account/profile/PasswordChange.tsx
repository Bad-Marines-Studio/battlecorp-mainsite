import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/i18n";
import { validatePassword } from "@/utils/passwordValidator";
import { ApiSingletons } from "@/api/apiSingletons";
import type { UserPasswordChangeDto } from "@bad-marines-studio/bch-react-rest-client";
import { Logger } from "@/utils/logger";
import { authController } from "@/api/controllers/authController";
import { APP_SEARCH_PARAM_HOME_ACTIONS, APP_SEARCH_PARAM_HOME_KEYS, CLASSIC_REDIRECTION_INTERVAL } from "@/constants/auth";
import { useNavigate } from "react-router-dom";

export function PasswordChange() {
  const { t, getLocalizedPath } = useLanguage();
  const accountText = (t.auth as any).account ?? {};
  const passwordValidationText = (t.auth as any).passwordValidation ?? {};
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errorNewPassword, setErrorNewPassword] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");
  const [formValid, setFormValid] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const errors = validatePassword(newPassword);
    const mapped = errors.map((key) => passwordValidationText[key] ?? key).join(", ");
    setErrorNewPassword(mapped);

    if (confirmPassword && newPassword !== confirmPassword) {
      setErrorConfirm(t.validation.passwordMismatch);
    } else {
      setErrorConfirm("");
    }

    const valid = Boolean(currentPassword && newPassword && confirmPassword && errors.length === 0 && newPassword === confirmPassword);
    setFormValid(valid);
  }, [currentPassword, newPassword, confirmPassword, passwordValidationText, t.validation.passwordMismatch]);

  const handlePasswordChange = async () => {
    if (!formValid) return;

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const payload: UserPasswordChangeDto = {
      previousPassword: currentPassword,
      password: newPassword,
      confirmPassword,
    };

    try {
      const response = await ApiSingletons.UsersAccountApi().userAccountControllerPrivatePasswordChange(payload);
      if (response.status === 201) {
        setSuccessMsg(accountText.passwordChangeSuccess ?? t.common.success);
        setTimeout(async () => {
          await authController.logout();
          const nextPath = `${getLocalizedPath("/")}?${APP_SEARCH_PARAM_HOME_KEYS.ACTION}=${APP_SEARCH_PARAM_HOME_ACTIONS.LOGIN}`;
          navigate(nextPath, { replace: true });
        }, CLASSIC_REDIRECTION_INTERVAL);
      } else {
        setErrorMsg(t.common.error);
      }
    } catch (error: any) {
      Logger.error(error);
      if (error?.response?.status === 401) {
        setErrorMsg(t.validation.passwordMismatch);
      } else {
        setErrorMsg(error?.response?.data?.message || t.common.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-foreground">
        {accountText.passwordChangeTitle ?? "Change password"}
      </h3>

      <div className="space-y-2">
        <label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {accountText.currentPassword ?? t.auth.login.password}
        </label>
        <div className="relative">
          <input
            type={showCurrent ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-primary/60 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowCurrent((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showCurrent ? "Hide password" : "Show password"}
          >
            {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {accountText.newPassword ?? t.auth.signup.password}
        </label>
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-primary/60 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowNew((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showNew ? "Hide password" : "Show password"}
          >
            {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {newPassword && errorNewPassword && <p className="text-xs text-red-400">{errorNewPassword}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {accountText.confirmPassword ?? t.auth.signup.confirmPassword}
        </label>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-primary/60 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showConfirm ? "Hide password" : "Show password"}
          >
            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errorConfirm && <p className="text-xs text-red-400">{errorConfirm}</p>}
      </div>

      <button
        type="button"
        onClick={handlePasswordChange}
        disabled={!formValid || loading}
        className="w-full rounded-md border border-primary/40 bg-primary/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-colors hover:border-primary/70 hover:bg-primary/25 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {accountText.passwordChangeButton ?? t.common.save}
      </button>

      {loading && <p className="text-xs text-muted-foreground">{t.common.loading}</p>}
      {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}
      {successMsg && <p className="text-xs text-emerald-400">{successMsg}</p>}
    </div>
  );
}
