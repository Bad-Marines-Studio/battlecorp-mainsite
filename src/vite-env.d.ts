/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ENV: string;
    readonly VITE_LOG_LEVELS: string;
    readonly VITE_API_URL: string;
    readonly VITE_UNITY_ACTIVE_VERSION_URL?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
