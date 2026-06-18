import { getLocale } from 'next-intl/server'
import LocationPageTemplate from '@/components/LocationPageTemplate'

export default async function Page() {
  const locale = await getLocale()
  return <LocationPageTemplate city="Menton" locale={locale} />
}
