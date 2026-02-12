import { jwtDecode } from 'jwt-decode';
import { ApiSingletons } from '../apiSingletons';
import { tokenStore } from '../model/tokenStore';
import { userStore } from '../model/userStore';
import { Logger } from '../../utils/logger';

export class AuthController {

    static authInitialized: boolean = false;
    static fetchingUser: boolean = false;

    async initAuth() {
        // Hack to trigger initial value callbacks
        tokenStore.setToken(tokenStore.getToken());
        AuthController.authInitialized = true;
        Logger.verbose('AuthController auth initialized');
    }

    async refreshAuth(): Promise<string | undefined> {
        Logger.verbose('Auth refresh start');
        const currentToken = tokenStore.getToken();

        // If logout or something else cleared the access token, don't refresh at all
        if (!currentToken && AuthController.authInitialized) {
            Logger.warn("No token in memory, refusing refresh.");
            return undefined;
        }

        let needRefresh = !currentToken;
        if (currentToken) {
            try {
                const decoded: any = jwtDecode(currentToken);
                const now = Math.floor(Date.now() / 1000);
                needRefresh = decoded.exp - now <= 60;
            } catch {
                needRefresh = true;
            }
        }

        if (needRefresh) {
            try {
                const response = await ApiSingletons.AuthenticationApi().authControllerUserRefresh(
                    undefined, undefined, { headers: { SkipAuthRefresh: true } }
                );
                const newToken = response.data.accessToken;
                if (newToken) tokenStore.setToken(newToken);
                return newToken;
            } catch {
                tokenStore.setToken(null);
                userStore.setUser(null);
                return undefined;
            }
        }

        return currentToken ?? undefined;
    }

    fetchUser() {
        Logger.verbose(`Fetching user start, user currently is ${JSON.stringify(userStore.getUser())}`);
        if (AuthController.fetchingUser) {
            Logger.warn('Tried fetching user multiple times, aborting.');
            return;
        }
        AuthController.fetchingUser = true;
        ApiSingletons.UsersApi().userControllerUserGetAuthUserProfile()
            .then(response => {
                userStore.setUser(response.data);
                Logger.verbose(`Fetched user : ${JSON.stringify(userStore.getUser())}`);
            })
            .catch(err => {
                Logger.error(`Error while fetching user : ${err}`);
            })
            .finally(() => {
                AuthController.fetchingUser = false;
            });
    }

    login(token: string) {
        tokenStore.setToken(token);
        this.fetchUser();
    }

    async logout() {
        try {
            await ApiSingletons.AuthenticationApi().authControllerUserRevoke({});
        } catch (e) {
            Logger.warn("Server logout failed:", e);
        } finally {
            tokenStore.setToken(null);
            userStore.setUser(null);
        }
    }
}

export const authController = new AuthController();
