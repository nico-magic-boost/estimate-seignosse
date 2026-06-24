import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import SubscriptionWidget from '@/components/SubscriptionWidget'
import { robots, hreflang, canonical } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Tarifs — Free, Growth, Pro',
    description: "Découvrez les offres Estimate Rentals : plan Free gratuit, Growth à 129€/mois, Pro à 349€/mois. Essai gratuit sans CB. L'estimateur qui génère des mandats.",
    robots,
    alternates: {
      canonical: canonical('fr', '/tarifs'),
      ...hreflang({ fr: '/tarifs', en: '/pricing', es: '/precios' }),
    },
    openGraph: {
      title: 'Tarifs Estimate Rentals — Free, Growth, Pro',
      description: "Découvrez les offres Estimate Rentals : plan Free gratuit, Growth à 129€/mois, Pro à 349€/mois.",
      url: canonical('fr', '/tarifs'),
    },
  }
}

const plans = [
  {
    key: 'FREE',
    desc: 'Pour démarrer et générer vos premiers leads.',
    price: 0,
    highlight: false,
    cta: 'Commencer gratuitement',
    href: 'https://form.estimate.rentals',
    features: [
      "Widget d'estimation installable en 1 clic",
      'Personnalisation logo + couleurs',
      'Estimation complète + PDF automatique',
      '10 leads qualifiés / mois inclus',
      'Affichage du potentiel de revenus',
    ],
  },
  {
    key: 'GROWTH',
    desc: 'Pour transformer vos leads en mandats.',
    price: 129,
    highlight: true,
    cta: "S'abonner",
    href: 'https://form.estimate.rentals',
    featuresPrefix: 'Tout Free, et en plus :',
    features: [
      '100 leads qualifiés / mois inclus',
      "Score d'opportunité (priorisation des leads)",
      'Historique et suivi des leads',
      'Export CSV + Webhook (CRM, Zapier, Make)',
      'Branding estimate réduit (logo + couleurs sur le widget et le PDF)',
    ],
  },
  {
    key: 'PRO',
    desc: 'Pour scaler votre acquisition et automatiser.',
    price: 349,
    highlight: false,
    cta: "S'abonner",
    href: 'https://form.estimate.rentals',
    featuresPrefix: 'Tout Growth, et en plus :',
    features: [
      '300 leads qualifiés / mois inclus',
      'Scoring avancé + priorisation automatique',
      'Marque blanche complète',
      'API estimation + intégration CRM/PMS',
      'Dashboard de performance',
    ],
  },
]

const tableRows: { label: string; free: string; growth: string; pro: string }[] = [
  { label: 'Estimations / mois', free: '10', growth: '100', pro: '300' },
  { label: 'Essai gratuit', free: 'Illimité', growth: '14 jours', pro: '14 jours' },
  { label: 'Widget personnalisé (logo + couleurs)', free: '✓', growth: '✓', pro: '✓' },
  { label: "PDF d'estimation auto", free: '✓', growth: '✓', pro: '✓' },
  { label: 'Multilingue FR / EN / ES / PT', free: '✓', growth: '✓', pro: '✓' },
  { label: 'Pack 50 estimations supplémentaires', free: '✓', growth: '✓', pro: '✓' },
  { label: "Score d'opportunité (qualification lead)", free: '✗', growth: 'Basique', pro: 'Avancé + auto-priorisation' },
  { label: 'Historique + suivi des leads', free: '✗', growth: '✓', pro: '✓' },
  { label: 'Export CSV des leads', free: '✗', growth: '✓', pro: '✓' },
  { label: 'Dashboard de performance', free: '✗', growth: '✗', pro: '✓' },
  { label: 'API estimation publique', free: '✗', growth: '✗', pro: '✓' },
  { label: 'Intégration CRM / PMS', free: '✗', growth: '✗', pro: '✓' },
  { label: 'Marque blanche widget + PDF', free: '✗', growth: '✗', pro: '✓' },
]

