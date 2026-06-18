import { useTranslations } from 'next-intl'

export default function DemoPage() {
  const t = useTranslations('demo_page')
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('subtitle')}</p>
      </div>
      <form className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col gap-5 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
          <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#007caa]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email professionnel</label>
          <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#007caa]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Société</label>
          <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#007caa]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message (optionnel)</label>
          <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#007caa]" />
        </div>
        <button type="submit" className="bg-[#007caa] text-white font-semibold py-3 rounded-xl hover:bg-[#006a93] transition-colors">
          Envoyer ma demande
        </button>
      </form>
    </div>
  )
}
