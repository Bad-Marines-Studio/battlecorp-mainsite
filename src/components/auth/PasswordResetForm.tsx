import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/i18n';
import { ApiSingletons } from '@/api/apiSingletons';
import { Logger } from '@/utils/logger';
import { validatePassword } from '@/utils/passwordValidator';
import {
    APP_ENABLE_REDIRECTS_PASSWORD_RESET,
    APP_SEARCH_PARAM_HOME_ACTIONS,
    APP_SEARCH_PARAM_HOME_KEYS,
    APP_SEARCH_PARAM_TOKEN,
    CLASSIC_REDIRECTION_INTERVAL,
} from '@/constants/auth';

export function PasswordResetForm() {
    const { t, getLocalizedPath } = useLanguage();
    const authAny = t.auth as any;
    const passwordResetText = authAny.passwordReset ?? {};
    const passwordValidationText = authAny.passwordValidation ?? {};
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get(APP_SEARCH_PARAM_TOKEN);

    const [loading, setLoading] = useState(false);
    const [validating, setValidating] = useState(true);
    const [tokenError, setTokenError] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [tokenValid, setTokenValid] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    const openAuthAction = (nextAction: string) => {
        const params = new URLSearchParams();
        params.set(APP_SEARCH_PARAM_HOME_KEYS.ACTION, nextAction);
        params.delete(APP_SEARCH_PARAM_TOKEN);
        navigate(`${getLocalizedPath("/")}?${params.toString()}`, { replace: true });
    };

    useEffect(() => {
        if (!token) {
            setTokenError(passwordResetText.invalidToken ?? "Invalid or expired token");
            setValidating(false);
            return;
        }

        const validateToken = async () => {
            try {
                const response = await ApiSingletons.UsersAccountApi().userAccountControllerPublicValidatePasswordResetToken(
                    token,
                    { headers: { SkipAuthRefresh: true } }
                );
                if (response?.status === 200 || response?.status === 201) {
                    setTokenValid(true);
                } else {
                    setTokenError(passwordResetText.invalidToken ?? "Invalid or expired token");
                }
            } catch (err: any) {
                Logger.error('Token validation error:', err);
                setTokenError(passwordResetText.invalidToken ?? "Invalid or expired token");
            } finally {
                setValidating(false);
            }
        };

        validateToken();
    }, [token, passwordResetText.invalidToken]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: '',
            }));
        }
        setSubmitError(null);
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.newPassword) {
            newErrors.newPassword = t.validation.required;
        } else {
            const passwordErrors = validatePassword(formData.newPassword);
            if (passwordErrors.length > 0) {
                newErrors.newPassword = passwordErrors
                    .map((key) => passwordValidationText[key] ?? key)
                    .join("; ");
            }
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = t.validation.required;
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = t.validation.passwordMismatch;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setSubmitError(null);

        try {
            const response = await ApiSingletons.UsersAccountApi().userAccountControllerPublicResetPassword(
                {
                    password: formData.newPassword,
                    confirmPassword: formData.confirmPassword,
                },
                token,
                { headers: { SkipAuthRefresh: true } }
            );

            if (response?.status === 200 || response?.status === 201) {
                setSuccess(true);
                if (APP_ENABLE_REDIRECTS_PASSWORD_RESET) {
                    setTimeout(() => {
                        openAuthAction(APP_SEARCH_PARAM_HOME_ACTIONS.LOGIN);
                    }, CLASSIC_REDIRECTION_INTERVAL);
                }
            } else {
                setSubmitError(passwordResetText.tokenError ?? t.common.error);
            }
        } catch (err: any) {
            Logger.error('Password reset error:', err);
            if (err.response) {
                setSubmitError(err.response.data?.message || passwordResetText.tokenError || t.common.error);
            } else {
                setSubmitError('Unable to reach server');
            }
        } finally {
            setLoading(false);
        }
    };

    if (validating) {
        return (
            <div className="text-center">
                <p className="text-gray-400">{t.common.loading}</p>
            </div>
        );
    }

    if (!tokenValid || tokenError) {
        return (
            <div className="space-y-4">
                <div className="rounded-md border border-red-700/60 bg-red-900/20 p-4 text-red-200">
                    {tokenError || passwordResetText.invalidToken || "Invalid or expired token"}
                </div>
                <button
                    onClick={() => openAuthAction(APP_SEARCH_PARAM_HOME_ACTIONS.PASSWORD_RESET)}
                    className="w-full rounded-md border border-primary/40 bg-primary/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-colors hover:border-primary/70 hover:bg-primary/25"
                >
                    {t.common.back}
                </button>
            </div>
        );
    }

    if (success) {
        return (
            <div className="space-y-4 text-center">
                <div className="rounded-md border border-emerald-700/50 bg-emerald-900/20 p-4 text-emerald-200">
                    {passwordResetText.tokenSuccess ?? "Your password has been changed successfully."}
                </div>
                <p className="text-xs text-muted-foreground">
                    {passwordResetText.redirect ?? "Redirecting to login..."}
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="newPassword" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {passwordResetText.newPassword ?? "New password"}
                </label>
                <div className="relative">
                    <input
                        id="newPassword"
                        name="newPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder={passwordResetText.newPassword ?? "New password"}
                        className={`w-full rounded-md border bg-white/5 px-3 py-2 text-sm text-foreground transition-colors focus:outline-none ${
                            errors.newPassword ? 'border-red-600' : 'border-white/10 focus:border-primary/60'
                        }`}
                        disabled={loading}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                </div>
                {errors.newPassword && <p className="text-red-400 text-sm mt-1">{errors.newPassword}</p>}
            </div>

            <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {passwordResetText.confirmPassword ?? "Confirm password"}
                </label>
                <div className="relative">
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder={passwordResetText.confirmPassword ?? "Confirm password"}
                        className={`w-full rounded-md border bg-white/5 px-3 py-2 text-sm text-foreground transition-colors focus:outline-none ${
                            errors.confirmPassword ? 'border-red-600' : 'border-white/10 focus:border-primary/60'
                        }`}
                        disabled={loading}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md border border-primary/40 bg-primary/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-colors hover:border-primary/70 hover:bg-primary/25 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? (passwordResetText.tokenLoading ?? t.common.loading) : (passwordResetText.submitToken ?? "Reset password")}
            </button>

            {submitError && (
                <div className="rounded-md border border-red-700/60 bg-red-900/20 p-3 text-sm text-red-200">
                    {submitError}
                </div>
            )}
        </form>
    );
}
