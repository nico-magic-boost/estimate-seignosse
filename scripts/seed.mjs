/**
 * Seed script — populates the CMS with existing site content.
 * Idempotent: skips records that already exist (checked by slug / name).
 * Run: node scripts/seed.mjs
 */

import pg from 'pg'
import crypto from 'crypto'

const { Client } = pg

if (!process.env.DATABASE_URI) {
  console.log('DATABASE_URI not set, skipping seed.')
  process.exit(0)
}

const client = new Client({ connectionString: process.env.DATABASE_URI })
await client.connect()

const uid = () => crypto.randomUUID()

// ── Helpers ────────────────────────────────────────────────────────────────

async function exists(table, column, value) {
  const { rows } = await client.query(
    `SELECT id FROM "${table}" WHERE "${column}" = $1 LIMIT 1`,
    [value]
  )
  return rows[0]?.id ?? null
}

async function insert(table, data) {
  const keys = Object.keys(data)
  const vals = Object.values(data)
  const placeholders = keys.map((_, i) => `$${i + 1}`)
  const { rows } = await client.query(
    `INSERT INTO "${table}" (${keys.map(k => `"${k}"`).join(', ')})
     VALUES (${placeholders.join(', ')})
     RETURNING id`,
    vals
  )
  return rows[0].id
}

async function insertLocale(table, parentId, locale, data) {
  await client.query(
    `INSERT INTO "${table}" (_parent_id, _locale, ${Object.keys(data).map(k => `"${k}"`).join(', ')})
     VALUES ($1, $2, ${Object.keys(data).map((_, i) => `$${i + 3}`).join(', ')})
     ON CONFLICT (_locale, _parent_id) DO NOTHING`,
    [parentId, locale, ...Object.values(data)]
  )
}

// ── Author: Maëllie ────────────────────────────────────────────────────────

console.log('Seeding authors...')
let maellieId = await exists('authors', 'name', 'Maëllie')
if (!maellieId) {
  maellieId = await insert('authors', {
    name: 'Maëllie',
    role: 'Content Manager',
    bio: "Experte en location saisonnière et en marketing digital, Maëllie partage ses conseils pour aider les professionnels à développer leur activité.",
    updated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  })
  console.log(`  ✓ Auteur Maëllie créé (id: ${maellieId})`)
} else {
  console.log(`  · Auteur Maëllie déjà présent (id: ${maellieId})`)
}

// ── Pages ──────────────────────────────────────────────────────────────────

console.log('Seeding pages...')

const pages = [
  {
    slug: 'home',
    title: 'Accueil — Estimate Rentals',
    heroTitle: 'Estimez vos revenus locatifs saisonniers',
    heroSubtitle: "L'outil de référence pour les professionnels de la location courte durée",
  },
  {
    slug: 'tarifs',
    title: 'Tarifs — Estimate Rentals',
    heroTitle: 'Des offres adaptées à votre activité',
    heroSubtitle: 'Choisissez le plan qui correspond à vos besoins',
  },
  {
    slug: 'estimez-gratuitement',
    title: 'Estimez gratuitement — Estimate Rentals',
    heroTitle: 'Obtenez votre estimation gratuite',
    heroSubtitle: 'Découvrez le potentiel locatif de votre bien en quelques clics',
  },
  {
    slug: 'installer-estimateur',
    title: 'Installer l\'estimateur — Estimate Rentals',
    heroTitle: 'Intégrez l\'estimateur sur votre site',
    heroSubtitle: 'Simple, rapide et sans compétence technique requise',
  },
  {
    slug: 'demander-une-demo',
    title: 'Demander une démo — Estimate Rentals',
    heroTitle: 'Réservez votre démo personnalisée',
    heroSubtitle: 'Découvrez comment Estimate.rentals peut booster votre activité',
  },
  {
    slug: 'qui-sommes-nous',
    title: 'Qui sommes-nous — Estimate Rentals',
    heroTitle: 'L\'équipe derrière Estimate Rentals',
    heroSubtitle: 'Des passionnés de location saisonnière au service des professionnels',
  },
  {
    slug: 'actualites',
    title: 'Actualités — Estimate Rentals',
    heroTitle: 'Nos derniers articles',
    heroSubtitle: 'Conseils et insights pour les professionnels de la location courte durée',
  },
  {
    slug: 'mentions-legales',
    title: 'Mentions légales — Estimate Rentals',
    heroTitle: 'Mentions légales',
    heroSubtitle: '',
  },
  {
    slug: 'politique-de-cookies',
    title: 'Politique de cookies — Estimate Rentals',
    heroTitle: 'Politique de cookies',
    heroSubtitle: '',
  },
]

