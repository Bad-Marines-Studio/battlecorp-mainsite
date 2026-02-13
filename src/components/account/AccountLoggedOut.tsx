import { useLanguage } from "@/i18n";

interface AccountLoggedOutProps {
    onLoginClick: () => void;
    onRegisterClick: () => void;
}

export function AccountLoggedOut({
    onLoginClick,
    onRegisterClick,
}: AccountLoggedOutProps) {
    const { t } = useLanguage();

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={onLoginClick}
                className="text-sm font-medium hover:text-primary transition-colors"
            >
                {t.nav.login}
            </button>
            <span className="text-gray-300">|</span>
            <button
                onClick={onRegisterClick}
                className="text-sm font-medium hover:text-primary transition-colors"
            >
                {t.nav.signup}
            </button>
        </div>
    );
}
