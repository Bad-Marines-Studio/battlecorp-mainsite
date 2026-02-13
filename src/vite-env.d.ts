/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ENV: string;
    readonly VITE_LOG_LEVELS: string;
    readonly VITE_API_URL: string;
    readonly VITE_WEB_BASE_URL: string;
    readonly VITE_ROUTE_BASENAME: string;
    readonly VITE_ROUTE_PATH_HOME: string;
    readonly VITE_ROUTE_PATH_PASSWORD_RESET: string;
    readonly VITE_ROUTE_PATH_EMAIL_VALIDATION: string;
    readonly VITE_ROUTE_PATH_GAME: string;
    readonly VITE_ROUTE_PATH_GAME_PLAY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
