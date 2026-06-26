import { useTranslations } from 'next-intl'
import RevealOnScroll from '@/components/RevealOnScroll'

const posts = [
  { slug: 'vacation-rental-trends-2025', title: 'Vacation rental trends in 2025', date: '2025-01-15', excerpt: 'Discover the major trends shaping the market.' },
  { slug: 'why-estimator', title: 'Why an online estimator boosts your conversions', date: '2025-02-01', excerpt: 'A well-integrated estimator can double your owner conversion rate.' },
]

export default function NewsPage() {
  const t = useTranslations('blog')
  return (
    <div className="py-16 px-4">
      <RevealOnScroll />
      <div className="max-w-4xl mx-auto reveal">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{t('title')}</h1>
        <p className="text-gray-600 text-center mb-10">{t('subtitle')}</p>
        <div className="grid gap-6 reveal-stagger">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm card-hover">
              <time className="text-sm text-gray-400">{post.date}</time>
              <h2 className="text-xl font-semibold text-gray-800 mt-1 mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
