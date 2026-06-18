import { useTranslations } from 'next-intl'

export default function InstallPage() {
  const t = useTranslations('install')
  return (
    <div className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{t('title')}</h1>
        <p className="text-gray-600 text-center mb-10">{t('subtitle')}</p>
        <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Step 1 — Add the script</h2>
          <pre className="bg-gray-800 text-green-400 rounded-lg p-4 overflow-x-auto text-sm mb-6">
            {`<script type="module" src="https://form.estimate.rentals/estimateWebComponent.js"></script>`}
          </pre>
          <h2 className="text-xl font-semibold mb-4">Step 2 — Place the tag</h2>
          <pre className="bg-gray-800 text-green-400 rounded-lg p-4 overflow-x-auto text-sm">
            {`<estimate-wc\n  agency-ids="YOUR_ID"\n  primary-color="007caa"\n  secondary-color="17a3b5"\n  lang="en"\n/>`}
          </pre>
        </div>
      </div>
    </div>
  )
}
