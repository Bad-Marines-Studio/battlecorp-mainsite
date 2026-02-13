import { useAuth } from '@/hooks/useAuth';
import { authController } from '@/api/controllers/authController';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/i18n';
import { UserProfileModal } from './UserProfileModal';
import { Logger } from '@/utils/logger';

export function AccountLoggedIn() {
    const { user } = useAuth();
    const { t } = useLanguage();
    const accountText = (t.auth as any).account ?? {};
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

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

    useEffect(() => {
        if (!user) {
            delete (window as any).__BCWebGLAuth;
            return;
        }

        (window as any).__BCWebGLAuth = {
            getFreshToken: async () => {
                Logger.verbose('Refresh auth called from unity');
                return await authController.refreshAuth();
            },
        };

        return () => {
            delete (window as any).__BCWebGLAuth;
        };
    }, [user]);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (!menuRef.current || menuRef.current.contains(target)) return;
            setIsOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-full border border-primary/25 bg-background/50 px-3 py-1 text-sm font-medium text-foreground transition-colors hover:border-primary/60 hover:text-foreground"
            >
                <span className="max-w-[140px] truncate">{displayName}</span>
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
                        onClick={() => {
                            setProfileOpen(true);
                            setIsOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-slate-800 transition-colors"
                    >
                        {accountText.profile ?? "Profile"}
                    </button>
                    <button
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-slate-800 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? (accountText.logoutLoading ?? t.common.loading) : (accountText.logout ?? t.nav.logout)}
                    </button>
                </div>
            )}
            <UserProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
        </div>
    );
}
