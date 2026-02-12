// Auth Config
export const ACCESS_TOKEN_KEY = 'bc_access_token_' + (import.meta.env.VITE_ENV || 'development');
export const AUTH_REDIRECT_INTERVAL = 150;

// Profile security
export const PASSWORD_SPECIAL_CHARS = "!@#$%^&*()_+-=[]{}|;:'\",.<>/?";
export const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const EMAIL_FORBIDDEN_DOMAINS = ["mailinator.com", "tempmail.com"];
export const USERNAME_REGEXP = /^(?:(?![×Þß÷þø])[0-9a-zA-ZÀ-ÿ])+$/;

// Password requirements
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MIN_TYPES = 3; // Uppercase, lowercase, digit, special

// Search params
export const APP_SEARCH_PARAM_TOKEN = "k";
export enum APP_SEARCH_PARAM_HOME_KEYS {
    ACTION = "action",
}
export enum APP_SEARCH_PARAM_HOME_ACTIONS {
    LOGIN = "login",
    LOGOUT = "logout",
    REGISTER = "register",
    PASSWORD_RESET = "password-reset",
}

// App Config
export const APP_ENABLE_REDIRECTS_PASSWORD_RESET = true;
export const APP_ENABLE_REDIRECTS_ACCOUNT_VALIDATION = true;
export const CLASSIC_REDIRECTION_INTERVAL = 5000;
