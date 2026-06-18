import { useTranslations } from 'next-intl'

export default function CookiesPage() {
  const t = useTranslations('cookies')
  return (
    <div className="py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{t('title')}</h1>
        <h2>What is a cookie?</h2>
        <p>A cookie is a small text file stored on your device when you visit a website.</p>
        <h2>Cookies used</h2>
        <ul>
          <li><strong>Essential cookies:</strong> Necessary for the site to function.</li>
          <li><strong>Analytical cookies:</strong> Help us understand how you use the site.</li>
          <li><strong>Personalization cookies:</strong> Remember your language and navigation preferences.</li>
        </ul>
        <h2>Managing your cookies</h2>
        <p>You can configure your browser to refuse cookies. Note that this may affect certain features of the site.</p>
      </div>
    </div>
  )
}
