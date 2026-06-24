'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

type Status = 'idle' | 'loading' | 'error'

export function GenerateWithAI() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [progress, setProgress] = useState('')
  const router = useRouter()

  const topicRef = useRef<HTMLInputElement>(null)
  const keywordsRef = useRef<HTMLInputElement>(null)
  const authorIdRef = useRef<HTMLInputElement>(null)
  const localeRef = useRef<HTMLSelectElement>(null)

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    setProgress('Analyse du profil auteur et des pages internes…')

    const topic = topicRef.current?.value.trim() ?? ''
    if (!topic) { setStatus('error'); setErrorMsg('Le sujet est obligatoire.'); return }

    setTimeout(() => setProgress('Génération du contenu avec Claude Opus…'), 1200)
    setTimeout(() => setProgress('Structuration SEO et maillage interne…'), 4000)
    setTimeout(() => setProgress('Formatage et création de l\'article…'), 9000)

    try {
      const res = await fetch('/api/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          keywords: keywordsRef.current?.value.trim() || topic,
          authorId: authorIdRef.current?.value.trim() || undefined,
          locale: localeRef.current?.value || 'fr',
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setStatus('error')
        setErrorMsg(data.error ?? 'Erreur inconnue.')
        return
      }

      // Redirect to the new draft
      router.push(`/admin/collections/posts/${data.postId}`)
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message ?? 'Erreur réseau.')
    }
  }

  return (
    <>
      {/* ── Trigger button ── */}
      <div style={{ marginBottom: 16 }}>
        <button
          type="button"
          onClick={() => { setOpen(true); setStatus('idle'); setErrorMsg('') }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'linear-gradient(135deg, #007caa 0%, #17a3b5 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 18px',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,124,170,0.3)',
          }}
        >
          <span style={{ fontSize: 16 }}>✨</span>
          Générer un article avec l'IA
        </button>
      </div>

      {/* ── Modal overlay ── */}
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
            background: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: 16,
            padding: '32px 36px',
            width: '100%',
            maxWidth: 540,
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div>
                <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: 0 }}>
                  ✨ Générer un article SEO
                </h2>
                <p style={{ color: '#888', fontSize: 12, margin: '4px 0 0' }}>
                  Propulsé par Claude Opus · EEAT · Maillage interne automatique
                </p>
              </div>
              {status !== 'loading' && (
                <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#666', fontSize: 20, cursor: 'pointer' }}>×</button>
              )}
            </div>

            {status === 'loading' ? (
              /* Loading state */
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{
                  width: 48, height: 48,
                  border: '3px solid #2a2a2a',
                  borderTop: '3px solid #007caa',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                  margin: '0 auto 20px',
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <p style={{ color: '#ccc', fontSize: 14, margin: 0 }}>{progress}</p>
                <p style={{ color: '#555', fontSize: 11, marginTop: 8 }}>
                  La génération prend 15 à 45 secondes selon la complexité.
                </p>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleGenerate}>

                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Sujet de l'article *</label>
                  <input
                    ref={topicRef}
                    type="text"
                    placeholder="Ex : Comment optimiser les revenus d'un appartement à Seignosse en été"
                    required
                    style={inputStyle}
                  />
                  <p style={hintStyle}>Soyez précis : incluez la destination et l'angle éditorial.</p>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Mots clés cibles</label>
                  <input
                    ref={keywordsRef}
                    type="text"
                    placeholder="Ex : location saisonnière Seignosse, revenus locatifs Landes"
                    style={inputStyle}
                  />
                  <p style={hintStyle}>Séparez les mots clés par des virgules.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>ID Auteur</label>
                    <input
                      ref={authorIdRef}
                      type="text"
                      placeholder="Ex : 1 (Nicolas) ou 2"
                      style={inputStyle}
                    />
                    <p style={hintStyle}>Adapte le ton et les signaux EEAT.</p>
                  </div>
                  <div>
                    <label style={labelStyle}>Langue</label>
                    <select ref={localeRef} defaultValue="fr" style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                    </select>
                  </div>
                </div>

                {/* EEAT notice */}
                <div style={{
                  background: 'rgba(0,124,170,0.1)',
                  border: '1px solid rgba(0,124,170,0.2)',
                  borderRadius: 8,
                  padding: '10px 14px',
                  marginBottom: 20,
                  fontSize: 12,
                  color: '#88c8d8',
                  lineHeight: 1.6,
                }}>
                  <strong style={{ color: '#007caa' }}>✓ SEO inclus automatiquement :</strong> E-E-A-T, maillage interne, structure H2/H3, meta title & description, anti-spam Google.
                </div>

                {errorMsg && (
                  <p style={{ color: '#ff6b6b', fontSize: 12, marginBottom: 12, background: 'rgba(255,107,107,0.1)', padding: '8px 12px', borderRadius: 6 }}>
                    ⚠ {errorMsg}
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
                    ✨ Générer l'article
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
  color: '#fff', fontSize: 13, padding: '9px 12px',
  outline: 'none',
}
const hintStyle: React.CSSProperties = {
  fontSize: 11, color: '#555', margin: '4px 0 0',
}
const btnStyle: React.CSSProperties = {
  border: 'none', borderRadius: 8, padding: '11px 16px',
  fontSize: 13, fontWeight: 700, cursor: 'pointer',
}

export default GenerateWithAI
