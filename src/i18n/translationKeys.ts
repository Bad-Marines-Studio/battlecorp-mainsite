export interface TranslationKeys {
    meta: {
        title: string;
        description: string;
    };
    nav: {
        home: string;
        whitepaper: string;
        wiki: string;
        support: string;
        login: string;
        signup: string;
        logout: string;
        dashboard: string;
    };
    header: {
        brand: string;
        menuOpen: string;
        links: string;
        social: string;
    };
    footer: {
        rights: string;
        links: {
            whitepaper: string;
            wiki: string;
            support: string;
            discord: string;
            facebook: string;
        };
        legal: {
            terms: string;
            cookies: string;
            privacy: string;
        };
        sections: {
            links: string;
            social: string;
            legal: string;
        };
    };
    home: {
        sections: {
            hero: {
                badge: string;
                titlePart1: string;
                titlePart2: string;
                tagline: string;
                quote: string;
                quoteAttribution: string;
                cta: string;
                ctaSecondary: string;
            };
            howToPlay: {
                eyebrow: string;
                title: string;
                accentWord: string;
                subtitle: string;
                imageAlt: string;
                tacticalAdvice: {
                    label: string;
                    quotes: string[];
                };
                navigation: {
                    previous: string;
                    next: string;
                };
                steps: {
                    title: string;
                    description: string;
                    details: string[];
                }[];
                resources: {
                    title: string;
                    items: string[];
                };
                cta: string;
            };
            pillars: {
                eyebrow: string;
                title: string;
                accentWord: string;
                subtitle: string;
                items: {
                    id: string;
                    title: string;
                    tagline: string;
                    category: string;
                    bullets: string[];
                    takeaway: string;
                    cta: string;
                }[];
                takeawayLabel: string;
                stepLabel: string;
                navHint: string;
                statusLabel: string;
                visualPreview: string;
                mobile: {
                    expand: string;
                    collapse: string;
                    swipeHint: string;
                };
            };
            units: {
                eyebrow: string;
                title: string;
                accentWord: string;
                subtitle: string;
                roles: {
                    terrestrial: string;
                    aerial: string;
                };
                labels: {
                    melee: string;
                    ranged: string;
                    defense: string;
                    resistance: string;
                    na: string;
                };
                categories: {
                    infantry: string;
                    mechanical: string;
                    aerial: string;
                };
                buildingNames: {
                    academy: string;
                    factory: string;
                    spaceport: string;
                };
                abilities: {
                    stealthAttack: string;
                    preMeleeShot: string;
                    barrage: string;
                    bombing: string;
                };
                list: {
                    id: string;
                    name: string;
                    slogan: string;
                    building: "academy" | "factory" | "spaceport";
                    category: "infantry" | "mechanical" | "aerial";
                    role: "terrestrial" | "aerial";
                    stats: {
                        melee: number;
                        ranged: number | null;
                        defense: number;
                        resistance: number;
                    };
                    production: number;
                    fabrication: { resource: string; amount: number }[];
                    maintenance: { resource: string; amount: number }[];
                    ability: string | null;
                }[];
                production: {
                    label: string;
                    unit: string;
                };
                costs: {
                    fabrication: string;
                    maintenance: string;
                };
                resources: {
                    credits: string;
                    food: string;
                    energy: string;
                    steel: string;
                    titanium: string;
                    aluminum: string;
                    component: string;
                };
                sections: {
                    characteristics: string;
                    production: string;
                    costs: string;
                    specialAbility: string;
                    none: string;
                };
                mobile: {
                    expand: string;
                    collapse: string;
                    swipeHint: string;
                };
            };
            victory: {
                eyebrow: string;
                title: string;
                accentWord: string;
                subtitle: string;
                pathLabel: string;
                expandPath: string;
                collapsePath: string;
                paths: {
                    id: string;
                    title: string;
                    tag: string;
                    category: string;
                    description: string;
                    steps: string[];
                }[];
                mobile: {
                    swipeHint: string;
                };
            };
            community: {
                eyebrow: string;
                title: string;
                accentWord: string;
                subtitle: string;
                channelsTitle: string;
                resourcesTitle: string;
                kpi: {
                    players: { value: string; label: string };
                    games: { value: string; label: string };
                    territories: { value: string; label: string };
                    betaDays: { value: string; label: string };
                };
                discord: {
                    title: string;
                    live: string;
                    description: string;
                    cta: string;
                    features: string[];
                    channels: string[];
                    resources: string[];
                    moderation: string;
                };
            };
            cta: {
                eyebrow: string;
                title: string;
                accentWord: string;
                subtitle: string;
                ctaPrimary: string;
                ctaSecondary: string;
                proofs: string[];
            };
        };
    };
    auth: {
        login: {
            title: string;
            subtitle: string;
            email: string;
            usernameOrEmail: string;
            password: string;
            submit: string;
            noAccount: string;
            createAccount: string;
            forgotPassword: string;
        };
        signup: {
            title: string;
            subtitle: string;
            username: string;
            email: string;
            password: string;
            confirmPassword: string;
            submit: string;
            hasAccount: string;
            signIn: string;
            acceptTerms: string;
            success: string;
            successRedirect: string;
        };
        passwordReset: {
            title: string;
            tokenTitle: string;
            email: string;
            submit: string;
            loading: string;
            success: string;
            redirect: string;
            error: string;
            invalidToken: string;
            newPassword: string;
            confirmPassword: string;
            submitToken: string;
            tokenLoading: string;
            tokenError: string;
            tokenSuccess: string;
        };
        emailValidation: {
            title: string;
            validating: string;
            success: string;
            redirect: string;
            error: string;
            invalidToken: string;
        };
        passwordValidation: {
            PasswordErrorMinLength: string;
            PasswordErrorTypes: string;
        };
        account: {
            profile: string;
            title: string;
            detailsTitle: string;
            username: string;
            email: string;
            showEmail: string;
            hideEmail: string;
            emailChangeTitle: string;
            newEmail: string;
            newEmailPlaceholder: string;
            emailChangeButton: string;
            emailChangeSuccess: string;
            emailChangeSimilarError: string;
            forbiddenDomain: string;
            passwordChangeTitle: string;
            currentPassword: string;
            newPassword: string;
            confirmPassword: string;
            passwordChangeButton: string;
            passwordChangeSuccess: string;
            dangerZoneTitle: string;
            accountDeletionButton: string;
            accountDeletionWarning: string;
            accountDeletionSuccess: string;
            logout: string;
            logoutLoading: string;
        };
    };
    authShell: {
        title: string;
        description: string;
        phase: string;
        backHome: string;
        openDiscord: string;
    };
    app: {
        title: string;
        description: string;
        phase: string;
        backHome: string;
        openDiscord: string;
    };
    appConnected: {
        meta: {
            title: string;
            description: string;
        };
        hero: {
            badge: string;
            title: string;
            titleAccent: string;
            cta: string;
            quote: string;
            lore: string[];
        };
        howTo: {
            eyebrow: string;
            title: string;
            accent: string;
            subtitle: string;
            previous: string;
            next: string;
            placeholderLabel: string;
            items: {
                id: string;
                title: string;
                duration: string;
                description: string;
                bullets: string[];
            }[];
        };
        rankings: {
            eyebrow: string;
            title: string;
            accent: string;
            subtitle: string;
            statusLabel: string;
            previewTitle: string;
            previewRows: string[];
            rankPrefix: string;
            valuePlaceholder: string;
            items: {
                id: string;
                title: string;
                tagline: string;
                category: string;
                metrics: string[];
            }[];
        };
        disclaimer: {
            eyebrow: string;
            title: string;
            accent: string;
            subtitle: string;
            badgeLabel: string;
            paragraphs: string[];
        };
        common: {
            backHome: string;
        };
    };
    notFound: {
        code: string;
        title: string;
        backHome: string;
    };
    validation: {
        required: string;
        invalidEmail: string;
        minLength8: string;
        passwordMismatch: string;
        minLength3: string;
    };
    common: {
        loading: string;
        error: string;
        success: string;
        cancel: string;
        confirm: string;
        save: string;
        delete: string;
        edit: string;
        back: string;
        next: string;
        previous: string;
        retry: string;
        empty: string;
        close: string;
    };
    ui: {
        languageSwitch: {
            fr: string;
            en: string;
        };
        theme: {
            light: string;
            dark: string;
            system: string;
        };
    };
    legal: {
        terms: {
            title: string;
            lastUpdate: string;
            intro: string;
            body: string;
        };
        cookies: {
            title: string;
            lastUpdate: string;
            intro: string;
            body: string;
        };
        privacy: {
            title: string;
            lastUpdate: string;
            intro: string;
            body: string;
        };
    };
}
