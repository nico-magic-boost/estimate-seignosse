'use client'

import Script from 'next/script'

interface SubscriptionWidgetProps {
  lang: string
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'subscription-tunnel-wc': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        lang?: string
      }, HTMLElement>
    }
  }
}

export default function SubscriptionWidget({ lang }: SubscriptionWidgetProps) {
  return (
    <div suppressHydrationWarning>
      <div id="inscription" suppressHydrationWarning />
      <subscription-tunnel-wc lang={lang} suppressHydrationWarning />
      <Script
        src="https://form.estimate.rentals/subscriptionTunnelWebComponent.js"
        type="module"
        strategy="lazyOnload"
      />
    </div>
  )
}
