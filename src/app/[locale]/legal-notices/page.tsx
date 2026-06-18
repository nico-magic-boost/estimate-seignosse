import { useTranslations } from 'next-intl'

export default function LegalPage() {
  const t = useTranslations('legal')
  return (
    <div className="py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{t('title')}</h1>
        <h2>Publisher</h2>
        <p>Estimate Rentals SAS<br />Registered office: France<br />Email: contact@estimate.rentals</p>
        <h2>Hosting</h2>
        <p>This site is hosted by Vercel Inc., 340 Pine Street, Suite 900, San Francisco, CA 94104, USA.</p>
        <h2>Intellectual property</h2>
        <p>All content on this site is the exclusive property of Estimate Rentals. Any reproduction is prohibited without prior authorization.</p>
        <h2>Personal data</h2>
        <p>In accordance with GDPR, you have the right to access, rectify and delete your data. Contact us at privacy@estimate.rentals.</p>
      </div>
    </div>
  )
}
