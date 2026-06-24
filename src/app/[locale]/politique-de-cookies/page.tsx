import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { LexicalRenderer } from '@/components/LexicalRenderer'

export default async function CookiesPage() {
  const t = await getTranslations('cookies')

  let cmsContent: any = null
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'politique-de-cookies' } },
      limit: 1,
    })
    cmsContent = result.docs[0]?.content ?? null
  } catch {
    // DB unavailable at build time — fall through to hardcoded content
  }

  return (
    <div className="py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{t('title')}</h1>
        {cmsContent ? (
          <LexicalRenderer content={cmsContent} />
        ) : (
          <>
            <h2>Qu&apos;est-ce qu&apos;un cookie ?</h2>
            <p>Un cookie est un petit fichier texte stocké sur votre appareil lors de la visite d&apos;un site web.</p>
            <h2>Cookies utilisés</h2>
            <ul>
              <li><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site.</li>
              <li><strong>Cookies analytiques :</strong> Nous aident à comprendre comment vous utilisez le site.</li>
              <li><strong>Cookies de personnalisation :</strong> Mémorisent vos préférences de langue et de navigation.</li>
            </ul>
            <h2>Gérer vos cookies</h2>
            <p>Vous pouvez configurer votre navigateur pour refuser les cookies. Notez que cela peut affecter certaines fonctionnalités du site.</p>
          </>
        )}
      </div>
    </div>
  )
}
