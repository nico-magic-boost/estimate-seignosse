import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import EstimateWidget from '@/components/EstimateWidget'
import { getLocale } from 'next-intl/server'
import { robots, hreflang, canonical } from '@/lib/seo'
import RevealOnScroll from '@/components/RevealOnScroll'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Estimez gratuitement votre location saisonnière',
    description: "Obtenez en quelques secondes une estimation gratuite des revenus locatifs saisonniers de votre bien. Outil professionnel basé sur les données du marché Airbnb, Booking, Abritel.",
    robots,
    alternates: {
      canonical: canonical('fr', '/estimez-gratuitement'),
      ...hreflang({ fr: '/estimez-gratuitement', en: '/estimate-for-free', es: '/estime-gratis' }),
    },
    openGraph: {
      title: 'Estimez gratuitement votre location saisonnière',
      description: "Obtenez en quelques secondes une estimation gratuite des revenus locatifs saisonniers de votre bien.",
      url: canonical('fr', '/estimez-gratuitement'),
    },
  }
}

const WP = 'https://estimate.rentals/wp-content/uploads'

const cities = [
  { slug: 'arcachon', name: 'Arcachon', img: `${WP}/2026/02/estimateur-location-vacances-arcachon.webp` },
  { slug: 'biscarrosse', name: 'Biscarrosse', img: `${WP}/2026/02/estimateur-location-vacances-biscarrosse.webp` },
  { slug: 'argeles-sur-mer', name: 'Argelès-sur-Mer', img: `${WP}/2026/02/estimation-location-Argeles-sur-Mer.webp` },
  { slug: 'les-sables-dolonne', name: 'Les Sables-d\'Olonne', img: `${WP}/2026/02/Les-sables-dOlonne.webp` },
  { slug: 'lavandou', name: 'Le Lavandou', img: `${WP}/2026/02/Le-Lavandou.webp` },
  { slug: 'menton', name: 'Menton', img: `${WP}/2026/04/Image-Estimate.rentals.webp` },
]

const faq = [
  {
    q: "L'estimation est-elle vraiment gratuite ?",
    a: "Oui, l'estimation est totalement gratuite et sans engagement ni obligation. Vous pouvez l'utiliser aussi souvent que vous le souhaitez.",
  },
  {
    q: "À quoi sert une estimation d'une location saisonnière pour un professionnel ?",
    a: "Elle permet d'appuyer un conseil immobilier, de structurer une analyse et de fournir une projection chiffrée cohérente à un client ou partenaire.",
  },
  {
    q: "Sur quelles données repose l'estimation ?",
    a: "Nous utilisons des données de marché : prix moyens pratiqués sur Airbnb, Booking, Abritel, taux d'occupation dans votre ville, saisonnalité et caractéristiques de votre bien.",
  },
  {
    q: "Combien de temps prend l'estimation ?",
    a: "Moins de 2 minutes : vous renseignez les infos de votre bien, et vous obtenez une estimation instantanée.",
  },
]

