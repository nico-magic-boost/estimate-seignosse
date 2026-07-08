# Changelog

| Date | Commit | Modification |
|------|--------|-------------|
| 2026-07-08 | 23face9 | Perf: animations.css différé (non-bloquant), optimizeCss activé |
| 2026-07-08 | 71ab3cf | Fix SEO: canonical/hreflang incluent désormais le préfixe locale (/fr/, /en/, /es/) |
| 2026-07-07 | 6d9fb25 | Perf: min-height sur EstimateWidget/SubscriptionWidget/PipedriveForm (CLS 0.147→<0.1) |
| 2026-06-26 | 53f3ae3 | Fix: PipedriveForm — suppression état loaded qui bloquait le rendu |
| 2026-06-26 | fb34d37 | Fix: val-disere et biscarrosse corrompus → build Vercel en échec |
| 2026-06-26 | f009741 | Fix: H1 home surchargé par CMS Payload → bypass, nouveau texte hardcodé |
| 2026-06-26 | 445346b | Feat: effets visuels + a11y WCAG AA sur toutes les pages (30 fichiers) |
| 2026-06-25 | 9066ecd | Feat: effets visuels + a11y home page, création RevealOnScroll + globals.css |

## À faire (manuel)
- [ ] Supabase RLS : activer sur 30 tables (SQL dans la session du 2026-07-08)
- [ ] Migration domaine → estime.rentals (plan dans la session du 2026-07-08)

## Stack
Next.js App Router · Payload CMS v3 · Supabase · Vercel · next-intl (fr/en/es) · Tailwind