for (const page of pages) {
  const existingId = await exists('pages', 'slug', page.slug)
  if (existingId) {
    console.log(`  · Page "${page.slug}" déjà présente`)
    continue
  }
  const pageId = await insert('pages', {
    slug: page.slug,
    status: 'published',
    updated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  })
  await insertLocale('pages_locales', pageId, 'fr', {
    title: page.title,
    hero_title: page.heroTitle,
    hero_subtitle: page.heroSubtitle,
  })
  console.log(`  ✓ Page "${page.slug}" créée (id: ${pageId})`)
}

// ── Posts ──────────────────────────────────────────────────────────────────

console.log('Seeding posts...')

const posts = [
  {
    slug: 'pourquoi-integrer-un-simulateur',
    status: 'published',
    publishedAt: '2025-12-02T00:00:00.000Z',
    lastEditedAt: '2026-05-21T00:00:00.000Z',
    title: 'Pourquoi intégrer un estimateur sur votre site pro',
    intro: "Le secteur de la location saisonnière connaît une transformation profonde. Les propriétaires comparent souvent plusieurs offres avant de choisir un gestionnaire ou une agence. Dans ce contexte, générer des mandats devient un défi quotidien. Le site web d'une agence ne se contente plus d'être une simple vitrine : c'est devenu un point de contact stratégique. Un site statique, qui présente uniquement les services sans offrir de valeur immédiate, perd du terrain face à des concurrents qui proposent une expérience interactive et utile.",
    sections: [
      {
        heading: "Pourquoi les pros de la location saisonnière ont besoin d'un estimateur de revenus",
        anchor: 'besoin-estimateur',
        content: JSON.stringify([
          { type: 'paragraph', text: "À l'arrivée sur votre site, un propriétaire se pose souvent la question : « Combien pourrais-je gagner en louant mon bien en courte durée ? » S'il ne trouve pas de réponse rapide, il partira ailleurs. C'est ici qu'un outil interactif comme Estimate.rentals prend tout son sens." },
          { type: 'highlight', title: "Les avantages concrets d'Estimate.rentals pour votre activité", items: ['Répond immédiatement à la préoccupation principale du propriétaire', 'Génère des leads qualifiés', 'Valorise votre expertise et renforce votre crédibilité', 'Outil simple à intégrer sur votre site'] },
        ]),
      },
      {
        heading: 'Pourquoi intégrer un estimateur en ligne sur votre site professionnel ?',
        anchor: 'pourquoi-integrer',
        content: JSON.stringify([
          { type: 'subsection', heading: '1. Générer automatiquement des leads propriétaires qualifiés', paragraphs: ["L'estimateur capte l'attention des propriétaires au moment exact où ils s'interrogent sur la rentabilité de leur bien.", "En échange d'une estimation, ils laissent leurs coordonnées."] },
          { type: 'subsection', heading: '2. Renforcer votre crédibilité et votre expertise', paragraphs: ["Estimate.rentals s'appuie sur des données réelles, des contraintes locales, des coûts de gestion et des règles spécifiques à la location courte durée."] },
          { type: 'subsection', heading: '3. Attirer plus de propriétaires grâce à un service gratuit', paragraphs: ["Un estimateur gratuit attire naturellement davantage de visiteurs sur votre site."] },
          { type: 'subsection', heading: '4. Vous différencier de la concurrence locale', paragraphs: ["Peu d'agences proposent un estimateur professionnel dédié à la location courte durée."] },
          { type: 'subsection', heading: '5. Automatiser une partie de votre prospection', paragraphs: ["L'estimateur en ligne joue le rôle d'un assistant commercial 24/7."] },
          { type: 'subsection', heading: '6. Améliorer votre référencement naturel (SEO)', paragraphs: ['Un outil interactif augmente le temps passé sur la page, diminue le taux de rebond et renforce votre autorité sur Google.'] },
          { type: 'subsection', heading: '7. Offrir une expérience moderne et fluide à vos visiteurs', paragraphs: ["L'estimateur s'intègre en quelques lignes de code, sans compétence technique."] },
        ]),
      },
      {
        heading: 'Comment fonctionne Estimate.rentals',
        anchor: 'comment-fonctionne',
        content: JSON.stringify([
          { type: 'paragraph', text: "Estimate.rentals est un estimateur en ligne gratuit conçu pour les professionnels de la location courte durée. L'outil calcule les revenus potentiels en analysant la localisation, le type de logement, la surface, les équipements, les frais de gestion et les contraintes réglementaires locales." },
        ]),
      },
      {
        heading: 'Un levier efficace pour développer votre portefeuille clients',
        anchor: 'levier-portefeuille',
        content: JSON.stringify([
          { type: 'paragraph', text: "En intégrant l'estimateur sur votre site web, vous captez l'attention des propriétaires dès leur première visite. L'estimateur transforme ainsi un simple intérêt en mandat potentiel." },
          { type: 'paragraph', text: "Grâce à Estimate.rentals, votre site web devient un véritable outil commercial, actif 24h/24 et 7j/7." },
        ]),
      },
    ],
    summary: [
      'Un outil puissant pour attirer et convertir les propriétaires',
      "Un moyen de renforcer votre crédibilité professionnelle : grâce à des estimations établies sur des données réelles",
      "Un levier marketing qui booste votre site et votre prospection",
    ],
    ctaText: 'Essai gratuit',
    ctaHref: '/estimez-gratuitement',
  },
  {
    slug: 'les-5-erreurs',
    status: 'published',
    publishedAt: '2025-12-10T00:00:00.000Z',
    lastEditedAt: '2026-05-21T00:00:00.000Z',
    title: "Les 5 erreurs à éviter lors de l'estimation d'un bien saisonnier",
    intro: "Estimer la rentabilité d'un bien destiné à la location saisonnière ne s'improvise pas. Contrairement à la location classique, les revenus varient selon les saisons, les charges sont plus élevées, la concurrence est variable, et le taux d'occupation n'est jamais linéaire. Voici les 5 erreurs les plus fréquentes — et comment les éviter.",
    sections: [
      {
        heading: "Erreur n°1 : appliquer un tarif unique toute l'année",
        anchor: 'erreur-1',
        content: JSON.stringify([
          { type: 'paragraph', text: "L'une des erreurs les plus coûteuses consiste à appliquer un tarif fixe tout au long de l'année. En location saisonnière, la demande est par nature fluctuante : elle dépend des vacances scolaires, de la météo, des événements locaux et des week-ends prolongés." },
          { type: 'subsection', heading: 'Prenons un exemple concret :', paragraphs: ["Un appartement en bord de mer qui se loue facilement 80 € la nuit en juillet-août aura du mal à trouver preneur au même tarif en novembre. Un tarif de 50 € sera bien plus adapté."] },
        ]),
      },
      {
        heading: "Erreur n°2 : négliger l'étude comparative du marché local",
        anchor: 'erreur-2',
        content: JSON.stringify([
          { type: 'paragraph', text: "Se baser sur son ressenti, le prix d'achat du bien ou ce que « l'on pense que cela vaut » est une erreur classique. Le marché de la location saisonnière est dynamique et très local." },
          { type: 'subsection', heading: 'Comment effectuer une analyse comparative efficace ?', paragraphs: ["Consultez les principales plateformes (Airbnb, Booking, Abritel) pour identifier les biens similaires dans un rayon de 1 à 2 km."] },
          { type: 'subsection', heading: 'Les critères déterminants pour comparer ce qui est comparable', paragraphs: ["Ne comparez pas un studio avec un T2 ou un appartement sans parking avec un bien qui en dispose. Estimate.rentals effectue automatiquement cette analyse comparative."] },
        ]),
      },
      {
        heading: "Erreur n°3 : sous-estimer les charges et frais réels d'exploitation",
        anchor: 'erreur-3',
        content: JSON.stringify([
          { type: 'paragraph', text: "La location saisonnière génère des charges spécifiques, bien supérieures à celles d'une location longue durée." },
          { type: 'subsection', heading: 'Les charges fixes incontournables', paragraphs: [], bullets: ["Frais de gestion locative (entre 15 et 30 % des revenus bruts)", "Charges de copropriété", "Assurance habitation spécifique", "Taxe foncière", "Amortissement du mobilier"] },
          { type: 'subsection', heading: "Les frais d'exploitation spécifiques au saisonnier", paragraphs: [], bullets: ["Frais de ménage entre chaque locataire (60 à 120 € par rotation)", "Entretien du linge", "Frais de commission des plateformes (15 à 20 %)", "Taxe de séjour"] },
        ]),
      },
      {
        heading: 'Erreur n°4 : ignorer la tarification dynamique et les événements locaux',
        anchor: 'erreur-4',
        content: JSON.stringify([
          { type: 'paragraph', text: "La tarification dynamique est devenue un standard dans la location saisonnière professionnelle. Les événements locaux peuvent permettre de multiplier votre tarif par deux ou trois sur quelques jours." },
          { type: 'paragraph', text: "Une bonne estimation intègre donc un taux d'occupation réaliste par période — et non un taux moyen annuel. C'est exactement ce que fait Estimate.rentals en analysant la saisonnalité spécifique à chaque destination." },
        ]),
      },
      {
        heading: "Erreur n°5 : négliger la qualité de présentation et l'attractivité du bien",
        anchor: 'erreur-5',
        content: JSON.stringify([
          { type: 'paragraph', text: "Un bien mal présenté, même bien situé, ne pourra jamais atteindre les tarifs du marché, faussant dès le départ toute estimation de rentabilité." },
          { type: 'paragraph', text: "Les photos professionnelles constituent le premier levier d'attractivité. Des études de cas montrent qu'un même appartement, photographié avant et après mise en valeur, peut voir son taux de réservation multiplié par deux." },
        ]),
      },
    ],
    summary: [
      "La demande fluctue selon : vacances scolaires, météo, événements locaux, week-ends prolongés",
      "Se baser sur son ressenti, le prix d'achat ou ce que « l'on pense que cela vaut » est une erreur classique.",
      "La location saisonnière génère des charges spécifiques bien supérieures à la location longue durée",
      "Un bien rentable ne vaut pas la même chose selon le moment — intégrez la saisonnalité dans vos projections",
      "Photos professionnelles, décoration épurée, literie haut de gamme… Deux biens similaires peuvent avoir 20 à 40 % de différence de prix.",
    ],
    ctaText: 'Obtenir une estimation gratuite',
    ctaHref: '/estimez-gratuitement',
  },
  {
    slug: 'astuces-convaincre-proprietaire-gestion',
    status: 'published',
    publishedAt: '2025-02-25T00:00:00.000Z',
    lastEditedAt: '2026-05-21T00:00:00.000Z',
    title: "3 astuces pour convaincre un propriétaire de mettre son bien en gestion",
    intro: "Un propriétaire qui gère seul sa location saisonnière voit rarement tout le potentiel de son bien immobilier. Votre rôle, en tant qu'agence ou gestionnaire professionnel, c'est de lui montrer — chiffres à l'appui — que la gestion locative professionnelle augmente ses revenus nets, simplifie son quotidien et sécurise sa situation face aux obligations légales.",
    sections: [
      {
        heading: 'Astuce n°1 — Prouver que la gestion locative maximise les revenus nets',
        anchor: 'astuce-1',
        content: JSON.stringify([
          { type: 'paragraph', text: "L'argument économique reste le plus convaincant. Une agence professionnelle optimise les loyers grâce à des outils qu'un propriétaire seul n'utilise généralement pas : tarification dynamique, analyse concurrentielle, diffusion multi-plateformes coordonnée." },
          { type: 'subsection', heading: 'Comment Estimate.rentals vous y aide concrètement', paragraphs: ["Avant même le premier rendez-vous, vous pouvez générer une estimation personnalisée du bien : revenu brut potentiel, revenu net après charges, taux d'occupation cible.", "En arrivant avec un document chiffré et transparent, vous transformez votre discours commercial en démonstration factuelle."] },
          { type: 'highlight', title: "Ce qu'un propriétaire gagne souvent en passant à la gestion professionnelle :", items: ["Hausse du taux d'occupation de 10 à 20 % grâce à la diffusion multi-canaux", "Optimisation tarifaire : +15 à 25 % de revenu brut par nuit en haute saison", "Réduction des nuits vides grâce aux promotions last-minute", "Accès à des voyageurs plus qualifiés"] },
        ]),
      },
      {
        heading: "Astuce n°2 — Souligner la tranquillité totale : zéro gestion, zéro stress",
        anchor: 'astuce-2',
        content: JSON.stringify([
          { type: 'paragraph', text: "La gestion opérationnelle d'une location saisonnière est chronophage. Entre chaque séjour, il faut coordonner le ménage, vérifier l'état du logement, gérer le linge, organiser les arrivées." },
          { type: 'subsection', heading: 'Ce que cela représente concrètement en temps par mois', paragraphs: ["En haute saison, un bien qui tourne avec des séjours de 4 à 7 nuits peut générer 6 à 8 rotations par mois. Ces tâches représentent facilement 15 à 20 heures par mois."] },
          { type: 'subsection', heading: "Ce que votre agence prend entièrement en charge", paragraphs: [], bullets: ["Coordination et contrôle qualité de l'équipe de ménage", "Accueil physique ou check-in autonome", "Gestion des demandes voyageurs 7j/7", "Intervention et coordination des artisans en cas d'urgence", "Gestion des avis voyageurs"] },
        ]),
      },
      {
        heading: "Astuce n°3 — Sécuriser juridiquement et administrativement le propriétaire",
        anchor: 'astuce-3',
        content: JSON.stringify([
          { type: 'paragraph', text: "La location saisonnière est encadrée par une réglementation de plus en plus stricte. Un propriétaire qui gère sans accompagnement professionnel s'expose à des oublis, des erreurs déclaratives et des pénalités financières." },
          { type: 'subsection', heading: 'Les obligations légales souvent méconnues des propriétaires', paragraphs: [], bullets: ["Déclaration en mairie obligatoire", "Numéro d'enregistrement à mentionner sur toutes les annonces", "Respect des limites de durée (120 nuits/an dans certaines villes)", "Collecte et reversement de la taxe de séjour", "Contrat de location adapté"] },
          { type: 'subsection', heading: 'Les risques concrets pour un propriétaire non accompagné', paragraphs: ["Une location non déclarée peut entraîner une amende allant jusqu'à 5 000 € par infraction. En prenant en charge l'intégralité du cadre administratif et juridique, votre agence élimine ces risques."] },
        ]),
      },
      {
        heading: "Comment aborder le premier rendez-vous propriétaire",
        anchor: 'premier-rdv',
        content: JSON.stringify([
          { type: 'paragraph', text: "Convaincre un propriétaire, ce n'est pas vendre un service — c'est lui montrer ce qu'il perd sans vous. La structure idéale combine les trois leviers dans cet ordre : économique d'abord, opérationnel ensuite, juridique en dernier." },
          { type: 'subsection', heading: 'Préparez votre rendez-vous en 3 étapes', paragraphs: ["1. Générez une estimation Estimate.rentals du bien avant la rencontre.", "2. Préparez un comparatif simple : gestion seul vs gestion professionnelle.", "3. Évoquez un cas concret d'un propriétaire que vous accompagnez déjà — sans citer son nom."] },
          { type: 'paragraph', text: "Le propriétaire qui comprend qu'il peut gagner plus, travailler moins et dormir sur ses deux oreilles n'a plus beaucoup de raisons d'hésiter." },
        ]),
      },
    ],
    summary: [
      "L'argument économique est le plus puissant : chiffrez le potentiel du bien avant le rendez-vous avec Estimate.rentals",
      "La gestion opérationnelle d'un bien représente 15 à 20 heures par mois en haute saison — votre agence prend tout en charge",
      "La réglementation de la location saisonnière est complexe et évolue : accompagnez le propriétaire sur le volet juridique",
      "Combinez les trois leviers dans l'ordre : économique → opérationnel → juridique pour maximiser votre taux de conversion",
      "Un premier rendez-vous préparé avec des données concrètes transforme votre discours commercial en démonstration factuelle",
    ],
    ctaText: 'Demander une démo',
    ctaHref: '/demander-une-demo',
  },
]

