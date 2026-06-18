import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function Footer() {
  const t = useTranslations('footer')
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-[#007caa]">Estimate</span>
          <span className="text-lg font-bold text-[#17a3b5]">Rentals</span>
        </div>
        <p className="text-sm">{t('copyright')}</p>
        <div className="flex space-x-6">
          <Link href="/mentions-legales" className="text-sm hover:text-white transition-colors">
            {t('legal')}
          </Link>
          <Link href="/politique-de-cookies" className="text-sm hover:text-white transition-colors">
            {t('cookies')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
