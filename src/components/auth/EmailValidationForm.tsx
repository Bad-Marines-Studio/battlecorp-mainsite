import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "@/i18n";
import { ApiSingletons } from "@/api/apiSingletons";
import { Logger } from "@/utils/logger";
import { APP_SEARCH_PARAM_HOME_ACTIONS, APP_SEARCH_PARAM_HOME_KEYS, APP_SEARCH_PARAM_TOKEN } from "@/constants/auth";

export function EmailValidationForm() {
    const { t } = useLanguage();
    const emailValidationText = (t.auth as any).emailValidation ?? {};
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get(APP_SEARCH_PARAM_TOKEN);

    const [validating, setValidating] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const openAuthAction = (nextAction: string) => {
        const params = new URLSearchParams(location.search);
        params.set(APP_SEARCH_PARAM_HOME_KEYS.ACTION, nextAction);
        params.delete(APP_SEARCH_PARAM_TOKEN);
        navigate(`${location.pathname}?${params.toString()}${location.hash}`);
    };

    useEffect(() => {
        if (!token) {
            setError(emailValidationText.invalidToken ?? "Invalid validation link");
            setValidating(false);
            return;
        }

        const validateEmail = async () => {
            try {
                const response = await ApiSingletons.UsersAccountApi().userAccountControllerPublicValidateEmail(
                    token,
                    { headers: { SkipAuthRefresh: true } }
                );

                if (response?.status === 200) {
                    setSuccess(true);
                    setTimeout(() => {
                        openAuthAction(APP_SEARCH_PARAM_HOME_ACTIONS.LOGIN);
                    }, 2000);
                } else {
                    setError(emailValidationText.error ?? t.common.error);
                }
            } catch (err: any) {
                Logger.error("Email validation error:", err);
                setError(emailValidationText.invalidToken ?? "Invalid validation link");
            } finally {
                setValidating(false);
            }
        };

        validateEmail();
    }, [token, emailValidationText.error, emailValidationText.invalidToken, navigate, location.search, location.pathname, location.hash, t.common.error]);

    if (validating) {
        return (
            <div className="text-center space-y-4">
                <p className="text-gray-300 font-medium">{emailValidationText.validating ?? t.common.loading}</p>
                <div className="animate-spin inline-flex w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    if (success) {
        return (
            <div className="text-center space-y-4">
                <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg text-green-200">
                    {emailValidationText.success ?? "Email validated"}
                </div>
                <p className="text-gray-400 text-sm">
                    {emailValidationText.redirect ?? "Redirecting to login..."}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-200">
                {error || emailValidationText.error || t.common.error}
            </div>
            <button
                onClick={() => openAuthAction(APP_SEARCH_PARAM_HOME_ACTIONS.LOGIN)}
                className="w-full py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors"
            >
                {t.common.back}
            </button>
        </div>
    );
}
