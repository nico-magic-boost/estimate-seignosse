'use client'

import { useState } from 'react'

function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <polyline points="3,9 7,13 15,5" stroke="#007caa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

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

export default function PillarPageFaq({ items }: { items: Array<{ question: string; answer: string }> }) {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-3">
        {items.map((item, i) => (
          <FaqItem key={i} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  )
}
