import type { TranslationKeys } from "./fr";

export const en: TranslationKeys = {
  meta: {
    title: "BattleCorp - Multiplayer Cyberpunk Strategy & Management",
    description: "Lead your military corporation, manage resources, and conquer planets in this turn-based strategy game blending economy, warfare, and diplomacy.",
  },
  nav: {
    home: "Home",
    whitepaper: "Whitepaper",
    wiki: "Wiki",
    support: "Support",
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
    dashboard: "Dashboard",
  },
  header: {
    brand: "BATTLECORP",
    menuOpen: "Open menu",
    links: "Links",
    social: "Social",
  },
  footer: {
    rights: "All rights reserved",
    links: {
      whitepaper: "Whitepaper",
      wiki: "Wiki",
      support: "Support",
      discord: "Discord",
      facebook: "Facebook",
    },
    legal: {
      terms: "Terms",
      cookies: "Cookies",
      privacy: "Privacy",
    },
    sections: {
      links: "Links",
      social: "Social",
      legal: "Legal",
    },
  },
  home: {
    sections: {
      hero: {
        badge: "PLAYTEST - WARGAME AVAILABLE",
        titlePart1: "BATTLE",
        titlePart2: "CORP",
        tagline: "Lead your military corporation. Conquer a planet.",
        quote: "Strategy. Management. Diplomacy. Total war.",
        quoteAttribution: "- Operations Manual, Internal Directive",
        cta: "JOIN THE PLAYTEST",
        ctaSecondary: "WATCH THE DEMO",
      },
      howToPlay: {
        eyebrow: "GAMEPLAY",
        title: "How to Play",
        accentWord: "play",
        subtitle: "Develop your base, fuel your industry, and project your forces to conquer the planet.",
        imageAlt: "Cyberpunk base",
        tacticalAdvice: {
          label: "TACTICAL ADVICE",
          quotes: [
            '"Your HQ is your nerve center. Lose it, and the match is over."',
            '"A productive worker is worth more than ten idle taxpayers."',
            '"The best-supplied army wins the war, not the battle."',
            '"Barrage. Bomb. Then invade."',
          ],
        },
        navigation: {
          previous: "Previous",
          next: "Next",
        },
        steps: [
          {
            title: "Secure your base",
            description: "Your HQ is your vital point. Losing it means immediate elimination.",
            details: [
              "Starting territory = defeat if captured",
              "Invest in diplomacy, defenses, and garrisons",
              "Anticipate enemy strikes with scouting and protection",
            ],
          },
          {
            title: "Expand your territorial control",
            description: "Each captured territory increases your population, resources, and industrial capacity.",
            details: [
              "Mining output: steel, uranium, titanium, aluminum",
              "4,000 to 8,000 residents available for production",
              "2 to 6 build slots for infrastructure",
            ],
          },
          {
            title: "Produce & maintain",
            description: "Keep your economy running to sustain troops, buildings, and military operations.",
            details: [
              "Strategic resources must stay balanced at all times",
              "Buildings dedicated to training, fabrication, and defense",
              "Logistics resolution every 12 phases: anticipate or suffer",
            ],
          },
          {
            title: "Project force",
            description: "Deploy your Battlecorp's military power to crush all planetary resistance.",
            details: [
              "Ground columns: advance and secure zones (6 phases)",
              "Artillery barrages: suppression and long-range harassment (3 phases)",
              "Air squadrons: tactical bombing and lightning strikes (3 phases)",
            ],
          },
        ],
        resources: {
          title: "Resources to manage",
          items: ["Credits", "Food", "Energy", "Influence", "Steel", "Components"],
        },
        cta: "View Wiki",
      },
      pillars: {
        eyebrow: "STRATEGY",
        title: "4 Levers to Dominate the Planet",
        accentWord: "dominate",
        subtitle: "Master these principles to gain the edge and never lose it.",
        items: [
          {
            id: "conquest",
            title: "Control the Tempo",
            tagline: "Anticipate faster than your opponents.",
            category: "Decision / Timing",
            bullets: [
              "Time is segmented into tactical phases.",
              "Commit your orders. No rewinds. No mercy.",
              "Mistakes aren’t fixed — they’re paid for in blood and credits.",
            ],
            takeaway: "Set the pace, command the war.",
            cta: "View sheet (Codex)",
          },
          {
            id: "economy",
            title: "Economic Superiority",
            tagline: "Convert resources -> power.",
            category: "Industry / Logistics",
            bullets: [
              "More resources = more units = more tactical options.",
              "An economic deficit blocks all expansion.",
              "Optimize workers, infrastructure, and output.",
            ],
            takeaway: "The best-supplied army wins the war, not the battle.",
            cta: "View sheet (Codex)",
          },
          {
            id: "cycles",
            title: "Military Pressure",
            tagline: "Never let the enemy breathe.",
            category: "Offense / Map",
            bullets: [
              "Multiply strikes and diplomatic threats to force mistakes.",
              "Cut enemy production lines.",
              "Constant pressure beats a single isolated assault.",
            ],
            takeaway: "Hesitation is already defeat. Constant pressure breaks defenses.",
            cta: "View sheet (Codex)",
          },
          {
            id: "hq",
            title: "HQ Survival",
            tagline: "Lose your base and you disappear.",
            category: "Defense / Priorities",
            bullets: [
              "Your command center is the primary target.",
              "Invest as much in protection as in expansion.",
              "A solid base enables every offensive gamble.",
            ],
            takeaway: "Conquering without protecting is building on sand.",
            cta: "View sheet (Codex)",
          },
        ],
        takeawayLabel: "Key takeaway",
        stepLabel: "STEP",
        navHint: "Select a lever to learn more",
        statusLabel: "LEVER",
        visualPreview: "VISUAL PREVIEW",
        mobile: {
          expand: "View key point",
          collapse: "Collapse",
          swipeHint: "Swipe to view other levers",
        },
      },
      units: {
        eyebrow: "PRODUCTION & PROJECTION",
        title: "Combat Units",
        accentWord: "Combat",
        subtitle: "Every unit has a role. Every choice has a cost.",
        roles: {
          terrestrial: "Terrestrial",
          aerial: "Aerial",
        },
        labels: {
          melee: "Melee",
          ranged: "Ranged",
          defense: "Defense",
          resistance: "Resistance",
          na: "NA",
        },
        categories: {
          infantry: "Infantry",
          mechanical: "Mechanical",
          aerial: "Aerial",
        },
        buildingNames: {
          academy: "Military Academy",
          factory: "Mechanical Factory",
          spaceport: "Astroport",
        },
        abilities: {
          stealthAttack: "Stealth Attack",
          preMeleeShot: "Pre-Melee Shot",
          barrage: "Barrage",
          bombing: "Bombing",
        },
        list: [
          {
            id: "marine",
            name: "Marine",
            slogan: "First to enter. Last to leave.",
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
            slogan: "Where defense reassures, the Commando finishes.",
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
            slogan: "When flesh hesitates, steel executes.",
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
            slogan: "You don't argue with armor.",
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
            name: "Artillery",
            slogan: "The front advances when the rear decides.",
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
            name: "Bomber",
            slogan: "On the ground, we fight. In the air, we cut.",
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
            name: "Fighter",
            slogan: "The sky is a frontier. We close it.",
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
          label: "Produced at",
          unit: "units/cycle",
        },
        costs: {
          fabrication: "Fabrication",
          maintenance: "Maintenance",
        },
        resources: {
          credits: "Credits",
          food: "Food",
          energy: "Energy",
          steel: "Steel",
          titanium: "Titanium",
          aluminum: "Aluminum",
          component: "Component",
        },
        sections: {
          characteristics: "Characteristics",
          production: "Production",
          costs: "Costs",
          specialAbility: "Special Ability",
          none: "None",
        },
        mobile: {
          expand: "View details",
          collapse: "Collapse",
          swipeHint: "Swipe to see other units",
        },
      },
      victory: {
        eyebrow: "STRATEGY & CONQUEST",
        title: "Three Paths to Victory",
        accentWord: "Victory",
        subtitle: "Choose your strategy. Own the consequences.",
        pathLabel: "Path to victory",
        expandPath: "View steps",
        collapsePath: "Hide steps",
        paths: [
          {
            id: "military",
            title: "Military Victory",
            tag: "Force & Conquest",
            category: "Force & Conquest",
            description: "Capture and hold strategic territories to take control of the planet.",
            steps: [
              "Produce a powerful army",
              "Control strategic points",
              "Launch coordinated offensives",
              "Subdue enemy forces",
            ],
          },
          {
            id: "influence",
            title: "Influence Victory",
            tag: "Diplomacy & Economy",
            category: "Diplomacy & Economy",
            description: "Dominate through negotiation and economic control. Convert local populations and overturn your rivals.",
            steps: [
              "Develop a trade network of luxury factories",
              "Forge strategic alliances",
              "Control rare resources",
              "Reach the influence threshold",
            ],
          },
          {
            id: "domination",
            title: "Domination Victory",
            tag: "Survival & Elimination",
            category: "Survival & Elimination",
            description: "Be the last one standing. Survive assaults, eliminate all rivals, and claim the entire planet.",
            steps: [
              "Fortify your key positions",
              "Exhaust enemy resources",
              "Eliminate rival factions",
              "Control 100% of the territory",
            ],
          },
        ],
        mobile: {
          swipeHint: "Swipe to see other paths",
        },
      },
      community: {
        eyebrow: "COMMUNITY & ACTIVITY",
        title: "Join the Community",
        accentWord: "Community",
        subtitle: "Recruitment, diplomacy, alliances - expand your network.",
        channelsTitle: "Channels",
        resourcesTitle: "Resources",
        kpi: {
          players: { value: "2847", label: "players" },
          games: { value: "25420", label: "games played" },
          territories: { value: "892", label: "territories conquered" },
          betaDays: { value: "127", label: "beta days" },
        },
        discord: {
          title: "Official Discord HQ",
          live: "LIVE",
          description: "Join BattleCorp commanders and expand your network.",
          cta: "Join Discord",
          features: [
            "Recruitment & corporations (find your side)",
            "Diplomacy & alliances (temporary...)",
            "War room & strategies (eco / influence / combat)",
            "Patch notes & announcements (beta)",
          ],
          channels: ["#recruitment", "#diplomacy", "#war-room", "#patch-notes"],
          resources: ["Wiki", "Guides", "Support"],
          moderation: "Moderation - anti-spam - structured feedback",
        },
      },
      cta: {
        eyebrow: "INSTANT ACCESS",
        title: "Ready to play?",
        accentWord: "play",
        subtitle: "Enter the beta. Gain an early advantage.",
        ctaPrimary: "Join the Beta",
        ctaSecondary: "Watch Demo",
        proofs: ["Free", "No install", "Progress saved"],
      },
    },
  },
  auth: {
    login: {
      title: "Login",
      subtitle: "Sign in to your BattleCorp account",
      email: "Email",
      password: "Password",
      submit: "Sign in",
      noAccount: "Don't have an account?",
      createAccount: "Create an account",
      forgotPassword: "Forgot password?",
    },
    signup: {
      title: "Sign Up",
      subtitle: "Create your BattleCorp account",
      username: "Username",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      submit: "Create my account",
      hasAccount: "Already have an account?",
      signIn: "Sign in",
      acceptTerms: "I accept the terms of use",
    },
  },
  authShell: {
    title: "Account Access",
    description: "The login and signup module will be available soon. In the meantime, join the community on Discord for the latest announcements.",
    phase: "Authentication module - Phase 2",
    backHome: "Back to home",
    openDiscord: "Open Discord",
  },
  app: {
    title: "Reserved Area",
    description: "The BattleCorp application will be available soon.",
    phase: "Phase 2 - In development",
    backHome: "Back to home",
    openDiscord: "Open Discord",
  },
  appConnected: {
    meta: {
      title: "BattleCorp - Commander Space",
      description: "BattleCorp connected-player page: welcome commander, gameplay videos, rankings, and beta warning.",
    },
    hero: {
      badge: "CONNECTED PLAYER AREA",
      title: "Welcome, Commander",
      titleAccent: "Commander",
      cta: "PLAY",
      quote: "Your reputation echoes across the stars...",
      lore: [
        "Year 3764. For almost four centuries, the human galaxy has been split between private military mega-corporations - the Battlecorps - competing for exploitation rights over resource-rich planets known as Strategic and Industrial Territories (SIT).",
        "Nation-states are now legal facades. War became a regulated industry driven by contracts and strict arbitration. Officially these are not wars: they are competitive performance operations.",
        "Take control of your own BattleCorp and lead strategic conquest operations across devastated, hostile, and fragmented worlds.",
        "War is no longer a matter of nations. It has become a matter of corporations.",
      ],
    },
    howTo: {
      eyebrow: "GAMEPLAY",
      title: "How to play",
      accent: "play",
      subtitle: "Same frame and same energy as the gameplay section. Final videos will be plugged in here.",
      previous: "Previous",
      next: "Next",
      placeholderLabel: "Video placeholder",
      items: [
        {
          id: "step-1",
          title: "Quick onboarding",
          duration: "01:20",
          description: "A short commander UI walkthrough and your first priorities.",
          bullets: ["Theater overview", "Command shortcuts", "First-cycle priorities"],
        },
        {
          id: "step-2",
          title: "Operational planning",
          duration: "02:10",
          description: "Build a full action sequence without collapsing your economy.",
          bullets: ["Critical action order", "Resource pressure handling", "Offensive preparation"],
        },
        {
          id: "step-3",
          title: "Force projection",
          duration: "01:45",
          description: "Coordinate ground and air assets to lock the map.",
          bullets: ["Synchronize unit groups", "Exploit tactical windows", "Secure key territories"],
        },
      ],
    },
    rankings: {
      eyebrow: "RANKINGS",
      title: "Leaderboards",
      accent: "Leader",
      subtitle: "Strategy-style module with tab navigation, active status, and detailed panel.",
      statusLabel: "ACTIVE BOARD",
      previewTitle: "Leaderboard preview",
      previewRows: ["Commander_Alpha", "Commander_Bravo", "Commander_Charlie"],
      rankPrefix: "#",
      valuePlaceholder: "--",
      items: [
        {
          id: "global",
          title: "Global ranking",
          tagline: "Top-performing commanders",
          category: "Total performance",
          metrics: ["Confirmed victories", "Control/loss ratio", "Domination streak"],
        },
        {
          id: "territorial",
          title: "Territorial conquest",
          tagline: "Commanders who hold the map",
          category: "SIT control",
          metrics: ["Territories controlled", "Total control uptime", "Expansion per cycle"],
        },
        {
          id: "economy",
          title: "War economy",
          tagline: "Industrial empires",
          category: "Production",
          metrics: ["Average yield", "Logistics stability", "Replacement capacity"],
        },
        {
          id: "alliance",
          title: "Diplomatic influence",
          tagline: "Power through network",
          category: "Influence",
          metrics: ["Validated agreements", "Coalitions led", "Diplomatic weight"],
        },
      ],
    },
    disclaimer: {
      eyebrow: "BETA WARNING",
      title: "Current state",
      accent: "state",
      subtitle: "Battlecorp is in early access. This section stays visible to all connected players.",
      badgeLabel: "Beta Warning",
      paragraphs: [
        "Battlecorp is currently in beta and still under active development. You may encounter bugs, performance issues, or unfinished features.",
        "Beta access may be limited to a restricted number of players to keep servers stable and gather focused feedback.",
        "We are actively improving balancing and roadmap priorities from player feedback. By joining now, you help shape the final game.",
        "Note: Battlecorp will become a paid game after beta. Thanks for being part of the journey.",
      ],
    },
    common: {
      backHome: "Back home",
    },
  },
  notFound: {
    code: "404",
    title: "Oops! This page doesn't exist.",
    backHome: "Back to home",
  },
  validation: {
    required: "This field is required",
    invalidEmail: "Invalid email",
    minLength8: "Minimum 8 characters",
    passwordMismatch: "Passwords do not match",
    minLength3: "Minimum 3 characters",
  },
  common: {
    loading: "Loading...",
    error: "An error occurred",
    success: "Success",
    cancel: "Cancel",
    confirm: "Confirm",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    back: "Back",
    next: "Next",
    previous: "Previous",
    retry: "Retry",
    empty: "No items",
    close: "Close",
  },
  ui: {
    languageSwitch: {
      fr: "FR",
      en: "EN",
    },
    theme: {
      light: "Light",
      dark: "Dark",
      system: "System",
    },
  },
  legal: {
    terms: {
      title: "Legal Notice and Terms of Use",
      lastUpdate: "Last update:",
      intro: "This document includes the legal notice and terms of use for the BattleCorp website.",
      body: `1. Website publisher
The BattleCorp website is published by: BAD MARINES STUDIO, SAS, with share capital of EUR 5,000, registered with the BEZIERS Trade and Companies Register under number 9029406830011, with registered office at 20 cours Lafayette, 34480 Saint-Genies-de-Fontedit, France.
VAT number: FR61902940683
Contact email: julien.eballard@gmail.com
Phone: Not provided

2. Publishing director
Publishing director: Julien Eballard
Contact: julien.eballard@gmail.com

3. Hosting provider
The website is hosted by: OVH SAS, SAS, with registered office at 2 rue Kellermann, 59100 Roubaix, France, reachable at 1007 (from France) or +33 9 72 10 10 07 (from abroad).

4. Service purpose
BattleCorp provides a showcase website and online services related to a multiplayer strategy game universe (news, beta access, user account, informational pages, and support).
Access to certain features may require account creation.

5. Acceptance of terms
Any use of the website implies full and unconditional acceptance of these terms.
If you do not accept these terms, you must not use the website or its services.

6. Access to the website and service
The website is available 24/7, except in case of planned or unplanned interruption for maintenance, security, or force majeure.
The publisher does not guarantee continuous, error-free availability.

7. User account
Users agree to provide accurate and up-to-date information during registration.
Users are responsible for keeping their credentials confidential and for all activity carried out through their account.
In case of fraudulent use, users must notify the publisher without delay.

8. Rules of use and prohibited behavior
It is strictly prohibited to:
- interfere with the proper operation of the website (intrusion, overload, malicious scripts);
- impersonate any third party;
- publish or transmit unlawful, defamatory, hateful, violent, or public-order-offending content;
- commercially exploit all or part of the service without prior written authorization.
The publisher reserves the right to suspend or delete an account in case of breach.

9. Intellectual property
All content available on the website (texts, graphics, logos, videos, visual assets, BattleCorp brand, structure, and code) is protected by intellectual property laws.
Any reproduction, representation, adaptation, or exploitation, in whole or in part, without prior written authorization, is prohibited.

10. Limitation of liability
Information published on the website is provided for informational purposes and may change.
The publisher shall not be liable for any direct or indirect damage resulting from use of the website, service unavailability, or non-compliant use by the user.

11. Hyperlinks
The website may contain links to third-party websites. The publisher has no control over such websites and disclaims any liability for their content, privacy practices, or policies.

12. Personal data
The collection and processing of personal data are described in the Privacy Policy.
Cookie usage is described in the Cookie Policy.

13. Changes to these terms
The publisher may modify this legal notice and terms of use at any time.
The applicable version is the one published on the website at the date of consultation.

14. Governing law and jurisdiction
These terms are governed by French law.
In the absence of an amicable settlement, any dispute shall fall under the jurisdiction of the courts of Beziers, unless mandatory legal provisions state otherwise.

15. Contact
For any question regarding the website, these terms, or your rights, contact us at: julien.eballard@gmail.com.`,
    },
    cookies: {
      title: "Cookie Policy",
      lastUpdate: "Last update:",
      intro: "This policy explains how BattleCorp uses cookies and similar technologies, in accordance with GDPR and applicable French requirements.",
      body: `1. What is a cookie?
A cookie is a small text file stored on your device (computer, mobile, tablet) when visiting a website.
Depending on its type, it can ensure website functionality, measure audience, or personalize your experience.

2. Data controller
The data controller is: BAD MARINES STUDIO, 20 cours Lafayette, 34480 Saint-Genies-de-Fontedit, France, contact: julien.eballard@gmail.com.

3. Cookies used on this website
BattleCorp may use the following categories:
- Strictly necessary cookies: essential for technical operation of the website (security, session, core preferences). These cookies do not require consent.
- Audience measurement cookies: used to understand traffic and improve website performance.
- Functional cookies: used to remember interface choices (e.g. language, display preferences).
- Third-party cookies: some external services (e.g. video, social media, analytics) may place their own cookies.

4. Legal basis
Strictly necessary cookies rely on the publisher's legitimate interest.
Non-essential cookies (audience, personalization, third-party) are only placed with your prior consent.

5. Managing your consent
On your first visit, a cookie banner allows you to accept, refuse, or customize non-essential cookies.
You can change your choice at any time via the consent manager (link "Cookie settings" to be added in the footer).

6. Retention period
Cookie lifespan is limited to what is strictly necessary for each purpose.
Your consent/refusal choice is stored for a maximum of 6 months, unless a different legal obligation applies.

7. Detailed cookie list
The exact list (name, purpose, provider, duration) must be maintained by the technical team in the consent manager:
- [COOKIE_NAME] - [PURPOSE] - [DURATION] - [PROVIDER]
- [COOKIE_NAME] - [PURPOSE] - [DURATION] - [PROVIDER]

8. Browser settings
You can also configure your browser to block or delete cookies.
Such settings may affect the proper functioning of some website features.

9. Your rights
Under GDPR, you have rights over your personal data (access, rectification, erasure, restriction, objection, portability).
To exercise your rights: julien.eballard@gmail.com.
You may also lodge a complaint with the CNIL: https://www.cnil.fr.

10. Policy updates
This policy may be updated at any time to reflect legal, regulatory, or technical changes.`,
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdate: "Last update:",
      intro: "This policy explains how BattleCorp collects, uses, stores, and protects your personal data, in accordance with GDPR (EU 2016/679).",
      body: `1. Data controller
The data controller is: BAD MARINES STUDIO, 20 cours Lafayette, 34480 Saint-Genies-de-Fontedit, France.
Main contact: julien.eballard@gmail.com
Data Protection Officer (DPO), if applicable: julien.eballard@gmail.com

2. Data collected
We may collect the following categories:
- Identification data: email, username, user identifier.
- Account data: encrypted password, preferences, language.
- Connection and usage data: technical logs, IP address, device/browser information, browsing events.
- Support data: content of messages sent through support channels.
- Payment data: if applicable, through secure payment providers (BattleCorp does not store raw card numbers).

3. Purposes and legal bases
Your data is processed to:
- provide the service and perform the contract (account creation/management, feature access);
- ensure security and prevent fraud (legitimate interest);
- improve the product and measure audience (consent where required);
- manage user relationship and support (legitimate interest / contract performance);
- comply with legal obligations (legal obligation).

4. Data recipients
Data is accessible only to authorized BattleCorp personnel and technical processors (hosting, analytics, support, emailing), within the strict scope of their missions.
Each processor is contractually bound to confidentiality and security obligations.

5. Transfers outside the European Union
If some providers are located outside the EU, transfers are framed by appropriate safeguards (standard contractual clauses, adequacy decisions, or equivalent mechanisms).

6. Retention periods
Data is retained for a period proportionate to each purpose:
- Account data: for the duration of account activity, then archived/deleted according to legal obligations.
- Log data: for a limited period necessary for security and diagnostics.
- Marketing data: until consent withdrawal or expiry of applicable legal period.
Exact retention schedules should be maintained in the internal processing register.

7. Your rights
You have the following rights:
- right of access;
- right to rectification;
- right to erasure;
- right to restriction of processing;
- right to object;
- right to data portability;
- right to withdraw consent at any time (without retroactive effect).
To exercise your rights, write to: julien.eballard@gmail.com.
Proof of identity may be requested in case of reasonable doubt.

8. Complaint to the supervisory authority
If you believe your rights are not respected, you may lodge a complaint with the CNIL: https://www.cnil.fr.

9. Security
BattleCorp implements appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction.
Despite these measures, no system is fully invulnerable.

10. Minors
The service is not intended for individuals who do not meet the age requirements set by local law, unless parental authorization is provided where required.

11. Policy changes
This policy may be updated at any time.
The version in force is the one published on the website on the consultation date.`,
    },
  },
};
