'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const locales = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
]

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    return segments.join('/')
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#007caa]">Estimate</span>
            <span className="text-xl font-bold text-[#17a3b5]">Rentals</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href={`/${locale}/estimez-gratuitement`} className="text-sm text-gray-700 hover:text-[#007caa] transition-colors">
              {t('estimator')}
            </Link>
            <Link href={`/${locale}/installer-estimateur`} className="text-sm text-gray-700 hover:text-[#007caa] transition-colors">
              {t('install')}
            </Link>
            <Link href={`/${locale}/qui-sommes-nous`} className="text-sm text-gray-700 hover:text-[#007caa] transition-colors">
              {t('about')}
            </Link>
            <Link href={`/${locale}/actualites`} className="text-sm text-gray-700 hover:text-[#007caa] transition-colors">
              {t('news')}
            </Link>
            <Link href={`/${locale}/tarifs`} className="text-sm text-gray-700 hover:text-[#007caa] transition-colors">
              {t('pricing')}
            </Link>
            <Link
              href={`/${locale}/demander-une-demo`}
              className="bg-[#007caa] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#006a93] transition-colors"
            >
              {t('demo')}
            </Link>
            <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
              {locales.map((l) => (
                <Link
                  key={l.code}
                  href={switchLocale(l.code)}
                  className={`px-2 py-1 text-xs font-medium transition-colors ${
                    locale === l.code
                      ? 'bg-[#007caa] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <button
            className="md:hidden p-2 rounded-md text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">Menu</span>
            <div className="w-5 h-0.5 bg-gray-600 mb-1"></div>
            <div className="w-5 h-0.5 bg-gray-600 mb-1"></div>
            <div className="w-5 h-0.5 bg-gray-600"></div>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-3">
            <Link href={`/${locale}/estimez-gratuitement`} className="text-sm text-gray-700">{t('estimator')}</Link>
            <Link href={`/${locale}/installer-estimateur`} className="text-sm text-gray-700">{t('install')}</Link>
            <Link href={`/${locale}/qui-sommes-nous`} className="text-sm text-gray-700">{t('about')}</Link>
            <Link href={`/${locale}/actualites`} className="text-sm text-gray-700">{t('news')}</Link>
            <Link href={`/${locale}/tarifs`} className="text-sm text-gray-700">{t('pricing')}</Link>
            <Link href={`/${locale}/demander-une-demo`} className="bg-[#007caa] text-white text-sm px-4 py-2 rounded-lg text-center">{t('demo')}</Link>
            <div className="flex gap-1">
              {locales.map((l) => (
                <Link
                  key={l.code}
                  href={switchLocale(l.code)}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    locale === l.code ? 'bg-[#007caa] text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
