'use client'
import Script from 'next/script'
import { useLocale } from 'next-intl'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'subscription-tunnel-wc': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        lang?: string
      }, HTMLElement>
    }
  }
}

export default function SubscriptionWidget() {
  const locale = useLocale()

  return (
    <>
      <Script
        src="https://form.estimate.rentals/subscriptionTunnelWebComponent.js"
        strategy="afterInteractive"
        type="module"
      />
      <div id="inscription" />
      <div style={{ minHeight: '600px' }}>
        {/* @ts-ignore */}
        <subscription-tunnel-wc lang={locale} />
      </div>
    </>
  )
}
