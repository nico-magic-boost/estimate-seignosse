import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function InstallPage() {
  const t = useTranslations('install')
  return (
    <div className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{t('title')}</h1>
        <p className="text-gray-600 text-center mb-10">{t('subtitle')}</p>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#007caa] text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">1</span>
              <h2 className="text-xl font-semibold text-gray-800">{t('step1Title')}</h2>
            </div>
            <pre className="bg-gray-800 text-green-400 rounded-lg p-4 overflow-x-auto text-sm">
              {`<script type="module" src="https://form.estimate.rentals/estimateWebComponent.js"></script>`}
            </pre>
          </div>

          {/* Step 2 */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#007caa] text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">2</span>
              <h2 className="text-xl font-semibold text-gray-800">{t('step2Title')}</h2>
            </div>
            <pre className="bg-gray-800 text-green-400 rounded-lg p-4 overflow-x-auto text-sm">
              {`<estimate-wc\n  agency-ids="VOTRE_ID"\n  primary-color="007caa"\n  secondary-color="17a3b5"\n  lang="fr"\n/>`}
            </pre>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#17a3b5] text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">3</span>
              <h2 className="text-xl font-semibold text-gray-800">{t('step3Title')}</h2>
            </div>
            <p className="text-gray-600 text-sm">{t('step3Desc')}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-5">Besoin d&apos;aide pour l&apos;intégration ou d&apos;un identifiant agence ?</p>
          <Link
            href="/demander-une-demo"
            className="inline-block bg-[#007caa] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#005f85] transition-colors"
          >
            Demander une démo
          </Link>
        </div>
      </div>
    </div>
  )
}
