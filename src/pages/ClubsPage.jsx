import React, { useState, useMemo } from 'react'
import { Plus, Search, Activity, Trophy, TrendingUp, Users } from 'lucide-react'
import { clubs, summary } from '../thamar'
import { Link } from '../router'

export default function ClubsPage() {
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    if (!q) return clubs
    return clubs.filter(c =>
      c.name.includes(q) ||
      c.supervisor.includes(q) ||
      c.types.some(t => t.includes(q))
    )
  }, [q])

  return (
    <>
      <div className="page-header fade-in">
        <div>
          <h1>الأندية الطلابية</h1>
          <p>إدارة وعرض جميع الأندية المعتمدة في برنامج ثمر • {clubs.length} نادٍ نشط</p>
        </div>
        <button className="btn primary">
          <Plus size={15} /> اعتماد نادٍ جديد
        </button>
      </div>

      <div className="kpi-grid fade-in d-1">
        <div className="kpi-mini">
          <div className="kpi-mini-label"><Activity size={11} style={{ verticalAlign: 'middle' }} /> إجمالي أنشطة الأندية</div>
          <div className="kpi-mini-value">{summary.totalActivities}</div>
          <div className="kpi-mini-sub">نشاط منفذ ومسجل</div>
        </div>
        <div className="kpi-mini">
          <div className="kpi-mini-label"><Users size={11} style={{ verticalAlign: 'middle' }} /> مشاركات الطلاب</div>
          <div className="kpi-mini-value">{summary.totalParticipants.toLocaleString('ar-EG')}</div>
          <div className="kpi-mini-sub">عبر جميع الأندية</div>
        </div>
        <div className="kpi-mini">
          <div className="kpi-mini-label"><Trophy size={11} style={{ verticalAlign: 'middle' }} /> النقاط المكتسبة</div>
          <div className="kpi-mini-value">{summary.totalPoints.toLocaleString('ar-EG')}</div>
          <div className="kpi-mini-sub">من جميع الأنشطة</div>
        </div>
      </div>

      <div className="card fade-in d-2" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <div className="search" style={{ maxWidth: 360 }}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="بحث عن نادٍ أو مشرف..." />
          <Search size={17} className="search-icon" />
        </div>
        <span className="chip success" style={{ marginRight: 'auto' }}>
          <TrendingUp size={12} /> {filtered.length} نادٍ معروض
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
        {filtered.map((c, i) => (
          <Link to={`/club/${c.id}`} key={c.id}>
            <div
              className={`club-card fade-in d-${(i % 6) + 1}`}
              style={{ '--club-glow': `${c.color}40`, '--club-gradient': c.gradient }}
            >
              <div className="club-card-banner" />
              <div className="club-card-logo" style={{ background: `linear-gradient(135deg, ${c.color}20, ${c.color}08)`, borderColor: `${c.color}60`, boxShadow: `0 8px 24px ${c.color}30` }}>
                {c.logo}
              </div>
              <h3>{c.name}</h3>
              <p className="club-card-college">{c.supervisor}</p>
              <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                <span className="chip success" style={{ fontSize: 10.5, padding: '3px 9px' }}>
                  <Activity size={10} /> {c.activities} نشاط
                </span>
                <span className="chip gold" style={{ fontSize: 10.5, padding: '3px 9px' }}>
                  <Trophy size={10} /> {c.points}
                </span>
              </div>
              <div className="club-card-stats">
                <div className="club-card-stat">
                  <strong>{c.activities}</strong>
                  <span>نشاط</span>
                </div>
                <div className="club-card-stat">
                  <strong>{c.uniqueStudents}</strong>
                  <span>طالب</span>
                </div>
                <div className="club-card-stat">
                  <strong>{c.types.length}</strong>
                  <span>نوع</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