export default async function EstimatePage() {
  const locale = await getLocale()
  return (
    <div>
      <RevealOnScroll />
      {/* ── Titre + Widget en premier ─────────────────────── */}
      <section className="mesh-gradient-animated text-white py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Découvrez le <span className="font-extrabold underline decoration-white/60">potentiel locatif</span> de vos biens en 30 secondes.
          </h1>
          <p className="text-base text-white leading-relaxed">
            Données de marché actualisées · Résultat instantané · 100% gratuit
          </p>
        </div>
      </section>

      <section className="py-10 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <EstimateWidget />
          <p className="text-center text-xs text-gray-400 mt-4">
            Gratuit · Sans inscription · Sans engagement · Résultat en moins de 30 secondes
          </p>
        </div>
      </section>

      {/* ── Upsell banner ─────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-200 py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-700 text-sm">
            <strong>Envie d&apos;aller plus loin ?</strong> Obtenez plus de leads, gagnez plus de mandats,
            accédez à vos estimations et bien plus encore.
          </p>
          <Link
            href="/tarifs"
            className="flex-shrink-0 bg-[#007caa] text-white text-sm font-semibold px-6 py-2 rounded-full hover:bg-[#005f85] transition-colors"
          >
            Voir les tarifs
          </Link>
        </div>
      </section>

      {/* ── À propos de l'outil ───────────────────────────── */}
      <section className="mesh-gradient-animated text-white py-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 reveal-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
              L&apos;outil d&apos;estimation des revenus locatifs pour les professionnels de l&apos;immobilier
            </h2>
            <p className="text-base text-white mb-8 leading-relaxed">
              Renforcez votre expertise et facilitez la prise de mandat : grâce à des données de marché actualisées,
              vous obtenez en quelques secondes une estimation des revenus locatifs saisonniers réaliste,
              exploitable en rendez-vous ou en prospection.
            </p>
            <Link
              href="/installer-estimateur"
              className="btn-shimmer inline-block bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              Je teste l&apos;estimateur gratuitement
            </Link>
          </div>
          <div className="flex-1 reveal-right float">
            <Image
              src={`${WP}/2025/09/Votre-estimation-Airbnb-et-location-saisonniere-en-quelques-clics.webp`}
              alt="Professionnels de l'immobilier utilisant l'estimateur Estimate Rentals"
              width={520}
              height={380}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-2xl w-full object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* ── Pourquoi ──────────────────────────────────────── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12 reveal">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 leading-tight">
              Pourquoi utiliser un outil d&apos;estimation de location saisonnière professionnel ?
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              L&apos;estimation d&apos;un bien destiné à la location saisonnière nécessite une approche différente
              d&apos;une estimation locative classique. Les revenus dépendent de multiples paramètres :{' '}
              <strong>période de mise en location</strong>, <strong>attractivité locale</strong>,{' '}
              <strong>typologie du bien</strong> et <strong>positionnement sur le marché</strong>.
            </p>
            <p className="text-gray-700 text-sm font-semibold mb-4">L&apos;estimation permet de :</p>
            <ul className="space-y-3">
              {[
                'Structurer une estimation cohérente et argumentée',
                'Objectiver les projections de revenus locatifs saisonniers',
                'Faciliter les échanges avec les propriétaires',
                "Gagner en efficacité lors des phases d'étude ou de conseil",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="text-[#007caa] mt-0.5 flex-shrink-0">✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <Image
              src={`${WP}/2025/09/Pourquoi-utiliser-estimate.rentals-quand-on-est-proprietaire.webp`}
              alt="Clés d'un logement"
              width={500}
              height={380}
              className="rounded-2xl w-full object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* ── Comment est calculée ──────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 reveal">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 leading-tight">
              Comment est calculée l&apos;estimation d&apos;une location saisonnière ?
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              L&apos;estimation d&apos;une location saisonnière repose sur une analyse combinée de données de marché
              et de caractéristiques du bien, parmi lesquelles :
            </p>
            <ul className="space-y-3">
              {[
                "la localisation et l'environnement du logement,",
                "la surface, la capacité d'accueil et les équipements,",
                "les niveaux de prix observés sur le marché local,",
                "la saisonnalité de la demande,",
                "le potentiel de mise en location sur l'année.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="text-[#007caa] mt-0.5 flex-shrink-0">✔</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-500 text-sm mt-5 leading-relaxed">
              Ces éléments permettent d&apos;établir une projection des revenus locatifs saisonniers,
              présentée sous forme de fourchette, afin de refléter la réalité du marché.
            </p>
          </div>
          <div className="flex-1">
            <Image
              src={`${WP}/2026/02/calcul-location-saisonniere.webp`}
              alt="Calcul location saisonnière"
              width={500}
              height={380}
              className="rounded-2xl w-full object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* ── Airbnb section ────────────────────────────────── */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Estimation de revenus pour une location saisonnière sur Airbnb
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Airbnb constitue aujourd&apos;hui une <strong>référence majeure du marché de la location saisonnière</strong>.
            L&apos;estimation proposée par Estimate Rentals permet d&apos;<strong>évaluer le potentiel de revenus d&apos;un bien destiné
            à une diffusion sur Airbnb</strong>, en s&apos;appuyant sur les niveaux de prix observés, la saisonnalité
            de la demande et le positionnement des annonces comparables sur la plateforme.
            Cette approche offre une <strong>projection réaliste des revenus locatifs Airbnb</strong>,
            utile dans un cadre d&apos;analyse, de conseil ou de prise de décision immobilière.
          </p>
        </div>
      </section>

      {/* ── City grid ─────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Estimez le potentiel locatif saisonnier selon la destination
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 reveal-stagger">
            {cities.map((city) => (
              <a key={city.slug} href={`/${locale}/${city.slug}`}>
                <div className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <Image
                    src={city.img}
                    alt={`Estimation location de vacances à ${city.name}`}
                    width={320}
                    height={160}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <p className="absolute bottom-0 left-0 right-0 text-white text-xs font-semibold text-center pb-3 px-2 leading-snug">
                    Estimation de location de vacances à {city.name}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-3">
          {faq.map((item) => (
            <details key={item.q} className="border border-gray-200 rounded-xl bg-white">
              <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer font-medium text-gray-800 text-sm list-none">
                <span className="text-[#007caa] flex-shrink-0">✔</span>
                {item.q}
              </summary>
              <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="mesh-gradient py-14 px-4">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl font-bold text-white text-center md:text-left leading-snug">
            Prêt à gagner du temps sur vos estimations et à obtenir plus de mandats ?
          </h2>
          <Link
            href="/demander-une-demo"
            className="flex-shrink-0 bg-white text-[#005f85] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Demander une démo
          </Link>
        </div>
      </section>
    </div>
  )
}
