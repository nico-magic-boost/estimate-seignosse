import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'

const WP = 'https://estimate.rentals/wp-content/uploads'

export default function HomePage() {
  const t = useTranslations()

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              L&apos;estimateur qui génère{' '}
              <span className="text-[#007caa]">des mandats</span>
            </h1>
            <p className="text-lg text-gray-600 mb-7 leading-relaxed">
              Le seul estimateur de revenus locatifs intégrant les{' '}
              <strong>réglementations locales</strong>, le potentiel de{' '}
              <strong>revenus agence</strong> et la{' '}
              <strong>qualification propriétaire</strong>.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Fiable', 'Rapide', 'Personnalisable'].map((b) => (
                <span key={b} className="bg-[#e8f5fb] text-[#007caa] text-sm font-semibold px-4 py-1.5 rounded-full">
                  {b}
                </span>
              ))}
            </div>
            <Link
              href="/estimez-gratuitement"
              className="inline-block bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-8 py-3 rounded-full transition-colors text-base"
            >
              Essai gratuit
            </Link>
          </div>
          <div className="flex-1">
            <Image
              src={`${WP}/2026/05/ChatGPT-Image-11-mai-2026-13_34_21-e1778504824219.png`}
              alt="Dashboard Estimate Rentals"
              width={600}
              height={420}
              className="rounded-2xl shadow-xl w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────── */}
      <section className="bg-[#007caa] text-white py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { stat: '800 000+', label: 'locations analysées' },
            { stat: '✔', label: 'Réglementations locales intégrées' },
            { stat: '✔', label: 'Leads qualifiés email + tél vérifiés' },
            { stat: '✔', label: 'Installation en 1 clic' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-xl font-bold">{s.stat}</div>
              <div className="text-sm opacity-85 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pourquoi choisir ──────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Pourquoi choisir Estimate.rentals ?
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Avec Estimate.rentals, vous accédez au <strong>premier estimateur conçu pour répondre
            aux besoins réels des professionnels</strong> de la location de vacances et de leurs clients propriétaires.
          </p>
          <ul className="space-y-5 mb-10">
            {[
              {
                title: 'Optimisation des revenus',
                text: 'notre solution évalue les revenus potentiels des propriétaires et vos propres gains, en intégrant vos frais de gestion et les coûts de distribution, afin de donner une vision claire et réaliste des bénéfices.',
              },
              {
                title: 'Vision complète et transparente',
                text: 'contrairement aux estimateurs classiques, nous prenons en compte tous les intermédiaires et présentons aux propriétaires leur revenu net final.',
              },
              {
                title: "Estimation de l'impact des réglementations locales",
                text: "notre outil est le premier qui intègre automatiquement les réglementations propres à chaque marché pour ajuster les estimations au plus près de la réalité.",
              },
              {
                title: 'Fiabilité inégalée',
                text: "nos calculs s'appuient sur des sources de données multiples et reconnues (dont Popconnect, leader de la multidiffusion de location de vacances), pour vous offrir l'un des estimateurs les plus précis du marché.",
              },
              {
                title: 'Optimisé pour le SEO',
                text: "intégrez l'estimateur directement sur votre site et optimisez votre référencement pour capter les visiteurs qui recherchent un professionnel dans votre zone. Avec estimate.rentals vous restez maîtres de votre trafic.",
              },
            ].map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="text-[#007caa] mt-1 flex-shrink-0">✔</span>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>{item.title} :</strong> {item.text}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-gray-600 text-sm italic mb-8">
            Avec Estimate.rentals, vous renforcez votre expertise, gagnez en crédibilité et offrez à vos prospects un service différenciant et professionnel.
          </p>
          <Link href="/estimez-gratuitement" className="inline-block bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-7 py-3 rounded-full transition-colors">
            En savoir plus
          </Link>

          {/* FAQ Accordion */}
          <div className="mt-12 space-y-3">
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
            ].map((item) => (
              <details key={item.q} className="border border-gray-200 rounded-lg">
                <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer font-medium text-gray-800 text-sm list-none">
                  <span className="text-[#007caa]">✔</span> {item.q}
                </summary>
                <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 étapes ──────────────────────────────────────────── */}
      <section className="bg-[#007caa] text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-14">Une estimation précise en 3 étapes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { img: `${WP}/2025/07/etape1_Plan-de-travail-1.webp`, text: "Indiquez l'adresse et les caractéristiques du logement." },
              { img: `${WP}/2025/07/etape2_Plan-de-travail-1.webp`, text: "Renseignez les informations de contact de votre propriétaire." },
              { img: `${WP}/2025/07/etape3_Plan-de-travail-1.webp`, text: "Obtenez une estimation de revenus immédiate et précise." },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <Image src={step.img} alt={`Étape ${i + 1}`} width={120} height={120} className="h-24 w-24 object-contain mb-5" />
                <p className="text-sm opacity-90 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Professionnels ────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Professionnels de l&apos;immobilier : augmentez vos mandats
            </h2>
            <ul className="space-y-4 mb-8">
              {[
                { title: 'Captez plus de leads', text: "Installez l'estimateur sur votre site et convertissez vos visiteurs en leads." },
                { title: 'Des estimations fiables et précises', text: "une analyse basée sur plus de 800 000 locations saisonnières et de courte durée en France (dont des milliers sur Airbnb)." },
                { title: 'Gain de temps', text: "en quelques secondes, proposez un loyer réaliste à vos clients propriétaires." },
                { title: 'Image professionnelle', text: "renforcez votre crédibilité avec un outil moderne, pensé pour les experts." },
                { title: 'Confiance des propriétaires', text: "rassurez-les avec une estimation personnalisée." },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="text-[#007caa] mt-0.5 flex-shrink-0">✔</span>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <strong>{item.title} :</strong> {item.text}
                  </p>
                </li>
              ))}
            </ul>
            <Link href="/installer-estimateur" className="inline-block bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-7 py-3 rounded-full transition-colors text-sm">
              Intégrer l&apos;estimateur pour les pros
            </Link>
          </div>
          <div className="flex-1">
            <Image
              src={`${WP}/2025/09/Design-sans-titre-2.png`}
              alt="Professionnels de l'immobilier"
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
          <div className="flex-1">
            <Image
              src={`${WP}/2025/09/Design-sans-titre-4.png`}
              alt="Personnalisation du widget"
              width={480}
              height={360}
              className="rounded-2xl w-full object-cover shadow-lg"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-5">
              Adaptez l&apos;estimateur à votre image
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Adaptez l&apos;estimateur à la charte graphique de votre marque en choisissant vos couleurs
              ainsi que votre logo. Insérez votre logo et intégrez l&apos;estimateur sur votre site web.
              Personnalisez également l&apos;email de destination et transférez directement l&apos;estimation aux propriétaires.
            </p>
            <div className="flex gap-3 mb-6">
              {['Personnalisation', 'Intégration', 'Partage'].map((label) => (
                <span key={label} className="border border-[#007caa] text-[#007caa] text-sm font-semibold px-4 py-1.5 rounded-full">
                  {label}
                </span>
              ))}
            </div>
            <Link href="/installer-estimateur" className="inline-block bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-7 py-3 rounded-full transition-colors text-sm">
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* ── Espace estimations ────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Un espace dédié pour retrouver toutes vos estimations
            </h2>
            <ul className="space-y-4 mb-8">
              {[
                { title: 'Centralisation des estimations', text: "retrouvez facilement toutes les demandes en un seul endroit, fini les pertes dans les emails ou dossiers." },
                { title: 'Gain de temps', text: "accès rapide aux estimations passées sans avoir à les rechercher manuellement." },
                { title: 'Suivi simplifié', text: "possibilité de voir l'historique, comparer les demandes et suivre l'évolution." },
                { title: 'Professionnalisme', text: "impression positive auprès des clients qui voient que tout est structuré." },
                { title: 'Sécurité', text: "les données sont stockées de manière centralisée et sécurisée, conformes aux exigences RGPD, sans risque de perte." },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="text-[#007caa] mt-0.5 flex-shrink-0">✔</span>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <strong>{item.title} :</strong> {item.text}
                  </p>
                </li>
              ))}
            </ul>
            <Link href="/installer-estimateur" className="inline-block bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-7 py-3 rounded-full transition-colors text-sm">
              Intégrer l&apos;estimateur dès maintenant
            </Link>
          </div>
          <div className="flex-1">
            <Image
              src={`${WP}/2025/09/Design-sans-titre-7.png`}
              alt="Espace estimations"
              width={500}
              height={380}
              className="rounded-2xl w-full object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* ── CTA final ─────────────────────────────────────────── */}
      <section className="bg-[#007caa] py-14 px-4">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl font-bold text-white text-center md:text-left leading-snug">
            Prêt à gagner du temps sur vos estimations et à obtenir plus de mandats ?
          </h2>
          <Link
            href="/demander-une-demo"
            className="flex-shrink-0 bg-white text-[#007caa] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Demander une démo
          </Link>
        </div>
      </section>
    </div>
  )
}
