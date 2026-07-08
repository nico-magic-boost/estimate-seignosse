# Changelog — Estimate Rentals (estimate.location-seignosse.fr)

Récapitulatif de toutes les modifications effectuées sur le projet.  
Dernière mise à jour : 2026-07-08

---

## 2026-07-08

### Perf — CSS non-bloquant (render-blocking -140ms)
**Commit `23face9`**

- Extraction des `@keyframes` et animations (`mesh-move`, `shimmer-loop`, `float`, `glow-pulse`) hors de `globals.css`
- Création de `public/animations.css` chargé en différé via `RevealOnScroll.tsx` (`document.createElement('link')` après le rendu)
- `globals.css` allégé : suppression des keyframes, conservation uniquement du CSS critique (layout, couleurs, reveal states)
- Activation de `experimental.optimizeCss: true` dans `next.config.ts`
- **Impact** : le chunk CSS bloquant passe de ~8.7 Ko à ~4 Ko

**Fichiers modifiés :**
- `src/app/globals.css`
- `src/components/RevealOnScroll.tsx`
- `public/animations.css` *(nouveau)*
- `next.config.ts`

---

### Fix SEO — Canonical et hreflang avec préfixe de locale
**Commit `71ab3cf`**

- **Problème** : Google Search Console signalait un canonical invalide — l'URL canonique (`/`) ne correspondait pas à l'URL hreflang (`/fr/`)
- **Cause** : `canonical('fr', path)` omettait le préfixe `/fr` pour la locale par défaut, alors que Next.js/next-intl sert toutes les locales avec leur préfixe (`/fr/`, `/en/`, `/es/`)
- **Fix** : `canonical()` et `hreflang()` incluent désormais systématiquement le préfixe locale pour toutes les langues

**Fichiers modifiés :**
- `src/lib/seo.ts`

---

## 2026-07-07

### Perf — Réduction du CLS (Cumulative Layout Shift)
**Commit `6d9fb25`**

- **Problème** : CLS de 0.147 (zone orange) — les widgets et formulaires chargent dynamiquement sans espace réservé, causant des sauts de layout
- **Fix** : ajout de `minHeight` sur les conteneurs de chaque widget dynamique
  - `EstimateWidget` : `minHeight: 480px`
  - `SubscriptionWidget` : `minHeight: 600px`
  - `PipedriveForm` : `minHeight: 420px`

**Fichiers modifiés :**
- `src/components/EstimateWidget.tsx`
- `src/components/SubscriptionWidget.tsx`
- `src/components/PipedriveForm.tsx`

---

## 2026-06-26

### Fix — Formulaire Pipedrive ne chargeait plus
**Commit `53f3ae3`**

- **Problème** : le formulaire Pipedrive restait bloqué sur un spinner tournant indéfiniment
- **Cause** : le composant conditionnait l'affichage du div `.pipedriveWebForms` à l'état `loaded` (déclenché par `onLoad` du script). Si le script ne déclenchait pas `onLoad`, le div n'était jamais rendu et Pipedrive ne trouvait pas son point d'injection
- **Fix** : suppression de l'état `loaded` — le div est désormais toujours présent dans le DOM dès le premier rendu

**Fichiers modifiés :**
- `src/components/PipedriveForm.tsx`

---

### Fix — Pages val-disere et biscarrosse corrompues (build Vercel en échec)
**Commit `fb34d37`**

- **Problème** : le build Vercel échouait silencieusement depuis le commit `f3e9934` (workflow corrompu), empêchant le déploiement de toutes les modifications récentes
- **Cause** : un agent du workflow avait écrit le chemin du fichier en texte au lieu du code TypeScript
  - `val-disere/page.tsx` : première ligne = texte parasite `"Now I have enough context..."` → erreur TypeScript `TS1434`
  - `biscarrosse/page.tsx` : fichier vide (contenait juste son propre chemin)
- **Fix** : suppression de la ligne parasite dans `val-disere/page.tsx`, restauration de `biscarrosse/page.tsx` avec `<LocationPageTemplate city="Biscarrosse" />`

**Fichiers modifiés :**
- `src/app/[locale]/val-disere/page.tsx`
- `src/app/[locale]/biscarrosse/page.tsx`

---

### Fix — H1 home page surchargé par le CMS Payload
**Commit `f009741`**

- **Problème** : la home page affichait encore l'ancien H1 "Estimez vos revenus locatifs saisonniers" au lieu du nouveau
- **Cause** : Payload CMS renvoyait `heroTitle` depuis la collection `pages` (slug `home`), écrasant la valeur hardcodée dans le code
- **Fix** : suppression de la ligne `if (page?.heroTitle) cmsHeroTitle = page.heroTitle` dans `page.tsx` — les textes hero sont désormais gérés uniquement dans le code
- **Nouveau H1** : "L'estimateur qui génère des mandats"
- **Nouveau sous-titre** : "Le seul estimateur de revenus locatifs intégrant les réglementations locales, le potentiel de revenus agence et la qualification propriétaire."

**Fichiers modifiés :**
- `src/app/[locale]/page.tsx`

---

### Feat — Effets visuels et accessibilité sur toutes les pages
**Commit `445346b`** *(correction du commit corrompu `f3e9934`)*

