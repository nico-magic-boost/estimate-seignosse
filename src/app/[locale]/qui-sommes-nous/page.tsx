import { useTranslations } from 'next-intl'

export default function AboutPage() {
  const t = useTranslations('about')
  return (
    <div className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">{t('title')}</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 text-lg leading-relaxed">{t('content')}</p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#007caa] text-white rounded-xl p-6">
              <h3 className="font-bold text-xl mb-2">Notre mission</h3>
              <p>Aider les professionnels de la location saisonnière à convertir plus de propriétaires.</p>
            </div>
            <div className="bg-[#17a3b5] text-white rounded-xl p-6">
              <h3 className="font-bold text-xl mb-2">Notre vision</h3>
              <p>Devenir l'outil de référence pour l'estimation de revenus locatifs en Europe.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
