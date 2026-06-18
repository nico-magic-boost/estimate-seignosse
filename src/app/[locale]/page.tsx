import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { getLocale } from 'next-intl/server'

function HomeContent() {
  const t = useTranslations('home')
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#007caa] to-[#17a3b5] text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            {t('hero_title')}
          </h1>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAEstimate label={t('cta_estimate')} />
            <CTADemo label={t('cta_demo')} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon="⚡"
            title={t('feature1_title')}
            desc={t('feature1_desc')}
          />
          <FeatureCard
            icon="🔧"
            title={t('feature2_title')}
            desc={t('feature2_desc')}
          />
          <FeatureCard
            icon="📈"
            title={t('feature3_title')}
            desc={t('feature3_desc')}
          />
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

async function CTAEstimate({ label }: { label: string }) {
  const locale = await getLocale()
  return (
    <Link
      href={`/${locale}/estimez-gratuitement`}
      className="bg-white text-[#007caa] font-semibold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors"
    >
      {label}
    </Link>
  )
}

async function CTADemo({ label }: { label: string }) {
  const locale = await getLocale()
  return (
    <Link
      href={`/${locale}/demander-une-demo`}
      className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors"
    >
      {label}
    </Link>
  )
}

export default function HomePage() {
  return <HomeContent />
}
