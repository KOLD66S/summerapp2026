import React, { useState, useMemo } from 'react'
import {
  Search, Activity, Trophy, TrendingUp, Users, GraduationCap,
  Filter, Building2, Sparkles, Award
} from 'lucide-react'
import { specializedClubs, specializedSummary } from '../specializedClubs'
import { Link } from '../router'

const SECTION_FILTERS = [
  { key: 'all',     label: 'الكل' },
  { key: 'طلاب',    label: 'شطر الطلاب' },
  { key: 'طالبات',  label: 'شطر الطالبات' },
]

const TYPE_FILTERS = [
  { key: 'all',      label: 'جميع الكليات' },
  { key: 'colleges', label: 'الكليات الأكاديمية' },
  { key: 'branches', label: 'فروع المحافظات' },
]

export default function SpecializedClubsPage() {
  const [q, setQ] = useState('')
  const [section, setSection] = useState('all')
  const [type, setType] = useState('all')

  const filtered = useMemo(() => {
    return specializedClubs.filter(c => {
      if (q && !c.college.includes(q) && !c.name.includes(q) && !c.section.includes(q)) return false
      if (section !== 'all' && c.section !== section) return false
      if (type === 'colleges' && c.college.includes('مقر')) return false
      if (type === 'branches' && !c.college.includes('مقر')) return false
      return true
    })
  }, [q, section, type])

  return (
    <>
      <div className="page-header fade-in">
        <div>
          <h1>
            <span className="text-gradient">الأندية التخصصية</span>
          </h1>
          <p>
            أندية الكليات والفروع في جامعة القصيم • {specializedSummary.totalClubs} نادٍ تخصصي عبر {specializedSummary.uniqueColleges} كلية وفرع
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span className="chip success" style={{ padding: '7px 14px' }}>
            <Sparkles size={12} /> {specializedSummary.totalEvents.toLocaleString('ar-EG')} فعالية مسجلة
          </span>
        </div>
      </div>

      <div className="kpi-grid fade-in d-1">
        <div className="kpi-mini">
          <div className="kpi-mini-label">
            <Building2 size={11} style={{ verticalAlign: 'middle' }} /> الأندية التخصصية
          </div>
          <div className="kpi-mini-value">{specializedSummary.totalClubs}</div>
          <div className="kpi-mini-sub">نادٍ نشط في {specializedSummary.uniqueColleges} كلية وفرع</div>
        </div>
        <div className="kpi-mini">
          <div className="kpi-mini-label">
            <Activity size={11} style={{ verticalAlign: 'middle' }} /> إجمالي الفعاليات
          </div>
          <div className="kpi-mini-value">{specializedSummary.totalEvents.toLocaleString('ar-EG')}</div>
          <div className="kpi-mini-sub">فعالية موثقة في النظام</div>
        </div>
        <div className="kpi-mini">
          <div className="kpi-mini-label">
            <Trophy size={11} style={{ verticalAlign: 'middle' }} /> النقاط المقدّرة
          </div>
          <div className="kpi-mini-value">{specializedSummary.totalPoints.toLocaleString('ar-EG')}+</div>
          <div className="kpi-mini-sub">حسب آلية تقييم العمادة</div>
        </div>
      </div>

      <div className="card fade-in d-2" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <div className="search" style={{ maxWidth: 320 }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="بحث عن كلية أو فرع..."
          />
          <Search size={17} className="search-icon" />
        </div>

        <div className="tabs">
          {SECTION_FILTERS.map(f => (
            <button
              key={f.key}
              className={`tab ${section === f.key ? 'active' : ''}`}
              onClick={() => setSection(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="tabs">
          {TYPE_FILTERS.map(f => (
            <button
              key={f.key}
              className={`tab ${type === f.key ? 'active' : ''}`}
              onClick={() => setType(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <span className="chip success" style={{ marginRight: 'auto' }}>
          <TrendingUp size={12} /> {filtered.length} نادٍ معروض
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 18 }}>
        {filtered.map((c, i) => (
          <Link to={`/specialized/${c.id}`} key={c.id}>
            <div
              className={`club-card fade-in d-${(i % 6) + 1}`}
              style={{ '--club-glow': `${c.color}40`, '--club-gradient': c.gradient }}
            >
              <div className="club-card-banner" />
              <div
                className="club-card-logo"
                style={{
                  background: `linear-gradient(135deg, ${c.color}20, ${c.color}08)`,
                  borderColor: `${c.color}60`,
                  boxShadow: `0 8px 24px ${c.color}30`,
                }}
              >
                {c.logo}
              </div>
              <h3>{c.college}</h3>
              <p className="club-card-college">
                {c.sectionIcon} {c.section}
              </p>
              <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                <span className="chip success" style={{ fontSize: 10.5, padding: '3px 9px' }}>
                  <Activity size={10} /> {c.totalEvents} فعالية
                </span>
                <span className="chip gold" style={{ fontSize: 10.5, padding: '3px 9px' }}>
                  <Trophy size={10} /> {c.totalPoints}
                </span>
              </div>
              <div className="club-card-stats">
                <div className="club-card-stat">
                  <strong>{c.totalEvents}</strong>
                  <span>فعالية</span>
                </div>
                <div className="club-card-stat">
                  <strong>{c.totalParticipants.toLocaleString('ar-EG')}</strong>
                  <span>مستفيد</span>
                </div>
                <div className="club-card-stat">
                  <strong>{c.typesCount}</strong>
                  <span>نوع</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card fade-in" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <GraduationCap size={48} style={{ color: 'var(--text-muted)', marginBottom: 12 }} />
          <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 6 }}>لا توجد أندية مطابقة للبحث</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>جرّب تعديل الفلاتر أو كلمة البحث</p>
        </div>
      )}
    </>
  )
}
