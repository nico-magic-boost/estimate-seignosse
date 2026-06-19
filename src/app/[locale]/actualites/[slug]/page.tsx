import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import type { ComponentProps } from 'react'

type Post = {
  title: string
  date: string
  intro: string
  sections: { heading: string; content: string }[]
  cta: { text: string; href: string }
}

const posts: Record<string, Post> = {
  'pourquoi-integrer-un-simulateur': {
    title: 'Pourquoi intégrer un estimateur sur votre site pro',
    date: '2025-04-10',
    intro: 'Le secteur de la location saisonnière connaît une transformation profonde. Les propriétaires comparent souvent plusieurs offres avant de choisir un gestionnaire ou une agence. Dans ce contexte, générer des mandats devient un défi quotidien. Un site statique, qui présente uniquement les services sans offrir de valeur immédiate, perd du terrain face à des concurrents qui proposent une expérience interactive et utile.',
    sections: [
      {
        heading: 'La question que se pose chaque propriétaire',
        content: 'À l\'arrivée sur votre site, un propriétaire se pose souvent la question : « Combien pourrais-je gagner en louant mon bien en courte durée ? » S\'il ne trouve pas de réponse rapide, il partira ailleurs. C\'est ici qu\'un outil interactif comme Estimate.rentals prend tout son sens. Un estimateur intégré offre une réponse instantanée, ce qui augmente l\'engagement et la confiance.',
      },
      {
        heading: '1. Générer automatiquement des leads propriétaires qualifiés',
        content: 'L\'estimateur capte l\'attention des propriétaires au moment exact où ils s\'interrogent sur la rentabilité de leur bien. En échange d\'une estimation, ils laissent leurs coordonnées. Vous recevez donc des leads déjà qualifiés, avec toutes les informations essentielles (adresse, type de bien, surface, potentiel locatif…).',
      },
      {
        heading: '2. Renforcer votre crédibilité et votre expertise',
        content: 'Estimate.rentals s\'appuie sur des données réelles, des contraintes locales, des coûts de gestion et des règles spécifiques à la location courte durée. Vous offrez ainsi une estimation transparente, fiable et professionnelle, qui crédibilise immédiatement votre positionnement face aux concurrents.',
      },
      {
        heading: '3. Vous différencier de la concurrence locale',
        content: 'Peu d\'agences proposent un estimateur professionnel dédié à la location courte durée. En l\'intégrant, vous offrez une fonctionnalité moderne et unique qui vous distingue immédiatement dans un marché très compétitif.',
      },
      {
        heading: '4. Automatiser une partie de votre prospection',
        content: 'L\'estimateur en ligne joue le rôle d\'un assistant commercial 24/7 : il qualifie les prospects à votre place, collecte les données nécessaires, et réduit les premiers échanges chronophages. Vos équipes gagnent plusieurs heures de travail chaque semaine.',
      },
      {
        heading: '5. Améliorer votre référencement naturel (SEO)',
        content: 'Un outil interactif augmente fortement le temps passé sur la page, diminue le taux de rebond, génère des partages et liens entrants, et renforce votre autorité sur Google. Il attire un trafic local hautement qualifié.',
      },
      {
        heading: 'Comment fonctionne Estimate.rentals',
        content: 'Estimate.rentals est un estimateur en ligne conçu pour les professionnels de la location saisonnière. Il s\'intègre en quelques lignes de code sur n\'importe quel site web. Le propriétaire renseigne son bien (localisation, surface, type…) et reçoit une estimation instantanée de ses revenus potentiels, saison par saison. En échange, vous récupérez ses coordonnées et les données de son bien dans votre tableau de bord.',
      },
    ],
    cta: { text: 'Essayer gratuitement', href: '/estimez-gratuitement' },
  },
  'les-5-erreurs': {
    title: 'Les 5 erreurs à éviter lors de l\'estimation d\'un bien saisonnier',
    date: '2025-03-18',
    intro: 'Estimer la rentabilité d\'un bien destiné à la location saisonnière ne s\'improvise pas. Contrairement à la location classique, les revenus varient selon les saisons, les charges sont plus élevées, la concurrence est variable, et le taux d\'occupation n\'est jamais linéaire. Beaucoup d\'investisseurs se trompent dès l\'étape d\'estimation et achètent un bien sur des projections trop optimistes.',
    sections: [
      {
        heading: 'Erreur n°1 : appliquer un tarif unique toute l\'année',
        content: 'L\'une des erreurs les plus coûteuses consiste à appliquer un tarif fixe tout au long de l\'année. Un appartement en bord de mer qui se loue facilement 80 € la nuit en juillet-août aura du mal à trouver preneur au même tarif en novembre. Un tarif de 50 € sera bien plus adapté. Cette différence de 30 € par nuit représente une variation de près de 40 % qu\'il est impossible de négliger dans vos calculs.',
      },
      {
        heading: 'Erreur n°2 : négliger l\'étude comparative du marché local',
        content: 'Il est absolument essentiel de réaliser une analyse comparative approfondie du marché local avant toute estimation. Ne partez jamais du prix d\'achat du bien ou d\'un tarif « qui semble correct ». Observez les biens comparables sur votre zone : superficie, équipements, standing, localisation précise. Éliminez les extrêmes et concentrez-vous sur la fourchette médiane.',
      },
      {
        heading: 'Erreur n°3 : sous-estimer les charges et frais réels d\'exploitation',
        content: 'La location saisonnière engendre des coûts spécifiques souvent sous-estimés : frais de ménage entre chaque locataire, consommation d\'eau et d\'électricité plus élevée, entretien du linge, petites réparations fréquentes, frais de plateforme (15 à 20 % du loyer sur Airbnb et Booking), assurance spécifique, taxe de séjour à reverser à la commune.',
      },
      {
        heading: 'Erreur n°4 : ignorer la tarification dynamique et les événements locaux',
        content: 'Les événements locaux — festival, compétition sportive, salon professionnel — peuvent permettre de multiplier votre tarif par deux ou trois sur quelques jours. Inversement, certaines périodes creuses nécessitent des promotions pour maintenir un taux d\'occupation acceptable. Une bonne stratégie tarifaire intègre ces variations dès la phase d\'estimation.',
      },
      {
        heading: 'Erreur n°5 : négliger la qualité de présentation et l\'attractivité du bien',
        content: 'La qualité de la présentation impacte directement le taux d\'occupation et le tarif applicable. Des photos professionnelles, un titre accrocheur, une description détaillée et des équipements adaptés (climatisation, wifi rapide, machine à café) permettent souvent d\'augmenter le tarif de 15 à 25 % par rapport à un bien similaire mal présenté.',
      },
      {
        heading: 'La solution : utiliser un estimateur spécialisé',
        content: 'Pour éviter ces cinq erreurs, utilisez un outil conçu pour la location saisonnière. Estimate.rentals intègre la saisonnalité, les données de marché locales, les charges réelles et les spécificités de chaque destination pour fournir une projection fiable et utilisable pour votre prise de décision.',
      },
    ],
    cta: { text: 'Obtenir une estimation gratuite', href: '/estimez-gratuitement' },
  },
  'astuces-convaincre-proprietaire-gestion': {
    title: '3 astuces pour convaincre un propriétaire de mettre son bien en gestion',
    date: '2025-02-25',
    intro: 'Un propriétaire qui gère seul sa location saisonnière voit rarement tout le potentiel de son bien immobilier. Votre rôle, en tant qu\'agence, c\'est de lui montrer que la gestion locative professionnelle augmente ses revenus, simplifie son quotidien et sécurise sa situation. Voici trois arguments concrets pour décrocher des mandats de gestion locative.',
    sections: [
      {
        heading: 'Astuce n°1 — Prouver que la gestion locative maximise les revenus',
        content: 'L\'argument économique reste le plus convaincant : une agence optimise les loyers grâce à des outils et services qu\'un propriétaire seul n\'utilise pas. La tarification dynamique, l\'analyse du marché et la diffusion multi-plateformes permettent souvent d\'obtenir un meilleur taux d\'occupation et un revenu plus stable. À travers une estimation fiable issue d\'Estimate.rentals, vous transformez un argument théorique en réalité chiffrée, ce qui facilite la décision et renforce votre expertise dès les premières minutes.',
      },
      {
        heading: 'Astuce n°2 — Souligner la tranquillité totale',
        content: 'Une location saisonnière demande du temps et une vraie organisation. Entre chaque locataire, il faut gérer le ménage, le linge, les arrivées tardives, les messages, les petites réparations. Un propriétaire finit vite par y passer plusieurs heures par mois. Votre agence prend tout en charge : coordination de l\'équipe de ménage, accueil ou check-in autonome, gestion des demandes pendant le séjour, appel aux artisans en urgence. Lors d\'un rendez-vous, demandez simplement : « Qu\'est-ce qui vous prend le plus de temps aujourd\'hui ? » — et montrez comment vous l\'éliminezs.',
      },
      {
        heading: 'Astuce n°3 — Sécuriser juridiquement et administrativement le bailleur',
        content: 'La location saisonnière obéit à des règles précises : déclaration en mairie, numéro d\'enregistrement, limites de durée dans certaines villes, règlement de copropriété, taxe de séjour, contrats adaptés. Un propriétaire qui gère sans accompagnement s\'expose à des erreurs et des pénalités. Votre agence sécurise tout le cadre : mandat clair, contrat adapté, gestion des dépôts de garantie, collecte et reversement de la taxe de séjour, respect des règles locales.',
      },
      {
        heading: 'Ce qu\'il faut retenir',
        content: 'Pour convaincre un propriétaire, combinez les trois leviers : montrez-lui son potentiel chiffré (économique), sa future tranquillité d\'esprit (opérationnel) et sa sécurité (juridique). Un estimateur comme Estimate.rentals vous permet de démarrer chaque rendez-vous avec des données concrètes, ce qui transforme votre discours commercial en démonstration factuelle.',
      },
    ],
    cta: { text: 'Demander une démo', href: '/demander-une-demo' },
  },
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts[slug]
  if (!post) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <time className="text-sm text-gray-400 block mb-3">
        {new Date(post.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
      </time>
      <h1 className="text-3xl font-bold text-gray-900 mb-8 leading-tight">{post.title}</h1>

      <p className="text-gray-600 text-lg leading-relaxed mb-10 border-l-4 border-[#007caa] pl-5">{post.intro}</p>

      <div className="space-y-8">
        {post.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-xl font-bold text-gray-800 mb-3">{section.heading}</h2>
            <p className="text-gray-600 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 bg-gradient-to-br from-[#007caa] to-[#17a3b5] rounded-2xl p-8 text-center text-white">
        <p className="font-semibold text-lg mb-4">Prêt à gagner du temps sur vos estimations et à obtenir plus de mandats ?</p>
        <Link
          href={post.cta.href as ComponentProps<typeof Link>['href']}
          className="inline-block bg-white text-[#007caa] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {post.cta.text}
        </Link>
      </div>

      <div className="mt-10">
        <Link href="/actualites" className="text-[#007caa] text-sm font-semibold hover:underline">
          ← Retour aux actualités
        </Link>
      </div>
    </div>
  )
}
