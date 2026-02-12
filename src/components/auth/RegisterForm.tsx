import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import { ApiSingletons } from '@/api/apiSingletons';
import { UserRegisterDto } from '@bad-marines-studio/bch-react-rest-client';
import { Logger } from '@/utils/logger';
import { validatePassword } from '@/utils/passwordValidator';
import { USERNAME_REGEXP, EMAIL_REGEXP, EMAIL_FORBIDDEN_DOMAINS } from '@/constants/auth';

interface RegisterFormProps {
    onSuccess?: () => void;
    showLoginLink?: boolean;
}

export function RegisterForm({
    onSuccess,
    showLoginLink = true,
}: RegisterFormProps) {
    const { t, getLocalizedPath } = useLanguage();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        // Clear field-specific error when user starts typing
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
                newErrors.password = passwordErrors.map(key => t.auth.passwordValidation[key]).join('; ');
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
            };

            const response = await ApiSingletons.AuthenticationApi().authControllerUserRegister(
                registerDTO
            );

            if (response?.status === 201) {
                navigate(getLocalizedPath('/auth?action=login'));
                onSuccess?.();
            } else {
                setError(t.auth.register.error);
            }
        } catch (err: any) {
            Logger.error('Register error:', err);
            if (err.response?.status === 412) {
                // Validation errors from server
                const serverErrors = err.response.data?.errors || {};
                setErrors(serverErrors);
                setError(t.common.error);
            } else if (err.response) {
                setError(err.response.data?.message || t.auth.register.error);
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
                <label htmlFor="username" className="block text-sm font-medium mb-2">
                    {t.auth.register.username}
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder={t.auth.register.username}
                    className={`w-full px-3 py-2 bg-slate-800 border rounded-lg focus:outline-none transition-colors ${
                        errors.username ? 'border-red-600' : 'border-slate-700 focus:border-primary'
                    }`}
                    disabled={loading}
                />
                {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
                <p className="text-gray-400 text-xs mt-1">{t.auth.register.usernameHelp}</p>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t.auth.register.email}
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.auth.register.email}
                    className={`w-full px-3 py-2 bg-slate-800 border rounded-lg focus:outline-none transition-colors ${
                        errors.email ? 'border-red-600' : 'border-slate-700 focus:border-primary'
                    }`}
                    disabled={loading}
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                    {t.auth.register.password}
                </label>
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder={t.auth.register.password}
                        className={`w-full px-3 py-2 bg-slate-800 border rounded-lg focus:outline-none transition-colors ${
                            errors.password ? 'border-red-600' : 'border-slate-700 focus:border-primary'
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
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                <p className="text-gray-400 text-xs mt-1">{t.auth.register.passwordHelp}</p>
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                    {t.auth.register.confirmPassword}
                </label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder={t.auth.register.confirmPassword}
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
                {loading ? t.auth.register.loading : t.auth.register.submit}
            </button>

            {showLoginLink && (
                <div className="text-center text-sm pt-4">
                    <span className="text-gray-400">{t.auth.register.hasAccount} </span>
                    <button
                        type="button"
                        onClick={() => navigate(getLocalizedPath('/auth?action=login'))}
                        className="text-primary hover:underline"
                    >
                        {t.auth.register.signIn}
                    </button>
                </div>
            )}
        </form>
    );
}
