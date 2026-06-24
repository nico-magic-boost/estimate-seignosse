import React from 'react'

export function BeforeLogin() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #007caa 0%, #17a3b5 100%)',
      borderRadius: '12px',
      padding: '20px 24px',
      marginBottom: '20px',
      textAlign: 'center',
    }}>
      <p style={{
        color: 'rgba(255,255,255,0.9)',
        fontSize: '13px',
        margin: 0,
        lineHeight: 1.6,
      }}>
        Back office <strong style={{ color: '#fff' }}>Estimate Rentals</strong><br />
        Espace réservé aux administrateurs.
      </p>
    </div>
  )
}

export default BeforeLogin
