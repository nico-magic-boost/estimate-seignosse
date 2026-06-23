import PipedriveForm from '@/components/PipedriveForm'

const reasons = [
  {
    title: 'Maximisation de vos profits',
    text: 'notre solution révèle vos vrais revenus nets, en tenant compte de chaque frais caché.',
  },
  {
    title: 'Transparence totale',
    text: 'fini les estimations floues, vous obtenez une vision transparente et fiable de vos gains.',
  },
  {
    title: 'Respect des réglementations locales',
    text: "l'outil intègre automatiquement les règles locales pour des calculs toujours conformes.",
  },
  {
    title: 'Précision',
    text: 'grâce à des données reconnues et multiples, nous vous offrons l'estimateur le plus précis du marché.',
  },
]

const testimonials = [
  {
    quote: '« Grâce à la démo, j\'ai tout de suite compris combien je pouvais réellement gagner avec mon appartement. Les frais cachés m\'échappaient avant, maintenant je maîtrise enfin mes revenus. »',
    name: 'Paul-H.',
    role: 'Propriétaire à Annecy',
  },
  {
    quote: '« J\'ai adoré la transparence ! La démo m\'a montré noir sur blanc les revenus nets. C\'est exactement l\'outil qui m\'a manqué pour générer des mandats. »',
    name: 'Benjamin D.',
    role: "Directeur d'agence à Biarritz",
  },
]

const faq = [
  { q: 'En quoi l\'estimateur en ligne Estimate.rentals est-il différent des autres outils du marché ?', a: 'Notre estimateur est le premier à intégrer à la fois les frais de gestion, les coûts de distribution, les intermédiaires et les réglementations locales. Le résultat affiché est un revenu net propriétaire, et non un simple revenu brut.' },
  { q: 'Que vais-je apprendre pendant la démo ?' },
  { q: 'Combien de temps dure une démo ?' },
  { q: "L'outil prend-il en compte les réglementations locales ?" },
  { q: "Puis-je voir l'estimation pour plusieurs biens ?" },
]

export default function DemoPage() {
  return (
    <div>
      {/* Title */}
      <section className="pt-12 pb-4 px-4 text-center bg-white">
        <h1 className="text-2xl md:text-3xl font-bold text-[#007caa]">Demander une démo</h1>
      </section>

      {/* 2-col: pitch + form */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-start">
          {/* Left: pitch */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">
              Vous êtes à quelques clics de transformer vos estimations de location de vacances
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Profitez d&apos;un outil complet pour gérer les estimations de vos locations saisonnières.
              Indiquez simplement vos coordonnées et l&apos;un de nos experts vous contactera rapidement
              pour organiser votre démo.
            </p>
            <hr className="border-gray-200 mb-6" />
            <h3 className="text-[#007caa] font-bold mb-4">Pourquoi choisir Estimate.rentals ?</h3>
            <ul className="space-y-4">
              {reasons.map((r) => (
                <li key={r.title} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="text-[#007caa] mt-0.5 flex-shrink-0">✓</span>
                  <span><strong>{r.title}</strong> : {r.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Pipedrive form */}
          <div className="flex-1 border border-gray-200 rounded-2xl p-6 shadow-sm">
            <PipedriveForm />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Ils ont testé et approuvé Estimate.rentals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="border border-gray-200 rounded-xl p-6">
                <p className="text-sm text-gray-700 leading-relaxed italic mb-4">{t.quote}</p>
                <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto space-y-3">
          {faq.map((item) => (
            <details key={item.q} className="border border-gray-200 rounded-xl bg-white">
              <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer font-medium text-gray-800 text-sm list-none">
                <span className="text-[#007caa] flex-shrink-0">✓</span>
                {item.q}
              </summary>
              {item.a && <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{item.a}</p>}
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
