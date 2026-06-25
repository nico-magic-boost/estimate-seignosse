# Stack Technique — estimate-seignosse

## 1. Stack principale

| Technologie | Version | Rôle |
|---|---|---|
| Next.js | 16.2.9 | Framework React (App Router) |
| React | 19.0.0 | UI |
| TypeScript | 5 | Typage statique |
| Payload CMS | 3.0.0 | CMS headless |
| @payloadcms/db-postgres | 3.0.0 | Base de données PostgreSQL |
| @payloadcms/richtext-lexical | 3.0.0 | Éditeur riche Lexical |
| @payloadcms/next | 3.0.0 | Intégration Payload ↔ Next.js |
| next-intl | 4.0.0 | Internationalisation (FR/EN/ES) |
| @anthropic-ai/sdk | 0.105.0 | Génération IA (Claude) |
| tailwindcss | 4.3.1 | Styling CSS |

**Modèle Claude utilisé :** `claude-opus-4-8` (max_tokens: 8192, temperature: 0.7)

---

## 2. Structure des dossiers

```
/
├── src/
│   ├── app/
│   │   ├── [locale]/                  # Routing i18n (fr, en, es)
│   │   │   ├── page.tsx               # Home
│   │   │   ├── [city]/page.tsx        # Pages piliers par ville
│   │   │   ├── arcachon/page.tsx      # Page pilier Arcachon (dédiée)
│   │   │   ├── actualites/[slug]/     # Article blog dynamique
│   │   │   ├── actualites/            # Listing articles
│   │   │   ├── estimez-gratuitement/  # Estimateur (FR)
│   │   │   ├── estimate-for-free/     # Estimateur (EN)
│   │   │   ├── estime-gratis/         # Estimateur (ES)
│   │   │   ├── installer-estimateur/  # Installation (FR)
│   │   │   ├── install-estimator/     # Installation (EN)
│   │   │   ├── instalar-estimador/    # Installation (ES)
│   │   │   ├── qui-sommes-nous/       # À propos (FR)
│   │   │   ├── who-are-we/            # À propos (EN)
│   │   │   ├── quienes-somos/         # À propos (ES)
│   │   │   ├── tarifs/ pricing/ precios/     # Tarifs (3 locales)
│   │   │   ├── demander-une-demo/ …   # Démo (3 locales)
│   │   │   ├── mentions-legales/ …    # Legal (3 locales)
│   │   │   └── politique-de-cookies/ … # Cookie policy (3 locales)
│   │   ├── (payload)/
│   │   │   ├── admin/[[...segments]]/ # Payload CMS dashboard
│   │   │   └── admin/importMap.ts     # Composants admin custom
│   │   └── api/
│   │       ├── generate-post/         # Génération article Claude
│   │       └── generate-pillar-page/  # Génération page pilier Claude
│   │
│   ├── collections/
│   │   ├── Media.ts
│   │   ├── Authors.ts
│   │   ├── Posts.ts
│   │   ├── Pages.ts
│   │   ├── PillarPages.ts
│   │   └── Settings.ts (Global)
│   │
│   ├── components/
│   │   ├── EstimateWidget.tsx         # Web component <estimate-wc/>
│   │   ├── PillarPageRenderer.tsx     # Rendu complet page pilier CMS (structure Arcachon)
│   │   ├── PillarPageFaq.tsx          # Accordéon FAQ (client) pour pages piliers
│   │   ├── PageSectionRenderer.tsx    # Rendu sections CMS
│   │   ├── LexicalRenderer.tsx        # Rendu contenu Lexical
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── PipedriveForm.tsx
│   │   └── admin/
│   │       ├── Logo.tsx
│   │       ├── Icon.tsx
│   │       ├── Dashboard.tsx
│   │       ├── BeforeLogin.tsx
│   │       ├── GenerateWithAI.tsx     # Bouton génération articles
│   │       └── GeneratePillarPage.tsx # Bouton génération pages piliers
│   │
│   ├── i18n/
│   │   ├── routing.ts                 # Mapping pathnames localisés
│   │   └── request.ts
│   ├── lib/
│   │   └── seo.ts                     # Helpers canonical, robots, hreflang
│   └── payload.config.ts
│
├── scripts/
│   ├── create-tables.mjs              # Schéma PostgreSQL (run au build)
│   └── seed.mjs                       # Données initiales
├── messages/
│   ├── fr.json
│   ├── en.json
│   └── es.json
└── public/
    └── media/                         # Uploads Payload
```

---

## 3. Collections Payload CMS

| Collection | Slug | Groupe Admin | Champs principaux |
|---|---|---|---|
| Users | `users` | Configuration | email, name (auth) |
| Media | `media` | Médias | filename, alt, caption, resizes (thumbnail/card/hero) |
| Pages | `pages` | Site | title, slug, heroTitle, heroSubtitle, sections (page builder), seo |
| Authors | `authors` | Blog | name, role, bio, avatar, writingTone, linkedinUrl, expertise, credentials |
| Posts | `posts` | Blog | title, slug, coverImage, intro, sections, summary, cta, seo, status (draft/scheduled/published), scheduledAt, author |
| PillarPages | `pillar-pages` | Pages Piliers | title, slug, city, targetKeyword, intro, heroImage, heroImageUrl, sections, faqItems, seo |
| Settings | `settings` | — (Global) | siteTitle, siteDescription, navLinks, footerLinks, defaultOgImage, googleSiteVerification, analyticsId |

**Localization Payload :** FR (défaut), EN, ES avec fallback activé.

**Page Builder (Pages) — types de blocs :**
`hero` · `featureList` · `textImage` · `faq` · `ctaBanner` · `richText`

---

## 4. API Routes

