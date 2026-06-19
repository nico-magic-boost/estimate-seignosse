'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter, usePathname, Link } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import { routing } from '@/i18n/routing'

export default function Navbar() {
  const t = useTranslations('nav')
  const [menuOpen, setMenuOpen] = useState(false)
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace(pathname as any, { locale: newLocale })
  }

  const navLinks = [
    { href: '/' as const, label: t('home') },
    { href: '/estimez-gratuitement' as const, label: t('estimator') },
    { href: '/installer-estimateur' as const, label: t('install') },
    { href: '/tarifs' as const, label: t('pricing') },
    { href: '/actualites' as const, label: t('blog') },
    { href: '/qui-sommes-nous' as const, label: t('about') },
    { href: '/demander-une-demo' as const, label: t('demo') },
  ]

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-[#007caa]">Estimate</span>
            <span className="text-xl font-bold text-[#17a3b5]">Rentals</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-[#007caa] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language switcher */}
          <div className="hidden md:flex items-center space-x-1">
            {routing.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`px-2 py-1 text-xs font-semibold rounded uppercase transition-colors ${
                  locale === loc
                    ? 'bg-[#007caa] text-white'
                    : 'text-gray-500 hover:text-[#007caa]'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-[#007caa]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-[#007caa] px-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex space-x-2 px-2 pt-2">
                {routing.locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => { switchLocale(loc); setMenuOpen(false) }}
                    className={`px-3 py-1 text-xs font-semibold rounded uppercase ${
                      locale === loc ? 'bg-[#007caa] text-white' : 'text-gray-500 border border-gray-300'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
