import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const plans = [
  {
    key: 'free',
    price: '0€',
    estimations: '10 estim/mes',
    highlight: false,
    trial: 'Prueba gratuita ilimitada',
    features: [
      'Widget personalizado (logo + colores)',
      'PDF de estimación automático',
      'Multilingüe FR / EN / ES / PT',
      'Soporte por email',
    ],
    cta: 'Empezar gratis',
    href: 'https://form.estimate.rentals',
  },
  {
    key: 'growth',
    price: '49€',
    estimations: '100 estim/mes',
    highlight: true,
    trial: '14 días de prueba',
    features: [
      'Todo lo del plan Free',
      'Pack de 50 estimaciones adicionales',
      'Puntuación de oportunidad Básica',
      'Historial y seguimiento de leads',
      'Exportación CSV de leads',
      'Soporte prioritario',
    ],
    cta: 'Iniciar prueba',
    href: 'https://form.estimate.rentals',
  },
  {
    key: 'pro',
    price: '119€',
    estimations: '300 estim/mes',
    highlight: false,
    trial: '14 días de prueba',
    features: [
      'Todo lo del plan Growth',
      'Puntuación avanzada + auto-priorización',
      'Dashboard de rendimiento',
      'API de estimación pública',
      'Integración CRM / PMS',
      'Marca blanca widget + PDF',
    ],
    cta: 'Iniciar prueba',
    href: 'https://form.estimate.rentals',
  },
]

const faq = [
  {
    q: '¿Puedo cambiar de plan en cualquier momento?',
    a: 'Sí, puede actualizar o degradar su suscripción en cualquier momento desde su área de cliente.',
  },
  {
    q: '¿Qué cuenta como una estimación?',
    a: 'Una estimación es una simulación completa realizada a través de su widget o la API para una propiedad determinada.',
  },
  {
    q: '¿Cómo funciona la prueba gratuita?',
    a: 'El plan Free es ilimitado en el tiempo. Los planes Growth y Pro ofrecen 14 días de prueba completa sin tarjeta de crédito.',
  },
  {
    q: '¿Puedo personalizar el widget con mis colores?',
    a: 'Sí, desde el plan Free. Puede definir sus colores primario y secundario y añadir su logotipo.',
  },
  {
    q: '¿Qué es la puntuación de oportunidad?',
    a: 'Es un indicador calculado para cada lead que prioriza automáticamente a los propietarios más propensos a firmar un mandato de gestión.',
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

        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Preguntas frecuentes</h2>
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
          <p className="text-gray-500 mb-4">¿Necesita un presupuesto personalizado o una integración específica?</p>
          <Link
            href="/demander-une-demo"
            className="inline-block bg-[#007caa] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#005f85] transition-colors"
          >
            Hablar con un experto
          </Link>
        </div>
      </div>
    </div>
  )
}
