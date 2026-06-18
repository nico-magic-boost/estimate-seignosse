import { useTranslations } from 'next-intl'
import EstimateWidget from '@/components/EstimateWidget'

export default function EstimatePage() {
  const t = useTranslations('estimate')
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{t('title')}</h1>
        <p className="text-gray-600 text-center mb-10">{t('subtitle')}</p>
        <EstimateWidget />
      </div>
    </div>
  )
}
