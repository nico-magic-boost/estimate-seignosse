import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

const card: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #e5f0f5',
  borderRadius: '12px',
  padding: '20px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  boxShadow: '0 1px 4px rgba(0,124,170,0.07)',
}

const statNum: React.CSSProperties = {
  fontSize: '2rem',
  fontWeight: 700,
  color: '#007caa',
  lineHeight: 1,
}

const statLabel: React.CSSProperties = {
  fontSize: '12px',
  color: '#7a9eab',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  fontWeight: 500,
}

const actionBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  background: '#007caa',
  color: '#fff',
  borderRadius: '8px',
  padding: '8px 14px',
  fontSize: '13px',
  fontWeight: 600,
  textDecoration: 'none',
  transition: 'background 0.15s',
}

const actionBtnSecondary: React.CSSProperties = {
  ...actionBtn,
  background: '#f0f8fb',
  color: '#007caa',
  border: '1px solid #cce8f0',
}

export async function BeforeDashboard() {
  let counts = { posts: 0, pages: 0, media: 0, authors: 0 }

  try {
    const payload = await getPayload({ config })
    const [posts, pages, media, authors] = await Promise.all([
      payload.count({ collection: 'posts', where: {} }),
      payload.count({ collection: 'pages', where: {} }),
      payload.count({ collection: 'media', where: {} }),
      payload.count({ collection: 'authors', where: {} }),
    ])
    counts = {
      posts: posts.totalDocs,
      pages: pages.totalDocs,
      media: media.totalDocs,
      authors: authors.totalDocs,
    }
  } catch {
    // DB not available at build time — ignore
  }

  return (
    <div style={{ marginBottom: '2.5rem' }}>

      {/* ── Hero banner ────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #007caa 0%, #17a3b5 100%)',
        borderRadius: '16px',
        padding: '28px 32px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap',
      }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
            Tableau de bord
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', margin: '6px 0 0', lineHeight: 1.5 }}>
            Bienvenue sur le back office Estimate Rentals.<br />
            Gérez vos contenus, articles et médias depuis ici.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a href="/admin/collections/posts/create" style={{
            background: '#fff',
            color: '#007caa',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: 700,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}>
            + Nouvel article
          </a>
          <a href="/admin/collections/media/create" style={{
            background: 'rgba(255,255,255,0.15)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.4)',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}>
            + Upload image
          </a>
        </div>
      </div>

      {/* ── Stats ──────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '12px',
        marginBottom: '24px',
      }}>
        <a href="/admin/collections/posts" style={{ textDecoration: 'none' }}>
          <div style={{ ...card, borderTop: '3px solid #007caa' }}>
            <div style={statNum}>{counts.posts}</div>
            <div style={statLabel}>Articles</div>
          </div>
        </a>
        <a href="/admin/collections/pages" style={{ textDecoration: 'none' }}>
          <div style={{ ...card, borderTop: '3px solid #17a3b5' }}>
            <div style={statNum}>{counts.pages}</div>
            <div style={statLabel}>Pages</div>
          </div>
        </a>
        <a href="/admin/collections/media" style={{ textDecoration: 'none' }}>
          <div style={{ ...card, borderTop: '3px solid #0090c0' }}>
            <div style={statNum}>{counts.media}</div>
            <div style={statLabel}>Médias</div>
          </div>
        </a>
        <a href="/admin/collections/authors" style={{ textDecoration: 'none' }}>
          <div style={{ ...card, borderTop: '3px solid #1ab8cc' }}>
            <div style={statNum}>{counts.authors}</div>
            <div style={statLabel}>Auteurs</div>
          </div>
        </a>
      </div>

      {/* ── Quick links ────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '12px',
      }}>

        {/* Blog */}
        <div style={{ ...card }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#333', marginBottom: '10px' }}>
            ✍️ Blog
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <a href="/admin/collections/posts" style={actionBtn}>Tous les articles</a>
            <a href="/admin/collections/posts/create" style={actionBtnSecondary}>+ Nouveau</a>
            <a href="/admin/collections/authors" style={actionBtnSecondary}>Auteurs</a>
          </div>
        </div>

        {/* Site */}
        <div style={{ ...card }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#333', marginBottom: '10px' }}>
            🌐 Site
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <a href="/admin/collections/pages" style={actionBtn}>Pages</a>
            <a href="/admin/collections/pages/create" style={actionBtnSecondary}>+ Nouvelle page</a>
          </div>
        </div>

        {/* Médias */}
        <div style={{ ...card }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#333', marginBottom: '10px' }}>
            🖼️ Médias
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <a href="/admin/collections/media" style={actionBtn}>Bibliothèque</a>
            <a href="/admin/collections/media/create" style={actionBtnSecondary}>+ Upload</a>
          </div>
        </div>

        {/* Config */}
        <div style={{ ...card }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#333', marginBottom: '10px' }}>
            ⚙️ Configuration
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <a href="/admin/globals/settings" style={actionBtn}>Réglages</a>
            <a href="/admin/collections/users" style={actionBtnSecondary}>Utilisateurs</a>
          </div>
        </div>

      </div>

      {/* ── Separator ─────────────────────────────────── */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(to right, #cce8f0, transparent)',
        margin: '28px 0 8px',
      }} />
      <p style={{ fontSize: '11px', color: '#aac4ce', margin: 0 }}>Collections</p>
    </div>
  )
}

export default BeforeDashboard