| Route | Méthode | Corps | Retour |
|---|---|---|---|
| `/api/generate-post` | POST | `{ topic, keywords?, authorId?, locale? }` | `{ postId, slug }` |
| `/api/generate-pillar-page` | POST | `{ city, targetKeyword? }` | `{ pageId, slug }` |
| `/api/[...slug]` | * | — | Proxy Payload CMS |

---

## 5. Variables d'environnement

| Variable | Requis | Description |
|---|---|---|
| `DATABASE_URI` | Oui | URL PostgreSQL (`postgresql://user:pass@host:5432/db`) |
| `PAYLOAD_SECRET` | Oui | Secret sessions Payload CMS |
| `ANTHROPIC_API_KEY` | Oui | Clé API Anthropic (génération IA) |
| `NEXT_PUBLIC_AGENCY_ID` | Non | ID agence widget estimateur (défaut: `PDu96z5S6eidcbpPXioKlQ%3D%3D`) |
| `NEXT_PUBLIC_SITE_URL` | Non | URL base du site |

---

## 6. Scripts npm

| Script | Commande |
|---|---|
| `dev` | `next dev` |
| `build` | `node scripts/create-tables.mjs && node scripts/seed.mjs && next build` |
| `seed` | `node scripts/seed.mjs` |
| `start` | `next start` |
| `lint` | `next lint` |
| `payload` | `payload` (CLI Payload) |

---

## 7. Configuration

### next.config.ts
- `withPayload()` + `withNextIntl()` wrapping
- Images : domaine autorisé `estimate.rentals/wp-content/uploads/**` (formats avif + webp)
- Redirects : `/:locale/admin/*` → `/admin/*` (admin non-localisé)
- Security headers : `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy`

### Internationalisation (next-intl v4)
- Locales : `fr` (défaut), `en`, `es`
- Pathnames localisés : `actualites` ↔ `news` ↔ `actualidad`, `qui-sommes-nous` ↔ `who-are-we` ↔ `quienes-somos`, etc.
- Middleware : `src/proxy.ts` — bypass intl pour `/admin` et `/api`, rate-limiting 30 req/min

### Tailwind CSS v4
- Import via `@import "tailwindcss"` dans `globals.css`
- Couleurs marque : `--color-primary: #007caa`, `--color-secondary: #17a3b5`
- CTA orange : `#e8621a`
- Classes custom : `mesh-gradient`, `btn-shimmer`, `dot-grid`

---

## 8. Composants admin custom (importMap)

| Composant | Collection / Hook | Rôle |
|---|---|---|
| `AdminLogo` | Logo dashboard | Branding Payload UI |
| `AdminIcon` | Favicon admin | Icône admin |
| `BeforeDashboard` | Hook before-dashboard | Contenu avant tableau de bord |
| `BeforeLogin` | Hook before-login | Bannière avant login |
| `GenerateWithAI` | Posts → beforeListTable | Modal génération article via Claude |
| `GeneratePillarPage` | PillarPages → beforeListTable | Modal génération page pilier via Claude |

---

## 9. Services externes

| Service | Intégration | Variable | Rôle |
|---|---|---|---|
| **Anthropic Claude** | `@anthropic-ai/sdk` | `ANTHROPIC_API_KEY` | Génération contenu SEO (articles + pages piliers) |
| **PostgreSQL** | `@payloadcms/db-postgres` | `DATABASE_URI` | Base de données Payload |
| **Estimate Web Component** | `<estimate-wc/>` tag | `NEXT_PUBLIC_AGENCY_ID` | Widget estimateur location saisonnière |
| **Pipedrive CRM** | `PipedriveForm.tsx` | — | Capture leads / formulaire démo |
| **Google Analytics** | Settings Payload | `analyticsId` | Tracking |

**Web Component estimateur :**
```html
<estimate-wc
  agency-ids="..."
  primary-color="#007caa"
  secondary-color="#17a3b5"
  lang="fr"
/>
```
Script chargé depuis : `https://form.estimate.rentals/estimateWebComponent.js`

---

## 10. Déploiement

- **Plateforme :** Vercel
- **Branch :** `main`
- **Build command :** `npm run build` (migrate DB → seed → next build)
- **Branch feature :** `claude/fervent-brahmagupta-zeqbr3`

---

## 11. Architecture — points clés

1. **App Router i18n-first** — toutes les routes sous `[locale]/` sauf `/admin`
2. **Headless CMS** — Payload stocke le contenu, Next.js assure le rendu SSR (SEO-friendly)
3. **AI-Powered Content** — Claude Opus génère brouillons d'articles et pages piliers SEO depuis le backoffice
4. **Page Builder** — sections réutilisables gérées dans le CMS (hero, textImage, faq, featureList…)
5. **Pages Piliers SEO** — pages de destination par ville (`/arcachon`, `/biscarrosse`…) avec données marché locales, législation, FAQ
6. **Multi-locale** — FR/EN/ES avec pathnames localisés et fallback Payload
7. **Schéma DB manuel** — `create-tables.mjs` gère les migrations idempotentes (pas de Payload migrate CLI)
8. **Seed idempotent** — `seed.mjs` peuple auteurs, pages et articles sans dupliquer

---

## 12. Villes avec pages piliers

| Ville | Slug | Statut |
|---|---|---|
| Arcachon | `arcachon` | Page dédiée complète (ISO WordPress) |
| Biscarrosse | `biscarrosse` | Template générique |
| Lavandou | `lavandou` | Template générique |
| Méribel | `meribel` | Template générique |
| Menton | `menton` | Template générique |
| Les Sables-d'Olonne | `les-sables-dolonne` | Template générique |
| Val-d'Isère | `val-disere` | Template générique |
| Argelès-sur-Mer | `argeles-sur-mer` | Template générique |
| Seignosse | `seignosse` | Template générique |
