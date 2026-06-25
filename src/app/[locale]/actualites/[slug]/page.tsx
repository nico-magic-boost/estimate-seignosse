import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import type { ComponentProps } from 'react'
import { robots, canonical, SITE_URL } from '@/lib/seo'
import RevealOnScroll from '@/components/RevealOnScroll'

type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'bullets'; items: string[] }
  | { type: 'highlight'; title: string; items: string[] }
  | { type: 'subsection'; heading: string; paragraphs: string[]; bullets?: string[] }

type Section = {
  heading: string
  anchor: string
  blocks: ContentBlock[]
}

type Post = {
  title: string
  author: string
  publishedAt: string
  updatedAt?: string
  img?: string
  intro: string
  sections: Section[]
  summary?: string[]
  cta: { text: string; href: string }
}

const WP = 'https://estimate.rentals/wp-content/uploads'

const posts: Record<string, Post> = {
  'pourquoi-integrer-un-simulateur': {
    title: 'Pourquoi intégrer un estimateur sur votre site pro',
    author: 'Maëllie',
    publishedAt: '2025-12-02',
    updatedAt: '2026-05-21',
    img: `${WP}/2025/12/Banniere-blog-75.png`,
    intro: "Le secteur de la location saisonnière connaît une transformation profonde. Les propriétaires comparent souvent plusieurs offres avant de choisir un gestionnaire ou une agence. Dans ce contexte, générer des mandats devient un défi quotidien. Le site web d'une agence ne se contente plus d'être une simple vitrine : c'est devenu un point de contact stratégique. Un site statique, qui présente uniquement les services sans offrir de valeur immédiate, perd du terrain face à des concurrents qui proposent une expérience interactive et utile.",
    sections: [
      {
        heading: 'Pourquoi les pros de la location saisonnière ont besoin d\'un estimateur de revenus',
        anchor: 'besoin-estimateur',
        blocks: [
          {
            type: 'paragraph',
            text: "À l'arrivée sur votre site, un propriétaire se pose souvent la question : « Combien pourrais-je gagner en louant mon bien en courte durée ? » S'il ne trouve pas de réponse rapide, il partira ailleurs. C'est ici qu'un outil interactif comme Estimate.rentals prend tout son sens. Un estimateur intégré offre une réponse instantanée, ce qui augmente l'engagement et la confiance.",
          },
          {
            type: 'highlight',
            title: "Les avantages concrets d'Estimate.rentals pour votre activité",
            items: [
              'Répond immédiatement à la préoccupation principale du propriétaire',
              'Génère des leads qualifiés',
              'Valorise votre expertise et renforce votre crédibilité auprès des propriétaires',
              'Gagne de la crédibilité sur le long terme : grâce aux estimations fiables',
              "Outil simple à intégrer : l'estimateur s'installe facilement sur votre site",
            ],
          },
        ],
      },
      {
        heading: 'Pourquoi intégrer un estimateur en ligne sur votre site professionnel ?',
        anchor: 'pourquoi-integrer',
        blocks: [
          {
            type: 'subsection',
            heading: '1. Générer automatiquement des leads propriétaires qualifiés',
            paragraphs: [
              "L'estimateur capte l'attention des propriétaires au moment exact où ils s'interrogent sur la rentabilité de leur bien.",
              "En échange d'une estimation, ils laissent leurs coordonnées.",
              'Vous recevez donc des leads déjà qualifiés, avec toutes les informations essentielles (adresse, type de bien, surface, potentiel locatif…).',
            ],
          },
          {
            type: 'subsection',
            heading: '2. Renforcer votre crédibilité et votre expertise',
            paragraphs: [
              "Estimate.rentals s'appuie sur des données réelles, des contraintes locales, des coûts de gestion et des règles spécifiques à la location courte durée.",
              'Vous offrez ainsi une estimation transparente, fiable et professionnelle, qui crédibilise immédiatement votre positionnement face aux concurrents.',
            ],
          },
          {
            type: 'subsection',
            heading: '3. Attirer plus de propriétaires grâce à un service gratuit',
            paragraphs: [
              "Un estimateur gratuit attire naturellement davantage de visiteurs sur votre site.",
              "Les propriétaires recherchent activement ce type d'outil : vous devenez une référence locale pour l'estimation des revenus saisonniers.",
            ],
          },
          {
            type: 'subsection',
            heading: '4. Vous différencier de la concurrence locale',
            paragraphs: [
              "Peu d'agences proposent un estimateur professionnel dédié à la location courte durée.",
              "En l'intégrant, vous offrez une fonctionnalité moderne et unique qui vous distingue immédiatement dans un marché très compétitif.",
            ],
          },
          {
            type: 'subsection',
            heading: '5. Automatiser une partie de votre prospection',
            paragraphs: ["L'estimateur en ligne joue le rôle d'un assistant commercial 24/7 :"],
            bullets: [
              'Il qualifie les prospects à votre place,',
              'Collecte les données nécessaires,',
              'Réduit les premiers échanges chronophages.',
            ],
          },
          {
            type: 'subsection',
            heading: '6. Améliorer votre référencement naturel (SEO)',
            paragraphs: ['Un outil interactif :'],
            bullets: [
              'Augmente fortement le temps passé sur la page,',
              'Diminue le taux de rebond, génère des partages et liens entrants,',
              'Renforce votre autorité sur Google,',
              'Attire un trafic local hautement qualifié.',
            ],
          },
          {
            type: 'subsection',
            heading: '7. Offrir une expérience moderne et fluide à vos visiteurs',
            paragraphs: [
              "L'estimateur s'intègre en quelques lignes de code, sans compétence technique.",
              "Il s'adapte automatiquement à votre site, fonctionne parfaitement sur mobile, et offre une expérience fluide et professionnelle.",
            ],
          },
        ],
      },
      {
        heading: 'Comment fonctionne Estimate.rentals',
        anchor: 'comment-fonctionne',
        blocks: [
          {
            type: 'paragraph',
            text: "Estimate.rentals est un estimateur en ligne gratuit conçu pour les professionnels de la location courte durée. L'outil calcule les revenus potentiels en analysant :",
          },
          {
            type: 'bullets',
            items: [
              'La localisation du bien,',
              'Le type de logement,',
              'La surface,',
              'Les caractéristiques et équipements,',
              'Les frais de gestion et de distribution,',
              'Les contraintes réglementaires locales.',
            ],
          },
          {
            type: 'paragraph',
            text: "Le résultat fourni est un revenu réaliste, cohérent et professionnel. Il permet au propriétaire de se projeter, et à vous de vous appuyer sur des données concrètes pour argumenter votre offre.",
          },
        ],
      },
      {
        heading: 'Un levier efficace pour développer votre portefeuille clients',
        anchor: 'levier-portefeuille',
        blocks: [
          {
            type: 'paragraph',
            text: "En intégrant l'estimateur sur votre site web, vous captez l'attention des propriétaires dès leur première visite. Ils obtiennent une estimation instantanée puis, s'ils souhaitent aller plus loin, ils laissent leurs coordonnées. L'estimateur transforme ainsi un simple intérêt en mandat potentiel.",
          },
          {
            type: 'paragraph',
            text: "Grâce à Estimate.rentals, votre site web devient un véritable outil commercial, actif 24h/24 et 7j/7, capable d'attirer des leads même lorsque votre agence est fermée.",
          },
        ],
      },
    ],
    summary: [
      'Un outil puissant pour attirer et convertir les propriétaires',
      "Un moyen de renforcer votre crédibilité professionnelle : grâce à des estimations établies sur des données réelles",
      "Un levier marketing qui booste votre site et votre prospection : l'estimateur améliore votre SEO, enrichit l'expérience utilisateur",
    ],
    cta: { text: 'Essai gratuit', href: '/estimez-gratuitement' },
  },

  'les-5-erreurs': {
    title: "Les 5 erreurs à éviter lors de l'estimation d'un bien saisonnier",
    author: 'Maëllie',
    publishedAt: '2025-12-10',
    updatedAt: '2026-05-21',
    intro: "Estimer la rentabilité d'un bien destiné à la location saisonnière ne s'improvise pas. Contrairement à la location classique, les revenus varient selon les saisons, les charges sont plus élevées, la concurrence est variable, et le taux d'occupation n'est jamais linéaire. Beaucoup de propriétaires et d'investisseurs se trompent dès l'étape d'estimation, en s'appuyant sur des données incomplètes ou des intuitions trop optimistes. Résultat : des projections de rentabilité faussées qui mènent à de mauvaises décisions. Voici les 5 erreurs les plus fréquentes — et comment les éviter.",
    sections: [
      {
        heading: "Erreur n°1 : appliquer un tarif unique toute l'année",
        anchor: 'erreur-1',
        blocks: [
          {
            type: 'paragraph',
            text: "L'une des erreurs les plus coûteuses consiste à appliquer un tarif fixe tout au long de l'année. En location saisonnière, la demande est par nature fluctuante : elle dépend des vacances scolaires, de la météo, des événements locaux et des week-ends prolongés. Ignorer cette réalité revient à se priver d'une partie significative de son potentiel de revenus — ou à afficher un prix trop élevé hors saison, ce qui vide le calendrier.",
          },
          {
            type: 'subsection',
            heading: 'Prenons un exemple concret :',
            paragraphs: [
              "Un appartement en bord de mer qui se loue facilement 80 € la nuit en juillet-août aura du mal à trouver preneur au même tarif en novembre. Un tarif de 50 € sera bien plus adapté.",
              "Cette différence de 30 € par nuit représente une variation de près de 40 % qu'il est impossible de négliger dans vos calculs de rentabilité annuelle. Un bien rentable ne vaut pas la même chose selon le moment : c'est un principe fondamental que toute estimation sérieuse doit intégrer.",
            ],
          },
        ],
      },
      {
        heading: "Erreur n°2 : négliger l'étude comparative du marché local",
        anchor: 'erreur-2',
        blocks: [
          {
            type: 'paragraph',
            text: "Se baser sur son ressenti, le prix d'achat du bien ou ce que « l'on pense que cela vaut » est une erreur classique. Le marché de la location saisonnière est dynamique et très local. Il est absolument essentiel de réaliser une analyse comparative approfondie avant toute estimation.",
          },
          {
            type: 'subsection',
            heading: 'Comment effectuer une analyse comparative efficace ?',
            paragraphs: [
              "Consultez les principales plateformes (Airbnb, Booking, Abritel) pour identifier les biens similaires dans un rayon de 1 à 2 km. Notez les tarifs pratiqués selon les périodes, les taux d'occupation apparents (calendriers bloqués) et les scores de qualité.",
              "Éliminez les extrêmes — les biens mal notés ou exceptionnellement bien équipés — et concentrez-vous sur la fourchette médiane. C'est cette fourchette qui reflète la réalité du marché pour un bien standard.",
            ],
          },
          {
            type: 'subsection',
            heading: 'Les critères déterminants pour comparer ce qui est comparable',
            paragraphs: [
              "Ne comparez pas un studio avec un T2 ou un appartement sans parking avec un bien qui en dispose. Les critères à aligner : superficie, nombre de couchages, équipements (lave-vaisselle, climatisation, balcon, vue), localisation précise (distance mer, centre-ville, transports) et standing général.",
              "Estimate.rentals effectue automatiquement cette analyse comparative en croisant des milliers de données locales, ce qui élimine le biais humain et garantit une estimation ancrée dans la réalité du marché.",
            ],
          },
        ],
      },
      {
        heading: "Erreur n°3 : sous-estimer les charges et frais réels d'exploitation",
        anchor: 'erreur-3',
        blocks: [
          {
            type: 'paragraph',
            text: "La location saisonnière génère des charges spécifiques, bien supérieures à celles d'une location longue durée. Beaucoup d'estimations restent optimistes parce qu'elles ne tiennent pas compte de l'ensemble des coûts réels. C'est pourtant le point critique qui transforme un revenu brut séduisant en revenu net décevant.",
          },
          {
            type: 'subsection',
            heading: 'Les charges fixes incontournables',
            paragraphs: [],
            bullets: [
              "Frais de gestion locative (entre 15 et 30 % des revenus bruts si vous passez par une agence ou un gestionnaire)",
              "Charges de copropriété (souvent plus élevées que prévu pour les résidences avec piscine, ascenseur, etc.)",
              "Assurance habitation spécifique location courte durée",
              "Taxe foncière et taxe d'habitation le cas échéant",
              "Amortissement du mobilier et des équipements",
            ],
          },
          {
            type: 'subsection',
            heading: "Les frais d'exploitation spécifiques au saisonnier",
            paragraphs: [],
            bullets: [
              "Frais de ménage entre chaque locataire (souvent 60 à 120 € par rotation)",
              "Entretien et renouvellement du linge (draps, serviettes)",
              "Consommation d'eau et d'électricité plus élevée qu'en résidence principale",
              "Frais de commission des plateformes (15 à 20 % du loyer sur Airbnb et Booking)",
              "Petites réparations fréquentes et frais de maintenance",
              "Taxe de séjour à collecter et reverser à la commune",
            ],
          },
        ],
      },
      {
        heading: 'Erreur n°4 : ignorer la tarification dynamique et les événements locaux',
        anchor: 'erreur-4',
        blocks: [
          {
            type: 'paragraph',
            text: "La tarification dynamique est devenue un standard dans la location saisonnière professionnelle. Elle consiste à ajuster les prix en temps réel en fonction de la demande, de la concurrence, du taux d'occupation et des événements locaux.",
          },
          {
            type: 'paragraph',
            text: "Les événements locaux — festival, compétition sportive, salon professionnel, pont férié — peuvent permettre de multiplier votre tarif par deux ou trois sur quelques jours. Inversement, certaines périodes creuses nécessitent des promotions pour maintenir un taux d'occupation acceptable. Ne pas intégrer ces variations dans vos projections, c'est rater des pics de revenus significatifs et surestimer les périodes basses.",
          },
          {
            type: 'paragraph',
            text: "Une bonne estimation intègre donc un taux d'occupation réaliste par période — et non un taux moyen annuel — ainsi qu'une fourchette tarifaire dynamique. C'est exactement ce que fait Estimate.rentals en analysant la saisonnalité spécifique à chaque destination.",
          },
        ],
      },
      {
        heading: "Erreur n°5 : négliger la qualité de présentation et l'attractivité du bien",
        anchor: 'erreur-5',
        blocks: [
          {
            type: 'paragraph',
            text: "L'une des erreurs les plus coûteuses en location saisonnière consiste à sous-estimer l'impact de la présentation sur la rentabilité. La décoration et l'identité d'un espace jouent un rôle essentiel dans l'expérience du voyageur, bien au-delà du simple confort fonctionnel. Un bien mal présenté, même bien situé, ne pourra jamais atteindre les tarifs du marché, faussant dès le départ toute estimation de rentabilité.",
          },
          {
            type: 'paragraph',
            text: "Les photos professionnelles constituent le premier levier d'attractivité. Les erreurs classiques sont nombreuses : mauvais cadrage, éclairage insuffisant, pièces encombrées, mobilier vieillot visible. Des études de cas montrent qu'un même appartement, photographié avant et après mise en valeur, peut voir son taux de réservation multiplié par deux. La lumière naturelle, des espaces dégagés et une décoration moderne font toute la différence entre une annonce qu'on parcourt et une annonce qui génère des réservations.",
          },
        ],
      },
    ],
    summary: [
      "La demande fluctue selon : vacances scolaires, météo, événements locaux, week-ends prolongés",
      "Se baser sur son ressenti, le prix d'achat ou ce que « l'on pense que cela vaut » est une erreur classique.",
      "La location saisonnière génère des charges spécifiques bien supérieures à la location longue durée",
      "Un bien rentable ne vaut pas la même chose selon le moment — intégrez la saisonnalité dans vos projections",
      "Photos professionnelles, décoration épurée, literie haut de gamme, wifi, climatisation… Deux biens similaires sur le papier peuvent avoir 20 à 40 % de différence de prix selon la perception du voyageur.",
    ],
    cta: { text: 'Obtenir une estimation gratuite', href: '/estimez-gratuitement' },
  },

  'astuces-convaincre-proprietaire-gestion': {
    title: "3 astuces pour convaincre un propriétaire de mettre son bien en gestion",
    author: 'Maëllie',
    publishedAt: '2025-02-25',
    updatedAt: '2026-05-21',
    intro: "Un propriétaire qui gère seul sa location saisonnière voit rarement tout le potentiel de son bien immobilier. Entre les nuits à tarif sous-optimisé, les semaines vides faute de visibilité et les heures perdues en gestion opérationnelle, le manque à gagner peut dépasser plusieurs milliers d'euros par an. Votre rôle, en tant qu'agence ou gestionnaire professionnel, c'est de lui montrer — chiffres à l'appui — que la gestion locative professionnelle augmente ses revenus nets, simplifie son quotidien et sécurise sa situation face aux obligations légales. Voici trois arguments concrets, testés sur le terrain, pour décrocher des mandats de gestion locative saisonnière.",
    sections: [
      {
        heading: 'Astuce n°1 — Prouver que la gestion locative maximise les revenus nets',
        anchor: 'astuce-1',
        blocks: [
          {
            type: 'paragraph',
            text: "L'argument économique reste le plus convaincant. Une agence professionnelle optimise les loyers grâce à des outils et services qu'un propriétaire seul n'utilise généralement pas : tarification dynamique, analyse concurrentielle du marché local, diffusion multi-plateformes coordonnée (Airbnb, Booking, Abritel, site propre), référencement des annonces. Résultat : un taux d'occupation supérieur et des revenus plus stables sur l'année.",
          },
          {
            type: 'paragraph',
            text: "Mais dire « nous faisons mieux » ne suffit pas. Ce qui convainc un propriétaire, c'est de lui montrer son potentiel chiffré — pas une promesse vague. C'est exactement là qu'Estimate.rentals change la donne.",
          },
          {
            type: 'subsection',
            heading: 'Comment Estimate.rentals vous y aide concrètement',
            paragraphs: [
              "Avant même le premier rendez-vous, vous pouvez générer une estimation personnalisée du bien du propriétaire : revenu brut potentiel, revenu net après charges, taux d'occupation cible, saisonnalité des revenus. Ces données s'appuient sur des sources de marché réelles, pas sur des moyennes génériques.",
              "En arrivant avec un document chiffré et transparent, vous transformez votre discours commercial en démonstration factuelle. Le propriétaire cesse de se demander si ça vaut le coup — il voit ce qu'il laisse sur la table en continuant à gérer seul.",
            ],
          },
          {
            type: 'highlight',
            title: "Ce qu'un propriétaire gagne souvent en passant à la gestion professionnelle :",
            items: [
              "Hausse du taux d'occupation de 10 à 20 % grâce à la diffusion multi-canaux",
              "Optimisation tarifaire : +15 à 25 % de revenu brut par nuit en haute saison",
              "Réduction des nuits vides grâce aux promotions last-minute et early-bird",
              "Accès à des voyageurs plus qualifiés via les plateformes professionnelles",
            ],
          },
        ],
      },
      {
        heading: "Astuce n°2 — Souligner la tranquillité totale : zéro gestion, zéro stress",
        anchor: 'astuce-2',
        blocks: [
          {
            type: 'paragraph',
            text: "La gestion opérationnelle d'une location saisonnière est chronophage. Entre chaque séjour, il faut coordonner le ménage, vérifier l'état du logement, gérer le linge, organiser les arrivées (parfois tardives), répondre aux messages des voyageurs, traiter les avis, et intervenir en cas de problème. Un propriétaire finit vite par y consacrer plusieurs heures par semaine.",
          },
          {
            type: 'subsection',
            heading: 'Ce que cela représente concrètement en temps par mois',
            paragraphs: [
              "En haute saison, un bien qui tourne avec des séjours de 4 à 7 nuits peut générer 6 à 8 rotations par mois. Chaque rotation implique : communication avec le voyageur entrant, coordination ménage, vérification et état des lieux, gestion des retours et avis. Sans compter les imprévus (panne, réclamation, oubli de voyageur).",
              "Cumulées, ces tâches représentent facilement 15 à 20 heures par mois — du temps que la plupart des propriétaires n'ont pas ou ne souhaitent pas y consacrer.",
            ],
          },
          {
            type: 'subsection',
            heading: "Ce que votre agence prend entièrement en charge",
            paragraphs: [],
            bullets: [
              "Coordination et contrôle qualité de l'équipe de ménage",
              "Accueil physique ou check-in autonome (boîte à clés, application dédiée)",
              "Gestion des demandes voyageurs 7j/7, avant, pendant et après le séjour",
              "Intervention et coordination des artisans en cas d'urgence ou de panne",
              "Gestion des avis voyageurs et optimisation de la réputation en ligne",
              "Réapprovisionnement des consommables et suivi de l'état du bien",
            ],
          },
          {
            type: 'paragraph',
            text: "Face à un propriétaire hésitant, posez-lui la question directement : « Combien d'heures par mois êtes-vous prêt à consacrer à la gestion de votre location ? » La réponse ouvre naturellement la conversation sur la valeur de votre service.",
          },
        ],
      },
      {
        heading: "Astuce n°3 — Sécuriser juridiquement et administrativement le propriétaire",
        anchor: 'astuce-3',
        blocks: [
          {
            type: 'paragraph',
            text: "La location saisonnière est encadrée par une réglementation de plus en plus stricte, qui varie selon les communes et évolue chaque année. Un propriétaire qui gère sans accompagnement professionnel s'expose à des oublis, des erreurs déclaratives et des pénalités financières parfois lourdes.",
          },
          {
            type: 'subsection',
            heading: 'Les obligations légales souvent méconnues des propriétaires',
            paragraphs: [],
            bullets: [
              "Déclaration en mairie obligatoire pour toute location meublée de tourisme",
              "Numéro d'enregistrement à mentionner sur toutes les annonces dans les communes qui l'exigent",
              "Respect des limites de durée (120 nuits/an pour les résidences principales dans certaines villes)",
              "Vérification du règlement de copropriété (autorisation explicite de louer en courte durée)",
              "Collecte et reversement mensuel ou trimestriel de la taxe de séjour à la commune",
              "Contrat de location adapté, distinct d'un bail classique, avec dépôt de garantie conforme",
            ],
          },
          {
            type: 'subsection',
            heading: 'Les risques concrets pour un propriétaire non accompagné',
            paragraphs: [
              "Une location non déclarée peut entraîner une amende allant jusqu'à 5 000 € par infraction. Le non-reversement de la taxe de séjour expose à des pénalités de retard. Un contrat inadapté peut fragiliser le propriétaire en cas de litige avec un voyageur.",
              "En prenant en charge l'intégralité du cadre administratif et juridique, votre agence élimine ces risques. C'est un argument décisif, notamment pour les propriétaires qui louent pour la première fois ou dans des zones soumises à une réglementation renforcée.",
            ],
          },
        ],
      },
      {
        heading: "Comment aborder le premier rendez-vous propriétaire",
        anchor: 'premier-rdv',
        blocks: [
          {
            type: 'paragraph',
            text: "Convaincre un propriétaire, ce n'est pas vendre un service — c'est lui montrer ce qu'il perd sans vous. La structure idéale d'un premier rendez-vous combine les trois leviers dans cet ordre précis : économique d'abord (ce qu'il peut gagner), opérationnel ensuite (ce qu'il peut économiser en temps), juridique en dernier (ce qu'il risque sans accompagnement).",
          },
          {
            type: 'subsection',
            heading: 'Préparez votre rendez-vous en 3 étapes',
            paragraphs: [
              "1. Générez une estimation Estimate.rentals du bien avant la rencontre. Arrivez avec le potentiel chiffré : revenu brut, revenu net estimé, taux d'occupation cible. C'est votre meilleur outil d'accroche.",
              "2. Préparez un comparatif simple : gestion seul vs gestion professionnelle. Mettez en regard les revenus supplémentaires attendus et les heures économisées. Le calcul parle de lui-même.",
              "3. Évoquez un cas concret d'un propriétaire que vous accompagnez déjà — sans citer son nom. Les témoignages terrain ont bien plus d'impact que les arguments généraux.",
            ],
          },
          {
            type: 'paragraph',
            text: "Le propriétaire qui comprend qu'il peut gagner plus, travailler moins et dormir sur ses deux oreilles n'a plus beaucoup de raisons d'hésiter. Il ne vous reste plus qu'à finaliser les termes du mandat.",
          },
        ],
      },
    ],
    summary: [
      "L'argument économique est le plus puissant : chiffrez le potentiel du bien avant le rendez-vous avec Estimate.rentals",
      "La gestion opérationnelle d'un bien représente 15 à 20 heures par mois en haute saison — votre agence prend tout en charge",
      "La réglementation de la location saisonnière est complexe et évolue : accompagnez le propriétaire sur le volet juridique et administratif",
      "Combinez les trois leviers dans l'ordre : économique → opérationnel → juridique pour maximiser votre taux de conversion",
      "Un premier rendez-vous préparé avec des données concrètes transforme votre discours commercial en démonstration factuelle",
    ],
    cta: { text: 'Demander une démo', href: '/demander-une-demo' },
  },
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = posts[slug]
  if (!post) return {}
  return {
    title: post.title,
    description: post.intro.slice(0, 160),
    robots,
    alternates: { canonical: canonical('fr', `/actualites/${slug}`) },
    openGraph: {
      title: post.title,
      description: post.intro.slice(0, 160),
      url: canonical('fr', `/actualites/${slug}`),
      type: 'article',
      publishedTime: post.publishedAt,
      ...(post.img ? { images: [{ url: post.img, width: 1200, height: 630 }] } : {}),
    },
  }
}

