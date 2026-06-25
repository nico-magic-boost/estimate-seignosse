import type { Metadata } from 'next'
import EstimateWidget from '@/components/EstimateWidget'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { headers } from 'next/headers'
import { robots, canonical, SITE_URL } from '@/lib/seo'
import ArcachonPage from '@/app/[locale]/arcachon/page'
import PillarPageRenderer from '@/components/PillarPageRenderer'
import { getPayload } from 'payload'
import config from '@payload-config'
import RevealOnScroll from '@/components/RevealOnScroll'

export const dynamic = 'force-dynamic'

const WP = 'https://estimate.rentals/wp-content/uploads'

const CITIES = [
  {
    slug: 'seignosse',
    name: 'Seignosse',
    region: 'Landes',
    img: `${WP}/2025/07/appartement-01.webp`,
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

async function getPillarPage(citySlug: string) {
  try {
    const payload = await getPayload({ config })

    // Fetch the page regardless of status first
    const result = await payload.find({
      collection: 'pillar-pages',
      where: { slug: { equals: citySlug } } as any,
      limit: 1,
    })
    const doc = result.docs[0] ?? null
    if (!doc) return { doc: null, isAdmin: false }

    const status = (doc as any).status as string

    // Published/scheduled pages are public
    if (status === 'published' || status === 'scheduled') {
      return { doc, isAdmin: false }
    }

    // Draft pages: check if a Payload admin user is logged in
    try {
      const reqHeaders = await headers()
      const { user } = await payload.auth({ headers: reqHeaders })
      if (user) return { doc, isAdmin: true }
    } catch {
      // auth check failed — treat as not logged in
    }

    // Draft, not logged in → not accessible
    return { doc: null, isAdmin: false }
  } catch (err) {
    console.error('[getPillarPage] erreur pour slug:', citySlug, err)
    return { doc: null, isAdmin: false }
  }
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params

  const { doc: pillarPage } = await getPillarPage(citySlug)
  if (pillarPage) {
    return {
      title: pillarPage.seo?.metaTitle || pillarPage.title,
      description: pillarPage.seo?.metaDescription || '',
      robots,
      alternates: { canonical: canonical('fr', `/${citySlug}`) },
      openGraph: {
        title: pillarPage.seo?.metaTitle || pillarPage.title,
        description: pillarPage.seo?.metaDescription || '',
        url: canonical('fr', `/${citySlug}`),
      },
    }
  }

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
  const DEDICATED = ['arcachon']
  const locales = ['fr', 'en', 'es']
  return locales.flatMap((locale) =>
    CITIES.filter((city) => !DEDICATED.includes(city.slug)).map((city) => ({ locale, city: city.slug }))
  )
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ locale: string; city: string }>
}) {
  const { city: citySlug } = await params

  if (citySlug === 'arcachon') return <ArcachonPage />

  // Check for a pillar page in the CMS (draft visible if admin logged in)
  const { doc: pillarPage, isAdmin } = await getPillarPage(citySlug)
  if (pillarPage) return <PillarPageRenderer page={pillarPage as any} isDraft={isAdmin && pillarPage.status === 'draft'} />

  // Fallback: generic city template
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
      <RevealOnScroll />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={cityData.img}
          alt={`Vue de ${cityData.name}, ${cityData.region}`}
          fill
          className="object-cover float"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#007caa]/60 to-[#007caa]/80 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Estimation de revenus locatifs —{' '}
            <span className="gradient-text">{cityData.name}</span>
          </h1>
          <p className="text-lg text-white">{cityData.region}</p>
        </div>
      </div>

      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="reveal">
            <p className="text-xl text-gray-600 text-center mb-12">
              Estimez le potentiel locatif de votre bien à {cityData.name}.
              Notre outil analyse les données du marché local pour vous donner une estimation précise et instantanée.
            </p>
          </div>

          {/* Benefits */}
          <ul
            className="grid grid-cols-3 gap-4 mb-12 reveal-stagger"
            role="list"
            aria-label="Avantages de notre estimateur"
          >
            {benefits.map((b) => (
              <li key={b.label} className="bg-[#007caa] rounded-xl p-4 text-center text-white card-hover">
                <Image
                  src={b.img}
                  alt=""
                  aria-hidden="true"
                  width={40}
                  height={40}
                  className="mx-auto mb-2 h-10 w-10 object-contain brightness-0 invert"
                />
                <p className="text-xs font-medium leading-snug">{b.label}</p>
              </li>
            ))}
          </ul>

          <div className="reveal">
            <EstimateWidget />
          </div>

          <div className="mt-12 bg-gray-50 rounded-xl p-8 reveal">
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
