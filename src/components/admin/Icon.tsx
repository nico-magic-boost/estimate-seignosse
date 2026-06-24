import React from 'react'

export function AdminIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width="28"
      height="28"
    >
      <defs>
        <linearGradient id="admin-icon-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#007caa" />
          <stop offset="100%" stopColor="#17a3b5" />
        </linearGradient>
      </defs>
      <rect width="28" height="28" rx="6" fill="url(#admin-icon-g)" />
      <text
        x="14"
        y="20"
        fontFamily="Arial, sans-serif"
        fontSize="17"
        fontWeight="700"
        fill="white"
        textAnchor="middle"
      >
        E
      </text>
    </svg>
  )
}

export default AdminIcon
