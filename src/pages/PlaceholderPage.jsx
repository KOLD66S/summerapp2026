import React from 'react'
import { Construction, Sparkles } from 'lucide-react'

export default function PlaceholderPage({ title, description }) {
  return (
    <>
      <div className="page-header fade-in">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      <div className="card fade-in d-1" style={{ textAlign: 'center', padding: 60 }}>
        <div style={{
          width: 80, height: 80, borderRadius: 20, margin: '0 auto 20px',
          display: 'grid', placeItems: 'center',
          background: 'var(--grad-primary)', color: '#fff',
          boxShadow: '0 16px 40px var(--accent-glow)'
        }}>
          <Construction size={36} />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8 }}>قيد التطوير</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: 460, margin: '0 auto', fontSize: 13.5 }}>
          هذه الصفحة قيد التطوير حالياً وستكون متاحة قريباً مع مزيد من الميزات المتقدمة.
        </p>
        <div className="chip violet" style={{ marginTop: 20 }}>
          <Sparkles size={11} /> Coming Soon
        </div>
      </div>
    </>
  )
}
