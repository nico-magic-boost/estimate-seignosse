'use client'

import { useState } from 'react'

function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <polyline points="3,9 7,13 15,5" stroke="#007caa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

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
    a: "Moins de 2 minutes : vous renseignez les infos de votre bien, et vous obtenez une estimation instantanée.",
  },
  {
    q: "Puis-je être accompagné après l'estimation ?",
    a: "Bien sûr ! Nos conseillers peuvent vous aider à trouver un professionnel proche de chez vous. Vous pourrez ainsi mettre en place une stratégie tarifaire et faites gérer la location de votre bien de A à Z.",
  },
  {
    q: "L'estimation est-elle valable pour tous les types de biens à Arcachon ?",
    a: "Oui, que vous ayez un appartement, une maison, une villa ou un studio, notre outil s'adapte à tous les types de logements disponibles à Arcachon et dans le Bassin d'Arcachon.",
  },
]

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full flex items-center gap-3 px-5 py-4 text-left cursor-pointer font-medium text-[#007caa] text-sm hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <IconCheck />
        {question}
      </button>
      {open && (
        <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 ml-8">
          {answer}
        </p>
      )}
    </div>
  )
}

export function ArcachonFaq() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-3">
        {FAQ_ITEMS.map((item, i) => (
          <FaqItem key={i} question={item.q} answer={item.a} />
        ))}
      </div>
    </section>
  )
}
