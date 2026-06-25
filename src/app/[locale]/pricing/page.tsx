import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import RevealOnScroll from '@/components/RevealOnScroll'

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
    a: "It's an indicator calculated for each lead to automatically prioritize property owners most likely to sign a management mandate.",
  },
]

export default function PricingPage() {
  const t = useTranslations('pricing')
  return (
    <div className="py-16 px-4">
      <RevealOnScroll />
      <div className="max-w-5xl mx-auto">
        <div className="reveal">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            <span className="gradient-text">{t('title')}</span>
          </h1>
          <p className="text-gray-500 text-center mb-14">{t('subtitle')}</p>
        </div>

        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`card-hover rounded-2xl p-8 flex flex-col ${
                plan.highlight
                  ? 'bg-[#007caa] text-white shadow-xl scale-105'
                  : 'bg-white border border-gray-200 shadow-sm text-gray-800'
              }`}
            >
              {plan.highlight && (
                <span className="text-xs font-semibold uppercase tracking-widest bg-[#005f85] text-white rounded-full px-3 py-1 self-start mb-4">
                  {t('mostPopular')}
                </span>
              )}
              <div className="font-bold text-xl mb-1">{plan.key.charAt(0).toUpperCase() + plan.key.slice(1)}</div>
              <div className="text-4xl font-extrabold mb-1">
                {plan.price}
                {plan.price !== '€0' && (
                  <span className={`text-base font-normal ${plan.highlight ? 'text-blue-100' : 'text-gray-500'}`}>
                    {t('month')}
                  </span>
                )}
              </div>
              <div className={`text-sm mb-1 ${plan.highlight ? 'text-blue-100' : 'text-gray-500'}`}>{plan.estimations}</div>
              <div className={`text-xs mb-6 ${plan.highlight ? 'text-blue-200' : 'text-gray-400'}`}>{plan.trial}</div>
              <ul className="flex-1 space-y-3 mb-8" role="list" aria-label={`${plan.key.charAt(0).toUpperCase() + plan.key.slice(1)} plan features`}>
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg
                      aria-hidden="true"
                      className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? 'text-white' : 'text-[#005f85]'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
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
                    ? 'bg-white text-[#005f85] hover:bg-gray-100 glow-pulse btn-shimmer-auto'
                    : 'bg-[#007caa] text-white hover:bg-[#005f85]'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="reveal">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Frequently asked questions</h2>
          </div>
          <div className="space-y-4 reveal">
            {faq.map((item) => (
              <details key={item.q} className="group bg-white border border-gray-200 rounded-xl p-5">
                <summary className="font-semibold text-gray-800 cursor-pointer list-none flex justify-between items-center">
                  {item.q}
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-[#005f85] transition-transform duration-200 group-open:rotate-180 shrink-0 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center reveal">
          <p className="text-gray-500 mb-4">Need a custom quote or specific integration?</p>
          <Link
            href="/demander-une-demo"
            className="inline-block bg-[#007caa] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#005f85] transition-colors glow-pulse btn-shimmer-auto"
          >
            Talk to an expert
          </Link>
        </div>
      </div>
    </div>
  )
}
