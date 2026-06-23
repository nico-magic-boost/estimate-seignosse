import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { robots, defaultOG, SITE_URL } from '@/lib/seo'
import '../globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#007caa',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Estimate Rentals',
    default: 'Estimate Rentals — Estimateur de revenus locatifs saisonniers',
  },
  robots,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: defaultOG.siteName,
    images: [...defaultOG.images],
  },
  twitter: {
    card: 'summary_large_image',
    images: defaultOG.images[0].url,
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://estimate.rentals" />
        <link rel="preconnect" href="https://form.estimate.rentals" />
        <link rel="preconnect" href="https://webforms.pipedrive.com" />
        <link rel="dns-prefetch" href="https://estimate.rentals" />
        <link rel="dns-prefetch" href="https://form.estimate.rentals" />
        <link rel="dns-prefetch" href="https://webforms.pipedrive.com" />
      </head>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#007caa] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
          >
            Aller au contenu principal
          </a>
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

