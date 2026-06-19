import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const plans = [
  {
    key: 'free',
    price: '0€',
    estimations: '10 estim/mois',
    highlight: false,
    trial: 'Essai gratuit illimité',
    features: [
      'Widget personnalisé (logo + couleurs)',
      'PDF estimation automatique',
      'Multilingue FR / EN / ES / PT',
      'Support email',
    ],
    cta: 'Commencer gratuitement',
    href: 'https://form.estimate.rentals',
  },
  {
    key: 'growth',
    price: '49€',
    estimations: '100 estim/mois',
    highlight: true,
    trial: '14 jours d\'essai',
    features: [
      'Tout le plan Free',
      'Pack 50 estimations supplémentaires',
      'Score d\'opportunité Basique',
      'Historique & suivi des leads',
      'Export CSV des leads',
      'Support prioritaire',
    ],
    cta: 'Démarrer l\'essai',
    href: 'https://form.estimate.rentals',
  },
  {
    key: 'pro',
    price: '119€',
    estimations: '300 estim/mois',
    highlight: false,
    trial: '14 jours d\'essai',
    features: [
      'Tout le plan Growth',
      'Score Avancé + auto-priorisation',
      'Dashboard performance',
      'API estimation publique',
      'Intégration CRM / PMS',
      'Marque blanche widget + PDF',
    ],
    cta: 'Démarrer l\'essai',
    href: 'https://form.estimate.rentals',
  },
]

const faq = [
  {
    q: 'Puis-je changer de formule à tout moment ?',
    a: 'Oui, vous pouvez upgrader ou downgrader votre abonnement à tout moment depuis votre espace client.',
  },
  {
    q: 'Qu\'est-ce qu\'une estimation ?',
    a: 'Une estimation correspond à une simulation complète réalisée via votre widget ou l\'API pour un bien donné.',
  },
  {
    q: 'Comment fonctionne l\'essai gratuit ?',
    a: 'Le plan Free est illimité dans le temps. Les plans Growth et Pro offrent 14 jours d\'essai complet sans carte bancaire requise.',
  },
  {
    q: 'Le widget est-il personnalisable à mes couleurs ?',
    a: 'Oui, dès le plan Free. Vous pouvez définir vos couleurs primaire et secondaire, ainsi qu\'ajouter votre logo.',
  },
  {
    q: 'Qu\'est-ce que le score d\'opportunité ?',
    a: 'C\'est un indicateur calculé pour chaque lead afin de prioriser automatiquement les propriétaires les plus susceptibles de confier leur bien.',
  },
]

export default function PricingPage() {
  const t = useTranslations('pricing')
  return (
    <div className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{t('title')}</h1>
        <p className="text-gray-500 text-center mb-14">{t('subtitle')}</p>

        {/* Plans grid */}
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
              <div className="capitalize font-bold text-xl mb-1">{plan.key === 'free' ? 'Free' : plan.key.charAt(0).toUpperCase() + plan.key.slice(1)}</div>
              <div className="text-4xl font-extrabold mb-1">
                {plan.price}
                {plan.price !== '0€' && <span className="text-base font-normal opacity-70">{t('month')}</span>}
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

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Questions fréquentes</h2>
          <div className="space-y-4">
            {faq.map((item) => (
              <details key={item.q} className="bg-white border border-gray-200 rounded-xl p-5 group">
                <summary className="font-semibold text-gray-800 cursor-pointer list-none flex justify-between items-center">
                  {item.q}
                  <span className="text-[#007caa] text-lg">+</span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* CTA bottom */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">Besoin d&apos;un devis sur-mesure ou d&apos;une intégration spécifique ?</p>
          <Link
            href="/demander-une-demo"
            className="inline-block bg-[#007caa] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#005f85] transition-colors"
          >
            Parler à un expert
          </Link>
        </div>
      </div>
    </div>
  )
}
