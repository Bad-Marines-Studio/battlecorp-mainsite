import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import { ApiSingletons } from '@/api/apiSingletons';
import { Logger } from '@/utils/logger';
import { EMAIL_REGEXP } from '@/constants/auth';

export function PasswordResetRequestForm() {
    const { t, getLocalizedPath } = useLanguage();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');

    const isFormValid = email && EMAIL_REGEXP.test(email);

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
                    navigate(getLocalizedPath('/auth?action=login'));
                }, 3000);
            } else {
                setError(t.auth.passwordReset.error);
            }
        } catch (err: any) {
            Logger.error('Password reset request error:', err);
            if (err.response) {
                setError(err.response.data?.message || t.auth.passwordReset.error);
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
                    {t.auth.passwordReset.success}
                </div>
                <p className="text-gray-400 text-sm">
                    {t.auth.passwordReset.redirect}
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
                    {t.auth.passwordReset.email}
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    placeholder={t.auth.passwordReset.email}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    disabled={loading}
                />
            </div>

            <button
                type="submit"
                disabled={!isFormValid || loading}
                className="w-full py-2 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
                {loading ? t.auth.passwordReset.loading : t.auth.passwordReset.submit}
            </button>

            <div className="text-center text-sm pt-4">
                <button
                    type="button"
                    onClick={() => navigate(getLocalizedPath('/auth?action=login'))}
                    className="text-primary hover:underline"
                >
                    {t.common.back}
                </button>
            </div>
        </form>
    );
}
