import EstimateWidget from '@/components/EstimateWidget'
import { notFound } from 'next/navigation'

const CITIES = [
  { slug: 'seignosse', name: 'Seignosse', region: 'Landes' },
  { slug: 'arcachon', name: 'Arcachon', region: 'Bassin d\'Arcachon' },
  { slug: 'biscarrosse', name: 'Biscarrosse', region: 'Landes' },
  { slug: 'argeles-sur-mer', name: 'Argelès-sur-Mer', region: 'Pyrénées-Orientales' },
  { slug: 'les-sables-dolonne', name: 'Les Sables-d\'Olonne', region: 'Vendée' },
  { slug: 'lavandou', name: 'Le Lavandou', region: 'Var' },
  { slug: 'menton', name: 'Menton', region: 'Alpes-Maritimes' },
  { slug: 'meribel', name: 'Méribel', region: 'Savoie' },
  { slug: 'val-disere', name: 'Val-d\'Isère', region: 'Savoie' },
]

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

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Estimation de revenus locatifs — {cityData.name}
          </h1>
          <p className="text-xl text-gray-600">
            Estimez le potentiel locatif de votre bien à {cityData.name}, {cityData.region}.
            Notre outil analyse les données du marché local pour vous donner une estimation précise.
          </p>
        </div>
        <EstimateWidget />
        <div className="mt-12 bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Le marché locatif à {cityData.name}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {cityData.name} est une destination prisée en {cityData.region}.
            Les propriétaires qui mettent leur bien en location saisonnière bénéficient
            d'une forte demande tout au long de l'année. Notre estimateur vous permet
            de connaître le potentiel de revenus de votre propriété en quelques secondes.
          </p>
        </div>
      </div>
    </div>
  )
}
