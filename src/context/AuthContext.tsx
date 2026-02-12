import { createContext, useState, useEffect, ReactNode, useMemo } from 'react';
import type { UserDto } from '@bad-marines-studio/bch-react-rest-client';
import { userStore } from '../api/model/userStore';
import { tokenStore } from '../api/model/tokenStore';
import { authController } from '../api/controllers/authController';
import { Logger } from '../utils/logger';

interface AuthContextValue {
    authenticated: boolean;
    user: UserDto | null;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserDto | null>(userStore.getUser());
    const [token, setToken] = useState<string | null>(tokenStore.getToken());
    const authenticated = Boolean(token && user);

    useEffect(() => {
        const unsubUser = userStore.subscribe(setUser);
        const unsubToken = tokenStore.subscribe(setToken);

        // Initialize auth logic
        authController.initAuth();

        // If we already have a token but no user, fetch user
        if (token && !user) authController.fetchUser();

        return () => {
            unsubUser();
            unsubToken();
        };
    }, []);

    useEffect(() => {
        Logger.verbose("AuthProvider.authenticated updated to : " + authenticated);
    }, [authenticated])

    const value = useMemo(() => ({ authenticated, user }), [authenticated, user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const AuthContext = createContext<AuthContextValue>({
    authenticated: false,
    user: null,
});
