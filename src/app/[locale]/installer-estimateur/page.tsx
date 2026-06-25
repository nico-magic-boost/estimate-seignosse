import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { robots, hreflang, canonical } from '@/lib/seo'
import RevealOnScroll from '@/components/RevealOnScroll'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Intégrer un estimateur de revenus locatifs sur votre site',
    description: "Intégrez l'estimateur Estimate Rentals sur votre site immobilier en quelques minutes. Générez des leads propriétaires qualifiés et obtenez plus de mandats de location saisonnière.",
    robots,
    alternates: {
      canonical: canonical('fr', '/installer-estimateur'),
      ...hreflang({ fr: '/installer-estimateur', en: '/install-estimator', es: '/instalar-estimador' }),
    },
    openGraph: {
      title: 'Intégrer un estimateur de revenus locatifs sur votre site',
      description: "Intégrez l'estimateur Estimate Rentals sur votre site immobilier en quelques minutes.",
      url: canonical('fr', '/installer-estimateur'),
    },
  }
}

const WP = 'https://estimate.rentals/wp-content/uploads'

const steps = [
  {
    n: 1,
    title: "L'estimateur à votre image",
    text: "Adaptez l'outil à votre charte graphique : choisissez vos couleurs, ajoutez votre logo et offrez une expérience cohérente et professionnelle à vos prospects.\n\nL'estimateur devient une extension de votre marque.",
    img: `${WP}/2025/09/estimateur-image.webp`,
    imgAlt: "Interface de personnalisation de l'estimateur avec sélection de couleurs et upload de logo",
  },
  {
    n: 2,
    title: "Choisissez le contenu de vos emails d'estimation",
    text: "Chaque prospect reçoit une estimation claire et professionnelle, automatiquement.\n\n• Mettez en avant le volume annuel et les statistiques clés.\n• Partagez des données pertinentes comme le revenu brut mensuel, le prix moyen par nuitée, la valeur estimée des revenus locatifs...\n• Choisissez entre volume brut ou revenu net propriétaire.\n\nAvec Estimate.rentals vous partagerez des e-mails bien présentés pour plus de crédibilité et plus de mandats.",
    img: `${WP}/2025/09/email.webp`,
    imgAlt: "Exemple d'email d'estimation envoyé automatiquement aux prospects propriétaires",
  },
  {
    n: 3,
    title: 'Définissez vos propres règles de calcul',
    text: "Estimate.rentals vous donne la possibilité de paramétrer vos frais de gestion, de commercialisation et la stratégie commerciale globale pratiquée dans vos mandats.\n\nNotre outil calcule automatiquement et affiche l'impact financier pour donner une estimation transparente et réaliste.\n\nVous devenez l'expert de la rentabilité locative.",
    img: `${WP}/2025/09/calcul.webp`,
    imgAlt: "Interface de configuration des règles de calcul : frais de gestion, commission et stratégie commerciale",
  },
  {
    n: 4,
    title: "Intégrez facilement l'estimateur sur votre site",
    text: "Afficher l'estimateur sur votre site internet à partir d'une ligne de code (iframe) seulement. Disponible dans un CMS (comme WordPress, Wix...) ou directement dans un fichier .html pour les sites développés sur mesure.\n\nEn quelques minutes, votre site propose un simulateur moderne et interactif qui capte des leads propriétaires.",
    img: `${WP}/2025/09/integration.webp`,
    imgAlt: "Snippet de code iframe pour intégrer l'estimateur sur n'importe quel site web ou CMS",
  },
]

const whyItems = [
  { img: `${WP}/2025/08/house-rental_white.png`, label: 'Générer plus de leads propriétaires' },
  { img: `${WP}/2025/08/key-person_white.png`, label: 'Transformer plus de propriétaire en mandats' },
  { img: `${WP}/2025/08/professional_white.png`, label: 'Proposer un outil professionnel et personnalisé' },
  { img: `${WP}/2025/08/vocational_white.png`, label: 'Se démarquer de la concurrence' },
]

