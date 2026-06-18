import { useTranslations } from 'next-intl'

const posts = [
  { slug: 'tendencias-alquiler-2025', title: 'Las tendencias del alquiler vacacional en 2025', date: '2025-01-15', excerpt: 'Descubra las grandes tendencias que darán forma al mercado.' },
  { slug: 'por-que-estimador', title: 'Por qué un estimador en línea aumenta sus conversiones', date: '2025-02-01', excerpt: 'Un estimador bien integrado puede doblar su tasa de conversión de propietarios.' },
]

export default function ActualidadPage() {
  const t = useTranslations('blog')
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{t('title')}</h1>
        <p className="text-gray-600 text-center mb-10">{t('subtitle')}</p>
        <div className="grid gap-6">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
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
