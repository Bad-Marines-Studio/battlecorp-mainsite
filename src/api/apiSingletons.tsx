import { AuthenticationApiFactory, UsersAccountApiFactory, UsersApiFactory } from "@bad-marines-studio/bch-react-rest-client";
import { Configuration } from "@bad-marines-studio/bch-react-rest-client";
import axios, { AxiosInstance } from "axios";
import { authController } from "./controllers/authController";
import { Logger } from "../utils/logger";
import { getCurrentLanguage } from "../i18n/languageManager";

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

apiClient.interceptors.request.use(async (config) => {
    // Skip refresh for refresh requests themselves
    if (config.headers?.['SkipAuthRefresh']) return config;

    // Get the access token
    let token = await authController.refreshAuth();

    // Update Authorization header with latest token
    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        };
    } else {
        Logger.warn('Access token not found');
    }

    return config;
});

export const BCH_REACT_REST_CLIENT_CONFIG: Configuration = {};

export namespace ApiSingletons {

    export const AuthenticationApi = () => {
        const lang = getCurrentLanguage();
        const config = new Configuration({
            ...BCH_REACT_REST_CLIENT_CONFIG,
            baseOptions: {
                ...BCH_REACT_REST_CLIENT_CONFIG.baseOptions,
                params: {
                    ...BCH_REACT_REST_CLIENT_CONFIG.baseOptions?.params,
                    lang,
                },
            },
        });

        return AuthenticationApiFactory(config, import.meta.env.VITE_API_URL, apiClient);
    };

    export const UsersApi = () => {
        const lang = getCurrentLanguage();
        const config = new Configuration({
            ...BCH_REACT_REST_CLIENT_CONFIG,
            baseOptions: {
                ...BCH_REACT_REST_CLIENT_CONFIG.baseOptions,
                params: {
                    ...BCH_REACT_REST_CLIENT_CONFIG.baseOptions?.params,
                    lang,
                },
            },
        });

        return UsersApiFactory(config, import.meta.env.VITE_API_URL, apiClient);
    };

    export const UsersAccountApi = () => {
        const lang = getCurrentLanguage();
        const config = new Configuration({
            ...BCH_REACT_REST_CLIENT_CONFIG,
            baseOptions: {
                ...BCH_REACT_REST_CLIENT_CONFIG.baseOptions,
                params: {
                    ...BCH_REACT_REST_CLIENT_CONFIG.baseOptions?.params,
                    lang,
                },
            },
        });

        return UsersAccountApiFactory(config, import.meta.env.VITE_API_URL, apiClient);
    };
}
