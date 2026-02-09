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
          offensive: string;
          defensive: string;
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
          role: "offensive" | "defensive";
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
    title: "BattleCorp - Jeu de Stratégie Cyberpunk",
    description: "Plongez dans l'univers cyberpunk de BattleCorp. Stratégie, combat et corporations dans un monde futuriste.",
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
        badge: "BÊTA OUVERTE — WARGAME DISPONIBLE",
        titlePart1: "BATTLE",
        titlePart2: "CORP",
        tagline: "Dirigez une corporation et dominez vos rivaux.",
        quote: "« Une cité se construit. Une planète se conquiert. »",
        quoteAttribution: "— Manuel d'Opérations, Directive interne",
        cta: "REJOINDRE LA BÊTA",
        ctaSecondary: "VOIR LA DÉMO",
      },
      howToPlay: {
        eyebrow: "BOUCLE DE JEU",
        title: "Comment jouer",
        accentWord: "jouer",
        subtitle: "Maîtrisez les cycles, gérez vos ressources, projetez la force.",
        imageAlt: "Base cyberpunk",
        tacticalAdvice: {
          label: "CONSEIL TACTIQUE",
          quotes: [
            "« Votre QG est votre talon d'Achille. Perdez-le, et la partie est terminée. »",
            "« Un contribuable qui paye vaut mieux que dix travailleurs sans crédits. »",
            "« L'armée la mieux ravitaillée gagne la guerre, pas la bataille. »",
            "« Pilonnez avant d'attaquer. Bombardez avant de pilonner. »",
          ],
        },
        navigation: {
          previous: "Précédent",
          next: "Suivant",
        },
        steps: [
          {
            title: "Implantez votre base",
            description: "Protégez votre centre de commandement — sa perte signifie élimination immédiate.",
            details: [
              "Territoire de départ = élimination si perdu",
              "Investir dans la défense autant que l'offensive",
              "Bunkers et garnisons pour protéger votre base",
            ],
          },
          {
            title: "Développez vos territoires",
            description: "Chaque territoire apporte population, ressources et positions stratégiques essentielles.",
            details: [
              "4 types : Départ, Gouvernement, Neutre, Standard",
              "Population = travailleurs vs contribuables",
              "2 à 6 zones constructibles par territoire",
            ],
          },
          {
            title: "Produisez & entretenez",
            description: "Énergie, composants, troupes — optimisez votre chaîne de production pour la guerre.",
            details: [
              "6 ressources : crédits, énergie, vivres, acier, composants, titane",
              "Bâtiments : Académie, Usine mécanique, Spatioport",
              "Cycles de 12 phases pour la production",
            ],
          },
          {
            title: "Projetez la force",
            description: "Pilotage, frappes aériennes, invasion terrestre — prenez l'avantage sur la carte.",
            details: [
              "Attaque terrestre : 6 phases",
              "Pilonnage (artillerie) : 3 phases",
              "Bombardement (aviation) : 3 phases",
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
        eyebrow: "MÉCANIQUES DE JEU",
        title: "4 piliers pour dominer la planète",
        accentWord: "dominer",
        subtitle: "Quatre leviers pour prendre l'avantage et le garder.",
        items: [
          {
            id: "conquest",
            title: "Conquête planétaire",
            tagline: "Chaque territoire compte.",
            category: "Stratégie / Macro",
            bullets: [
              "Contrôlez des zones pour accéder aux ressources et étendre votre influence.",
              "Les frontières ne sont jamais stables — adaptez-vous ou perdez du terrain.",
              "Les territoires gouvernementaux offrent des bonus stratégiques majeurs — ciblez-les en priorité.",
            ],
            takeaway: "Celui qui contrôle la carte dicte le tempo de la partie.",
            cta: "Voir la fiche (Codex)",
          },
          {
            id: "economy",
            title: "Économie de guerre",
            tagline: "Convertissez ressources → puissance.",
            category: "Production / Logistique",
            bullets: [
              "Gérez crédits, nourriture, énergie et composants pour alimenter votre machine de guerre.",
              "Un déséquilibre économique peut vous condamner avant même le premier combat.",
              "Chaque travailleur compte : répartissez votre population entre production et revenus fiscaux.",
            ],
            takeaway: "L'armée la mieux ravitaillée gagne la guerre, pas la bataille.",
            cta: "Voir la fiche (Codex)",
          },
          {
            id: "cycles",
            title: "Cycles & LOCK",
            tagline: "Décidez vite, jouez plus vite.",
            category: "Tempo / Décision",
            bullets: [
              "La partie avance par cycles — chaque phase impose des choix stratégiques sous pression temporelle.",
              "Le système LOCK empêche les retours en arrière : assumez vos décisions.",
              "12 phases par cycle — planifiez vos actions militaires et économiques plusieurs tours à l'avance.",
            ],
            takeaway: "Hésiter, c'est déjà perdre. La vitesse de décision est un avantage.",
            cta: "Voir la fiche (Codex)",
          },
          {
            id: "hq",
            title: "Centre de commandement",
            tagline: "Protégez votre base. Ou perdez tout.",
            category: "Défense / Survie",
            bullets: [
              "Votre QG est votre point le plus vulnérable — sa destruction signifie l'élimination.",
              "Investissez dans sa défense autant que dans vos offensives.",
              "Bunkers, garnisons et unités défensives : diversifiez vos lignes de protection.",
            ],
            takeaway: "Conquérir sans protéger, c'est bâtir sur du sable.",
            cta: "Voir la fiche (Codex)",
          },
        ],
        takeawayLabel: "À retenir",
        stepLabel: "ÉTAPE",
        navHint: "Sélectionnez un pilier pour en savoir plus",
        statusLabel: "PILIER",
        visualPreview: "APERÇU VISUEL",
        mobile: {
          expand: "Voir le point clé",
          collapse: "Réduire",
          swipeHint: "Swipez pour voir les autres piliers",
        },
      },
      units: {
        eyebrow: "PRODUCTION & PROJECTION",
        title: "Unités de combat",
        accentWord: "combat",
        subtitle: "Chaque unité a un rôle. Chaque choix a un coût.",
        roles: {
          offensive: "Offensif",
          defensive: "Défensif",
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
          spaceport: "Spatioport",
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
            role: "defensive",
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
            role: "offensive",
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
            role: "offensive",
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
            role: "offensive",
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
            role: "offensive",
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
            role: "offensive",
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
            role: "offensive",
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
            title: "Victoire Militaire",
            tag: "Force & Conquête",
            category: "Force & Conquête",
            description: "Écrasez vos adversaires par la puissance brute. Détruisez leurs centres de commandement pour les éliminer définitivement.",
            steps: [
              "Produire une armée puissante",
              "Contrôler les points stratégiques",
              "Lancer des offensives coordonnées",
              "Détruire les QG ennemis",
            ],
          },
          {
            id: "influence",
            title: "Victoire par Influence",
            tag: "Diplomatie & Économie",
            category: "Diplomatie & Économie",
            description: "Dominez par la négociation et le contrôle économique. Ralliez les factions neutres et étouffez vos rivaux.",
            steps: [
              "Développer un réseau commercial",
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
              "Contrôler 100% du territoire",
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
      title: "Conditions Générales d'Utilisation",
      lastUpdate: "Dernière mise à jour:",
      intro: "Les présentes conditions régissent l'utilisation de BattleCorp.",
      body: "Contenu des CGU à compléter.",
    },
    cookies: {
      title: "Politique des Cookies",
      lastUpdate: "Dernière mise à jour:",
      intro: "Cette page explique comment BattleCorp utilise les cookies.",
      body: "Contenu de la politique cookies à compléter.",
    },
    privacy: {
      title: "Politique de Confidentialité",
      lastUpdate: "Dernière mise à jour:",
      intro: "Cette page décrit comment nous collectons et utilisons vos données.",
      body: "Contenu de la politique de confidentialité à compléter.",
    },
  },
};
