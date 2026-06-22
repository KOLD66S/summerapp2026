import React, { useState, useMemo } from 'react'
import { Plus, MapPin, Clock, Users, CalendarDays, Filter, Download, Search } from 'lucide-react'
import { allActivities, activityTypes, summary, colorForType } from '../thamar'

export default function EventsPage() {
  const [tab, setTab] = useState('الكل')
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    let list = allActivities
    if (tab !== 'الكل') list = list.filter(a => a.mode === tab)
    if (q) {
      list = list.filter(a =>
        a.title.includes(q) ||
        a.clubName.includes(q) ||
        a.supervisorName.includes(q) ||
        a.location.includes(q)
      )
    }
    return list.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
  }, [tab, q])

  const display = filtered.slice(0, 50)

  return (
    <>
      <div className="page-header fade-in">
        <div>
          <h1>الأنشطة والفعاليات</h1>
          <p>{summary.totalActivities} نشاط مسجل عبر {summary.totalClubs} أندية</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn"><Download size={15} /> تصدير</button>
          <button className="btn primary"><Plus size={15} /> نشاط جديد</button>
        </div>
      </div>

      <div className="kpi-grid fade-in d-1">
        <div className="kpi-mini">
          <div className="kpi-mini-label">إجمالي المشاركات</div>
          <div className="kpi-mini-value">{summary.totalParticipants.toLocaleString('ar-EG')}</div>
          <div className="kpi-mini-sub">من {summary.uniqueStudents} طالب فريد</div>
        </div>
        <div className="kpi-mini">
          <div className="kpi-mini-label">أنواع الأنشطة</div>
          <div className="kpi-mini-value">{summary.uniqueTypes}</div>
          <div className="kpi-mini-sub">نوع مختلف موثق</div>
        </div>
        <div className="kpi-mini">
          <div className="kpi-mini-label">المواقع المستخدمة</div>
          <div className="kpi-mini-value">{summary.uniqueLocations}</div>
          <div className="kpi-mini-sub">موقع داخل الحرم</div>
        </div>
      </div>

      <div className="card fade-in d-2" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <div className="search" style={{ maxWidth: 320 }}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="بحث عن نشاط..." />
          <Search size={17} className="search-icon" />
        </div>
        <div className="tabs">
          {['الكل', 'حضوري', 'عن بعد', 'مدمج'].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`tab ${tab === t ? 'active' : ''}`}>
              {t}
            </button>
          ))}
        </div>
        <span className="chip success" style={{ marginRight: 'auto' }}>
          {filtered.length} نتيجة
        </span>
      </div>

      <div className="card fade-in d-3" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>النشاط</th>
                <th>النادي</th>
                <th>المشرف</th>
                <th>التاريخ</th>
                <th>الموقع</th>
                <th>النوع</th>
                <th>المشاركون</th>
                <th>النقاط</th>
              </tr>
            </thead>
            <tbody>
              {display.map((a) => {
                const c = colorForType(a.type)
                return (
                  <tr key={a.activityId}>
                    <td style={{ maxWidth: 280 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: 10, display: 'grid', placeItems: 'center',
                          background: c + '15', color: c, border: `1px solid ${c}40`, flexShrink: 0
                        }}>
                          <CalendarDays size={15} />
                        </div>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title}</span>
                      </div>
                    </td>
                    <td>{a.clubName}</td>
                    <td style={{ fontSize: 12 }}>{a.supervisorName}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{a.day} {a.month}</span>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}><Clock size={10} style={{ verticalAlign: 'middle' }} /> {a.time}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
                        <MapPin size={11} /> {a.location || '—'}
                      </span>
                    </td>
                    <td>
                      <span className="chip" style={{ fontSize: 10.5, padding: '3px 9px', color: c, borderColor: c + '40', background: c + '12', maxWidth: 200 }}>
                        {a.type}
                      </span>
                    </td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontWeight: 800 }}>
                        <Users size={12} /> {a.participantCount || 0}
                      </span>
                    </td>
                    <td><strong style={{ color: 'var(--accent)' }}>{a.points}</strong></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length > 50 && (
          <div style={{ padding: 16, textAlign: 'center', borderTop: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: 12 }}>
            عرض 50 من أصل {filtered.length} نشاط
          </div>
        )}
      </div>
    </>
  )
}
