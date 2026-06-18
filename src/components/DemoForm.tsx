'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function DemoForm() {
  const t = useTranslations('demo')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-10 text-green-600 font-semibold text-lg">
        {t('success')}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('name')}</label>
        <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#007caa]" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')}</label>
        <input type="email" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#007caa]" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('company')}</label>
        <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#007caa]" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('phone')}</label>
        <input type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#007caa]" />
      </div>
      <button type="submit" className="w-full bg-[#007caa] text-white font-semibold py-3 rounded-lg hover:bg-[#005f85] transition-colors">
        {t('submit')}
      </button>
    </form>
  )
}
