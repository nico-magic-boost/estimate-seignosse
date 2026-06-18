import { useTranslations } from 'next-intl'

export default function LegalPage() {
  const t = useTranslations('legal')
  return (
    <div className="py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{t('title')}</h1>
        <h2>Editor del sitio</h2>
        <p>Estimate Rentals SAS<br />Sede social: Francia<br />Email: contact@estimate.rentals</p>
        <h2>Alojamiento</h2>
        <p>El sitio está alojado por Vercel Inc., 340 Pine Street, Suite 900, San Francisco, CA 94104, USA.</p>
        <h2>Propiedad intelectual</h2>
        <p>Todo el contenido de este sitio es propiedad exclusiva de Estimate Rentals. Cualquier reproducción está prohibida sin autorización previa.</p>
        <h2>Datos personales</h2>
        <p>De conformidad con el RGPD, tiene derecho de acceso, rectificación y eliminación de sus datos. Contáctenos en privacy@estimate.rentals.</p>
      </div>
    </div>
  )
}
