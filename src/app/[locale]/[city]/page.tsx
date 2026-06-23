import type { Metadata } from 'next'
import EstimateWidget from '@/components/EstimateWidget'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { robots, canonical, SITE_URL } from '@/lib/seo'

const WP = 'https://estimate.rentals/wp-content/uploads'

const CITIES = [
  {
    slug: 'seignosse',
    name: 'Seignosse',
    region: 'Landes',
    img: `${WP}/2025/07/appartement-01.webp`,
  },
  {
    slug: 'arcachon',
    name: 'Arcachon',
    region: 'Bassin d\'Arcachon',
    img: `${WP}/2026/02/estimateur-location-vacances-arcachon.webp`,
  },
  {
    slug: 'biscarrosse',
    name: 'Biscarrosse',
    region: 'Landes',
    img: `${WP}/2026/02/estimateur-location-vacances-biscarrosse.webp`,
  },
  {
    slug: 'argeles-sur-mer',
    name: 'Argelès-sur-Mer',
    region: 'Pyrénées-Orientales',
    img: `${WP}/2026/02/estimation-location-Argeles-sur-Mer.webp`,
  },
  {
    slug: 'les-sables-dolonne',
    name: 'Les Sables-d\'Olonne',
    region: 'Vendée',
    img: `${WP}/2026/02/Les-sables-dOlonne.webp`,
  },
  {
    slug: 'lavandou',
    name: 'Le Lavandou',
    region: 'Var',
    img: `${WP}/2026/02/Le-Lavandou.webp`,
  },
  {
    slug: 'menton',
    name: 'Menton',
    region: 'Alpes-Maritimes',
    img: `${WP}/2026/04/Image-Estimate.rentals.webp`,
  },
  {
    slug: 'meribel',
    name: 'Méribel',
    region: 'Savoie',
    img: `${WP}/2026/02/estimation-meribel.webp`,
  },
  {
    slug: 'val-disere',
    name: 'Val-d\'Isère',
    region: 'Savoie',
    img: `${WP}/2026/02/Val-dIsere.webp`,
  },
]

const benefits = [
  { img: `${WP}/2025/08/house-rental_white.png`, label: 'Estimation précise du potentiel locatif' },
  { img: `${WP}/2025/08/key-person_white.png`, label: 'Données du marché local en temps réel' },
  { img: `${WP}/2025/08/professional_white.png`, label: 'Résultat instantané et gratuit' },
]

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params
  const cityData = CITIES.find((c) => c.slug === citySlug)
  if (!cityData) return {}
  return {
    title: `Estimation de revenus locatifs à ${cityData.name}`,
    description: `Estimez gratuitement le potentiel locatif saisonnier de votre bien à ${cityData.name} (${cityData.region}). Données de marché en temps réel, résultat instantané.`,
    robots,
    alternates: {
      canonical: canonical('fr', `/${citySlug}`),
    },
    openGraph: {
      title: `Estimation de revenus locatifs à ${cityData.name}`,
      description: `Estimez gratuitement le potentiel locatif saisonnier de votre bien à ${cityData.name}.`,
      url: canonical('fr', `/${citySlug}`),
    },
  }
}

export function generateStaticParams() {
  const locales = ['fr', 'en', 'es']
  return locales.flatMap((locale) =>
    CITIES.map((city) => ({ locale, city: city.slug }))
  )
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ locale: string; city: string }>
}) {
  const { city: citySlug } = await params
  const cityData = CITIES.find((c) => c.slug === citySlug)
  if (!cityData) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Estimation de revenus locatifs à ${cityData.name}`,
    description: `Estimez le potentiel locatif saisonnier de votre bien à ${cityData.name}.`,
    provider: { '@type': 'Organization', name: 'Estimate Rentals', url: SITE_URL },
    areaServed: { '@type': 'City', name: cityData.name, containedInPlace: { '@type': 'State', name: cityData.region } },
    url: canonical('fr', `/${citySlug}`),
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={cityData.img}
          alt={cityData.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#007caa]/60 to-[#007caa]/80 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Estimation de revenus locatifs — {cityData.name}
          </h1>
          <p className="text-lg opacity-90">{cityData.region}</p>
        </div>
      </div>

      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xl text-gray-600 text-center mb-12">
            Estimez le potentiel locatif de votre bien à {cityData.name}.
            Notre outil analyse les données du marché local pour vous donner une estimation précise et instantanée.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {benefits.map((b) => (
              <div key={b.label} className="bg-[#007caa] rounded-xl p-4 text-center text-white">
                <Image src={b.img} alt="" width={40} height={40} className="mx-auto mb-2 h-10 w-10 object-contain brightness-0 invert" />
                <p className="text-xs font-medium leading-snug">{b.label}</p>
              </div>
            ))}
          </div>

          <EstimateWidget />

          <div className="mt-12 bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Le marché locatif à {cityData.name}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {cityData.name} est une destination prisée en {cityData.region}.
              Les propriétaires qui mettent leur bien en location saisonnière bénéficient
              d&apos;une forte demande tout au long de l&apos;année. Notre estimateur vous permet
              de connaître le potentiel de revenus de votre propriété en quelques secondes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
