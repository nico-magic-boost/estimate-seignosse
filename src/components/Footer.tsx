import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-400 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © {year} Estimate Rentals — {t('rights')}
          </p>
          <div className="flex gap-6">
            <Link href={`/${locale}/mentions-legales`} className="text-sm hover:text-white transition-colors">
              {t('legal')}
            </Link>
            <Link href={`/${locale}/politique-de-cookies`} className="text-sm hover:text-white transition-colors">
              {t('cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
