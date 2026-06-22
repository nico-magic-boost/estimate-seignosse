import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'

const WP = 'https://estimate.rentals/wp-content/uploads'

const benefits = [
  { img: `${WP}/2025/08/house-rental_white.png`, label: 'Transformer vos visiteurs en prospects propriétaires' },
  { img: `${WP}/2025/08/key-person_white.png`, label: 'Générer des leads qualifiés automatiquement' },
  { img: `${WP}/2025/08/professional_white.png`, label: 'Valoriser votre expertise auprès des propriétaires' },
  { img: `${WP}/2025/08/vocational_white.png`, label: 'Vous différencier de la concurrence locale' },
]

const screenshots = [
  { img: `${WP}/2025/09/estimateur-image.webp`, label: 'L\'estimateur en action' },
  { img: `${WP}/2025/09/calcul.webp`, label: 'Calcul personnalisé' },
  { img: `${WP}/2025/09/email.webp`, label: 'Récupération du lead' },
  { img: `${WP}/2025/09/integration.webp`, label: 'Intégration sur votre site' },
]

export default function InstallPage() {
  const t = useTranslations('install')
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{t('title')}</h1>
        <p className="text-gray-600 text-center mb-14">{t('subtitle')}</p>

        {/* Benefits */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {benefits.map((b) => (
            <div key={b.label} className="bg-[#007caa] rounded-xl p-5 text-center text-white">
              <Image src={b.img} alt="" width={48} height={48} className="mx-auto mb-3 h-12 w-12 object-contain brightness-0 invert" />
              <p className="text-xs font-medium leading-snug">{b.label}</p>
            </div>
          ))}
        </div>

        {/* Code steps */}
        <div className="space-y-6 mb-16">
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#007caa] text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">1</span>
              <h2 className="text-xl font-semibold text-gray-800">{t('step1Title')}</h2>
            </div>
            <pre className="bg-gray-800 text-green-400 rounded-lg p-4 overflow-x-auto text-sm">
              {`<script type="module" src="https://form.estimate.rentals/estimateWebComponent.js"></script>`}
            </pre>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#007caa] text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">2</span>
              <h2 className="text-xl font-semibold text-gray-800">{t('step2Title')}</h2>
            </div>
            <pre className="bg-gray-800 text-green-400 rounded-lg p-4 overflow-x-auto text-sm">
              {`<estimate-wc\n  agency-ids="VOTRE_ID"\n  primary-color="007caa"\n  secondary-color="17a3b5"\n  lang="fr"\n/>`}
            </pre>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#17a3b5] text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">3</span>
              <h2 className="text-xl font-semibold text-gray-800">{t('step3Title')}</h2>
            </div>
            <p className="text-gray-600 text-sm">{t('step3Desc')}</p>
          </div>
        </div>

        {/* Screenshots */}
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Le widget en action</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          {screenshots.map((s) => (
            <div key={s.label}>
              <Image src={s.img} alt={s.label} width={600} height={350} className="rounded-xl w-full object-cover border border-gray-200" />
              <p className="text-center text-gray-500 text-sm mt-2">{s.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-500 mb-5">Besoin d&apos;aide ou d&apos;un identifiant agence ?</p>
          <Link
            href="/demander-une-demo"
            className="inline-block bg-[#007caa] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#005f85] transition-colors"
          >
            Demander une démo
          </Link>
        </div>
      </div>
    </div>
  )
}
