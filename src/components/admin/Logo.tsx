import React from 'react'

export function AdminLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
        width="36"
        height="36"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="admin-logo-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#007caa" />
            <stop offset="100%" stopColor="#17a3b5" />
          </linearGradient>
        </defs>
        <rect width="36" height="36" rx="8" fill="url(#admin-logo-g)" />
        <text
          x="18"
          y="26"
          fontFamily="Arial, sans-serif"
          fontSize="22"
          fontWeight="700"
          fill="white"
          textAnchor="middle"
        >
          E
        </text>
      </svg>
      <div>
        <div style={{ fontWeight: 700, fontSize: '15px', color: '#007caa', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
          Estimate
        </div>
        <div style={{ fontWeight: 400, fontSize: '11px', color: '#5a8a9f', letterSpacing: '0.05em', textTransform: 'uppercase', lineHeight: 1.2 }}>
          Rentals
        </div>
      </div>
    </div>
  )
}

export default AdminLogo
