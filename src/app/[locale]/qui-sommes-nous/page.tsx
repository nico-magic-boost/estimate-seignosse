import { useTranslations } from 'next-intl'

export default function AboutPage() {
  const t = useTranslations('about_page')
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('subtitle')}</p>
      </div>
      <div className="prose max-w-none text-gray-700">
        <p>Estimate Rentals est une solution développée par des professionnels de la location saisonnière, pour les professionnels de la location saisonnière.</p>
      </div>
    </div>
  )
}