function readingTime(post: Post): number {
  const text = [
    post.intro,
    ...post.sections.flatMap((s) =>
      s.blocks.flatMap((b) => {
        if (b.type === 'paragraph') return [b.text]
        if (b.type === 'bullets') return b.items
        if (b.type === 'highlight') return [b.title, ...b.items]
        if (b.type === 'subsection') return [...b.paragraphs, ...(b.bullets ?? [])]
        return []
      })
    ),
    ...(post.summary ?? []),
  ].join(' ')
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-4 h-4 flex-shrink-0 mt-0.5 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

function BulletIcon({ color = 'text-[#005f85]' }: { color?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`w-3 h-3 flex-shrink-0 mt-1 ${color}`}
      fill="currentColor"
      viewBox="0 0 8 8"
    >
      <circle cx="4" cy="4" r="3" />
    </svg>
  )
}

function renderBlock(block: ContentBlock, idx: number) {
  if (block.type === 'paragraph') {
    return <p key={idx} className="text-gray-600 leading-relaxed mb-4">{block.text}</p>
  }
  if (block.type === 'bullets') {
    return (
      <ul key={idx} className="list-none space-y-1 mb-4" role="list" aria-label="Points clés">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
            <BulletIcon />
            {item}
          </li>
        ))}
      </ul>
    )
  }
  if (block.type === 'highlight') {
    return (
      <div key={idx} className="my-6 bg-[#f0f8fb] border border-[#cce8f0] rounded-xl p-6">
        <p className="font-bold text-[#005f85] mb-4 text-base leading-snug">{block.title}</p>
        <ul className="space-y-2" role="list" aria-label="Avantages">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
              <span aria-hidden="true" className="bg-[#005f85] rounded-full p-0.5 flex-shrink-0 mt-0.5">
                <CheckIcon />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  if (block.type === 'subsection') {
    return (
      <div key={idx} className="mb-8">
        <h3 className="text-[#005f85] font-semibold text-base mb-3">{block.heading}</h3>
        {block.paragraphs.map((p, i) => (
          <p key={i} className="text-gray-600 leading-relaxed text-sm mb-2">{p}</p>
        ))}
        {block.bullets && (
          <ul className="list-none mt-2 space-y-1" role="list" aria-label="Détails">
            {block.bullets.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                <BulletIcon />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
  return null
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts[slug]
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.intro.slice(0, 160),
    datePublished: post.publishedAt,
    ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: 'Estimate Rentals', url: SITE_URL },
    url: canonical('fr', `/actualites/${slug}`),
    ...(post.img ? { image: post.img } : {}),
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical('fr', `/actualites/${slug}`) },
  }

  return (
    <div>
      <RevealOnScroll />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Banner image */}
      {post.img && (
        <div className="w-full max-h-80 overflow-hidden">
          <Image
            src={post.img}
            alt={`Illustration de l'article : ${post.title}`}
            width={1200}
            height={480}
            className="w-full object-cover"
            priority
          />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Title + meta */}
        <div className="max-w-3xl mx-auto mb-8 text-center md:text-left reveal">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            <span className="gradient-text">{post.title}</span>
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-500 text-xs mb-6">
            {/* Auteur */}
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path strokeLinecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              {post.author}
            </span>
            {/* Date publication */}
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path strokeLinecap="round" d="M12 7v5l3 3"/></svg>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </span>
            {/* Date mise à jour — icône crayon */}
            {post.updatedAt && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z"/>
                </svg>
                <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
              </span>
            )}
            {/* Temps de lecture */}
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
              </svg>
              {readingTime(post)} min de lecture
            </span>
          </div>
          <hr className="border-[#005f85]/30" />
        </div>

        {/* 2-col layout */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0 lg:sticky lg:top-24 space-y-5">
            {/* TOC */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 reveal-left">
              <p className="font-bold text-gray-800 text-sm mb-4">Sommaire</p>
              <nav aria-label="Table des matières">
                <ul className="space-y-2" role="list">
                  {post.sections.map((s) => (
                    <li key={s.anchor}>
                      <a
                        href={`#${s.anchor}`}
                        className="flex items-start gap-2 text-xs text-gray-600 hover:text-[#005f85] transition-colors leading-snug"
                      >
                        <svg aria-hidden="true" className="w-3 h-3 flex-shrink-0 mt-0.5 text-[#005f85]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/></svg>
                        {s.heading}
                      </a>
                    </li>
                  ))}
                  {post.summary && (
                    <li>
                      <a
                        href="#ce-qu-il-faut-retenir"
                        className="flex items-start gap-2 text-xs text-gray-600 hover:text-[#005f85] transition-colors leading-snug"
                      >
                        <svg aria-hidden="true" className="w-3 h-3 flex-shrink-0 mt-0.5 text-[#005f85]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/></svg>
                        Ce qu&apos;il faut retenir
                      </a>
                    </li>
                  )}
                </ul>
              </nav>
            </div>

            {/* Sticky CTA */}
            <div className="mesh-gradient rounded-xl p-5 text-white text-center reveal-left">
              <p className="font-semibold text-sm leading-snug mb-4">
                Prêt à gagner du temps sur vos estimations et à obtenir plus de mandats ?
              </p>
              <Link
                href={post.cta.href as ComponentProps<typeof Link>['href']}
                className="glow-pulse btn-shimmer-auto inline-block bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-5 py-2 rounded-full transition-colors text-sm"
              >
                {post.cta.text}
              </Link>
            </div>
          </aside>

          {/* Article content */}
          <article className="flex-1 min-w-0">
            {/* Intro */}
            <div className="reveal">
              <p className="text-gray-700 leading-relaxed mb-10 text-base">{post.intro}</p>
            </div>

            {/* Sections */}
            {post.sections.map((section, i) => (
              <section key={section.anchor} id={section.anchor} className="mb-10">
                {i > 0 && <hr className="border-[#005f85]/20 mb-8" />}
                <div className="reveal">
                  <h2 className="text-xl md:text-2xl font-bold text-[#005f85] mb-6 leading-snug">
                    {section.heading}
                  </h2>
                  <div>
                    {section.blocks.map((block, idx) => renderBlock(block, idx))}
                  </div>
                </div>
              </section>
            ))}

            {/* Summary box */}
            {post.summary && (
              <div id="ce-qu-il-faut-retenir" className="mesh-gradient rounded-xl p-7 text-white mt-10 reveal">
                <p className="font-bold text-base mb-4">Ce qu&apos;il faut retenir :</p>
                <ul className="space-y-2" role="list" aria-label="Points à retenir">
                  {post.summary.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white">
                      <BulletIcon color="text-white" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Back link */}
            <div className="mt-10">
              <Link href="/actualites" className="text-[#005f85] text-sm font-semibold hover:underline">
                ← Retour aux actualités
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
