import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/i18n';

interface PublicRouteProps {
    children: ReactNode;
}

/**
 * PublicRoute - Redirects authenticated users away from public auth pages
 */
export function PublicRoute({ children }: PublicRouteProps) {
    const { authenticated } = useAuth();
    const { getLocalizedPath } = useLanguage();

    if (authenticated) {
        return <Navigate to={getLocalizedPath('/game')} replace />;
    }

    return <>{children}</>;
}
