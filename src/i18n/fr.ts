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

export const fr: TranslationKeys = {
  meta: {
    title: "BattleCorp — Jeu de Stratégie & Gestion Cyberpunk Multijoueur",
    description: "Dirigez votre corporation militaire, gérez vos ressources et conquêtez des planètes dans ce jeu de stratégie tour par tour mêlant économie, guerre et diplomatie.",
  },
  nav: {
    home: "Accueil",
    whitepaper: "Whitepaper",
    wiki: "Wiki",
    support: "Support",
    login: "Connexion",
    signup: "Inscription",
    logout: "Déconnexion",
    dashboard: "Tableau de bord",
  },
  header: {
    brand: "BATTLECORP",
    menuOpen: "Ouvrir le menu",
    links: "Liens",
    social: "Réseaux sociaux",
  },
  footer: {
    rights: "Tous droits réservés",
    links: {
      whitepaper: "Whitepaper",
      wiki: "Wiki",
      support: "Support",
      discord: "Discord",
      facebook: "Facebook",
    },
    legal: {
      terms: "CGU",
      cookies: "Cookies",
      privacy: "Confidentialité",
    },
    sections: {
      links: "Liens",
      social: "Réseaux sociaux",
      legal: "Légal",
    },
  },
  home: {
    sections: {
      hero: {
        badge: "PLAYTEST — WARGAME DISPONIBLE",
        titlePart1: "BATTLE",
        titlePart2: "CORP",
        tagline: "Dirigez votre corporation militaire. Conquérez une planète.",
        quote: "Stratégie. Gestion. Diplomatie. Guerre totale.",
        quoteAttribution: "— Manuel d'Opérations, Directive interne",
        cta: "REJOINDRE LE PLAYTEST",
        ctaSecondary: "VOIR LA DÉMO",
      },
      howToPlay: {
        eyebrow: "GAMEPLAY",
        title: "Comment jouer",
        accentWord: "jouer",
        subtitle: "Développez votre base, alimentez votre industrie et projetez vos forces pour conquérir la planète.",
        imageAlt: "Base cyberpunk",
        tacticalAdvice: {
          label: "CONSEIL TACTIQUE",
          quotes: [
            "Votre QG est votre centre névralgique. Perdez-le, et la partie est terminée.",
            "Un travailleur productif vaut plus que dix contribuables inactifs.",
            "L'armée la mieux ravitaillée gagne la guerre, pas la bataille.",
            "Pilonnez. Bombardez. Puis envahissez.",
          ],
        },
        navigation: {
          previous: "Précédent",
          next: "Suivant",
        },
        steps: [
          {
            title: "Sécurisez votre base",
            description: "Votre QG est votre point vital. Sa perte signifie l'élimination immédiate.",
            details: [
              "Territoire de départ = défaite si capturé",
              "Investissez dans la diplomacie, les défenses et garnisons",
              "Anticipez les frappes ennemies avec surveillance et protection",
            ],
          },
          {
            title: "Étendez votre contrôle territoriale",
            description: "Chaque territoire conquis augmente votre population, vos ressources et votre capacité industrielle.",
            details: [
              "Extraction minière : acier, uranium, titane, aluminium",
              "4 000 à 8 000 habitants mobilisables pour produire",
              "2 à 6 emplacements pour construire ses infrastructures",
            ],
          },
          {
            title: "Produisez & entretenez",
            description: "Maintenez votre économie pour alimenter troupes, bâtiments et opérations militaires.",
            details: [
              "Ressources stratégiques à équilibrer en permanence",
              "Bâtiments dédiés à la formation, la fabrication et à la defense.",
              "Résolution logistique toutes les 12 phases : anticipez ou subissez",
            ],
          },
          {
            title: "Projetez la force",
            description: "Déployez la puissance militaire de votre Battlecorp pour écraser toute résistance planétaire.",
            details: [
              "Colonnes terrestres : avancée et sécurisation des zones (6 phases)",
              "Pilonnages d’artilleries : suppression et harcèlement longue portée (3 phases)",
              "Escadrilles aériennes : bombardements tactiques et frappes éclairs (3 phases)",
            ],
          },
        ],
        resources: {
          title: "Ressources à gérer",
          items: ["Crédits", "Nourriture", "Énergie", "Influence", "Acier", "Composants"],
        },
        cta: "Voir le Wiki",
      },
      pillars: {
        eyebrow: "STRATEGIE",
        title: "4 leviers pour dominer la planète",
        accentWord: "dominer",
        subtitle: "Maîtrisez ces principes pour prendre l’avantage… et ne jamais le perdre.",
        items: [
          {
            id: "conquest",
            title: "Contrôler le tempo",
            tagline: "Anticipez plus vite que vos adversaires.",
            category: "Décision / Timing",
            bullets: [
              "Le temps est découpé en phases tactiques.",
              "Décidez. Engagez. Aucun retour.",
              "Chaque erreur coûte du sang, des crédits et du terrain.",
            ],
            takeaway: "Imposer le tempo, c’est imposer la guerre.",
            cta: "Voir la fiche (Codex)",
          },
          {
            id: "economy",
            title: "Supériorité économique",
            tagline: "Convertissez ressources → puissance.",
            category: "Industrie / Logistique",
            bullets: [
              "Plus de ressources = plus d’unités = plus d’options tactiques.",
              "Un déficit économique bloque toute expansion.",
              "Optimisez travailleurs, infrastructures et rendements.",
            ],
            takeaway: "L'armée la mieux ravitaillée gagne la guerre, pas la bataille.",
            cta: "Voir la fiche (Codex)",
          },
          {
            id: "cycles",
            title: "Pression militaire",
            tagline: "Ne laissez jamais l’ennemi respirer.",
            category: "Offensive / Carte",
            bullets: [
              "Multipliez frappes et menaces diplomatiques pour forcer des erreurs.",
              "Coupez les lignes de production adverses.",
              "Une attaque constante vaut mieux qu’un assaut isolé.",
            ],
            takeaway: "Hésiter, c'est déjà perdre. La pression permanente brise les défenses.",
            cta: "Voir la fiche (Codex)",
          },
          {
            id: "hq",
            title: "Survie du QG",
            tagline: "Perdre sa base, c’est disparaître.",
            category: "Défense / Priorités",
            bullets: [
              "Votre centre de commandement est la cible principale.",
              "Investissez autant en protection qu’en expansion.",
              "Une base solide permet toutes les audaces offensives.",
            ],
            takeaway: "Conquérir sans protéger, c'est bâtir sur du sable.",
            cta: "Voir la fiche (Codex)",
          },
        ],
        takeawayLabel: "À retenir",
        stepLabel: "ÉTAPE",
        navHint: "Sélectionnez un levier pour en savoir plus",
        statusLabel: "LEVIER",
        visualPreview: "APERÇU VISUEL",
        mobile: {
          expand: "Voir le point clé",
          collapse: "Réduire",
          swipeHint: "Swipez pour voir les autres leviers",
        },
      },
      units: {
        eyebrow: "PRODUCTION & PROJECTION",
        title: "Unités de combat",
        accentWord: "combat",
        subtitle: "Chaque unité a un rôle. Chaque choix a un coût.",
        roles: {
          terrestrial: "Terrestre",
          aerial: "Aérien",
        },
        labels: {
          melee: "Mêlée",
          ranged: "Tir",
          defense: "Défense",
          resistance: "Résistance",
          na: "NA",
        },
        categories: {
          infantry: "Infanterie",
          mechanical: "Mécanique",
          aerial: "Aérien",
        },
        buildingNames: {
          academy: "Académie Militaire",
          factory: "Usine Mécanique",
          spaceport: "Astroport",
        },
        abilities: {
          stealthAttack: "Attaque furtive",
          preMeleeShot: "Tir avant mêlée",
          barrage: "Pilonnage",
          bombing: "Bombardement",
        },
        list: [
          {
            id: "marine",
            name: "Marine",
            slogan: "Le premier à entrer. Le dernier à partir.",
            building: "academy",
            category: "infantry",
            role: "terrestrial",
            stats: { melee: 1, ranged: null, defense: 4, resistance: 1 },
            production: 20,
            fabrication: [{ resource: "credits", amount: 100 }],
            maintenance: [{ resource: "food", amount: 1 }],
            ability: null,
          },
          {
            id: "commando",
            name: "Commando",
            slogan: "Là où la défense rassure, le Commando termine.",
            building: "academy",
            category: "infantry",
            role: "terrestrial",
            stats: { melee: 10, ranged: null, defense: 2, resistance: 2 },
            production: 7,
            fabrication: [{ resource: "credits", amount: 250 }, { resource: "component", amount: 1 }],
            maintenance: [{ resource: "food", amount: 1 }, { resource: "energy", amount: 1 }],
            ability: "stealthAttack",
          },
          {
            id: "cyborg",
            name: "Cyborg",
            slogan: "Quand la chair hésite, l'acier exécute.",
            building: "factory",
            category: "mechanical",
            role: "terrestrial",
            stats: { melee: 3, ranged: null, defense: 3, resistance: 3 },
            production: 40,
            fabrication: [{ resource: "credits", amount: 10 }, { resource: "component", amount: 1 }],
            maintenance: [{ resource: "energy", amount: 1 }],
            ability: null,
          },
          {
            id: "tank",
            name: "Tank",
            slogan: "On ne discute pas avec un blindage.",
            building: "factory",
            category: "mechanical",
            role: "terrestrial",
            stats: { melee: 10, ranged: 4, defense: 5, resistance: 5 },
            production: 7,
            fabrication: [{ resource: "credits", amount: 500 }, { resource: "steel", amount: 10 }],
            maintenance: [{ resource: "energy", amount: 5 }],
            ability: "preMeleeShot",
          },
          {
            id: "artillery",
            name: "Artillerie",
            slogan: "Le front avance quand l'arrière décide.",
            building: "factory",
            category: "mechanical",
            role: "terrestrial",
            stats: { melee: 1, ranged: 20, defense: 1, resistance: 1 },
            production: 5,
            fabrication: [{ resource: "credits", amount: 1000 }, { resource: "titanium", amount: 5 }],
            maintenance: [{ resource: "energy", amount: 10 }],
            ability: "barrage",
          },
          {
            id: "bomber",
            name: "Bombardier",
            slogan: "Au sol, on lutte. Dans les airs, on tranche.",
            building: "spaceport",
            category: "aerial",
            role: "aerial",
            stats: { melee: 1, ranged: 20, defense: 1, resistance: 2 },
            production: 5,
            fabrication: [{ resource: "credits", amount: 500 }, { resource: "aluminum", amount: 5 }, { resource: "steel", amount: 5 }],
            maintenance: [{ resource: "energy", amount: 2 }],
            ability: "bombing",
          },
          {
            id: "fighter",
            name: "Chasseur",
            slogan: "Le ciel est une frontière. Nous la fermons.",
            building: "spaceport",
            category: "aerial",
            role: "aerial",
            stats: { melee: 5, ranged: 2, defense: 5, resistance: 5 },
            production: 10,
            fabrication: [{ resource: "credits", amount: 500 }, { resource: "aluminum", amount: 2 }],
            maintenance: [{ resource: "energy", amount: 1 }],
            ability: "bombing",
          },
        ],
        production: {
          label: "Fabriqué à",
          unit: "unités/cycle",
        },
        costs: {
          fabrication: "Fabrication",
          maintenance: "Entretien",
        },
        resources: {
          credits: "Crédits",
          food: "Vivre",
          energy: "Énergie",
          steel: "Acier",
          titanium: "Titane",
          aluminum: "Aluminium",
          component: "Composant",
        },
        sections: {
          characteristics: "Caractéristiques",
          production: "Production",
          costs: "Coûts",
          specialAbility: "Capacité spéciale",
          none: "Aucune",
        },
        mobile: {
          expand: "Voir les détails",
          collapse: "Réduire",
          swipeHint: "Swipez pour voir les autres unités",
        },
      },
      victory: {
        eyebrow: "STRATÉGIE & CONQUÊTE",
        title: "Trois voies de victoire",
        accentWord: "victoire",
        subtitle: "Choisissez votre stratégie. Assumez ses conséquences.",
        pathLabel: "Chemin vers la victoire",
        expandPath: "Voir les étapes",
        collapsePath: "Masquer les étapes",
        paths: [
          {
            id: "military",
            title: "Victoire militaire",
            tag: "Force & Conquête",
            category: "Force & Conquête",
            description: "Atteignez et garder les territoires stratégiques pour prendre le contrôle de la planète.",
            steps: [
              "Produire une armée puissante",
              "Contrôler les points stratégiques",
              "Lancer des offensives coordonnées",
              "Soumettre les ennemis",
            ],
          },
          {
            id: "influence",
            title: "Victoire par Influence",
            tag: "Diplomatie & Économie",
            category: "Diplomatie & Économie",
            description: "Dominez par la négociation et le contrôle économique. Convertissez la population locale et renversez vos rivaux.",
            steps: [
              "Développer un réseau commercial d'usine de luxe",
              "Forger des alliances stratégiques",
              "Contrôler les ressources rares",
              "Atteindre le seuil d'influence",
            ],
          },
          {
            id: "domination",
            title: "Victoire par Domination",
            tag: "Survie & Élimination",
            category: "Survie & Élimination",
            description: "Soyez le dernier debout. Survivez aux assauts, éliminez tous vos rivaux et revendiquez la planète entière.",
            steps: [
              "Fortifier vos positions clés",
              "Épuiser les ressources adverses",
              "Éliminer les factions rivales",
              "Contrôler 100% des territoires",
            ],
          },
        ],
        mobile: {
          swipeHint: "Swipez pour voir les autres voies",
        },
      },
      community: {
        eyebrow: "COMMUNAUTÉ & ACTIVITÉ",
        title: "Rejoins la Communauté",
        accentWord: "Communauté",
        subtitle: "Recrutement, diplomatie, alliances — étends ton réseau.",
        channelsTitle: "Salons",
        resourcesTitle: "Ressources",
        kpi: {
          players: { value: "2847", label: "joueurs" },
          games: { value: "25420", label: "parties jouées" },
          territories: { value: "892", label: "territoires conquis" },
          betaDays: { value: "127", label: "jours de bêta" },
        },
        discord: {
          title: "QG Discord Officiel",
          live: "LIVE",
          description: "Rejoins les commandants de Battlecorp et étends ton réseau.",
          cta: "Rejoindre le Discord",
          features: [
            "Recrutement & corporations (trouve ton camp)",
            "Diplomatie & alliances (temporaires…)",
            "War room & stratégies (éco / influence / combats)",
            "Patch notes & annonces (bêta)",
          ],
          channels: ["#recruitment", "#diplomacy", "#war-room", "#patch-notes"],
          resources: ["Wiki", "Guides", "Support"],
          moderation: "Modération • anti-spam • feedback structuré",
        },
      },
      cta: {
        eyebrow: "ACCÈS IMMÉDIAT",
        title: "Prêt à jouer ?",
        accentWord: "jouer",
        subtitle: "Entrez en bêta. Prenez une longueur d'avance.",
        ctaPrimary: "Rejoindre la Bêta",
        ctaSecondary: "Voir la Démo",
        proofs: ["Gratuit", "Sans install", "Progression sauvegardée"],
      },
    },
  },
  auth: {
    login: {
      title: "Connexion",
      subtitle: "Connectez-vous à votre compte BattleCorp",
      email: "Email",
      password: "Mot de passe",
      submit: "Se connecter",
      noAccount: "Pas encore de compte ?",
      createAccount: "Créer un compte",
      forgotPassword: "Mot de passe oublié ?",
    },
    signup: {
      title: "Inscription",
      subtitle: "Créez votre compte BattleCorp",
      username: "Nom d'utilisateur",
      email: "Email",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      submit: "Créer mon compte",
      hasAccount: "Déjà un compte ?",
      signIn: "Se connecter",
      acceptTerms: "J'accepte les conditions d'utilisation",
    },
  },
  authShell: {
    title: "Accès au compte",
    description: "Le module de connexion et d'inscription sera disponible prochainement. En attendant, rejoignez la communauté sur Discord pour les dernières annonces.",
    phase: "Module d'authentification — Phase 2",
    backHome: "Retour à l'accueil",
    openDiscord: "Ouvrir Discord",
  },
  app: {
    title: "Espace réservé",
    description: "L'application BattleCorp sera bientôt disponible.",
    phase: "Phase 2 — En développement",
    backHome: "Retour à l'accueil",
    openDiscord: "Ouvrir Discord",
  },
  appConnected: {
    meta: {
      title: "BattleCorp - Espace Commandant",
      description: "Page connectée BattleCorp : bienvenue commandant, gameplay, classements et avertissement bêta.",
    },
    hero: {
      badge: "ESPACE JOUEUR CONNECTÉ",
      title: "Bienvenue, Commandant",
      titleAccent: "Commandant",
      cta: "JOUER",
      quote: "Votre réputation résonne à travers les étoiles...",
      lore: [
        "L'année est 3764. Depuis près de quatre siècles, la galaxie humaine est divisée entre des méga-corporations militaires privées - les Battlecorps - engagées dans une compétition féroce pour les droits d'exploitation des planètes riches en ressources, désignées Territoires Stratégiques et Industriels (TSI).",
        "Les États-nations ne sont plus que des façades légales. La guerre est devenue une industrie régulée, guidée par des contrats et contrôlée strictement. Officiellement, ce ne sont pas des guerres : ce sont des opérations de performance compétitive.",
        "Prenez le contrôle de votre propre BattleCorp et menez des opérations de conquête stratégique à travers des planètes dévastées, hostiles et fragmentées.",
        "La guerre n'est plus l'affaire des nations. Elle est devenue celle des corporations.",
      ],
    },
    howTo: {
      eyebrow: "GAMEPLAY",
      title: "Comment jouer",
      accent: "jouer",
      subtitle: "Même cadre et même énergie que la section gameplay. Les vidéos finales seront injectées ici.",
      previous: "Précédent",
      next: "Suivant",
      placeholderLabel: "Emplacement vidéo",
      items: [
        {
          id: "step-1",
          title: "Prise en main rapide",
          duration: "01:20",
          description: "Présentation de l'interface commandant et des premiers objectifs.",
          bullets: [
            "Vue générale du théâtre",
            "Raccourcis de commandement",
            "Priorités du premier cycle",
          ],
        },
        {
          id: "step-2",
          title: "Planification opérationnelle",
          duration: "02:10",
          description: "Comment préparer une séquence complète sans casser votre économie.",
          bullets: [
            "Ordre des actions critiques",
            "Gestion des ressources sous pression",
            "Préparation des offensives",
          ],
        },
        {
          id: "step-3",
          title: "Projection de force",
          duration: "01:45",
          description: "Coordinations terrestres et aériennes pour verrouiller la carte.",
          bullets: [
            "Synchroniser les unités",
            "Exploiter les fenêtres tactiques",
            "Sécuriser les territoires clefs",
          ],
        },
      ],
    },
    rankings: {
      eyebrow: "CLASSEMENTS",
      title: "Les classements",
      accent: "classements",
      subtitle: "Reprise du modèle STRATÉGIE avec navigation par onglets, statut actif et panneau détail.",
      statusLabel: "CLASSEMENT ACTIF",
      previewTitle: "Aperçu leaderboard",
      previewRows: ["Commandant_Alpha", "Commandant_Bravo", "Commandant_Charlie"],
      rankPrefix: "#",
      valuePlaceholder: "--",
      items: [
        {
          id: "global",
          title: "Classement global",
          tagline: "Les commandants les plus performants",
          category: "Performance totale",
          metrics: ["Victoires confirmées", "Ratio contrôle/perte", "Série de domination"],
        },
        {
          id: "territorial",
          title: "Conquête territoriale",
          tagline: "Ceux qui tiennent la carte",
          category: "Contrôle TSI",
          metrics: ["Territoires détenus", "Temps de contrôle cumulé", "Expansion par cycle"],
        },
        {
          id: "economy",
          title: "Économie de guerre",
          tagline: "Les empires industriels",
          category: "Production",
          metrics: ["Rendement moyen", "Stabilité logistique", "Capacité de remplacement"],
        },
        {
          id: "alliance",
          title: "Influence diplomatique",
          tagline: "Le pouvoir par réseau",
          category: "Influence",
          metrics: ["Accords validés", "Coalitions dirigées", "Poids diplomatique"],
        },
      ],
    },
    disclaimer: {
      eyebrow: "AVERTISSEMENT BÊTA",
      title: "État de la version",
      accent: "version",
      subtitle: "Battlecorp est en accès anticipé. Cette section reste visible pour informer chaque joueur connecté.",
      badgeLabel: "Avertissement Bêta",
      paragraphs: [
        "Battlecorp est actuellement en bêta. Il s'agit d'une version en développement actif : vous pouvez rencontrer des bugs, des dégradations de performance ou des fonctionnalités incomplètes.",
        "L'accès bêta peut être limité à un nombre restreint de joueurs afin de protéger la stabilité des serveurs et de recueillir des retours qualifiés.",
        "Nous ajustons activement l'équilibrage et la feuille de route en fonction des retours de la communauté. Votre participation aide à définir la version finale.",
        "Note : Battlecorp deviendra un jeu payant après la phase bêta. Merci de faire partie de l'aventure.",
      ],
    },
    common: {
      backHome: "Retour à l'accueil",
    },
  },
  notFound: {
    code: "404",
    title: "Oups ! Cette page n'existe pas.",
    backHome: "Retour à l'accueil",
  },
  validation: {
    required: "Ce champ est requis",
    invalidEmail: "Email invalide",
    minLength8: "Minimum 8 caractères",
    passwordMismatch: "Les mots de passe ne correspondent pas",
    minLength3: "Minimum 3 caractères",
  },
  common: {
    loading: "Chargement...",
    error: "Une erreur est survenue",
    success: "Succès",
    cancel: "Annuler",
    confirm: "Confirmer",
    save: "Enregistrer",
    delete: "Supprimer",
    edit: "Modifier",
    back: "Retour",
    next: "Suivant",
    previous: "Précédent",
    retry: "Réessayer",
    empty: "Aucun élément",
    close: "Fermer",
  },
  ui: {
    languageSwitch: {
      fr: "FR",
      en: "EN",
    },
    theme: {
      light: "Clair",
      dark: "Sombre",
      system: "Système",
    },
  },
  legal: {
    terms: {
      title: "Mentions légales et CGU",
      lastUpdate: "Dernière mise à jour:",
      intro: "Ce document regroupe les mentions légales et les conditions générales d'utilisation du site BattleCorp, conformément au droit français.",
      body: `1. Éditeur du site
Le site BattleCorp est édité par : BAD MARINES STUDIO, SAS, au capital de 5 000 €, immatriculée au RCS de BEZIERS sous le numéro 9029406830011, dont le siège social est situé 20 cours Lafayette, 34480 Saint-Genies-de-Fontedit, France.
N° TVA intracommunautaire : FR61902940683
Email de contact : julien.eballard@gmail.com
Téléphone : Non communiqué

2. Directeur de la publication
Directeur de la publication : Julien Eballard
Contact : julien.eballard@gmail.com

3. Hébergeur
Le site est hébergé par : OVH SAS, SAS, dont le siège social est situé 2 rue Kellermann, 59100 Roubaix, France, joignable au 1007 (depuis la France) ou +33 9 72 10 10 07 (depuis l'étranger).

4. Objet du service
BattleCorp propose un site vitrine et des services en ligne liés à un univers de jeu de stratégie multijoueur (actualités, accès bêta, compte utilisateur, pages d'information et support).
L'accès à certaines fonctionnalités peut nécessiter la création d'un compte.

5. Acceptation des CGU
Toute utilisation du site implique l'acceptation pleine et entière des présentes conditions.
Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser le site ni ses services.

6. Accès au site et au service
Le site est accessible 24h/24 et 7j/7, sauf interruption programmée ou non pour maintenance, sécurité ou cas de force majeure.
L'éditeur ne garantit pas une disponibilité continue et sans erreur.

7. Compte utilisateur
L'utilisateur s'engage à fournir des informations exactes et à jour lors de son inscription.
L'utilisateur est responsable de la confidentialité de ses identifiants et de toute activité réalisée depuis son compte.
En cas d'usage frauduleux, l'utilisateur doit informer l'éditeur sans délai.

8. Règles d'usage et comportements interdits
Il est notamment interdit de :
- porter atteinte au bon fonctionnement du site (intrusion, surcharge, scripts malveillants) ;
- usurper l'identité d'un tiers ;
- publier ou transmettre des contenus illicites, diffamatoires, haineux, violents ou contraires à l'ordre public ;
- exploiter commercialement tout ou partie du service sans autorisation écrite préalable.
L'éditeur se réserve le droit de suspendre ou supprimer un compte en cas de manquement.

9. Propriété intellectuelle
L'ensemble des contenus présents sur le site (textes, graphismes, logos, vidéos, éléments visuels, marque BattleCorp, structure et code) est protégé par le droit de la propriété intellectuelle.
Toute reproduction, représentation, adaptation ou exploitation, totale ou partielle, sans autorisation écrite préalable, est interdite.

10. Limitation de responsabilité
Les informations diffusées sur le site sont fournies à titre informatif et peuvent évoluer.
L'éditeur ne pourra être tenu responsable des dommages directs ou indirects résultant de l'utilisation du site, d'une indisponibilité du service, ou d'un usage non conforme par l'utilisateur.

11. Liens hypertextes
Le site peut contenir des liens vers des sites tiers. L'éditeur n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, politique de confidentialité ou pratiques.

12. Données personnelles
Les modalités de collecte et de traitement des données personnelles sont décrites dans la Politique de Confidentialité.
L'utilisation de cookies est détaillée dans la Politique Cookies.

13. Modification des conditions
L'éditeur peut modifier à tout moment les présentes mentions légales et CGU.
La version applicable est celle publiée sur le site à la date de consultation.

14. Droit applicable et juridiction compétente
Les présentes conditions sont soumises au droit français.
À défaut d'accord amiable, tout litige relève des juridictions compétentes du ressort de Béziers, sauf disposition légale impérative contraire.

15. Contact
Pour toute question relative au site, aux CGU ou à vos droits, contactez-nous à : julien.eballard@gmail.com.`,
    },
    cookies: {
      title: "Politique des Cookies",
      lastUpdate: "Dernière mise à jour:",
      intro: "Cette politique explique comment BattleCorp utilise les cookies et technologies similaires, conformément au RGPD et aux recommandations de la CNIL.",
      body: `1. Qu'est-ce qu'un cookie ?
Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, mobile, tablette) lors de votre navigation.
Il permet, selon sa nature, d'assurer le fonctionnement du site, de mesurer l'audience ou de personnaliser votre expérience.

2. Responsable du traitement
Le responsable du traitement est : BAD MARINES STUDIO, 20 cours Lafayette, 34480 Saint-Genies-de-Fontedit, France, contact : julien.eballard@gmail.com.

3. Cookies utilisés sur le site
BattleCorp peut utiliser les catégories suivantes :
- Cookies strictement nécessaires : indispensables au fonctionnement technique du site (sécurité, session, préférences essentielles). Ces cookies ne nécessitent pas votre consentement.
- Cookies de mesure d'audience : permettent de connaître la fréquentation et d'améliorer les performances du site.
- Cookies de fonctionnalité : mémorisent certains choix d'interface (ex. langue, préférences d'affichage).
- Cookies tiers éventuels : certains services externes (ex. vidéo, réseaux sociaux, analytics) peuvent déposer leurs propres cookies.

4. Base légale
Les cookies strictement nécessaires reposent sur l'intérêt légitime de l'éditeur.
Les cookies non essentiels (audience, personnalisation, tiers) sont déposés uniquement avec votre consentement préalable.

5. Gestion de votre consentement
Lors de votre première visite, un bandeau vous permet d'accepter, refuser ou paramétrer les cookies non essentiels.
Vous pouvez modifier votre choix à tout moment via le gestionnaire de consentement (lien "Paramètres cookies" à intégrer dans le footer).

6. Durée de conservation
La durée de vie des cookies est limitée à ce qui est strictement nécessaire au regard de leur finalité.
Le choix de consentement/refus est conservé pour une durée maximale de 6 mois, sauf obligation légale différente.

7. Liste détaillée des cookies
La liste exacte (nom, finalité, fournisseur, durée) doit être tenue à jour par l'équipe technique dans le bandeau de consentement :
- [COOKIE_NAME] - [FINALITÉ] - [DURÉE] - [FOURNISSEUR]
- [COOKIE_NAME] - [FINALITÉ] - [DURÉE] - [FOURNISSEUR]

8. Paramétrage navigateur
Vous pouvez également configurer votre navigateur pour bloquer ou supprimer les cookies.
Ce paramétrage peut altérer le fonctionnement de certaines fonctionnalités du site.

9. Vos droits
Conformément au RGPD, vous disposez de droits sur vos données (accès, rectification, effacement, limitation, opposition, portabilité).
Pour exercer vos droits : julien.eballard@gmail.com.
Vous pouvez aussi déposer une réclamation auprès de la CNIL : https://www.cnil.fr.

10. Mise à jour de la politique
La présente politique peut être modifiée à tout moment pour refléter les évolutions légales, réglementaires ou techniques.`,
    },
    privacy: {
      title: "Politique de Confidentialité",
      lastUpdate: "Dernière mise à jour:",
      intro: "Cette politique décrit comment BattleCorp collecte, utilise, conserve et protège vos données personnelles, conformément au RGPD (UE 2016/679) et à la loi Informatique et Libertés.",
      body: `1. Responsable du traitement
Le responsable du traitement est : BAD MARINES STUDIO, 20 cours Lafayette, 34480 Saint-Genies-de-Fontedit, France.
Contact principal : julien.eballard@gmail.com
Délégué à la protection des données (DPO), si applicable : julien.eballard@gmail.com

2. Données collectées
Nous pouvons collecter les catégories suivantes :
- Données d'identification : email, pseudo, identifiant utilisateur.
- Données de compte : mot de passe chiffré, préférences, langue.
- Données de connexion et d'usage : logs techniques, adresse IP, informations appareil/navigateur, événements de navigation.
- Données de support : contenu des messages envoyés via le support.
- Données de paiement : si applicable, via prestataires sécurisés (BattleCorp ne stocke pas les numéros de carte en clair).

3. Finalités et bases légales
Vos données sont traitées pour :
- Fournir le service et exécuter le contrat (création/gestion de compte, accès aux fonctionnalités).
- Assurer la sécurité et prévenir la fraude (intérêt légitime).
- Améliorer le produit et mesurer l'audience (consentement lorsque requis).
- Gérer la relation utilisateur et le support (intérêt légitime / exécution du contrat).
- Respecter nos obligations légales (obligation légale).

4. Destinataires des données
Les données sont accessibles uniquement aux personnes habilitées au sein de BattleCorp et à nos sous-traitants techniques (hébergement, analytics, support, emailing), dans la limite nécessaire à leurs missions.
Chaque sous-traitant est contractuellement encadré pour garantir la confidentialité et la sécurité.

5. Transferts hors Union européenne
Si certains prestataires sont situés hors UE, les transferts sont encadrés par des garanties appropriées (clauses contractuelles types, décision d'adéquation ou mécanismes équivalents).

6. Durées de conservation
Les données sont conservées pendant une durée proportionnée à la finalité :
- Données de compte : pendant la durée d'activité du compte, puis archivage/suppression selon obligations légales.
- Données de logs : durée limitée nécessaire à la sécurité et au diagnostic.
- Données de prospection : jusqu'au retrait du consentement ou à l'expiration légale applicable.
Les durées exactes doivent être précisées dans le registre de traitements interne.

7. Vos droits
Vous disposez des droits suivants :
- droit d'accès ;
- droit de rectification ;
- droit à l'effacement ;
- droit à la limitation du traitement ;
- droit d'opposition ;
- droit à la portabilité ;
- droit de retirer votre consentement à tout moment (sans effet rétroactif).
Pour exercer vos droits, écrivez à : julien.eballard@gmail.com.
Une preuve d'identité peut être demandée en cas de doute raisonnable.

8. Réclamation auprès de l'autorité de contrôle
Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL : https://www.cnil.fr.

9. Sécurité
BattleCorp met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre l'accès non autorisé, l'altération, la divulgation ou la destruction.
Malgré ces mesures, aucun système n'est totalement invulnérable.

10. Mineurs
Le service n'est pas destiné aux personnes ne remplissant pas les conditions d'âge prévues par la réglementation locale, sauf autorisation parentale lorsque la loi l'impose.

11. Modification de la politique
Cette politique peut être mise à jour à tout moment.
La version en vigueur est celle publiée sur le site à la date de consultation.`,
    },
  },
};