const faq = [
  {
    q: 'Est-ce que je peux annuler à tout moment ?',
    a: "Oui, sans engagement. Vous pouvez résilier depuis votre espace en un clic. Votre accès reste actif jusqu'à la fin de la période payée.",
  },
  {
    q: "Que se passe-t-il après les 14 jours d'essai gratuit ?",
    a: "Aucun prélèvement n'est effectué pendant les 14 jours d'essai. Le 15ème jour, votre abonnement démarre automatiquement. Vous pouvez annuler à tout moment avant cette date depuis votre espace, en un clic.",
  },
  {
    q: "Que se passe-t-il quand j'atteins mon quota mensuel ?",
    a: "L'estimation est créée mais verrouillée : vous voyez qu'un lead est arrivé et son identité, mais pas les chiffres. Pour débloquer, vous pouvez acheter un pack de 50 estimations supplémentaires (one-shot, sans engagement) ou upgrader votre plan. Les estimations verrouillées les plus anciennes sont automatiquement débloquées à l'achat d'un pack.",
  },
  {
    q: 'Le widget est-il vraiment à mes couleurs ?',
    a: "Oui — logo, couleurs, options de qualification. Le widget que vous intégrez sur votre site ressemble à votre agence, pas à un outil tiers. La configuration se fait en quelques minutes depuis votre espace MySpace.",
  },
  {
    q: 'Comment intégrer le widget sur mon site ?',
    a: "Après configuration, vous copiez un simple code d'embed et vous le collez dans votre site. Compatible avec tous les CMS (WordPress, Wix, Squarespace…). Pas de développeur nécessaire.",
  },
  {
    q: 'Puis-je passer du plan Growth à Pro ?',
    a: "Oui, à n'importe quel moment. La différence est calculée au prorata pour le mois en cours.",
  },
]

function Cell({ v }: { v: string }) {
  if (v === '✓') return <span className="text-[#007caa] font-bold text-base">✓</span>
  if (v === '✗') return <span className="text-gray-300 font-bold text-base">✗</span>
  if (v === 'Illimité') return <span className="text-[#007caa] font-medium text-sm">{v}</span>
  return <span className="text-gray-700 text-sm">{v}</span>
}

export default function PricingPage() {
  return (
    <div>
      {/* Plans — web component (includes its own hero + "Tarifs HT" footer) */}
      <section id="abonnement" className="bg-white">
        <div className="max-w-5xl mx-auto">
          <SubscriptionWidget />
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-[#f0f8fb] border-y border-[#cce8f0] py-3 px-4 text-center">
        <p className="text-sm text-[#007caa]">
          <span className="mr-2">🛡</span>
          <strong>Satisfait ou remboursé 30 jours</strong> · Pas convaincu ? On vous rembourse intégralement, sans questions.
        </p>
      </div>

      {/* Social proof */}
      <section className="py-12 px-4 bg-white text-center">
        <p className="text-yellow-400 text-2xl mb-3">★★★★★</p>
        <p className="text-gray-700 text-sm mb-2">
          <strong>+100 professionnels</strong> de la location saisonnière utilisent déjà Estimate Rentals.
        </p>
        <p className="text-gray-500 text-sm italic">
          👤 « Nous avons gagné plus de 400 mandats en 3 ans grâce à Estimate.rentals » - Carmen Immobilier
        </p>
      </section>

      {/* Comparison table */}
      <section className="pb-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[#007caa]">
                <th className="text-left py-3 pr-4 text-gray-500 font-normal w-1/2"></th>
                <th className="text-center py-3 px-4 font-bold text-gray-700">FREE</th>
                <th className="text-center py-3 px-4 font-bold text-[#007caa]">
                  GROWTH
                  <span className="block text-[10px] font-semibold bg-[#007caa] text-white rounded-full px-2 py-0.5 mx-auto mt-1 w-fit">
                    Le plus populaire
                  </span>
                </th>
                <th className="text-center py-3 px-4 font-bold text-gray-700">PRO</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={row.label} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="py-3 pr-4 text-gray-600">{row.label}</td>
                  <td className="py-3 px-4 text-center"><Cell v={row.free} /></td>
                  <td className="py-3 px-4 text-center"><Cell v={row.growth} /></td>
                  <td className="py-3 px-4 text-center"><Cell v={row.pro} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto space-y-3">
          {faq.map((item) => (
            <details key={item.q} className="border border-gray-200 rounded-xl bg-white">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-gray-800 text-sm list-none">
                {item.q}
                <span className="text-[#007caa] text-lg flex-shrink-0 ml-4">+</span>
              </summary>
              {'a' in item && item.a && (
                <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{item.a}</p>
              )}
            </details>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-16 px-4 bg-white text-center">
        <a
          href="#abonnement"
          className="btn-shimmer-auto inline-block bg-[#007caa] text-white font-semibold px-10 py-4 rounded-full hover:bg-[#005f85] transition-colors text-base mb-3"
        >
          Commencer l&apos;essai gratuit
        </a>
        <p className="text-gray-400 text-sm">Sans CB · Sans engagement · Annulation en 1 clic</p>

        <div className="flex flex-wrap justify-center gap-6 mt-8 text-gray-400 text-xs">
          <span>🔒 Paiement sécurisé</span>
          <span>🛡 Données hébergées en France</span>
          <span>✅ Conforme RGPD</span>
          <span>💳 Sans CB pour l&apos;essai</span>
        </div>
      </section>
    </div>
  )
}
