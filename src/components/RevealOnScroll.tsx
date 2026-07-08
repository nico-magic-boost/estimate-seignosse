'use client'

import { useEffect } from 'react'

export default function RevealOnScroll() {
  useEffect(() => {
    // Inject non-critical animation CSS after initial render (non-blocking)
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/animations.css'
    document.head.appendChild(link)

    const selector = '.reveal, .reveal-left, .reveal-right, .reveal-stagger'
    const elements = document.querySelectorAll<HTMLElement>(selector)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
