import { useTranslations } from 'next-intl'

export default function InstallPage() {
  const t = useTranslations('install_page')
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('subtitle')}</p>
      </div>
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Code d&apos;intégration</h2>
        <pre className="bg-gray-900 text-green-400 p-6 rounded-xl overflow-x-auto text-sm">
          {`<estimate-wc
  agency-ids="VOTRE_ID"
  primary-color="007caa"
  secondary-color="17a3b5"
  lang="fr">
</estimate-wc>
<script type="module"
  src="https://form.estimate.rentals/estimateWebComponent.js">
</script>`}
        </pre>
      </div>
    </div>
  )
}
