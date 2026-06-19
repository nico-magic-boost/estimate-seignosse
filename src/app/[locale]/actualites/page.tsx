import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const posts = [
  {
    slug: 'pourquoi-integrer-un-simulateur',
    title: 'Pourquoi intégrer un estimateur sur votre site pro',
    date: '2025-04-10',
    excerpt: 'Un estimateur bien intégré répond en temps réel à la question de chaque propriétaire : « Combien puis-je gagner ? » Découvrez pourquoi c\'est devenu un levier incontournable pour capter des mandats.',
  },
  {
    slug: 'les-5-erreurs',
    title: 'Les 5 erreurs à éviter lors de l\'estimation d\'un bien saisonnier',
    date: '2025-03-18',
    excerpt: 'Tarif unique, étude de marché bâclée, charges sous-estimées… Ces cinq erreurs coûtent cher aux investisseurs. Voici comment les éviter pour obtenir des projections réalistes.',
  },
  {
    slug: 'astuces-convaincre-proprietaire-gestion',
    title: '3 astuces pour convaincre un propriétaire de mettre son bien en gestion',
    date: '2025-02-25',
    excerpt: 'Revenus optimisés, tranquillité totale, sécurité juridique — trois arguments béton pour décrocher un mandat de gestion locative en location de vacances.',
  },
]

export default function BlogPage() {
  const t = useTranslations('blog')
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{t('title')}</h1>
        <p className="text-gray-600 text-center mb-10">{t('subtitle')}</p>
        <div className="grid gap-6">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <time className="text-sm text-gray-400">{new Date(post.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              <h2 className="text-xl font-semibold text-gray-800 mt-1 mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link
                href={{ pathname: '/actualites/[slug]', params: { slug: post.slug } }}
                className="text-[#007caa] font-semibold text-sm hover:underline"
              >
                {t('readMore')} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