for (const post of posts) {
  const existingId = await exists('posts', 'slug', post.slug)
  if (existingId) {
    console.log(`  · Article "${post.slug}" déjà présent`)
    continue
  }

  const postId = await insert('posts', {
    slug: post.slug,
    status: post.status,
    author_id: maellieId,
    published_at: post.publishedAt,
    last_edited_at: post.lastEditedAt,
    cta_text: post.ctaText,
    cta_href: post.ctaHref,
    updated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  })

  // Localized fields
  await insertLocale('posts_locales', postId, 'fr', {
    title: post.title,
    intro: post.intro,
  })

  // Sections
  for (let i = 0; i < post.sections.length; i++) {
    const s = post.sections[i]
    await client.query(
      `INSERT INTO "posts_sections" (_order, _parent_id, _locale, id, heading, anchor, content)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [i + 1, postId, 'fr', uid(), s.heading, s.anchor, s.content]
    )
  }

  // Summary
  for (let i = 0; i < post.summary.length; i++) {
    await client.query(
      `INSERT INTO "posts_summary" (_order, _parent_id, id, text) VALUES ($1, $2, $3, $4)`,
      [i + 1, postId, uid(), post.summary[i]]
    )
  }

  console.log(`  ✓ Article "${post.slug}" créé (id: ${postId})`)
}

// ── Done ───────────────────────────────────────────────────────────────────

await client.end()
console.log('Seed completed successfully.')
