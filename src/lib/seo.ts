const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://estimate.location-seignosse.fr'

export { SITE_URL }

export function canonical(locale: string, path: string) {
  return `${SITE_URL}/${locale}${path}`
}

// hreflang alternates for a given set of locale→path mappings
export function hreflang(paths: Record<string, string>) {
  return {
    languages: Object.fromEntries(
      Object.entries(paths).map(([locale, path]) => [
        locale,
        `${SITE_URL}/${locale}${path}`,
      ])
    ) as Record<string, string>,
  }
}

export const robots = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
} as const

export const defaultOG = {
  siteName: 'Estimate Rentals',
  images: [
    {
      url: 'https://estimate.rentals/wp-content/uploads/2025/07/image-15.png',
      width: 1200,
      height: 630,
      alt: 'Estimate Rentals',
    },
  ],
} as const
