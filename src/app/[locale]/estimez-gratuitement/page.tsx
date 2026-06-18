import { useTranslations } from 'next-intl'
import { getLocale } from 'next-intl/server'
import EstimateWidget from '@/components/EstimateWidget'

function PageContent({ locale }: { locale: string }) {
  const t = useTranslations('estimate_page')
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('subtitle')}</p>
      </div>
      <EstimateWidget lang={locale} />
    </div>
  )
}

export default async function EstimatePage() {
  const locale = await getLocale()
  return <PageContent locale={locale} />
}
