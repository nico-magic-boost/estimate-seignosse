import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'estimate.rentals',
        pathname: '/wp-content/uploads/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://form.estimate.rentals https://webforms.pipedrive.com",
      "style-src 'self' 'unsafe-inline' https://form.estimate.rentals",
      "img-src 'self' data: blob: https://estimate.rentals https://form.estimate.rentals https://webforms.pipedrive.com",
      "font-src 'self' https://form.estimate.rentals",
      "connect-src 'self' https://form.estimate.rentals https://webforms.pipedrive.com https://api.estimate.rentals",
      "frame-src https://webforms.pipedrive.com https://form.estimate.rentals",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://webforms.pipedrive.com https://form.estimate.rentals",
      "upgrade-insecure-requests",
    ].join('; ')

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default withPayload(withNextIntl(nextConfig))