Ajout des effets visuels et corrections d'accessibilité WCAG AA sur l'ensemble des pages du site.

**Effets visuels ajoutés :**
- `RevealOnScroll` : animations d'apparition au scroll (`reveal`, `reveal-left`, `reveal-right`, `reveal-stagger`) sur toutes les pages
- `mesh-gradient-animated` : fond hero animé (remplace `mesh-gradient` statique)
- `gradient-text` : dégradé animé sur les mots-clés des H1
- `float` : animation flottante sur les images hero
- `btn-shimmer-auto` + `glow-pulse` : effets sur les CTA principaux
- `card-hover` : lift au survol sur les grilles de cartes
- FAQ : chevron SVG animé (`group-open:rotate-180`) remplaçant le `+` statique

**Corrections accessibilité (WCAG AA) :**
- Badges `bg-[#e8f5fb] text-[#007caa]` (contraste ~3.2:1) → `bg-[#005f85] text-white` (>7:1)
- `opacity-75` / `opacity-90` sur fonds colorés → couleurs explicites (`text-white`)
- Texte `text-[#007caa]` sur fond blanc dans le CTA final → `text-[#005f85]`

**Pages concernées (15 fichiers + 1 composant) :**
- `src/app/[locale]/[city]/page.tsx`
- `src/app/[locale]/actualidad/page.tsx`
- `src/app/[locale]/actualites/[slug]/page.tsx`
- `src/app/[locale]/actualites/page.tsx`
- `src/app/[locale]/arcachon/page.tsx`
- `src/app/[locale]/demander-une-demo/page.tsx`
- `src/app/[locale]/estimez-gratuitement/page.tsx`
- `src/app/[locale]/installer-estimateur/page.tsx`
- `src/app/[locale]/news/page.tsx`
- `src/app/[locale]/pricing/page.tsx`
- `src/app/[locale]/qui-sommes-nous/page.tsx`
- `src/app/[locale]/quienes-somos/page.tsx`
- `src/app/[locale]/tarifs/page.tsx`
- `src/app/[locale]/who-are-we/page.tsx`
- `src/components/LocationPageTemplate.tsx` *(couvre 7 pages villes)*

---

### Feat — Effets visuels et accessibilité sur la home page
**Commit `9066ecd`**

- Fond hero : `bg-gray-50` → `mesh-gradient-animated` (bleu animé)
- H1 : ajout de `gradient-text` sur "des mandats"
- Badges trust : `bg-[#e8f5fb] text-[#007caa]` → `bg-[#005f85] text-white`
- Création de `src/components/RevealOnScroll.tsx` (IntersectionObserver, threshold 0.12)
- Ajout des classes CSS dans `src/app/globals.css` : `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-stagger`, `.mesh-gradient-animated`, `.gradient-text`, `.float`, `.btn-shimmer`, `.btn-shimmer-auto`, `.glow-pulse`, `.card-hover`, `.orb`, `@media (prefers-reduced-motion)`

**Fichiers créés/modifiés :**
- `src/app/globals.css`
- `src/app/[locale]/page.tsx`
- `src/components/RevealOnScroll.tsx` *(nouveau)*

---

## Sécurité Supabase (action manuelle requise)

**Date : 2026-07-08**

30 tables Payload CMS exposées sans Row-Level Security (RLS). SQL à exécuter dans Supabase → SQL Editor :

```sql
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts_locales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages_locales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.location_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.location_pages_locales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pillar_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pillar_pages_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pillar_pages_faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_sizes_thumbnail ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_sizes_card ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_sizes_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings_locales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings_nav_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings_nav_links_locales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings_footer_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings_footer_links_locales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payload_migrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payload_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payload_preferences_rels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payload_locked_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payload_locked_documents_rels ENABLE ROW LEVEL SECURITY;
```

> Aucune policy nécessaire — Payload utilise la clé `service_role` qui bypasse le RLS.

---

## Migration de domaine (planifiée)

**De :** `estimate.location-seignosse.fr`  
**Vers :** `estime.rentals` (ou `estimate.rentals`)

**Étapes :**
1. Mettre à jour `NEXT_PUBLIC_SITE_URL` dans Vercel (Settings → Environment Variables)
2. Ajouter le nouveau domaine dans Vercel (Settings → Domains) + configurer les DNS
3. Ajouter une redirection 301 dans `next.config.ts` depuis l'ancien domaine
4. Mettre à jour les 3 fallbacks hardcodés dans le code :
   - `src/lib/seo.ts`
   - `src/collections/PillarPages.ts`
   - `src/components/admin/PillarPagePreview.tsx`
5. Déclarer la nouvelle propriété dans Google Search Console + outil "Changement d'adresse"
6. Garder l'ancien domaine actif avec 301 pendant ≥6 mois

---

## Stack technique

| Élément | Valeur |
|---|---|
| Framework | Next.js (App Router) |
| CMS | Payload CMS v3 |
| Base de données | Supabase (PostgreSQL) |
| Hébergement | Vercel |
| i18n | next-intl (fr / en / es) |
| CSS | Tailwind CSS + globals.css custom |
| Domaine actuel | estimate.location-seignosse.fr |
