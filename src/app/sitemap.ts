import { SITE_URL } from '@/lib/seo'

const locales = ['fr', 'en', 'es']

const routes = [
  { fr: '/', en: '/', es: '/' },
  { fr: '/estimez-gratuitement', en: '/estimate-for-free', es: '/estime-gratis' },
  { fr: '/installer-estimateur', en: '/install-estimator', es: '/instalar-estimador' },
  { fr: '/tarifs', en: '/pricing', es: '/precios' },
  { fr: '/actualites', en: '/news', es: '/actualidad' },
  { fr: '/demander-une-demo', en: '/request-a-demo', es: '/solicitar-demo' },
  { fr: '/qui-sommes-nous', en: '/who-are-we', es: '/quienes-somos' },
]

const blogSlugs = [
  'pourquoi-integrer-un-simulateur',
  'augmenter-mandats-location-saisonniere',
  'maximiser-revenus-location-saisonniere',
]

const citySlugs = [
  'seignosse', 'arcachon', 'biscarrosse', 'argeles-sur-mer',
  'les-sables-dolonne', 'lavandou', 'menton', 'meribel', 'val-disere',
]

function url(locale: string, path: string) {
  return `${SITE_URL}${locale === 'fr' ? '' : `/${locale}`}${path}`
}

export default function sitemap() {
  const entries = []

  for (const route of routes) {
    entries.push({
      url: url('fr', route.fr),
      alternates: {
        languages: {
          fr: url('fr', route.fr),
          en: url('en', route.en),
          es: url('es', route.es),
        },
      },
      changeFrequency: 'monthly' as const,
      priority: route.fr === '/' ? 1 : 0.8,
    })
  }

  for (const slug of blogSlugs) {
    entries.push({
      url: url('fr', `/actualites/${slug}`),
      alternates: {
        languages: {
          fr: url('fr', `/actualites/${slug}`),
          en: url('en', `/news/${slug}`),
          es: url('es', `/actualidad/${slug}`),
        },
      },
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })
  }

  for (const slug of citySlugs) {
    entries.push({
      url: url('fr', `/${slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })
  }

  return entries
}
