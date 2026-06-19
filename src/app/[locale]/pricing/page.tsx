import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const plans = [
  {
    key: 'free',
    price: '€0',
    estimations: '10 estim/month',
    highlight: false,
    trial: 'Unlimited free trial',
    features: [
      'Customized widget (logo + colors)',
      'Automatic PDF estimate',
      'Multilingual FR / EN / ES / PT',
      'Email support',
    ],
    cta: 'Start for free',
    href: 'https://form.estimate.rentals',
  },
  {
    key: 'growth',
    price: '€49',
    estimations: '100 estim/month',
    highlight: true,
    trial: '14-day trial',
    features: [
      'Everything in Free',
      'Pack of 50 extra estimates',
      'Basic opportunity score',
      'Lead history & tracking',
      'CSV lead export',
      'Priority support',
    ],
    cta: 'Start trial',
    href: 'https://form.estimate.rentals',
  },
  {
    key: 'pro',
    price: '€119',
    estimations: '300 estim/month',
    highlight: false,
    trial: '14-day trial',
    features: [
      'Everything in Growth',
      'Advanced score + auto-prioritization',
      'Performance dashboard',
      'Public estimation API',
      'CRM / PMS integration',
      'White-label widget + PDF',
    ],
    cta: 'Start trial',
    href: 'https://form.estimate.rentals',
  },
]

const faq = [
  {
    q: 'Can I change my plan at any time?',
    a: 'Yes, you can upgrade or downgrade your subscription at any time from your account.',
  },
  {
    q: 'What counts as an estimation?',
    a: 'An estimation is a complete simulation run through your widget or the API for a given property.',
  },
  {
    q: 'How does the free trial work?',
    a: 'The Free plan is unlimited in time. Growth and Pro plans offer a 14-day full trial with no credit card required.',
  },
  {
    q: 'Can I customize the widget to match my brand?',
    a: 'Yes, from the Free plan. You can set your primary and secondary colors and add your logo.',
  },
  {
    q: 'What is the opportunity score?',
    a: 'It\'s an indicator calculated for each lead to automatically prioritize property owners most likely to sign a management mandate.',
  },
]

export default function PricingPage() {
  const t = useTranslations('pricing')
  return (
    <div className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{t('title')}</h1>
        <p className="text-gray-500 text-center mb-14">{t('subtitle')}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`rounded-2xl p-8 flex flex-col ${
                plan.highlight
                  ? 'bg-[#007caa] text-white shadow-xl scale-105'
                  : 'bg-white border border-gray-200 shadow-sm text-gray-800'
              }`}
            >
              {plan.highlight && (
                <span className="text-xs font-semibold uppercase tracking-widest bg-white/20 rounded-full px-3 py-1 self-start mb-4">
                  {t('mostPopular')}
                </span>
              )}
              <div className="font-bold text-xl mb-1">{plan.key.charAt(0).toUpperCase() + plan.key.slice(1)}</div>
              <div className="text-4xl font-extrabold mb-1">
                {plan.price}
                {plan.price !== '€0' && <span className="text-base font-normal opacity-70">{t('month')}</span>}
              </div>
              <div className={`text-sm mb-1 ${plan.highlight ? 'text-white/80' : 'text-gray-500'}`}>{plan.estimations}</div>
              <div className={`text-xs mb-6 ${plan.highlight ? 'text-white/70' : 'text-gray-400'}`}>{plan.trial}</div>
              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className={plan.highlight ? 'text-white' : 'text-[#007caa]'}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={plan.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center font-semibold py-3 rounded-lg transition-colors ${
                  plan.highlight
                    ? 'bg-white text-[#007caa] hover:bg-gray-100'
                    : 'bg-[#007caa] text-white hover:bg-[#005f85]'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Frequently asked questions</h2>
          <div className="space-y-4">
            {faq.map((item) => (
              <details key={item.q} className="bg-white border border-gray-200 rounded-xl p-5">
                <summary className="font-semibold text-gray-800 cursor-pointer list-none flex justify-between items-center">
                  {item.q}
                  <span className="text-[#007caa] text-lg">+</span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">Need a custom quote or specific integration?</p>
          <Link
            href="/demander-une-demo"
            className="inline-block bg-[#007caa] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#005f85] transition-colors"
          >
            Talk to an expert
          </Link>
        </div>
      </div>
    </div>
  )
}
