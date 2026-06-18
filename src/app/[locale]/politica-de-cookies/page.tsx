import { useTranslations } from 'next-intl'

export default function CookiesPage() {
  const t = useTranslations('cookies')
  return (
    <div className="py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{t('title')}</h1>
        <h2>¿Qué es una cookie?</h2>
        <p>Una cookie es un pequeño archivo de texto almacenado en su dispositivo cuando visita un sitio web.</p>
        <h2>Cookies utilizadas</h2>
        <ul>
          <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento del sitio.</li>
          <li><strong>Cookies analíticas:</strong> Nos ayudan a entender cómo utiliza el sitio.</li>
          <li><strong>Cookies de personalización:</strong> Recuerdan sus preferencias de idioma y navegación.</li>
        </ul>
        <h2>Gestionar sus cookies</h2>
        <p>Puede configurar su navegador para rechazar las cookies. Tenga en cuenta que esto puede afectar ciertas funciones del sitio.</p>
      </div>
    </div>
  )
}
