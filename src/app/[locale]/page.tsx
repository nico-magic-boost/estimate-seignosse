import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { robots, hreflang, canonical } from '@/lib/seo'
import { getPayload } from 'payload'
import config from '@payload-config'
import RevealOnScroll from '@/components/RevealOnScroll'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: "L'estimateur de revenus locatifs saisonniers pour les professionnels",
    description: "Estimate Rentals : l'outil d'estimation locative saisonnière dédié aux professionnels de l'immobilier. Générez des leads propriétaires et obtenez plus de mandats.",
    robots,
    alternates: {
      canonical: canonical(locale, '/'),
      ...hreflang({ fr: '/', en: '/', es: '/' }),
    },
    openGraph: {
      title: "L'estimateur de revenus locatifs saisonniers pour les professionnels",
      description: "Estimate Rentals : l'outil d'estimation locative saisonnière dédié aux professionnels de l'immobilier.",
      url: canonical(locale, '/'),
    },
  }
}

const WP = 'https://estimate.rentals/wp-content/uploads'

const CHECK_ICON = (
  <svg aria-hidden="true" className="w-5 h-5 flex-shrink-0 text-[#007caa]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  let cmsHeroTitle: string | null = null
  let cmsHeroSubtitle: string | null = null
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      locale: locale as any,
      limit: 1,
    })
    const page = result.docs[0]
    if (page?.heroTitle) cmsHeroTitle = page.heroTitle
    if (page?.heroSubtitle) cmsHeroSubtitle = page.heroSubtitle
  } catch {
    // DB unavailable at build time — use hardcoded text
  }

  return (
    <div>
      <RevealOnScroll />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-white dot-grid overflow-hidden py-20 px-4">
        {/* Decorative orbs */}
        <div aria-hidden="true" className="orb w-96 h-96 bg-[#007caa] top-[-80px] right-[-60px] float-slow" />
        <div aria-hidden="true" className="orb w-64 h-64 bg-[#17a3b5] bottom-[-40px] left-[-40px] float-delayed" />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              {cmsHeroTitle ?? (
                <>
                  L&apos;estimateur qui génère{' '}
                  <span className="gradient-text">des mandats</span>
                </>
              )}
            </h1>
            <p className="text-lg text-gray-600 mb-7 leading-relaxed">
              {cmsHeroSubtitle ?? (
                <>
                  Le seul estimateur de revenus locatifs intégrant les{' '}
                  <strong>réglementations locales</strong>, le potentiel de{' '}
                  <strong>revenus agence</strong> et la{' '}
                  <strong>qualification propriétaire</strong>.
                </>
              )}
            </p>
            <div className="flex flex-wrap gap-2 mb-8" role="list" aria-label="Points forts">
              {['Fiable', 'Rapide', 'Personnalisable'].map((b) => (
                <span key={b} role="listitem" className="bg-[#005f85] text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                  {b}
                </span>
              ))}
            </div>
            <Link
              href="/estimez-gratuitement"
              className="btn-shimmer btn-shimmer-auto glow-pulse inline-block bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-8 py-3 rounded-full transition-colors text-base"
            >
              Tester gratuitement →
            </Link>
            <p className="mt-3 text-xs text-gray-500">Sans CB · Sans inscription · Résultat en 30 secondes</p>
            <div className="flex items-center gap-2 mt-5">
              <span className="text-yellow-500 text-sm leading-none" aria-hidden="true">★★★★★</span>
              <span className="text-xs text-gray-600">+100 professionnels utilisent déjà Estimate Rentals</span>
            </div>
          </div>
          <div className="flex-1 float">
            <Image
              src={`${WP}/2026/05/ChatGPT-Image-11-mai-2026-13_34_21-e1778504824219.png`}
              alt="Dashboard Estimate Rentals — interface d'estimation locative"
              width={600}
              height={420}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-2xl shadow-xl w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────── */}
      <section className="mesh-gradient-animated text-white py-8 px-4" aria-label="Chiffres clés">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 items-center reveal-stagger">
          <div className="flex items-center gap-4">
            <svg aria-hidden="true" className="w-10 h-10 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5V19a1 1 0 001 1h3V13.5M3 13.5V9a1 1 0 011-1h3a1 1 0 011 1v4.5M3 13.5h6m3 6V8a1 1 0 011-1h3a1 1 0 011 1v11m-5 0h6"/>
            </svg>
            <div>
              <div className="text-xl font-bold leading-tight">800 000+</div>
              <div className="text-sm leading-snug">locations analysées</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <svg aria-hidden="true" className="w-10 h-10 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" strokeLinecap="round"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5l2.5 2.5 4.5-5"/>
            </svg>
            <div>
              <div className="text-base font-bold leading-snug">Réglementations</div>
              <div className="text-sm">locales intégrées</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <svg aria-hidden="true" className="w-10 h-10 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <rect x="2" y="6" width="20" height="14" rx="2" strokeLinecap="round"/>
              <circle cx="8" cy="13" r="2"/>
              <path strokeLinecap="round" d="M13 11h5M13 15h3"/>
            </svg>
            <div>
              <div className="text-base font-bold leading-snug">Leads qualifiés</div>
              <div className="text-sm">email + tél vérifiés</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <svg aria-hidden="true" className="w-10 h-10 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715l.053-.13c.29-.72.29-1.516 0-2.236A1.5 1.5 0 0011.79 2h-.001A1.5 1.5 0 0010.29 3.5v.5c0 .982-.578 1.891-1.532 2.463L6 8l.001 10H18a2 2 0 001.94-1.515l1-4A2 2 0 0019 10h-6.369M6 8H3.5A1.5 1.5 0 002 9.5v7A1.5 1.5 0 003.5 18H6V8z"/>
            </svg>
            <div>
              <div className="text-base font-bold leading-snug">Installation</div>
              <div className="text-sm">en 1 clic</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pourquoi choisir ──────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi choisir <span className="gradient-text">Estimate.rentals</span> ?
            </h2>
            <p className="text-gray-600 mb-10 leading-relaxed max-w-3xl">
              Avec Estimate.rentals, vous accédez au <strong>premier estimateur conçu pour répondre
              aux besoins réels des professionnels</strong> de la location de vacances et de leurs clients propriétaires.
            </p>
          </div>

          <ul className="grid md:grid-cols-2 gap-5 mb-10" aria-label="Avantages Estimate.rentals">
            {[
              {
                title: 'Optimisation des revenus',
                text: 'Notre solution évalue les revenus potentiels des propriétaires et vos propres gains, en intégrant vos frais de gestion et les coûts de distribution, afin de donner une vision claire et réaliste des bénéfices.',
              },
              {
                title: 'Vision complète et transparente',
                text: 'Contrairement aux estimateurs classiques, nous prenons en compte tous les intermédiaires et présentons aux propriétaires leur revenu net final.',
              },
              {
                title: "Impact des réglementations locales",
                text: "Notre outil est le premier qui intègre automatiquement les réglementations propres à chaque marché pour ajuster les estimations au plus près de la réalité.",
              },
              {
                title: 'Fiabilité inégalée',
                text: "Nos calculs s'appuient sur des sources de données multiples et reconnues (dont Popconnect, leader de la multidiffusion de location de vacances), pour vous offrir l'un des estimateurs les plus précis du marché.",
              },
              {
                title: 'Optimisé pour le SEO',
                text: "Intégrez l'estimateur directement sur votre site et optimisez votre référencement pour capter les visiteurs qui recherchent un professionnel dans votre zone.",
              },
            ].map((item, i) => (
              <li
                key={item.title}
                className={`card-hover reveal bg-gray-50 border border-gray-100 rounded-xl p-5 flex items-start gap-4`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                {CHECK_ICON}
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{item.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="text-gray-600 text-sm italic mb-8">
            Avec Estimate.rentals, vous renforcez votre expertise, gagnez en crédibilité et offrez à vos prospects un service différenciant et professionnel.
          </p>
          <div className="reveal">
            <Link href="/estimez-gratuitement" className="btn-shimmer inline-block bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-7 py-3 rounded-full transition-colors">
              En savoir plus
            </Link>
          </div>

          {/* FAQ Accordion */}
          <div className="mt-14 space-y-3" aria-label="Questions fréquentes">
            <h3 className="text-xl font-bold text-gray-900 mb-5 reveal">Questions fréquentes</h3>
            {[
              {
                q: "En quoi l'estimateur de revenus Estimate.rentals est-il différent des autres outils du marché ?",
                a: "Notre estimateur de revenus locatifs en AirBnB est le premier à calculer vos gains potentiels et à intégrer à la fois frais de gestion, coûts de distribution et les réglementations locales. Le résultat affiché est un revenu fiable et réaliste.",
              },
              {
                q: "Sur quelles données se basent nos calculs et nos estimations ?",
                a: "Nos modèles croisent plusieurs sources fiables et sont actualisés en continu pour garantir des estimations précises et pertinentes, même sur des marchés évolutifs.",
              },
              {
                q: "Puis-je personnaliser les paramètres (frais de gestion, commissions, etc.) ?",
                a: "Oui, vous pouvez ajuster facilement vos frais de gestion, choisir l'affichage de l'estimation du propriétaire, en mode revenus bruts ou nets, les coûts et commission de distribution.",
              },
              {
                q: "L'outil prend-il en compte les réglementations locales ?",
                a: "Absolument. Notre estimateur est le premier à intégrer ces règles et les spécificités locales (plafonds, fiscalités, durées, règles d'occupation) dans son calcul. Vous obtenez des estimations conformes à la réalité de chaque territoire.",
              },
              {
                q: "Les estimations sont-elles fiables pour présenter aux propriétaires ?",
                a: "Oui. Les calculs sont transparents, traçables et comparables. Vous pouvez partager les résultats sous forme de rapport clair et professionnel pour renforcer votre crédibilité.",
              },
            ].map((item, i) => (
              <details key={item.q} className="reveal border border-gray-200 rounded-xl group" style={{ transitionDelay: `${i * 60}ms` }}>
                <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer font-medium text-gray-800 text-sm list-none select-none">
                  <span>{item.q}</span>
                  <svg aria-hidden="true" className="w-4 h-4 flex-shrink-0 text-[#007caa] transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-4 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 étapes ──────────────────────────────────────────── */}
      <section className="mesh-gradient-animated text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-14 reveal">Une estimation précise en 3 étapes</h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-10 reveal-stagger" aria-label="Étapes pour obtenir une estimation">
            {[
              { img: `${WP}/2025/07/etape1_Plan-de-travail-1.webp`, text: "Indiquez l'adresse et les caractéristiques du logement." },
              { img: `${WP}/2025/07/etape2_Plan-de-travail-1.webp`, text: "Renseignez les informations de contact de votre propriétaire." },
              { img: `${WP}/2025/07/etape3_Plan-de-travail-1.webp`, text: "Obtenez une estimation de revenus immédiate et précise." },
            ].map((step, i) => (
              <li key={i} className="flex flex-col items-center">
                <div className="bg-white/15 rounded-full p-4 mb-5 float" style={{ animationDelay: `${i * 0.8}s` }}>
                  <Image src={step.img} alt={`Étape ${i + 1}`} width={80} height={80} className="h-20 w-20 object-contain" />
                </div>
                <div className="bg-white/20 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center mb-3" aria-hidden="true">{i + 1}</div>
                <p className="text-sm text-white leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Professionnels ────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 reveal-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Professionnels de l&apos;immobilier : <span className="gradient-text">augmentez vos mandats</span>
            </h2>
            <ul className="space-y-4 mb-8" aria-label="Bénéfices pour les professionnels">
              {[
                { title: 'Captez plus de leads', text: "Installez l'estimateur sur votre site et convertissez vos visiteurs en leads." },
                { title: 'Des estimations fiables et précises', text: "Une analyse basée sur plus de 800 000 locations saisonnières et de courte durée en France (dont des milliers sur Airbnb)." },
                { title: 'Gain de temps', text: "En quelques secondes, proposez un loyer réaliste à vos clients propriétaires." },
                { title: 'Image professionnelle', text: "Renforcez votre crédibilité avec un outil moderne, pensé pour les experts." },
                { title: 'Confiance des propriétaires', text: "Rassurez-les avec une estimation personnalisée." },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  {CHECK_ICON}
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <strong>{item.title} :</strong> {item.text}
                  </p>
                </li>
              ))}
            </ul>
            <Link href="/installer-estimateur" className="btn-shimmer inline-block bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-7 py-3 rounded-full transition-colors text-sm">
              Intégrer l&apos;estimateur pour les pros
            </Link>
          </div>
          <div className="flex-1 reveal-right">
            <Image
              src={`${WP}/2025/09/Design-sans-titre-2.png`}
              alt="Interface de l'outil d'estimation pour les professionnels de l'immobilier"
              width={500}
              height={380}
              className="rounded-2xl w-full object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* ── Personnalisation ──────────────────────────────────── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 reveal-left">
            <Image
              src={`${WP}/2025/09/Design-sans-titre-4.png`}
              alt="Options de personnalisation du widget d'estimation aux couleurs de votre marque"
              width={480}
              height={360}
              className="rounded-2xl w-full object-cover shadow-lg"
            />
          </div>
          <div className="flex-1 reveal-right">
            <h2 className="text-3xl font-bold text-gray-900 mb-5">
              Adaptez l&apos;estimateur à votre image
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Adaptez l&apos;estimateur à la charte graphique de votre marque en choisissant vos couleurs
              ainsi que votre logo. Insérez votre logo et intégrez l&apos;estimateur sur votre site web.
              Personnalisez également l&apos;email de destination et transférez directement l&apos;estimation aux propriétaires.
            </p>
            <div className="flex flex-wrap gap-3 mb-6" role="list" aria-label="Fonctionnalités">
              {['Personnalisation', 'Intégration', 'Partage'].map((label) => (
                <span key={label} role="listitem" className="bg-[#005f85] text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                  {label}
                </span>
              ))}
            </div>
            <Link href="/installer-estimateur" className="btn-shimmer inline-block bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-7 py-3 rounded-full transition-colors text-sm">
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* ── Espace estimations ────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 reveal-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Un espace dédié pour retrouver toutes vos estimations
            </h2>
            <ul className="space-y-4 mb-8" aria-label="Fonctionnalités de l'espace estimations">
              {[
                { title: 'Centralisation des estimations', text: "Retrouvez facilement toutes les demandes en un seul endroit, fini les pertes dans les emails ou dossiers." },
                { title: 'Gain de temps', text: "Accès rapide aux estimations passées sans avoir à les rechercher manuellement." },
                { title: 'Suivi simplifié', text: "Possibilité de voir l'historique, comparer les demandes et suivre l'évolution." },
                { title: 'Professionnalisme', text: "Impression positive auprès des clients qui voient que tout est structuré." },
                { title: 'Sécurité', text: "Les données sont stockées de manière centralisée et sécurisée, conformes aux exigences RGPD, sans risque de perte." },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  {CHECK_ICON}
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <strong>{item.title} :</strong> {item.text}
                  </p>
                </li>
              ))}
            </ul>
            <Link href="/installer-estimateur" className="btn-shimmer inline-block bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-7 py-3 rounded-full transition-colors text-sm">
              Intégrer l&apos;estimateur dès maintenant
            </Link>
          </div>
          <div className="flex-1 reveal-right">
            <Image
              src={`${WP}/2025/09/Design-sans-titre-7.png`}
              alt="Tableau de bord centralisé affichant toutes vos estimations"
              width={500}
              height={380}
              className="rounded-2xl w-full object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* ── CTA final ─────────────────────────────────────────── */}
      <section className="mesh-gradient-animated py-14 px-4">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 reveal">
          <h2 className="text-2xl font-bold text-white text-center md:text-left leading-snug">
            Prêt à gagner du temps sur vos estimations et à obtenir plus de mandats ?
          </h2>
          <Link
            href="/demander-une-demo"
            className="flex-shrink-0 bg-white text-[#005f85] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Demander une démo
          </Link>
        </div>
      </section>
    </div>
  )
}
