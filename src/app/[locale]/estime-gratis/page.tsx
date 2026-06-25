import { useTranslations } from 'next-intl'
import EstimateWidget from '@/components/EstimateWidget'
import RevealOnScroll from '@/components/RevealOnScroll'

export default function EstimatePage() {
  const t = useTranslations('estimate')
  return (
    <div className="py-16 px-4">
      <RevealOnScroll />
      <div className="max-w-4xl mx-auto">
        <div className="reveal">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            <span className="gradient-text">{t('title')}</span>
          </h1>
          <p className="text-gray-700 text-center mb-10">{t('subtitle')}</p>
        </div>
        <div className="reveal">
          <EstimateWidget />
        </div>
      </div>
    </div>
  )
}
