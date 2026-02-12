import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import { ApiSingletons } from '@/api/apiSingletons';
import { Logger } from '@/utils/logger';
import { validatePassword } from '@/utils/passwordValidator';
import { APP_SEARCH_PARAM_HOME_ACTIONS, APP_SEARCH_PARAM_HOME_KEYS, APP_SEARCH_PARAM_TOKEN } from '@/constants/auth';

export function PasswordResetForm() {
    const { t } = useLanguage();
    const location = useLocation();
    const authAny = t.auth as any;
    const passwordResetText = authAny.passwordReset ?? {};
    const passwordValidationText = authAny.passwordValidation ?? {};
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get(APP_SEARCH_PARAM_TOKEN);

    const [loading, setLoading] = useState(false);
    const [validating, setValidating] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [tokenValid, setTokenValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    const openAuthAction = (nextAction: string) => {
        const params = new URLSearchParams(location.search);
        params.set(APP_SEARCH_PARAM_HOME_KEYS.ACTION, nextAction);
        params.delete(APP_SEARCH_PARAM_TOKEN);
        navigate(`${location.pathname}?${params.toString()}${location.hash}`);
    };

    useEffect(() => {
        if (!token) {
            setError(passwordResetText.invalidToken ?? "Invalid or expired token");
            setValidating(false);
            return;
        }

        const validateToken = async () => {
            try {
                const response = await ApiSingletons.UsersAccountApi().userAccountControllerPublicValidatePasswordResetToken(
                    token,
                    { headers: { SkipAuthRefresh: true } }
                );
                if (response?.status === 200) {
                    setTokenValid(true);
                } else {
                    setError(passwordResetText.invalidToken ?? "Invalid or expired token");
                }
            } catch (err: any) {
                Logger.error('Token validation error:', err);
                setError(passwordResetText.invalidToken ?? "Invalid or expired token");
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
        setError(null);
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
        setError(null);

        try {
            const response = await ApiSingletons.UsersAccountApi().userAccountControllerPublicResetPassword(
                {
                    password: formData.newPassword,
                },
                token,
                { headers: { SkipAuthRefresh: true } }
            );

            if (response?.status === 200) {
                // Success - redirect to login
                openAuthAction(APP_SEARCH_PARAM_HOME_ACTIONS.LOGIN);
            } else {
                setError(passwordResetText.tokenError ?? t.common.error);
            }
        } catch (err: any) {
            Logger.error('Password reset error:', err);
            if (err.response) {
                setError(err.response.data?.message || passwordResetText.tokenError || t.common.error);
            } else {
                setError('Unable to reach server');
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

    if (!tokenValid || error) {
        return (
            <div className="space-y-4">
                <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-200">
                    {error || passwordResetText.invalidToken || "Invalid or expired token"}
                </div>
                <button
                    onClick={() => openAuthAction(APP_SEARCH_PARAM_HOME_ACTIONS.PASSWORD_RESET)}
                    className="w-full py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors"
                >
                    {t.common.back}
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="newPassword" className="block text-sm font-medium mb-2">
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
                        className={`w-full px-3 py-2 bg-slate-800 border rounded-lg focus:outline-none transition-colors ${
                            errors.newPassword ? 'border-red-600' : 'border-slate-700 focus:border-primary'
                        }`}
                        disabled={loading}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                    >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                </div>
                {errors.newPassword && <p className="text-red-400 text-sm mt-1">{errors.newPassword}</p>}
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                    {passwordResetText.confirmPassword ?? "Confirm password"}
                </label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder={passwordResetText.confirmPassword ?? "Confirm password"}
                    className={`w-full px-3 py-2 bg-slate-800 border rounded-lg focus:outline-none transition-colors ${
                        errors.confirmPassword ? 'border-red-600' : 'border-slate-700 focus:border-primary'
                    }`}
                    disabled={loading}
                />
                {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
                {loading ? (passwordResetText.tokenLoading ?? t.common.loading) : (passwordResetText.submitToken ?? "Reset password")}
            </button>
        </form>
    );
}
