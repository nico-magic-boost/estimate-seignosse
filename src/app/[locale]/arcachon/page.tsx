'use client'

import EstimateWidget from '@/components/EstimateWidget'
import { useState } from 'react'

const FAQ_ITEMS = [
  {
    q: "L'estimation à Arcachon est-elle vraiment gratuite ?",
    a: "Oui, l'estimation est totalement gratuite et sans engagement ni obligation. Vous pouvez l'utiliser aussi souvent que vous le souhaitez.",
  },
  {
    q: "Dois-je obligatoirement confier mon bien à une agence à Arcachon ?",
    a: "Pas du tout ! Vous pouvez utiliser uniquement l'estimation, ou choisir d'être mis en relation avec un professionnel si vous le souhaitez.",
  },
  {
    q: "Sur quelles données repose l'estimation ?",
    a: "Nous utilisons des données de marché : prix moyens pratiqués sur Airbnb, Booking, Abritel, taux d'occupation à Arcachon, saisonnalité et caractéristiques de votre bien.",
  },
  {
    q: "Combien de temps prend l'estimation ?",
    a: "Quelques minutes seulement ! Notre outil analyse votre bien en temps réel et vous fournit une estimation personnalisée instantanément.",
  },
  {
    q: "L'estimation est-elle valable pour tous les types de biens à Arcachon ?",
    a: "Oui, que vous ayez un appartement, une maison, une villa ou un studio, notre outil s'adapte à tous les types de logements disponibles à Arcachon et dans le Bassin d'Arcachon.",
  },
  {
    q: "Combien de temps prend l'estimation ?",
    a: "Moins de 2 minutes : vous renseignez les infos de votre bien, et vous obtenez une estimation instantanée.",
  },
  {
    q: "Puis-je être accompagné après l'estimation ?",
    a: "Bien sûr ! Nos conseillers peuvent vous aider à trouver un professionnel proche de chez vous. Vous pourrez ainsi mettre en place une stratégie tarifaire et faites gérer la location de votre bien de A à Z.",
  },
]

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full flex items-center gap-3 px-5 py-4 text-left cursor-pointer font-medium text-gray-800 text-sm hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-[#007caa] flex-shrink-0">✔</span>
        {question}
      </button>
      {open && (
        <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
          {answer}
        </p>
      )}
    </div>
  )
}

