'use client'

import Script from 'next/script'

interface EstimateWidgetProps {
  lang: string
}

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

export default function EstimateWidget({ lang }: EstimateWidgetProps) {
  return (
    <div suppressHydrationWarning>
      <estimate-wc
        agency-ids="PDu96z5S6eidcbpPXioKlQ%3D%3D"
        primary-color="007caa"
        secondary-color="17a3b5"
        lang={lang}
        suppressHydrationWarning
      />
      <Script
        src="https://form.estimate.rentals/estimateWebComponent.js"
        type="module"
        strategy="lazyOnload"
      />
    </div>
  )
}
