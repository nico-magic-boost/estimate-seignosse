'use client'
import Script from 'next/script'

export default function PipedriveForm() {
  return (
    <>
      <Script
        src="https://webforms.pipedrive.com/f/loader"
        strategy="afterInteractive"
      />
      <div style={{ minHeight: '420px' }}>
        <div
          className="pipedriveWebForms"
          data-pd-webforms="https://webforms.pipedrive.com/f/6aUclaH7FuS0IxgpXIlaGjkSFgyPYoJLhBlGimgCsiBYzNECFUToxAwYMSA3TFsIKf"
        />
      </div>
    </>
  )
}
