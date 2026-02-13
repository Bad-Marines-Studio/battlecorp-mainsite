import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/i18n';
import { authController } from '@/api/controllers/authController';
import { ApiSingletons } from '@/api/apiSingletons';
import { UserLoginDto } from '@bad-marines-studio/bch-react-rest-client';
import { Logger } from '@/utils/logger';
import { APP_SEARCH_PARAM_HOME_ACTIONS, APP_SEARCH_PARAM_HOME_KEYS } from '@/constants/auth';

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
    const { t } = useLanguage();
    const location = useLocation();
    const authAny = t.auth as any;
    const authErrors = authAny.errors ?? {};
    const loginText = authAny.login ?? {};
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        loginOrEmail: '',
        password: '',
    });

    const isFormValid = formData.loginOrEmail && formData.password;

    const openAuthAction = (nextAction: string) => {
        const params = new URLSearchParams(location.search);
        params.set(APP_SEARCH_PARAM_HOME_KEYS.ACTION, nextAction);
        navigate(`${location.pathname}?${params.toString()}${location.hash}`);
    };

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
                    setError(authErrors[message] || loginText.error || t.common.error);
                } else {
                    setError(loginText.error || t.common.error);
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
                <div className="rounded-md border border-red-700/60 bg-red-900/20 p-3 text-sm text-red-200">
                    {error}
                </div>
            )}

            <div>
                <label htmlFor="loginOrEmail" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {t.auth.login.usernameOrEmail ?? t.auth.login.email}
                </label>
                <input
                    id="loginOrEmail"
                    name="loginOrEmail"
                    type="text"
                    value={formData.loginOrEmail}
                    onChange={handleChange}
                    placeholder={t.auth.login.usernameOrEmail ?? t.auth.login.email}
                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground transition-colors focus:border-primary/60 focus:outline-none"
                    disabled={loading}
                />
            </div>

            <div>
                <label htmlFor="password" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
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
                        className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground transition-colors focus:border-primary/60 focus:outline-none"
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
            </div>

            <button
                type="submit"
                disabled={!isFormValid || loading}
                className="w-full rounded-md border border-primary/40 bg-primary/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-colors hover:border-primary/70 hover:bg-primary/25 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? (loginText.loading ?? t.common.loading) : t.auth.login.submit}
            </button>

            <div className="space-y-2 text-center text-sm pt-4">
                {showRegisterLink && (
                    <div>
                        <span className="text-gray-400">{t.auth.login.noAccount} </span>
                        <button
                            type="button"
                            onClick={() => openAuthAction(APP_SEARCH_PARAM_HOME_ACTIONS.REGISTER)}
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
                            onClick={() => openAuthAction(APP_SEARCH_PARAM_HOME_ACTIONS.PASSWORD_RESET)}
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
