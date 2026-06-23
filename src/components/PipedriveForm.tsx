'use client'
import Script from 'next/script'
import { useState } from 'react'

export default function PipedriveForm() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Script
        src="https://webforms.pipedrive.com/f/loader"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
      />
      {!loaded && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400 gap-3">
          <svg className="animate-spin h-8 w-8 text-[#007caa]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <p className="text-sm">Chargement du formulaire…</p>
        </div>
      )}
      <div
        className="pipedriveWebForms"
        data-pd-webforms="https://webforms.pipedrive.com/f/6aUclaH7FuS0IxgpXIlaGjkSFgyPYoJLhBlGimgCsiBYzNECFUToxAwYMSA3TFsIKf"
      />
    </>
  )
}
