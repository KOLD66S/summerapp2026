import React, { useState } from 'react'
import { Plus, MapPin, Clock, Users, CalendarDays, Filter, Download } from 'lucide-react'
import { events } from '../data'

const tabs = ['الكل', 'قادمة', 'هذا الأسبوع', 'هذا الشهر']

export default function EventsPage() {
  const [tab, setTab] = useState('الكل')

  return (
    <>
      <div className="page-header fade-in">
        <div>
          <h1>الفعاليات والأنشطة</h1>
          <p>جميع الفعاليات المجدولة والمكتملة • {events.length} فعالية</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn"><Download size={15} /> تصدير</button>
          <button className="btn primary"><Plus size={15} /> فعالية جديدة</button>
        </div>
      </div>

      <div className="kpi-grid fade-in d-1">
        <div className="kpi-mini">
          <div className="kpi-mini-label">إجمالي الحضور المتوقع</div>
          <div className="kpi-mini-value">{events.reduce((s, e) => s + e.attendees, 0).toLocaleString('ar-EG')}</div>
          <div className="kpi-mini-sub">+18% مقارنة بالشهر الماضي</div>
        </div>
        <div className="kpi-mini">
          <div className="kpi-mini-label">الفعاليات القادمة</div>
          <div className="kpi-mini-value">{events.length}</div>
          <div className="kpi-mini-sub">في {new Set(events.map(e => e.club)).size} نادٍ مختلف</div>
        </div>
        <div className="kpi-mini">
          <div className="kpi-mini-label">معدل الإشغال</div>
          <div className="kpi-mini-value">
            {Math.round((events.reduce((s, e) => s + e.attendees, 0) / events.reduce((s, e) => s + e.capacity, 0)) * 100)}%
          </div>
          <div className="kpi-mini-sub">من إجمالي الطاقة الاستيعابية</div>
        </div>
      </div>

      <div className="card fade-in d-2" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <div className="tabs">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`tab ${tab === t ? 'active' : ''}`}>
              {t}
            </button>
          ))}
        </div>
        <button className="btn" style={{ marginRight: 'auto' }}><Filter size={14} /> تصفية</button>
      </div>

      <div className="card fade-in d-3" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrap" style={{ border: 'none', borderRadius: 0, background: 'transparent' }}>
          <table className="table">
            <thead>
              <tr>
                <th>الفعالية</th>
                <th>النادي المنظم</th>
                <th>التاريخ والوقت</th>
                <th>المكان</th>
                <th>الحضور</th>
                <th>الإشغال</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => {
                const occupancy = Math.round((e.attendees / e.capacity) * 100)
                return (
                  <tr key={e.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: 10, display: 'grid', placeItems: 'center',
                          background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid var(--accent)'
                        }}>
                          <CalendarDays size={16} />
                        </div>
                        <span>{e.title}</span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{e.club}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <span style={{ fontWeight: 800 }}>{e.day} {e.month}</span>
                        <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}><Clock size={10} style={{ verticalAlign: 'middle' }} /> {e.time}</span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        <MapPin size={12} /> {e.location}
                      </span>
                    </td>
                    <td>
                      <strong style={{ fontVariantNumeric: 'tabular-nums' }}>{e.attendees}</strong>
                      <span style={{ color: 'var(--text-muted)', fontSize: 11 }}> / {e.capacity}</span>
                    </td>
                    <td style={{ minWidth: 120 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress" style={{ flex: 1, minWidth: 60 }}>
                          <div className="progress-bar" style={{ width: `${occupancy}%`, background: occupancy > 80 ? 'linear-gradient(90deg, #10b981, #06b6d4)' : 'var(--grad-primary)' }} />
                        </div>
                        <strong style={{ fontSize: 12, fontVariantNumeric: 'tabular-nums' }}>{occupancy}%</strong>
                      </div>
                    </td>
                    <td><span className={`chip ${e.tag}`}>{e.status}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
