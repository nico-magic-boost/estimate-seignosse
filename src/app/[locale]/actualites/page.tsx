import { useTranslations } from 'next-intl'

export default function NewsPage() {
  const t = useTranslations('news_page')
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('subtitle')}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <p className="text-gray-500 col-span-2 text-center py-8">Les articles seront disponibles prochainement.</p>
      </div>
    </div>
  )
}
