import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'

const WP = 'https://estimate.rentals/wp-content/uploads'

export default function HomePage() {
  const t = useTranslations()

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#007caa] to-[#17a3b5] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-10 opacity-90">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/estimez-gratuitement"
                className="bg-white text-[#007caa] font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg"
              >
                {t('hero.cta')}
              </Link>
              <Link
                href="/installer-estimateur"
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-[#007caa] transition-colors text-lg"
              >
                {t('hero.ctaInstall')}
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src={`${WP}/2026/05/ChatGPT-Image-11-mai-2026-13_34_21-e1778504824219.png`}
              alt="Estimate Rentals dashboard"
              width={560}
              height={400}
              className="rounded-2xl shadow-2xl w-full max-w-md object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            {t('features.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: `${WP}/2025/09/Design-sans-titre-2.png`,
                titleKey: 'features.feature1Title',
                descKey: 'features.feature1Desc',
              },
              {
                img: `${WP}/2025/09/Design-sans-titre-4.png`,
                titleKey: 'features.feature2Title',
                descKey: 'features.feature2Desc',
              },
              {
                img: `${WP}/2025/09/Design-sans-titre-7.png`,
                titleKey: 'features.feature3Title',
                descKey: 'features.feature3Desc',
              },
            ].map((f) => (
              <div key={f.titleKey} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
                <div className="flex justify-center mb-5">
                  <Image src={f.img} alt="" width={80} height={80} className="h-20 w-20 object-contain" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t(f.titleKey)}</h3>
                <p className="text-gray-600">{t(f.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-14">
            Comment ça fonctionne ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { img: `${WP}/2025/07/etape1_Plan-de-travail-1.webp`, label: 'Intégrez le widget sur votre site' },
              { img: `${WP}/2025/07/etape2_Plan-de-travail-1.webp`, label: 'Un propriétaire estime son bien' },
              { img: `${WP}/2025/07/etape3_Plan-de-travail-1.webp`, label: 'Vous recevez un lead qualifié' },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <Image src={step.img} alt={step.label} width={300} height={200} className="rounded-xl mx-auto mb-4 w-full object-cover" />
                <div className="inline-flex items-center gap-2">
                  <span className="bg-[#007caa] text-white text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center">{i + 1}</span>
                  <p className="font-medium text-gray-700 text-sm">{step.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Prêt à booster vos conversions ?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Rejoignez les professionnels qui font confiance à Estimate Rentals.
          </p>
          <Link
            href="/demander-une-demo"
            className="bg-[#007caa] text-white font-semibold px-10 py-4 rounded-lg hover:bg-[#005f85] transition-colors text-lg inline-block"
          >
            {t('nav.demo')}
          </Link>
        </div>
      </section>
    </div>
  )
}
