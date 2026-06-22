'use client'
import { useEffect } from 'react'
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

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://form.estimate.rentals/subscriptionTunnelWebComponent.js'
    document.head.appendChild(script)
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <div suppressHydrationWarning>
      <div id="inscription" />
      {/* @ts-ignore */}
      <subscription-tunnel-wc lang={locale} suppressHydrationWarning />
    </div>
  )
}
