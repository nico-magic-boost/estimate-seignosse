'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://estimate.rentals'

export function PillarPagePreview() {
  const slug = useFormFields(([fields]) => fields.slug?.value as string | undefined)

  if (!slug) {
    return (
      <div style={{ fontSize: 12, color: '#999', fontStyle: 'italic' }}>
        Saisissez un slug pour prévisualiser
      </div>
    )
  }

  const url = `${SITE_URL}/fr/${slug}`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{
        background: '#f5f9fb',
        border: '1px solid #cce8f0',
        borderRadius: 6,
        padding: '8px 10px',
        fontSize: 12,
        color: '#007caa',
        wordBreak: 'break-all',
        fontFamily: 'monospace',
      }}>
        /fr/{slug}
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: '#007caa',
          color: '#fff',
          borderRadius: 6,
          padding: '7px 12px',
          fontSize: 12,
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 6h10M6 1l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Voir la page
      </a>
    </div>
  )
}

export default PillarPagePreview
