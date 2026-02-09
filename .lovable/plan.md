
# Plan : Correction SEO Prioritaire

## Objectif
Améliorer l'indexation et le partage social en ajoutant les balises canonical, hreflang et Open Graph image.

---

## Ce qui sera fait

### 1. Créer une image Open Graph
- Créer une image `og-image.jpg` (1200x630px) dans `/public/`
- Utiliser l'image hero existante (`herodesktop_bg.webp`) comme base, ou créer un visuel avec le logo BattleCorp

### 2. Enrichir la fonction SEO
Modifier `src/lib/seo.ts` pour gérer dynamiquement :

| Balise | Fonction |
|--------|----------|
| `<link rel="canonical">` | URL unique de la page |
| `<link rel="alternate" hreflang="fr">` | Version française |
| `<link rel="alternate" hreflang="en">` | Version anglaise |
| `<link rel="alternate" hreflang="x-default">` | Fallback (langue par défaut) |
| `<meta property="og:url">` | URL courante |
| `<meta property="og:image">` | Image de partage |
| `<meta property="og:locale">` | Locale courante (fr_FR / en_US) |
| `<meta property="og:locale:alternate">` | Locale alternative |

### 3. Ajouter les balises statiques dans index.html
- `og:image` avec chemin absolu
- `og:site_name`
- `twitter:image`

### 4. Mettre à jour les pages
Adapter l'appel `setDocumentMeta()` dans chaque page pour fournir :
- L'URL courante (via `useLocation()`)
- La langue courante

---

## Détails techniques

### Nouvelle interface SEOMeta
```text
interface SEOMeta {
  title: string;
  description: string;
  path: string;      // Ex: "/fr" ou "/en/terms"
  language: "fr" | "en";
  baseUrl?: string;  // Optionnel, défaut sur l'URL du projet
}
```

### Fonction setDocumentMeta mise à jour
La fonction gérera :
1. Création/mise à jour de `<link rel="canonical">`
2. Création/mise à jour des 3 balises hreflang (fr, en, x-default)
3. Mise à jour de `og:url`, `og:locale`, `og:locale:alternate`

### Structure des URLs hreflang
```text
https://[domain]/fr     → hreflang="fr"
https://[domain]/en     → hreflang="en"  
https://[domain]/fr     → hreflang="x-default" (fallback)
```

---

## Fichiers impactés

| Fichier | Modification |
|---------|--------------|
| `public/og-image.jpg` | Nouveau - Image OG 1200x630 |
| `src/lib/seo.ts` | Enrichissement de setDocumentMeta() |
| `index.html` | Ajout og:image, og:site_name, twitter:image |
| `src/pages/Home.tsx` | Ajout path + language à setDocumentMeta |
| `src/pages/Terms.tsx` | Idem |
| `src/pages/Privacy.tsx` | Idem |
| `src/pages/Cookies.tsx` | Idem |
| `src/pages/AuthShell.tsx` | Idem |
| `src/pages/AppPlaceholder.tsx` | Idem |
| `src/pages/NotFound.tsx` | Idem |

---

## Résultat attendu

Après implémentation :
- Google comprendra les versions fr/en comme équivalentes linguistiques
- Une seule URL sera indexée par page (canonical)
- Les partages sur Facebook, Twitter, LinkedIn afficheront une image attractive avec le bon titre/description
- Amélioration du CTR sur les réseaux sociaux

---

## Remarque sur l'image OG

Pour l'image, deux options :
1. **Option rapide** : Utiliser `herodesktop_bg.webp` converti en JPG
2. **Option idéale** : Créer un visuel dédié avec logo + tagline

Je peux procéder avec l'option 1 pour une mise en place immédiate, ou vous pouvez fournir une image personnalisée.
