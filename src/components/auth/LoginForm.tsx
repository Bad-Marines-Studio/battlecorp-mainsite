import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import { authController } from '@/api/controllers/authController';
import { ApiSingletons } from '@/api/apiSingletons';
import { UserLoginDto } from '@bad-marines-studio/bch-react-rest-client';
import { Logger } from '@/utils/logger';

interface LoginFormProps {
    onSuccess?: () => void;
    showRegisterLink?: boolean;
    showForgotPasswordLink?: boolean;
}

export function LoginForm({
    onSuccess,
    showRegisterLink = true,
    showForgotPasswordLink = true,
}: LoginFormProps) {
    const { t, getLocalizedPath } = useLanguage();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        loginOrEmail: '',
        password: '',
    });

    const isFormValid = formData.loginOrEmail && formData.password;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setLoading(true);
        setError(null);

        try {
            const loginDTO: UserLoginDto = {
                usernameOrEmail: formData.loginOrEmail,
                password: formData.password,
            };

            const response = await ApiSingletons.AuthenticationApi().authControllerUserLogin(
                loginDTO,
                undefined,
                { headers: { SkipAuthRefresh: true } }
            );

            if (response?.data?.accessToken && response.status === 201) {
                authController.login(response.data.accessToken);
                onSuccess?.();
            } else {
                setError(t.common.error);
            }
        } catch (err: any) {
            Logger.error('Login error:', err);
            if (err.response?.status === 401) {
                const message = err.response.data?.message;
                if (['Created account', 'Banned account', 'Disabled account'].includes(message)) {
                    setError(t.auth.errors[message] || t.auth.login.error);
                } else {
                    setError(t.auth.login.error);
                }
            } else if (err.response) {
                setError(t.common.error);
            } else {
                setError('Unable to reach server');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-3 bg-red-900/20 border border-red-700 rounded-lg text-red-200 text-sm">
                    {error}
                </div>
            )}

            <div>
                <label htmlFor="loginOrEmail" className="block text-sm font-medium mb-2">
                    {t.auth.login.email}
                </label>
                <input
                    id="loginOrEmail"
                    name="loginOrEmail"
                    type="text"
                    value={formData.loginOrEmail}
                    onChange={handleChange}
                    placeholder={t.auth.login.email}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    disabled={loading}
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                    {t.auth.login.password}
                </label>
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder={t.auth.login.password}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:border-primary focus:outline-none transition-colors"
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
            </div>

            <button
                type="submit"
                disabled={!isFormValid || loading}
                className="w-full py-2 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
                {loading ? t.auth.login.loading : t.auth.login.submit}
            </button>

            <div className="space-y-2 text-center text-sm pt-4">
                {showRegisterLink && (
                    <div>
                        <span className="text-gray-400">{t.auth.login.noAccount} </span>
                        <button
                            type="button"
                            onClick={() => navigate(getLocalizedPath('/auth?action=register'))}
                            className="text-primary hover:underline"
                        >
                            {t.auth.login.createAccount}
                        </button>
                    </div>
                )}
                {showForgotPasswordLink && (
                    <div>
                        <button
                            type="button"
                            onClick={() => navigate(getLocalizedPath('/auth?action=password-reset'))}
                            className="text-primary hover:underline"
                        >
                            {t.auth.login.forgotPassword}
                        </button>
                    </div>
                )}
            </div>
        </form>
    );
}
