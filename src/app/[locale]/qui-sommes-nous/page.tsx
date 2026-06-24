import type { Metadata } from 'next'
import Image from 'next/image'
import { robots, hreflang, canonical, SITE_URL } from '@/lib/seo'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PageSectionRenderer } from '@/components/PageSectionRenderer'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Qui sommes-nous — L'équipe Estimate Rentals",
    description: "Estimate Rentals est une marque de Popconnect, basée à Biarritz. Une équipe de passionnés : experts en data, professionnels de l'immobilier et développeurs au service de la location saisonnière.",
    robots,
    alternates: {
      canonical: canonical('fr', '/qui-sommes-nous'),
      ...hreflang({ fr: '/qui-sommes-nous', en: '/who-are-we', es: '/quienes-somos' }),
    },
    openGraph: {
      title: "Qui sommes-nous — L'équipe Estimate Rentals",
      description: "Estimate Rentals est une marque de Popconnect, basée à Biarritz.",
      url: canonical('fr', '/qui-sommes-nous'),
    },
  }
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Estimate Rentals',
  url: SITE_URL,
  logo: 'https://estimate.rentals/wp-content/uploads/2025/07/image-15.png',
  description: "L'outil d'estimation locative saisonnière dédié aux professionnels de l'immobilier.",
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Biarritz',
    addressRegion: 'Nouvelle-Aquitaine',
    addressCountry: 'FR',
  },
  sameAs: ['https://estimate.rentals'],
}

const WP = 'https://estimate.rentals/wp-content/uploads'

const values = [
  {
    title: 'Précision',
    text: "On sait que dans l'immobilier, chaque chiffre compte. C'est pourquoi nos estimations s'appuient sur des milliers de données actualisées, croisées avec la réalité du terrain. Pas de promesses creuses, juste des résultats solides pour que vous sachiez où vous allez.",
  },
  {
    title: 'Transparence',
    text: "Notre philosophie : aucune mauvaise surprise. Rien n'est laissé de côté : frais de gestion, commissions, charges locales… tout est pris en compte. Parce qu'une estimation n'a de valeur que si elle reflète vraiment ce que vous allez toucher à la fin.",
  },
  {
    title: 'Simplicité',
    text: "Parce qu'un outil doit être simple et efficace. En quelques clics, vous obtenez un rapport clair et partageable. Pas besoin d'être un expert en data pour l'utiliser : on a fait le travail pour vous.",
  },
  {
    title: 'Innovation',
    text: "Le marché locatif évolue vite, et nous aussi. On améliore constamment notre outil pour rester en phase avec vos besoins et les nouvelles tendances. Notre promesse : vous offrir un service qui avance au même rythme que votre métier.",
  },
]

export default async function AboutPage() {
  let cmsSections: any[] | null = null
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'qui-sommes-nous' } },
      limit: 1,
    })
    const page = result.docs[0]
    if (page?.sections?.length) cmsSections = page.sections
  } catch {
    // DB unavailable at build time — use hardcoded fallback
  }

  if (cmsSections) {
    return (
      <div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <PageSectionRenderer sections={cmsSections} />
      </div>
    )
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      {/* Photo équipe */}
      <section className="bg-white pt-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Image
            src={`${WP}/2025/09/equie-estimate-rentals-2025-.webp`}
            alt="L'équipe Estimate Rentals"
            width={900}
            height={500}
            className="rounded-2xl w-full object-cover"
            priority
          />
        </div>
      </section>

      {/* Titre + intro */}
      <section className="py-10 px-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#007caa] mb-6">
          Découvrez l&apos;équipe d&apos;Estimate.rentals
        </h1>
        <p className="max-w-3xl mx-auto text-sm text-gray-700 leading-relaxed">
          <strong>Estimate.rentals</strong> est une marque de{' '}
          <a href="https://www.popconnect.fr" target="_blank" rel="noopener noreferrer" className="text-[#007caa] hover:underline">
            Popconnect
          </a>
          , basée à Biarritz au Pays basque. Elle réunit une{' '}
          <strong className="text-[#007caa]">équipe de passionnés</strong> : experts en data,
          professionnels de l&apos;immobilier et développeurs. En conjuguant{' '}
          <strong>savoir-faire technique</strong> et <strong>expérience terrain</strong>, nous
          créons une solution pensée pour répondre aux besoins réels des acteurs professionnels
          de la <strong className="text-[#007caa]">location saisonnière</strong>.
        </p>
      </section>

      {/* Nos valeurs */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Nos valeurs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-[#007caa] mb-3">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre mission */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#007caa] mb-5">Notre mission</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Estimate.rentals est{' '}
            <strong className="text-[#007caa]">
              l&apos;outil d&apos;estimation locative saisonnière dédié aux professionnels de l&apos;immobilier
            </strong>
            . Notre rôle : vous aider à{' '}
            <strong className="text-[#007caa]">
              transformer chaque estimation en une véritable opportunité de mandat
            </strong>
            , grâce à une solution à la fois simple, rapide et fiable.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            En clair, nous faisons le travail complexe, collecte et analyse des données, intégration
            des frais et prise en compte des réglementations locales pour que vous puissiez vous
            concentrer sur ce qui crée réellement de la valeur :{' '}
            <strong>conquérir des mandats, accompagner vos clients, valoriser vos biens</strong>.
          </p>
        </div>
      </section>
    </div>
  )
}
