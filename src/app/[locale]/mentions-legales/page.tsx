import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { LexicalRenderer } from '@/components/LexicalRenderer'

export default async function LegalPage() {
  const t = await getTranslations('legal')

  let cmsContent: any = null
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'mentions-legales' } },
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
            <h2>Éditeur du site</h2>
            <p>Estimate Rentals SAS<br />Siège social : France<br />Email : contact@estimate.rentals</p>
            <h2>Hébergement</h2>
            <p>Le site est hébergé par Vercel Inc., 340 Pine Street, Suite 900, San Francisco, CA 94104, USA.</p>
            <h2>Propriété intellectuelle</h2>
            <p>L&apos;ensemble du contenu de ce site est la propriété exclusive d&apos;Estimate Rentals. Toute reproduction est interdite sans autorisation préalable.</p>
            <h2>Données personnelles</h2>
            <p>Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Contactez-nous à privacy@estimate.rentals.</p>
          </>
        )}
      </div>
    </div>
  )
}
