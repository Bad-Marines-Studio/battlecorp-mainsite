import { useState } from "react";
import { useLanguage } from "@/i18n";
import { ApiSingletons } from "@/api/apiSingletons";
import { Logger } from "@/utils/logger";
import { authController } from "@/api/controllers/authController";
import { CLASSIC_REDIRECTION_INTERVAL } from "@/constants/auth";
import { useNavigate } from "react-router-dom";

export function AccountDeletion() {
  const { t, getLocalizedPath } = useLanguage();
  const accountText = (t.auth as any).account ?? {};
  const navigate = useNavigate();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleDeletion = async () => {
    if (!confirmDelete) return;

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await ApiSingletons.UsersAccountApi().userAccountControllerPrivateDeleteAccount();
      if (response.status === 201) {
        setSuccessMsg(accountText.accountDeletionSuccess ?? t.common.success);
        setConfirmDelete(false);
        setTimeout(async () => {
          await authController.logout();
          navigate(getLocalizedPath("/"), { replace: true });
        }, CLASSIC_REDIRECTION_INTERVAL);
      } else {
        setErrorMsg(t.common.error);
      }
    } catch (error: any) {
      Logger.error(error);
      setErrorMsg(error?.response?.data?.message || t.common.error);
      setConfirmDelete(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-red-200">
        {accountText.dangerZoneTitle ?? "Danger zone"}
      </h3>

      {confirmDelete ? (
        <div className="space-y-3">
          <p className="text-sm text-red-100">
            {accountText.accountDeletionWarning ?? "This action is irreversible."}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleDeletion}
              className="rounded-md bg-red-600/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-red-500"
              disabled={loading}
            >
              {t.common.confirm}
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="rounded-md border border-red-500/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-100 transition-colors hover:border-red-400"
              disabled={loading}
            >
              {t.common.cancel}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setConfirmDelete(true)}
          className="rounded-md border border-red-500/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-100 transition-colors hover:border-red-400"
        >
          {accountText.accountDeletionButton ?? t.common.delete}
        </button>
      )}

      {loading && <p className="text-xs text-muted-foreground">{t.common.loading}</p>}
      {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}
      {successMsg && <p className="text-xs text-emerald-400">{successMsg}</p>}
    </div>
  );
}
