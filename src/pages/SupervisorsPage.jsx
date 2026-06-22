import React from 'react'
import { UserCheck, Activity, Award, Users, Sparkles } from 'lucide-react'
import { topSupervisors, summary, programName } from '../thamar'

export default function SupervisorsPage() {
  return (
    <>
      <div className="page-header fade-in">
        <div>
          <h1>المشرفون</h1>
          <p>أعضاء هيئة التدريس المشرفون على أنشطة الأندية في {programName}</p>
        </div>
        <span className="chip success"><UserCheck size={12} /> {summary.totalSupervisors} مشرف</span>
      </div>

      <div className="kpi-grid fade-in d-1">
        <div className="kpi-mini">
          <div className="kpi-mini-label">إجمالي المشرفين</div>
          <div className="kpi-mini-value">{summary.totalSupervisors}</div>
          <div className="kpi-mini-sub">عضو هيئة تدريس</div>
        </div>
        <div className="kpi-mini">
          <div className="kpi-mini-label">متوسط الإشراف</div>
          <div className="kpi-mini-value">{(summary.totalActivities / summary.totalSupervisors).toFixed(1)}</div>
          <div className="kpi-mini-sub">نشاط لكل مشرف</div>
        </div>
        <div className="kpi-mini">
          <div className="kpi-mini-label">أعلى إشراف</div>
          <div className="kpi-mini-value">{topSupervisors[0].activities}</div>
          <div className="kpi-mini-sub">نشاط — {topSupervisors[0].name}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
        {topSupervisors.map((s, i) => (
          <div key={s.name} className={`card fade-in d-${(i % 6) + 1}`}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: i === 0 ? 'var(--grad-gold)' : 'var(--grad-thamar)',
                color: '#fff', display: 'grid', placeItems: 'center',
                fontWeight: 900, fontSize: 22,
                boxShadow: i === 0 ? '0 8px 24px rgba(217,119,6,0.35)' : '0 8px 24px rgba(5,150,105,0.35)',
                flexShrink: 0,
              }}>
                {s.name.charAt(0)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: 14.5, fontWeight: 900, marginBottom: 4 }}>{s.name}</h3>
                <p style={{ fontSize: 11.5, color: 'var(--text-muted)', fontWeight: 600 }}>
                  مشرف على {s.clubCount} {s.clubCount > 1 ? 'أندية' : 'نادٍ'}
                </p>
              </div>
              {i === 0 && <span className="chip gold" style={{ fontSize: 10.5 }}><Sparkles size={10} /> الأول</span>}
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 10, padding: '14px 0', borderTop: '1px solid var(--border)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <strong style={{ display: 'block', fontSize: 18, fontWeight: 900, color: 'var(--accent)' }}>{s.activities}</strong>
                <span style={{ fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>نشاط</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <strong style={{ display: 'block', fontSize: 18, fontWeight: 900, color: 'var(--violet)' }}>{s.points}</strong>
                <span style={{ fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>نقطة</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <strong style={{ display: 'block', fontSize: 18, fontWeight: 900, color: 'var(--emerald)' }}>{s.clubCount}</strong>
                <span style={{ fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>أندية</span>
              </div>
            </div>
            <div style={{ marginTop: 10, fontSize: 11.5, color: 'var(--text-muted)' }}>
              الأندية: {s.clubs.slice(0, 2).join('، ')}{s.clubs.length > 2 ? ` +${s.clubs.length - 2}` : ''}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
