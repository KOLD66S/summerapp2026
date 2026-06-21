import React, { useState, useMemo } from 'react'
import { Plus, Search, Users, Star, TrendingUp, ChevronLeft } from 'lucide-react'
import { clubs } from '../data'
import { Link } from '../router'

const filters = [
  { id: 'all', label: 'كل الأندية' },
  { id: 'tech', label: 'تقنية', colleges: ['كلية الحاسب', 'كلية الهندسة'] },
  { id: 'arts', label: 'فنية وأدبية', colleges: ['كلية الآداب', 'كلية اللغة العربية', 'كلية الإعلام'] },
  { id: 'sports', label: 'رياضية', colleges: ['مشترك'] },
  { id: 'science', label: 'علمية', colleges: ['كلية العلوم', 'كلية الطب'] },
  { id: 'business', label: 'أعمال', colleges: ['كلية إدارة الأعمال'] },
]

export default function ClubsPage() {
  const [filter, setFilter] = useState('all')
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    let list = clubs
    if (filter !== 'all') {
      const f = filters.find((x) => x.id === filter)
      if (f && f.colleges) list = list.filter((c) => f.colleges.some((col) => c.college.includes(col)))
    }
    if (q) list = list.filter((c) => c.name.includes(q) || c.college.includes(q))
    return list
  }, [filter, q])

  return (
    <>
      <div className="page-header fade-in">
        <div>
          <h1>الأندية الطلابية</h1>
          <p>إدارة وعرض جميع الأندية المعتمدة في الجامعة • {clubs.length} نادٍ</p>
        </div>
        <button className="btn primary">
          <Plus size={15} /> اعتماد نادٍ جديد
        </button>
      </div>

      <div className="card fade-in d-1" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <div className="search" style={{ maxWidth: 320 }}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="بحث عن نادٍ..." />
          <Search size={17} className="search-icon" />
        </div>
        <div className="tabs">
          {filters.map((f) => (
            <button key={f.id} onClick={() => setFilter(f.id)} className={`tab ${filter === f.id ? 'active' : ''}`}>
              {f.label}
            </button>
          ))}
        </div>
        <div style={{ marginRight: 'auto', display: 'flex', gap: 8 }}>
          <span className="chip success"><TrendingUp size={12} /> {filtered.length} نتيجة</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
        {filtered.map((c, i) => (
          <Link to={`/club/${c.id}`} key={c.id}>
            <div
              className={`club-card fade-in d-${(i % 6) + 1}`}
              style={{ '--club-glow': `${c.color}40`, '--club-gradient': c.gradient }}
            >
              <div className="club-card-banner" />
              <div className="club-card-logo" style={{ background: `linear-gradient(135deg, ${c.color}25, ${c.color}10)`, borderColor: `${c.color}60`, boxShadow: `0 0 30px ${c.color}40` }}>
                {c.logo}
              </div>
              <h3>{c.name}</h3>
              <p className="club-card-college">{c.college}</p>
              <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                <span className="chip success" style={{ fontSize: 10.5, padding: '3px 9px' }}>
                  <TrendingUp size={10} /> +{c.growth}%
                </span>
                <span className="chip gold" style={{ fontSize: 10.5, padding: '3px 9px' }}>
                  <Star size={10} /> {c.rating}
                </span>
              </div>
              <div className="club-card-stats">
                <div className="club-card-stat">
                  <strong>{c.members}</strong>
                  <span>عضو</span>
                </div>
                <div className="club-card-stat">
                  <strong>{c.events}</strong>
                  <span>فعالية</span>
                </div>
                <div className="club-card-stat">
                  <strong>{(c.budget / 1000).toFixed(0)}K</strong>
                  <span>SAR</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
