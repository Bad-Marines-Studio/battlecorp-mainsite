import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/i18n';
import { ApiSingletons } from '@/api/apiSingletons';
import { UserRegisterDto } from '@bad-marines-studio/bch-react-rest-client';
import { Logger } from '@/utils/logger';
import { validatePassword } from '@/utils/passwordValidator';
import { USERNAME_REGEXP, EMAIL_REGEXP, EMAIL_FORBIDDEN_DOMAINS, APP_SEARCH_PARAM_HOME_ACTIONS, APP_SEARCH_PARAM_HOME_KEYS, CLASSIC_REDIRECTION_INTERVAL } from '@/constants/auth';

interface RegisterFormProps {
    onSuccess?: () => void;
    showLoginLink?: boolean;
}

export function RegisterForm({
    onSuccess,
    showLoginLink = true,
}: RegisterFormProps) {
    const { t } = useLanguage();
    const location = useLocation();
    const authAny = t.auth as any;
    const registerText = authAny.register ?? authAny.signup ?? {};
    const passwordValidationText = authAny.passwordValidation ?? {};
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

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

        if (!formData.username.trim()) {
            newErrors.username = t.validation.required;
        } else if (formData.username.length < 3 || formData.username.length > 30) {
            newErrors.username = 'Username must be 3-30 characters';
        } else if (!USERNAME_REGEXP.test(formData.username)) {
            newErrors.username = 'Username must contain only alphanumeric characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = t.validation.required;
        } else if (!EMAIL_REGEXP.test(formData.email)) {
            newErrors.email = t.validation.invalidEmail;
        } else {
            const domain = formData.email.split('@')[1];
            if (EMAIL_FORBIDDEN_DOMAINS.includes(domain)) {
                newErrors.email = 'This email domain is not allowed';
            }
        }

        if (!formData.password) {
            newErrors.password = t.validation.required;
        } else {
            const passwordErrors = validatePassword(formData.password);
            if (passwordErrors.length > 0) {
                newErrors.password = passwordErrors
                    .map((key) => passwordValidationText[key] ?? key)
                    .join("; ");
            }
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = t.validation.required;
        } else if (formData.password !== formData.confirmPassword) {
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
            const registerDTO: UserRegisterDto = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
            };

            const response = await ApiSingletons.AuthenticationApi().authControllerUserRegister(
                registerDTO
            );

            if (response?.status === 201) {
                setRegistered(true);
                setTimeout(() => {
                    openAuthAction(APP_SEARCH_PARAM_HOME_ACTIONS.LOGIN);
                }, CLASSIC_REDIRECTION_INTERVAL);
                onSuccess?.();
            } else {
                setError(registerText.error ?? t.common.error);
            }
        } catch (err: any) {
            Logger.error('Register error:', err);
            if (err.response?.status === 412) {
                const serverErrors = err.response.data?.errors || {};
                setErrors(serverErrors);
                setError(t.common.error);
            } else if (err.response) {
                setError(err.response.data?.message || registerText.error || t.common.error);
            } else {
                setError('Unable to reach server');
            }
        } finally {
            setLoading(false);
        }
    };

    if (registered) {
        return (
            <div className="space-y-4">
                <div className="rounded-md border border-emerald-700/50 bg-emerald-900/20 p-4 text-sm text-emerald-200">
                    {registerText.success ?? "Account created. Check your email to validate your account."}
                </div>
                <p className="text-center text-xs text-muted-foreground">
                    {registerText.successRedirect ?? "Redirecting to login..."}
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="rounded-md border border-red-700/60 bg-red-900/20 p-3 text-sm text-red-200">
                    {error}
                </div>
            )}

            <div>
                <label htmlFor="username" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {registerText.username ?? "Username"}
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder={registerText.username ?? "Username"}
                    className={`w-full rounded-md border bg-white/5 px-3 py-2 text-sm text-foreground transition-colors focus:outline-none ${
                        errors.username ? 'border-red-600' : 'border-white/10 focus:border-primary/60'
                    }`}
                    disabled={loading}
                />
                {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
                <p className="text-gray-400 text-xs mt-1">{registerText.usernameHelp ?? "3-30 alphanumeric characters"}</p>
            </div>

            <div>
                <label htmlFor="email" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {registerText.email ?? "Email"}
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={registerText.email ?? "Email"}
                    className={`w-full rounded-md border bg-white/5 px-3 py-2 text-sm text-foreground transition-colors focus:outline-none ${
                        errors.email ? 'border-red-600' : 'border-white/10 focus:border-primary/60'
                    }`}
                    disabled={loading}
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="password" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {registerText.password ?? "Password"}
                </label>
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder={registerText.password ?? "Password"}
                        className={`w-full rounded-md border bg-white/5 px-3 py-2 text-sm text-foreground transition-colors focus:outline-none ${
                            errors.password ? 'border-red-600' : 'border-white/10 focus:border-primary/60'
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
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                <p className="text-gray-400 text-xs mt-1">{registerText.passwordHelp ?? "Use at least 8 characters and 3 character types"}</p>
            </div>

            <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {registerText.confirmPassword ?? "Confirm password"}
                </label>
                <div className="relative">
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder={registerText.confirmPassword ?? "Confirm password"}
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
                {loading ? (registerText.loading ?? t.common.loading) : (registerText.submit ?? "Create account")}
            </button>

            {showLoginLink && (
                <div className="text-center text-sm pt-4">
                    <span className="text-gray-400">{registerText.hasAccount ?? "Already have an account?"} </span>
                    <button
                        type="button"
                        onClick={() => openAuthAction(APP_SEARCH_PARAM_HOME_ACTIONS.LOGIN)}
                        className="text-primary hover:underline"
                    >
                        {registerText.signIn ?? "Sign in"}
                    </button>
                </div>
            )}
        </form>
    );
}
