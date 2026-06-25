import { useTranslations } from 'next-intl'
import Image from 'next/image'
import RevealOnScroll from '@/components/RevealOnScroll'

export default function AboutPage() {
  const t = useTranslations('about')
  return (
    <div className="py-16 px-4">
      <RevealOnScroll />
      <div className="max-w-3xl mx-auto">
        <div className="reveal">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            <span className="gradient-text">{t('title')}</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed text-center mb-12">{t('intro')}</p>
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <div className="bg-[#007caa] text-white rounded-xl p-6">
            <h2 className="font-bold text-xl mb-2">Our mission</h2>
            <p className="text-white">{t('mission')}</p>
          </div>
          <div className="bg-[#17a3b5] text-white rounded-xl p-6">
            <h2 className="font-bold text-xl mb-2">Our vision</h2>
            <p className="text-white">{t('vision')}</p>
          </div>
        </div>

        <div className="reveal">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Our values</h2>
          <ul
            className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 gap-6"
            role="list"
            aria-label="Our values"
          >
            {[
              { key: 'value1', icon: '🎯' },
              { key: 'value2', icon: '🔍' },
              { key: 'value3', icon: '⚡' },
              { key: 'value4', icon: '🚀' },
            ].map(({ key, icon }) => (
              <li key={key} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm card-hover">
                <div className="text-3xl mb-3" aria-hidden="true">{icon}</div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{t(`${key}Title`)}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{t(`${key}Desc`)}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal mt-14">
          <Image
            src="https://estimate.rentals/wp-content/uploads/2025/09/equie-estimate-rentals-2025-.webp"
            alt="The Estimate Rentals team gathered together in Biarritz, Basque Country"
            width={900}
            height={500}
            className="rounded-2xl w-full object-cover float"
          />
          <p className="text-center text-gray-500 text-sm mt-3">
            The Estimate Rentals team — Biarritz, Basque Country
          </p>
        </div>
      </div>
    </div>
  )
}
