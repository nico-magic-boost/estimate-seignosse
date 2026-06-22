import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function AboutPage() {
  const t = useTranslations('about')
  return (
    <div className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">{t('title')}</h1>
        <p className="text-gray-600 text-lg leading-relaxed text-center mb-12">{t('intro')}</p>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <div className="bg-[#007caa] text-white rounded-xl p-6">
            <h3 className="font-bold text-xl mb-2">Notre mission</h3>
            <p>{t('mission')}</p>
          </div>
          <div className="bg-[#17a3b5] text-white rounded-xl p-6">
            <h3 className="font-bold text-xl mb-2">Notre vision</h3>
            <p>{t('vision')}</p>
          </div>
        </div>

        {/* 4 Values */}
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Nos valeurs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { key: 'value1', icon: '🎯' },
            { key: 'value2', icon: '🔍' },
            { key: 'value3', icon: '⚡' },
            { key: 'value4', icon: '🚀' },
          ].map(({ key, icon }) => (
            <div key={key} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">{t(`${key}Title`)}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t(`${key}Desc`)}</p>
            </div>
          ))}
        </div>

        {/* Team photo */}
        <div className="mt-14">
          <Image
            src="https://estimate.rentals/wp-content/uploads/2025/09/equie-estimate-rentals-2025-.webp"
            alt="L'équipe Estimate Rentals"
            width={900}
            height={500}
            className="rounded-2xl w-full object-cover"
          />
          <p className="text-center text-gray-400 text-sm mt-3">
            L&apos;équipe Estimate Rentals — Biarritz, Pays basque
          </p>
        </div>
      </div>
    </div>
  )
}
