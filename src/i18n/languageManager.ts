import { Language, defaultLanguage } from "./translations";

let currentLanguage: Language = defaultLanguage;

export function setCurrentLanguage(lang: Language) {
    currentLanguage = lang;
}

export function getCurrentLanguage(): Language {
    return currentLanguage;
}

export function getTranslation() {
    return {
        currentLanguage,
    };
}
