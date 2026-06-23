import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'

export default function Footer() {
  const t = useTranslations('footer')
  return (
    <footer className="bg-[#0a1628] text-gray-400 pt-14 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src="https://estimate.rentals/wp-content/uploads/2025/07/Logo-estimate.rentals-blanc.svg"
              alt="Estimate Rentals"
              width={160}
              height={40}
              className="h-10 w-auto mb-5"
            />
            <p className="text-sm leading-relaxed max-w-sm">
              L&apos;estimateur en ligne conçu pour les professionnels de la location saisonnière.
              Transformez vos estimations en opportunités de mandats via un outil professionnel et fiable.
            </p>
          </div>

          {/* À propos */}
          <div>
            <h3 className="text-white font-semibold mb-4">À propos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/qui-sommes-nous" className="hover:text-white transition-colors">
                  Qui sommes-nous ?
                </Link>
              </li>
              <li>
                <Link href="/demander-une-demo" className="hover:text-white transition-colors">
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link href="/tarifs" className="hover:text-white transition-colors">
                  Tarifs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>{t('copyright')}</p>
          <div className="flex space-x-5">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">
              {t('legal')}
            </Link>
            <Link href="/politique-de-cookies" className="hover:text-white transition-colors">
              {t('cookies')}
            </Link>
            <a href="https://www.popconnect.fr" target="_blank" rel="noopener noreferrer" aria-label="Plan du site (ouvre dans un nouvel onglet)" className="hover:text-white transition-colors">
              Plan du site
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