const testimonials = [
  {
    quote: "« L'estimateur en ligne a changé notre façon de capter des prospects. En quelques mois, il nous a permis de générer plus de 100 leads propriétaires qualifiés et de concrétiser + de 20 mandats. Nos clients apprécient la transparence de l'outil et nous, nous gagnons en efficacité commerciale. »",
    name: 'Pascal L.',
    role: "Directeur d'une agence immobilière",
  },
  {
    quote: "« En tant que dirigeante d'agence, je cherchais un outil simple pour capter plus de propriétaires. L'estimateur d'Estimate.rentals a dépassé mes attentes. C'est devenu un vrai atout dans notre stratégie digitale et nos propriétaires apprécient la clarté de l'expérience. »",
    name: 'Emilie P.',
    role: "Directrice d'une agence immobilière",
  },
]

export default function InstallPage() {
  return (
    <div>
      <RevealOnScroll />

      {/* Hero */}
      <section className="mesh-gradient-animated text-white py-16 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 reveal">
            <h1 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
              Intégrer un <span className="gradient-text">estimateur de revenus locatifs</span> sur votre site internet
            </h1>
            <p className="text-base text-white mb-8 leading-relaxed">
              Générez des leads propriétaires en intégrant notre estimateur de revenus locatifs
              sur votre propre site web. Un outil simple, moderne et personnalisable qui valorise
              votre expertise.
            </p>
            <Link
              href="/demander-une-demo"
              className="glow-pulse btn-shimmer-auto inline-flex items-center gap-2 bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
              J&apos;installe l&apos;estimateur sur mon site
            </Link>
          </div>
          <div className="flex-1 reveal-right">
            <Image
              src={`${WP}/2025/08/Design-sans-titre-2025-08-06T141849.462.png`}
              alt="Aperçu de l'estimateur de revenus locatifs affiché sur desktop et tablette"
              width={560}
              height={380}
              className="w-full object-contain drop-shadow-2xl float"
              priority
            />
          </div>
        </div>
      </section>

      {/* 4 étapes */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <h2 className="text-2xl md:text-3xl font-bold text-[#005f85] text-center mb-12">
              Un estimateur sur votre site en 4 étapes
            </h2>
          </div>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div
                key={step.n}
                className={`reveal bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden flex flex-col ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="flex-1 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-[#005f85] text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                      {step.n}
                    </span>
                    <h3 className="text-lg font-bold text-gray-800">{step.title}</h3>
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed space-y-2">
                    {step.text.split('\n').map((line, j) => (
                      <p key={j}>{line}</p>
                    ))}
                  </div>
                </div>
                <div className="flex-1 bg-white flex items-center justify-center p-6">
                  <Image
                    src={step.img}
                    alt={step.imgAlt}
                    width={480}
                    height={300}
                    className="w-full rounded-xl object-cover border border-gray-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi intégrer */}
      <section className="mesh-gradient text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Pourquoi intégrer un estimateur de revenus locatifs sur son site ?
            </h2>
          </div>
          <ul
            role="list"
            aria-label="Bénéfices de l'intégration de l'estimateur"
            className="reveal-stagger grid grid-cols-2 md:grid-cols-4 gap-6 list-none m-0 p-0"
          >
            {whyItems.map((item) => (
              <li key={item.label} className="card-hover flex flex-col items-center text-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5">
                <Image
                  src={item.img}
                  alt=""
                  aria-hidden="true"
                  width={64}
                  height={64}
                  className="h-16 w-16 object-contain brightness-0 invert"
                />
                <p className="text-sm font-medium leading-snug">{item.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <h2 className="text-2xl md:text-3xl font-bold text-[#005f85] text-center mb-10">
              Des résultats impactants pour les professionnels
            </h2>
          </div>
          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="card-hover bg-gray-50 rounded-2xl border border-gray-200 p-8">
                <p className="text-gray-700 text-sm leading-relaxed italic mb-6">{t.quote}</p>
                <p className="text-gray-900 font-semibold text-sm">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mesh-gradient py-14 px-4">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="reveal">
            <h2 className="text-2xl font-bold text-white text-center md:text-left leading-snug">
              Prêt à gagner du temps sur vos estimations et à obtenir plus de mandats ?
            </h2>
          </div>
          <Link
            href="/demander-une-demo"
            className="btn-shimmer glow-pulse flex-shrink-0 bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Installer l&apos;estimateur sur mon site →
          </Link>
        </div>
      </section>
    </div>
  )
}
