import { useTranslations } from 'next-intl'
import RevealOnScroll from '@/components/RevealOnScroll'

export default function InstallPage() {
  const t = useTranslations('install')
  return (
    <div className="py-16 px-4">
      <RevealOnScroll />
      <div className="max-w-3xl mx-auto">
        <div className="reveal">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            <span className="gradient-text">{t('title')}</span>
          </h1>
          <p className="text-gray-700 text-center mb-10">{t('subtitle')}</p>
        </div>
        <div className="reveal bg-gray-50 rounded-xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Paso 1 — Añadir el script</h2>
          <pre
            className="bg-gray-800 text-green-400 rounded-lg p-4 overflow-x-auto text-sm mb-6"
            aria-label="Código HTML para añadir el script del estimador"
          >
            {`<script type="module" src="https://form.estimate.rentals/estimateWebComponent.js"></script>`}
          </pre>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Paso 2 — Colocar la etiqueta</h2>
          <pre
            className="bg-gray-800 text-green-400 rounded-lg p-4 overflow-x-auto text-sm"
            aria-label="Código HTML para insertar el componente estimador en su página"
          >
            {`<estimate-wc\n  agency-ids="SU_ID"\n  primary-color="007caa"\n  secondary-color="17a3b5"\n  lang="es"\n/>`}
          </pre>
        </div>
      </div>
    </div>
  )
}
