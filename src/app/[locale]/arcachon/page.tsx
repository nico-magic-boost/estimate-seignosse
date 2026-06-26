import EstimateWidget from '@/components/EstimateWidget'
import { ArcachonFaq } from './ArcachonFaq'
import RevealOnScroll from '@/components/RevealOnScroll'

export const dynamic = 'force-dynamic'

// ── SVG Icons ──────────────────────────────────────────────────────────────

function IconDatabase() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <ellipse cx="24" cy="12" rx="16" ry="6" stroke="#007caa" strokeWidth="2.5"/>
      <path d="M8 12v8c0 3.314 7.163 6 16 6s16-2.686 16-6v-8" stroke="#007caa" strokeWidth="2.5" fill="none"/>
      <path d="M8 20v8c0 3.314 7.163 6 16 6s16-2.686 16-6v-8" stroke="#007caa" strokeWidth="2.5" fill="none"/>
    </svg>
  )
}
function IconChart() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="28" width="8" height="12" rx="2" stroke="#007caa" strokeWidth="2.5"/>
      <rect x="20" y="18" width="8" height="22" rx="2" stroke="#007caa" strokeWidth="2.5"/>
      <rect x="32" y="10" width="8" height="30" rx="2" stroke="#007caa" strokeWidth="2.5"/>
    </svg>
  )
}
function IconHome() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M6 22L24 8l18 14" stroke="#007caa" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M10 19v19a2 2 0 002 2h8v-9h8v9h8a2 2 0 002-2V19" stroke="#007caa" strokeWidth="2.5" strokeLinejoin="round"/>
    </svg>
  )
}
function IconCheck({ white = false }: { white?: boolean }) {
  const c = white ? '#fff' : '#007caa'
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <polyline points="3,9 7,13 15,5" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function IconPeople() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="20" cy="18" r="7" stroke="white" strokeWidth="2"/>
      <path d="M6 44c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="38" cy="20" r="5" stroke="white" strokeWidth="2"/>
      <path d="M38 32c5.523 0 10 4.477 10 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}
function IconHouseDoc() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <path d="M8 26L28 10l20 16" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M13 23v21a2 2 0 002 2h10v-10h6v10h10a2 2 0 002-2V23" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="32" y="30" width="14" height="16" rx="2" stroke="white" strokeWidth="1.5"/>
      <line x1="35" y1="35" x2="43" y2="35" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="35" y1="39" x2="43" y2="39" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
function IconStar() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <path d="M28 10l4.9 10.2 11.1 1.6-8 7.9 1.9 11.1L28 35.4l-9.9 5.4 1.9-11.1-8-7.9 11.1-1.6L28 10z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function ArcachonPage() {
  return (
    <main>
      <RevealOnScroll />

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="reveal bg-gradient-to-br from-[#007caa] to-[#17a3b5] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
              Estimation location de vacances à Arcachon : calculez votre potentiel locatif
            </h1>
            <p className="text-white mb-4 leading-relaxed">
              Vous possédez un appartement ou une maison à Arcachon et vous souhaitez connaître son potentiel en location saisonnière ?<br />
              Grâce à notre outil d&apos;estimation de location de vacances à Arcachon, obtenez en quelques clics une <strong>simulation fiable de vos revenus locatifs</strong>, basée sur les données du marché local.
            </p>
            <p className="text-white mb-8 leading-relaxed">
              Que votre bien soit situé en centre-ville, près des plages, au Moulleau ou autour du Bassin d&apos;Arcachon, notre estimateur vous aide à <strong>fixer le bon prix de location saisonnière</strong> et à maximiser votre rentabilité.
            </p>
            <a href="#estimateur" className="inline-block bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-8 py-3 rounded-full transition-colors btn-shimmer-auto glow-pulse">
              J&apos;estime mes revenus à Arcachon
            </a>
          </div>
          <div className="flex-1 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://estimate.rentals/wp-content/uploads/2026/02/estimateur-location-vacances-arcachon-768x768.webp"
              alt="Estimateur location de vacances à Arcachon"
              className="rounded-2xl shadow-xl w-full max-w-md object-cover float"
            />
          </div>
        </div>
      </section>

      {/* ── 2. ESTIMATEUR ───────────────────────────────────────────────── */}
      <section id="estimateur" className="reveal py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#007caa] mb-8 text-center">
            Estimez gratuitement votre location saisonnière à Arcachon
          </h2>
          <EstimateWidget />
        </div>
      </section>

      {/* ── 3. VOTRE ESTIMATION ─────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#007caa] mb-6">
            Votre estimation de location de vacances à Arcachon
          </h2>
          <p className="text-gray-700 mb-10 leading-relaxed">
            À Arcachon, le <strong>potentiel locatif</strong> varie fortement selon les secteurs et les usages. Un bien situé en centre-ville, près de la gare ou des plages, ne présente pas les mêmes perspectives qu&apos;une location dans la <strong>Ville d&apos;Hiver</strong>, aux <strong>Abatilles</strong> ou dans le <strong>quartier de l&apos;Aiguillon</strong>. Avec <a href="#estimateur" className="text-[#007caa] underline">l&apos;estimateur d&apos;Estimate Rentals</a>, positionnez votre logement dans son contexte local et évaluez avec précision les opportunités réelles de la location de vacances à Arcachon.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { Icon: IconCheck, label: 'Gratuit, instantané et sans engagement' },
              { Icon: IconDatabase, label: "Basé sur des données de marché locales d'Arcachon (taux d'occupation, prix moyens, concurrence)." },
              { Icon: IconHome, label: 'Conçu pour les propriétaires souhaitant se lancer en location de courte durée' },
            ].map(({ Icon, label }, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center w-16 h-16"><Icon /></div>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. POURQUOI ESTIMER ─────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#007caa] mb-6">
            Pourquoi estimer le prix de votre location de vacances à Arcachon ?
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Pour estimer le prix d&apos;une location saisonnière, il est nécessaire d&apos;analyser plusieurs éléments qui influencent directement la demande et les tarifs pratiqués. Une estimation fiable repose sur une combinaison de données de marché et des caractéristiques propres à votre logement, notamment :
          </p>
          <ul className="space-y-4">
            {[
              "L'emplacement du bien, selon sa proximité avec les plages, le centre-ville ou les zones touristiques ;",
              "Le type de logement et sa capacité, comme la surface, le nombre de chambres et le nombre de couchages ;",
              "Les équipements et prestations, tels qu'un extérieur, un parking, une piscine ou une connexion internet ;",
              "La période de location, avec des prix qui varient fortement entre haute et basse saison ;",
              "Les prix réellement pratiqués sur le marché local, observés sur les plateformes de location saisonnière.",
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3">
                <IconCheck />
                <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-gray-700 leading-relaxed">
            À Arcachon, une surestimation peut entraîner des périodes de vacance importantes, tandis qu&apos;un prix trop bas peut réduire inutilement votre rentabilité.
          </p>
        </div>
      </section>

      {/* ── 5. PRIX MOYEN ───────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#007caa] mb-10">
            Prix moyen d&apos;une location de vacances à Arcachon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                Icon: IconDatabase,
                title: "Données du marché de la location saisonnière à Arcachon",
                content: <p className="text-gray-700 text-sm leading-relaxed">Pour réaliser une <strong>estimation fiable d&apos;une location de vacances à Arcachon</strong>, il est indispensable de s&apos;appuyer sur les <strong>données réelles du marché local</strong>. Arcachon bénéficie d&apos;une forte attractivité touristique, avec une demande soutenue tout au long de l&apos;année et des pics marqués en période estivale.</p>,
              },
              {
                Icon: IconChart,
                title: "Prix moyen d'une location de vacances à Arcachon",
                content: (<>
                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">À Arcachon, le <strong>prix moyen d&apos;une location saisonnière</strong> s&apos;établit autour de <strong>130 € par nuit</strong>. Ce tarif varie fortement selon la saison :</p>
                  <ul className="space-y-1 text-sm text-gray-700 list-disc list-inside">
                    <li><strong>Haute saison (juillet – août)</strong> : jusqu&apos;à <strong>190–195 € par nuit</strong></li>
                    <li><strong>Basse saison</strong> : autour de <strong>120–125 € par nuit</strong></li>
                  </ul>
                </>),
              },
              {
                Icon: IconChart,
                title: "Taux d'occupation moyen et rentabilité locative",
                content: (<>
                  <p className="text-gray-700 text-sm mb-2 leading-relaxed">Taux d&apos;occupation estimé entre <strong>53 % et 54 %</strong>, soit environ <strong>190 nuits louées par an</strong>. Le <strong>revenu locatif annuel moyen</strong> est estimé autour de <strong>24 000 à 25 000 € par an</strong>.</p>
                  <ul className="text-[#007caa] text-sm space-y-1 list-disc list-inside">
                    <li>les biens proches des plages</li>
                    <li>les logements avec extérieur</li>
                    <li>les biens bien notés sur les plateformes</li>
                  </ul>
                </>),
              },
              {
                Icon: IconHome,
                title: "Revenus locatifs en haute saison à Arcachon",
                content: <p className="text-gray-700 text-sm leading-relaxed">La période <strong>juin–septembre</strong> concentre une grande partie du chiffre d&apos;affaires annuel. Une location peut générer en moyenne <strong>2 700 à 2 900 € de revenus mensuels</strong> sur cette période, selon le type de bien et son emplacement.</p>,
              },
            ].map(({ Icon, title, content }, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="w-14 h-14"><Icon /></div>
                <h3 className="text-base font-bold text-gray-900">{title}</h3>
                <div>{content}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. AIRBNB ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#007caa] mb-6">
            Estimation Airbnb et location courte durée à Arcachon
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">Arcachon fait partie des <strong>destinations les plus recherchées du littoral atlantique</strong> pour la location courte durée.</p>
          <ul className="space-y-2 mb-6">
            {['la concurrence locale', 'la réglementation en vigueur', 'la durée maximale de location', "les attentes des voyageurs (équipements, standing)"].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#007caa] flex-shrink-0" />{item}
              </li>
            ))}
          </ul>
          <p className="text-gray-700 text-sm leading-relaxed">Notre simulateur vous aide à <strong>évaluer le potentiel Airbnb de votre bien</strong> tout en restant aligné avec le marché réel.</p>
        </div>
      </section>

      {/* ── 7. LÉGISLATION ──────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#007caa] mb-6">
            Location de vacances : la législation à Arcachon
          </h2>
          <p className="text-gray-700 leading-relaxed">
            À Arcachon, depuis le 1<sup>er</sup> mai 2024, toute location de courte durée, y compris dans une <strong>résidence principale</strong>, exige un <strong>numéro d&apos;enregistrement à 13 chiffres</strong>. Les résidences secondaires et principales ont l&apos;obligation de déposer une <strong>demande d&apos;autorisation de changement d&apos;usage</strong> avant de proposer le logement en location saisonnière. La durée d&apos;une résidence principale à Arcachon ne doit pas dépasser les <strong>90 jours</strong>.
          </p>
        </div>
      </section>

      {/* ── 8. POURQUOI ESTIMATE.RENTALS ─────────────────────────────────── */}
      <section className="py-16 px-4 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-[#007caa] mb-6">
              Pourquoi utiliser estimate.rentals quand on est propriétaire à Arcachon ?
            </h2>
            <ul className="space-y-4">
              {[
                { title: 'Optimisez vos revenus', text: 'découvrez le vrai potentiel locatif de votre bien et fixez le bon prix.' },
                { title: 'Gagnez du temps', text: "ne perdez pas des heures à comparer, notre outil s'occupe de l'analyse pour vous." },
                { title: 'Sérénité totale', text: 'nous vous mettons en relation avec des agences locales fiables qui peuvent gérer toute la location à votre place.' },
                { title: 'Des conseils personnalisés', text: "bénéficiez de l'expertise de professionnels de la location saisonnière et maximisez vos revenus en toute simplicité." },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <IconCheck />
                  <p className="text-gray-700 text-sm leading-relaxed"><strong>{item.title}</strong> : {item.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://estimate.rentals/wp-content/uploads/2025/09/Pourquoi-utiliser-estimate.rentals-quand-on-est-proprietaire-768x768.webp"
              alt="Pourquoi utiliser estimate.rentals quand on est propriétaire à Arcachon"
              className="rounded-2xl shadow-xl w-full max-w-md object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── 9. RÉSEAU DE PROS ────────────────────────────────────────────── */}
      <section className="mesh-gradient py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Un réseau de professionnels à votre service</h2>
          <p className="text-white/80 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            Louer en location saisonnière à Arcachon demande de l&apos;<strong className="text-white">organisation</strong> et de l&apos;<strong className="text-white">investissement</strong>. Gagnez en <strong className="text-white">sérénité</strong> et en <strong className="text-white">rentabilité</strong> en <strong className="text-white">déléguant la gestion locative</strong> à des <strong className="text-white">professionnels de l&apos;immobilier</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-10">
            {[
              { Icon: IconPeople, text: 'Multidiffusion de votre annonce sur Airbnb, Booking, Abritel et plus de 15 revendeurs en ligne.' },
              { Icon: IconHouseDoc, text: 'Optimisation des tarifs pour maximiser vos revenus' },
              { Icon: IconStar, text: "Respect des obligations légales à Arcachon : déclarations, taxes de séjour, normes de sécurité…" },
            ].map(({ Icon, text }, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 flex items-center justify-center"><Icon /></div>
                <p className="text-white font-semibold text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="#estimateur" className="inline-block bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-8 py-3 rounded-full transition-colors">
              Trouvez un professionnel à Arcachon
            </a>
          </div>
        </div>
      </section>

      {/* ── 10. FAQ ─────────────────────────────────────────────────────── */}
      <ArcachonFaq />

      {/* ── 11. CTA FINAL ───────────────────────────────────────────────── */}
      <section className="py-10 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#007caa] to-[#17a3b5] rounded-2xl px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-2xl font-bold text-white leading-snug">
              Envie d&apos;estimer votre location de vacances à Arcachon ?
            </h2>
            <a href="/demander-une-demo" className="flex-shrink-0 bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-8 py-3 rounded-full transition-colors whitespace-nowrap">
              Demander une démo
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
