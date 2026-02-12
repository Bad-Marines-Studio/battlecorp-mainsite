import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import { ApiSingletons } from '@/api/apiSingletons';
import { Logger } from '@/utils/logger';
import { APP_SEARCH_PARAM_HOME_ACTIONS, APP_SEARCH_PARAM_HOME_KEYS, EMAIL_REGEXP } from '@/constants/auth';

export function PasswordResetRequestForm() {
    const { t } = useLanguage();
    const location = useLocation();
    const passwordResetText = (t.auth as any).passwordReset ?? {};
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');

    const isFormValid = email && EMAIL_REGEXP.test(email);

    const openAuthAction = (nextAction: string) => {
        const params = new URLSearchParams(location.search);
        params.set(APP_SEARCH_PARAM_HOME_KEYS.ACTION, nextAction);
        navigate(`${location.pathname}?${params.toString()}${location.hash}`);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setLoading(true);
        setError(null);

        try {
            const response = await ApiSingletons.UsersAccountApi().userAccountControllerPublicAskForResetPasswordEmail(
                email,
                { headers: { SkipAuthRefresh: true } }
            );

            if (response?.status === 201) {
                setSuccess(true);
                setTimeout(() => {
                    openAuthAction(APP_SEARCH_PARAM_HOME_ACTIONS.LOGIN);
                }, 3000);
            } else {
                setError(passwordResetText.error ?? t.common.error);
            }
        } catch (err: any) {
            Logger.error('Password reset request error:', err);
            if (err.response) {
                setError(err.response.data?.message || passwordResetText.error || t.common.error);
            } else {
                setError('Unable to reach server');
            }
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="text-center space-y-4">
                <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg text-green-200">
                    {passwordResetText.success ?? "Password reset email sent"}
                </div>
                <p className="text-gray-400 text-sm">
                    {passwordResetText.redirect ?? "Redirecting to login..."}
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-3 bg-red-900/20 border border-red-700 rounded-lg text-red-200 text-sm">
                    {error}
                </div>
            )}

            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {passwordResetText.email ?? t.auth.login.email}
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    placeholder={passwordResetText.email ?? t.auth.login.email}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    disabled={loading}
                />
            </div>

            <button
                type="submit"
                disabled={!isFormValid || loading}
                className="w-full py-2 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
                {loading ? (passwordResetText.loading ?? t.common.loading) : (passwordResetText.submit ?? t.auth.login.forgotPassword)}
            </button>

            <div className="text-center text-sm pt-4">
                <button
                    type="button"
                    onClick={() => openAuthAction(APP_SEARCH_PARAM_HOME_ACTIONS.LOGIN)}
                    className="text-primary hover:underline"
                >
                    {t.common.back}
                </button>
            </div>
        </form>
    );
}
