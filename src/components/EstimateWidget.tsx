'use client'
import Script from 'next/script'
import { useLocale } from 'next-intl'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'estimate-wc': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        'agency-ids'?: string
        'primary-color'?: string
        'secondary-color'?: string
        lang?: string
      }, HTMLElement>
    }
  }
}

export default function EstimateWidget() {
  const locale = useLocale()

  return (
    <>
      <Script
        src="https://form.estimate.rentals/estimateWebComponent.js"
        strategy="afterInteractive"
        type="module"
      />
      <div style={{ minHeight: '480px' }}>
        {/* @ts-ignore */}
        <estimate-wc
          agency-ids={process.env.NEXT_PUBLIC_AGENCY_ID ?? 'PDu96z5S6eidcbpPXioKlQ%3D%3D'}
          primary-color="007caa"
          secondary-color="17a3b5"
          lang={locale}
        />
      </div>
    </>
  )
}
