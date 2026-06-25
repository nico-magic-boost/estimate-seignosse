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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <div className="reveal-left bg-[#007caa] text-white rounded-xl p-6">
            <h2 className="font-bold text-xl mb-2">Nuestra misión</h2>
            <p className="text-white">{t('mission')}</p>
          </div>
          <div className="reveal-right bg-[#17a3b5] text-white rounded-xl p-6">
            <h2 className="font-bold text-xl mb-2">Nuestra visión</h2>
            <p className="text-white">{t('vision')}</p>
          </div>
        </div>

        <div className="reveal">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Nuestros valores</h2>
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 reveal-stagger"
            role="list"
            aria-label="Nuestros valores"
          >
            {[
              { key: 'value1', icon: '🎯', ariaLabel: 'Objetivo' },
              { key: 'value2', icon: '🔍', ariaLabel: 'Transparencia' },
              { key: 'value3', icon: '⚡', ariaLabel: 'Rapidez' },
              { key: 'value4', icon: '🚀', ariaLabel: 'Innovación' },
            ].map(({ key, icon, ariaLabel }) => (
              <li key={key} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm card-hover">
                <div className="text-3xl mb-3" aria-label={ariaLabel} role="img">{icon}</div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{t(`${key}Title`)}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{t(`${key}Desc`)}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal mt-14">
          <Image
            src="https://estimate.rentals/wp-content/uploads/2025/09/equie-estimate-rentals-2025-.webp"
            alt="El equipo de Estimate Rentals posando juntos en Biarritz, País Vasco francés"
            width={900}
            height={500}
            className="rounded-2xl w-full object-cover float"
          />
          <p className="text-center text-gray-500 text-sm mt-3">
            El equipo de Estimate Rentals — Biarritz, País Vasco francés
          </p>
        </div>
      </div>
    </div>
  )
}
