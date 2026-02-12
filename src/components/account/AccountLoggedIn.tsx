import { useAuth } from '@/hooks/useAuth';
import { authController } from '@/api/controllers/authController';
import { useState } from 'react';
import { useLanguage } from '@/i18n';

export function AccountLoggedIn() {
    const { user } = useAuth();
    const { t } = useLanguage();
    const accountText = (t.auth as any).account ?? {};
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await authController.logout();
        } finally {
            setIsLoading(false);
            setIsOpen(false);
        }
    };

    const displayName = user?.username || user?.email || 'Commander';

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
            >
                <span>{displayName}</span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-lg z-50">
                    <div className="px-4 py-3 border-b border-slate-700">
                        <p className="text-sm text-gray-300">{displayName}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-slate-800 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? (accountText.logoutLoading ?? t.common.loading) : (accountText.logout ?? t.nav.logout)}
                    </button>
                </div>
            )}
        </div>
    );
}
