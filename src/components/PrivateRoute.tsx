import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/i18n';

interface PrivateRouteProps {
    children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
    const { authenticated } = useAuth();
    const { getLocalizedPath } = useLanguage();

    if (!authenticated) {
        return <Navigate to={getLocalizedPath('/auth')} replace />;
    }

    return <>{children}</>;
}
