import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import { ApiSingletons } from '@/api/apiSingletons';
import { Logger } from '@/utils/logger';
import { APP_SEARCH_PARAM_TOKEN } from '@/constants/auth';

export function EmailValidationForm() {
    const { t, getLocalizedPath } = useLanguage();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get(APP_SEARCH_PARAM_TOKEN);

    const [validating, setValidating] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!token) {
            setError(t.auth.emailValidation.invalidToken);
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
                        navigate(getLocalizedPath('/auth?action=login'));
                    }, 2000);
                } else {
                    setError(t.auth.emailValidation.error);
                }
            } catch (err: any) {
                Logger.error('Email validation error:', err);
                setError(t.auth.emailValidation.invalidToken);
            } finally {
                setValidating(false);
            }
        };

        validateEmail();
    }, [token, t, navigate, getLocalizedPath]);

    if (validating) {
        return (
            <div className="text-center space-y-4">
                <p className="text-gray-300 font-medium">{t.auth.emailValidation.validating}</p>
                <div className="animate-spin inline-flex w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    if (success) {
        return (
            <div className="text-center space-y-4">
                <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg text-green-200">
                    ✓ {t.auth.emailValidation.success}
                </div>
                <p className="text-gray-400 text-sm">
                    {t.auth.emailValidation.redirect}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-200">
                {error || t.auth.emailValidation.error}
            </div>
            <button
                onClick={() => navigate(getLocalizedPath('/auth?action=login'))}
                className="w-full py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors"
            >
                {t.common.back}
            </button>
        </div>
    );
}
