'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

type Status = 'idle' | 'loading' | 'error'

export function GeneratePillarPage() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [progress, setProgress] = useState('')
  const router = useRouter()

  const cityRef = useRef<HTMLInputElement>(null)
  const keywordRef = useRef<HTMLInputElement>(null)

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    setProgress('Analyse du marché local et des données de la ville…')

    const city = cityRef.current?.value.trim() ?? ''
    if (!city) { setStatus('error'); setErrorMsg('La ville est obligatoire.'); return }

    setTimeout(() => setProgress('Génération du contenu SEO avec Claude Opus…'), 1500)
    setTimeout(() => setProgress('Structuration E-E-A-T, données marché, législation…'), 5000)
    setTimeout(() => setProgress('Création de la page pilier…'), 12000)

    try {
      const res = await fetch('/api/generate-pillar-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city,
          targetKeyword: keywordRef.current?.value.trim() || `Estimation location de vacances à ${city}`,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setStatus('error')
        setErrorMsg(data.error ?? 'Erreur inconnue.')
        return
      }

      router.push(`/admin/collections/pillar-pages/${data.pageId}`)
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message ?? 'Erreur réseau.')
    }
  }

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <button
          type="button"
          onClick={() => { setOpen(true); setStatus('idle'); setErrorMsg('') }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg, #007caa 0%, #17a3b5 100%)',
            color: '#fff', border: 'none', borderRadius: 8,
            padding: '10px 18px', fontSize: 13, fontWeight: 700,
            cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,124,170,0.3)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
            <path d="M8 1v14M1 8h14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Générer une page pilier avec l&apos;IA
        </button>
      </div>

      {open && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={(e) => { if (e.target === e.currentTarget && status !== 'loading') setOpen(false) }}
        >
          <div style={{
            background: '#1a1a1a', border: '1px solid #2a2a2a',
            borderRadius: 16, padding: '32px 36px',
            width: '100%', maxWidth: 500,
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div>
                <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: 0 }}>
                  Générer une page pilier SEO
                </h2>
                <p style={{ color: '#888', fontSize: 12, margin: '4px 0 0' }}>
                  Propulsé par Claude Opus · Structure ISO Arcachon · E-E-A-T
                </p>
              </div>
              {status !== 'loading' && (
                <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#666', fontSize: 20, cursor: 'pointer' }}>×</button>
              )}
            </div>

            {status === 'loading' ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{
                  width: 48, height: 48,
                  border: '3px solid #2a2a2a', borderTop: '3px solid #007caa',
                  borderRadius: '50%', animation: 'spin 0.8s linear infinite',
                  margin: '0 auto 20px',
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <p style={{ color: '#ccc', fontSize: 14, margin: 0 }}>{progress}</p>
                <p style={{ color: '#555', fontSize: 11, marginTop: 8 }}>
                  La génération prend 20 à 60 secondes selon la ville.
                </p>
              </div>
            ) : (
              <form onSubmit={handleGenerate}>
                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Ville *</label>
                  <input
                    ref={cityRef}
                    type="text"
                    placeholder="Ex : Biarritz"
                    required
                    style={inputStyle}
                    autoFocus
                  />
                  <p style={hintStyle}>Le contenu sera adapté au marché local de cette ville.</p>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Mot-clé cible</label>
                  <input
                    ref={keywordRef}
                    type="text"
                    placeholder="Ex : Estimation location de vacances à Biarritz"
                    style={inputStyle}
                  />
                  <p style={hintStyle}>Laissez vide pour générer automatiquement.</p>
                </div>

                <div style={{
                  background: 'rgba(0,124,170,0.1)', border: '1px solid rgba(0,124,170,0.2)',
                  borderRadius: 8, padding: '10px 14px', marginBottom: 20,
                  fontSize: 12, color: '#88c8d8', lineHeight: 1.6,
                }}>
                  <strong style={{ color: '#007caa' }}>Structure générée automatiquement :</strong> hero, estimateur, données marché locales, prix moyens, Airbnb, législation, textImage, réseau de pros, FAQ, CTA.
                </div>

                {errorMsg && (
                  <p style={{ color: '#ff6b6b', fontSize: 12, marginBottom: 12, background: 'rgba(255,107,107,0.1)', padding: '8px 12px', borderRadius: 6 }}>
                    {errorMsg}
                  </p>
                )}

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    style={{ ...btnStyle, background: '#2a2a2a', color: '#888', flex: 1 }}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    style={{ ...btnStyle, background: 'linear-gradient(135deg, #007caa 0%, #17a3b5 100%)', color: '#fff', flex: 2 }}
                  >
                    Générer la page
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 12, fontWeight: 600, color: '#ccc', marginBottom: 6,
}
const inputStyle: React.CSSProperties = {
  width: '100%', boxSizing: 'border-box',
  background: '#111', border: '1px solid #333', borderRadius: 6,
  color: '#fff', fontSize: 13, padding: '9px 12px', outline: 'none',
}
const hintStyle: React.CSSProperties = {
  fontSize: 11, color: '#555', margin: '4px 0 0',
}
const btnStyle: React.CSSProperties = {
  border: 'none', borderRadius: 8, padding: '11px 16px',
  fontSize: 13, fontWeight: 700, cursor: 'pointer',
}

export default GeneratePillarPage