export default function ArcachonPage() {
  return (
    <main>

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#007caa] to-[#17a3b5] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
              Estimation location de vacances à Arcachon : calculez votre potentiel locatif
            </h1>
            <p className="text-white/90 mb-4 leading-relaxed">
              Vous possédez un appartement ou une maison à Arcachon et vous souhaitez connaître son potentiel en location saisonnière ?
              <br />
              Grâce à notre outil d&apos;estimation de location de vacances à Arcachon, obtenez en quelques clics une <strong>simulation fiable de vos revenus locatifs</strong>, basée sur les données du marché local.
            </p>
            <p className="text-white/90 mb-8 leading-relaxed">
              Que votre bien soit situé en centre-ville, près des plages, au Moulleau ou autour du Bassin d&apos;Arcachon, notre estimateur vous aide à <strong>fixer le bon prix de location saisonnière</strong> et à maximiser votre rentabilité.
            </p>
            <a
              href="#estimateur"
              className="inline-block bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              J&apos;estime mes revenus à Arcachon
            </a>
          </div>
          <div className="flex-1 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/arcachon-hero.jpg"
              alt="Location de vacances à Arcachon"
              className="rounded-2xl shadow-xl w-full max-w-md object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
        </div>
      </section>

      {/* ── 2. ESTIMATION SECTION ────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#007caa] mb-6">
            Votre estimation de location de vacances à Arcachon
          </h2>
          <p className="text-gray-700 mb-10 leading-relaxed">
            À Arcachon, le <strong>potentiel locatif</strong> varie fortement selon les secteurs et les usages. Un bien situé en centre-ville, près de la gare ou des plages, ne présente pas les mêmes perspectives qu&apos;une location de vacances dans la <strong>Ville d&apos;Hiver</strong>, aux <strong>Abatilles</strong> ou dans le <strong>quartier de l&apos;Aiguillon</strong>. La saisonnalité, l&apos;accessibilité et l&apos;environnement jouent un rôle clé dans les <strong>performances locatives</strong>. Avec <a href="#estimateur" className="text-[#007caa] underline">l&apos;estimateur d&apos;Estimate Rentals</a>, positionnez votre logement dans son contexte local et évaluez avec précision les opportunités réelles de la location de vacances à Arcachon.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: '✔', title: 'Gratuit, instantané et sans engagement' },
              { icon: '🗄️', title: "Basé sur des données de marché locales d'Arcachon (taux d'occupation, prix moyens, concurrence)." },
              { icon: '🏠', title: 'Conçu pour les propriétaires souhaitant se lancer en location de courte durée' },
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <span className="text-4xl text-[#007caa]">{f.icon}</span>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">{f.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. POURQUOI ESTIMER ─────────────────────────────────────────── */}
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
              { icon: '📍', text: "L'emplacement du bien, selon sa proximité avec les plages, le centre-ville ou les zones touristiques ;" },
              { icon: '🏠', text: "Le type de logement et sa capacité, comme la surface, le nombre de chambres et le nombre de couchages ;" },
              { icon: '⚙️', text: "Les équipements et prestations, tels qu'un extérieur, un parking, une piscine ou une connexion internet ;" },
              { icon: '📅', text: "La période de location, avec des prix qui varient fortement entre haute et basse saison ;" },
              { icon: '€', text: "Les prix réellement pratiqués sur le marché local, observés sur les plateformes de location saisonnière." },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#007caa] flex-shrink-0 text-lg">{item.icon}</span>
                <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-gray-700 leading-relaxed">
            À Arcachon, une surestimation peut entraîner des périodes de vacance importantes, tandis qu&apos;un prix trop bas peut réduire inutilement votre rentabilité.
          </p>
        </div>
      </section>

      {/* ── 4. PRIX MOYEN ───────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#007caa] mb-10">
            Prix moyen d&apos;une location de vacances à Arcachon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: '🗄️',
                title: "Données du marché de la location saisonnière à Arcachon",
                content: (
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Pour réaliser une <strong>estimation fiable d&apos;une location de vacances à Arcachon</strong>, il est indispensable de s&apos;appuyer sur les <strong>données réelles du marché local</strong>. Arcachon bénéficie d&apos;une forte attractivité touristique, avec une demande soutenue tout au long de l&apos;année et des pics marqués en période estivale.
                  </p>
                ),
              },
              {
                icon: '📊',
                title: "Prix moyen d'une location de vacances à Arcachon",
                content: (
                  <>
                    <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                      À Arcachon, le <strong>prix moyen d&apos;une location saisonnière</strong> s&apos;établit autour de <strong>130 € par nuit</strong>, tous types de logements confondus.<br />
                      Ce tarif varie fortement selon la saison :
                    </p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li><strong>Haute saison (juillet – août)</strong> : jusqu&apos;à <strong>190–195 € par nuit</strong> en moyenne</li>
                      <li><strong>Basse saison</strong> : autour de <strong>120–125 € par nuit</strong></li>
                    </ul>
                    <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                      Cette saisonnalité marquée explique les écarts importants de revenus selon la période de mise en location et justifie l&apos;utilisation d&apos;un <strong>outil d&apos;estimation locative spécifique à Arcachon</strong>.
                    </p>
                  </>
                ),
              },
              {
                icon: '📊',
                title: "Taux d'occupation moyen et rentabilité locative",
                content: (
                  <>
                    <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                      Le <strong>taux d&apos;occupation moyen annuel</strong> des locations de courte durée à Arcachon est estimé entre <strong>53 % et 54 %</strong>, ce qui représente environ <strong>190 nuits louées par an</strong> pour un logement bien positionné.
                    </p>
                    <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                      Avec un tarif journalier moyen compris entre 130 € et 140 €, le <strong>revenu locatif annuel moyen</strong> d&apos;une location saisonnière à Arcachon est estimé autour de <strong>24 000 à 25 000 € par an</strong>.
                    </p>
                    <p className="text-gray-700 text-sm mb-2">Ces chiffres peuvent être significativement plus élevés pour :</p>
                    <ul className="space-y-1 text-sm text-[#007caa] list-disc list-inside">
                      <li>les biens proches des plages</li>
                      <li>les logements avec extérieur (balcon, terrasse, jardin)</li>
                      <li>les biens bien notés sur les plateformes de réservation</li>
                    </ul>
                  </>
                ),
              },
              {
                icon: '🏠',
                title: "Revenus locatifs en haute saison à Arcachon",
                content: (
                  <>
                    <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                      La période comprise entre <strong>juin et septembre</strong> concentre une grande partie du chiffre d&apos;affaires annuel.
                    </p>
                    <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                      Sur cette période, une location saisonnière à Arcachon peut générer en moyenne <strong>2 700 à 2 900 € de revenus mensuels</strong>, selon le type de bien et son emplacement.
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Cette forte rentabilité saisonnière rend l&apos;<strong>estimation précise des revenus locatifs</strong> indispensable pour fixer un prix cohérent et maximiser le taux d&apos;occupation.
                    </p>
                  </>
                ),
              },
            ].map((card, i) => (
              <div key={i} className="flex flex-col gap-4">
                <span className="text-4xl text-[#007caa]">{card.icon}</span>
                <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
                <div>{card.content}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 p-5 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2 text-sm">Pourquoi ces données sont essentielles pour votre estimation</h3>
            <p className="text-[#007caa] text-sm mb-2">Une estimation de location de vacances à Arcachon ne peut pas se baser sur un prix moyen national.</p>
            <p className="text-gray-700 text-sm mb-2">Elle doit intégrer :</p>
            <ul className="text-[#007caa] text-sm space-y-1 list-disc list-inside mb-3">
              <li>la saisonnalité locale</li>
              <li>le niveau réel des loyers observés</li>
              <li>le taux d&apos;occupation moyen</li>
              <li>la concurrence sur les plateformes de location</li>
            </ul>
            <p className="text-gray-700 text-sm leading-relaxed">
              Notre outil d&apos;estimation s&apos;appuie sur ces <strong>indicateurs du marché arcachonnais</strong> pour vous fournir une <strong>projection réaliste et personnalisée</strong> de vos revenus locatifs.
            </p>
            <p className="mt-3 text-gray-700 text-sm font-medium">
              👉 <strong>Estimez gratuitement votre location saisonnière à Arcachon</strong> et obtenez une vision claire de votre potentiel locatif.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. AIRBNB ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#007caa] mb-6">
            Estimation Airbnb et location courte durée à Arcachon
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Arcachon fait partie des <strong>destinations les plus recherchées du littoral atlantique</strong> pour la location courte durée.
          </p>
          <p className="text-[#007caa] mb-3 text-sm">Une <strong>estimation Airbnb à Arcachon</strong> doit intégrer :</p>
          <ul className="space-y-2 mb-6">
            {['la concurrence locale', 'la réglementation en vigueur', 'la durée maximale de location', "les attentes des voyageurs (équipements, standing)"].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-[#007caa] text-sm">
                <span>•</span> {item}
              </li>
            ))}
          </ul>
          <p className="text-gray-700 text-sm leading-relaxed">
            Notre simulateur vous aide à <strong>évaluer le potentiel Airbnb de votre bien</strong> tout en restant aligné avec le marché réel.
          </p>
        </div>
      </section>

      {/* ── 6. LÉGISLATION ──────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#007caa] mb-6">
            Location de vacances : la législation à Arcachon
          </h2>
          <p className="text-gray-700 leading-relaxed">
            À Arcachon, depuis le 1<sup>er</sup> mai 2024, toute location de courte durée, y compris dans une <strong>résidence principale</strong>, exige un <strong>numéro d&apos;enregistrement à 13 chiffres</strong> ; aucune annonce ne peut être diffusée sans cette référence. Les résidences secondaires et principales ont l&apos;obligation de déposer une <strong>demande d&apos;autorisation de changement d&apos;usage</strong> avant de proposer le logement en location saisonnière. La <strong>durée de la location saisonnière</strong> d&apos;une résidence principale à Arcachon ne doit pas dépasser les <strong>90 jours</strong>. Les locations de vacances de résidence secondaire ne disposent pas de limite.
          </p>
        </div>
      </section>

      {/* ── 7. POURQUOI ESTIMATE.RENTALS ──────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
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
                { title: 'Des conseils personnalisés', text: "bénéficiez de l'expertise de professionnels de la location saisonnière et maximisez vos revenus en toute simplicité.." },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#007caa] mt-0.5 flex-shrink-0">✔</span>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <strong>{item.title}</strong> : {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/keys-hand.jpg"
              alt="Propriétaire à Arcachon"
              className="rounded-2xl shadow-xl w-full max-w-md object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
        </div>
      </section>

      {/* ── 8. RÉSEAU DE PROS ────────────────────────────────────────────── */}
      <section className="mesh-gradient py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Un réseau de professionnels à votre service
          </h2>
          <p className="text-white/80 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            Louer en location saisonnière à Arcachon demande de l&apos;<strong className="text-white">organisation</strong> et de l&apos;<strong className="text-white">investissement</strong>. Gagnez en <strong className="text-white">sérénité</strong> et en <strong className="text-white">rentabilité</strong> en <strong className="text-white">déléguant la gestion locative</strong> à des <strong className="text-white">professionnels de l&apos;immobilier</strong>. Nous vous mettons en relation avec des agences locales à Arcachon, spécialisées et qui s&apos;occupent de tout.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-10">
            {[
              { icon: '👥', text: 'Multidiffusion de votre annonce sur Airbnb, Booking, Abritel et plus de 15 revendeurs en ligne.' },
              { icon: '🏠', text: 'Optimisation des tarifs pour maximiser vos revenus' },
              { icon: '⭐', text: "Respect des obligations légales à Arcachon : déclarations, taxes de séjour, normes de sécurité…" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <span className="text-5xl">{item.icon}</span>
                <p className="text-white font-semibold text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="#estimateur"
              className="inline-block bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              Trouvez un professionnel à Arcachon
            </a>
          </div>
        </div>
      </section>

      {/* ── 9. ESTIMATEUR ───────────────────────────────────────────────── */}
      <section id="estimateur" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#007caa] mb-8 text-center">
            Estimez gratuitement votre location saisonnière à Arcachon
          </h2>
          <EstimateWidget />
        </div>
      </section>

      {/* ── 10. FAQ ─────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem key={i} question={item.q} answer={item.a} />
          ))}
        </div>
      </section>

      {/* ── 11. CTA FINAL ───────────────────────────────────────────────── */}
      <section className="py-10 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#007caa] to-[#17a3b5] rounded-2xl px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-2xl font-bold text-white leading-snug">
              Envie d&apos;estimer votre location de vacances à Arcachon ?
            </h2>
            <a
              href="/demander-une-demo"
              className="flex-shrink-0 bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-8 py-3 rounded-full transition-colors whitespace-nowrap"
            >
              Demander une démo
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
