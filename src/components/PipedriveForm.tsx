'use client'
import { useEffect } from 'react'

export default function PipedriveForm() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://webforms.pipedrive.com/f/loader'
    document.body.appendChild(script)
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script)
    }
  }, [])

  return (
    <div
      className="pipedriveWebForms"
      data-pd-webforms="https://webforms.pipedrive.com/f/6aUclaH7FuS0IxgpXIlaGjkSFgyPYoJLhBlGimgCsiBYzNECFUToxAwYMSA3TFsIKf"
      suppressHydrationWarning
    />
  )
}
