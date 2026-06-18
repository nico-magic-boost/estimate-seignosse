'use client'
import { useEffect } from 'react'
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

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://form.estimate.rentals/estimateWebComponent.js'
    document.head.appendChild(script)
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <div suppressHydrationWarning>
      {/* @ts-ignore */}
      <estimate-wc
        agency-ids="PDu96z5S6eidcbpPXioKlQ%3D%3D"
        primary-color="007caa"
        secondary-color="17a3b5"
        lang={locale}
        suppressHydrationWarning
      />
    </div>
  )
}
