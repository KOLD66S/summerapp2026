import React, { useState } from 'react'
import {
  ArrowRight, Users, CalendarDays, Award, Activity, MapPin, Clock,
  UserCheck, Sparkles, TrendingUp, Image as ImageIcon, Video, Tag,
  Building2, Layers, Trophy
} from 'lucide-react'
import {
  ResponsiveContainer, BarChart, Bar, Tooltip, XAxis, YAxis,
  CartesianGrid, PieChart, Pie, Cell, Legend
} from 'recharts'
import { specializedClubsById, colorForCategory } from '../specializedClubs'
import { useRouter } from '../router'

export default function SpecializedClubDetailPage({ id }) {
  const club = specializedClubsById[id]
  const { navigate } = useRouter()
  const [expandedEvent, setExpandedEvent] = useState(null)

  if (!club) {
    return (
      <div className="card fade-in" style={{ textAlign: 'center', padding: 60 }}>
        <Building2 size={48} style={{ color: 'var(--text-muted)', marginBottom: 12 }} />
        <h3>لم يتم العثور على النادي</h3>
        <button className="btn primary" onClick={() => navigate('/specialized')} style={{ marginTop: 16 }}>
          <ArrowRight size={14} /> العودة إلى قائمة الأندية التخصصية
        </button>
      </div>
    )
  }

  const categoriesData = Object.entries(club.categories).map(([name, value]) => ({ name, value }))
  const typesData = Object.entries(club.types)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6)

  const sortedEvents = [...club.events].sort((a, b) => (b.date || '').localeCompare(a.date || ''))

  return (
    <>
      <button
        onClick={() => navigate('/specialized')}
        className="chip fade-in"
        style={{ alignSelf: 'flex-start', padding: '6px 14px', cursor: 'pointer' }}
      >
        <ArrowRight size={13} /> العودة إلى الأندية التخصصية
      </button>

      <div
        className="hero fade-in d-1"
        style={{
          background: `linear-gradient(135deg, ${club.color}18, ${club.color}08, rgba(255,255,255,0.5))`,
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div
            className="float-action"
            style={{
              width: 110, height: 110, borderRadius: 28, display: 'grid', placeItems: 'center',
              fontSize: 56, background: `linear-gradient(135deg, ${club.color}25, ${club.color}10)`,
              border: `2px solid ${club.color}50`, boxShadow: `0 16px 50px ${club.color}30`,
            }}
          >
            {club.logo}
          </div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
              <span className="chip" style={{ borderColor: club.color + '60', color: club.color, background: `${club.color}12` }}>
                <Building2 size={11} /> {club.college}
              </span>
              <span className="chip info">
                {club.sectionIcon} {club.section}
              </span>
              <span className="chip success">
                <Activity size={11} /> {club.totalEvents} فعالية
              </span>
              <span className="chip gold">
                <Award size={11} /> {club.totalPoints} نقطة
              </span>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.5, color: 'var(--text-primary)', marginBottom: 6 }}>
              {club.name}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 700 }}>
              نادٍ تخصصي تابع لـ <strong>{club.college}</strong> شطر {club.section}، نفّذ <strong>{club.totalEvents}</strong> فعالية متنوعة
              عبر <strong>{club.typesCount}</strong> نوع و <strong>{club.categoriesCount}</strong> مجال نشاط، استفاد منها <strong>{club.totalParticipants.toLocaleString('ar-EG')}</strong> طالب وطالبة.
            </p>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card fade-in d-2" style={{ '--glow': `${club.color}25`, '--icon-color': club.color, '--icon-bg': `${club.color}15` }}>
          <div className="stat-head">
            <div className="stat-icon"><Activity size={20} strokeWidth={2.3} /></div>
            <div className="stat-trend"><TrendingUp size={12} /> نشط</div>
          </div>
          <div className="stat-value">{club.totalEvents}</div>
          <div className="stat-label">إجمالي الفعاليات</div>
        </div>
        <div className="stat-card fade-in d-3" style={{ '--glow': 'rgba(8,145,178,0.18)', '--icon-color': 'var(--cyan)', '--icon-bg': 'var(--cyan-soft)' }}>
          <div className="stat-head">
            <div className="stat-icon"><Users size={20} strokeWidth={2.3} /></div>
            <div className="stat-trend"><Sparkles size={12} /> مشارك</div>
          </div>
          <div className="stat-value">{club.totalParticipants.toLocaleString('ar-EG')}</div>
          <div className="stat-label">إجمالي المستفيدين</div>
        </div>
        <div className="stat-card fade-in d-4" style={{ '--glow': 'rgba(217,119,6,0.18)', '--icon-color': 'var(--gold)', '--icon-bg': 'var(--gold-soft)' }}>
          <div className="stat-head">
            <div className="stat-icon"><Trophy size={20} strokeWidth={2.3} /></div>
            <div className="stat-trend"><Sparkles size={12} /> ممتاز</div>
          </div>
          <div className="stat-value">{club.totalPoints}</div>
          <div className="stat-label">النقاط (آلية التقييم)</div>
        </div>
        <div className="stat-card fade-in d-5" style={{ '--glow': 'rgba(5,150,105,0.18)', '--icon-color': 'var(--emerald)', '--icon-bg': 'var(--emerald-soft)' }}>
          <div className="stat-head">
            <div className="stat-icon"><Layers size={20} strokeWidth={2.3} /></div>
            <div className="stat-trend"><TrendingUp size={12} /> متنوع</div>
          </div>
          <div className="stat-value">{club.typesCount}</div>
          <div className="stat-label">أنواع الفعاليات</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card fade-in d-3">
          <div className="card-head">
            <div>
              <h3>توزيع المجالات</h3>
              <p>{categoriesData.length} مجال نشاط</p>
            </div>
          </div>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={categoriesData} innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                  {categoriesData.map((entry) => (
                    <Cell key={entry.name} fill={colorForCategory(entry.name, club.color)} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            {categoriesData.slice(0, 5).map((t) => (
              <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: colorForCategory(t.name, club.color), flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: 'var(--text-secondary)', flex: 1, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</span>
                <strong style={{ fontSize: 12, fontWeight: 800 }}>{t.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="card fade-in d-4">
          <div className="card-head">
            <div>
              <h3>أكثر أنواع الفعاليات</h3>
              <p>أعلى 6 أنواع نشاطًا</p>
            </div>
          </div>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <BarChart data={typesData} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <defs>
                  <linearGradient id={`bar-${club.id}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={club.color} stopOpacity={0.95} />
                    <stop offset="100%" stopColor={club.color} stopOpacity={0.55} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.05)" horizontal={false} />
                <XAxis type="number" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" stroke="#64748b" tick={{ fontSize: 10 }} width={140} />
                <Tooltip cursor={{ fill: 'rgba(79,70,229,0.05)' }} />
                <Bar dataKey="value" fill={`url(#bar-${club.id})`} radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card fade-in d-5">
        <div className="card-head">
          <div>
            <h3>أحدث الفعاليات</h3>
            <p>عرض عينة من {club.sampleCount} فعاليات (من إجمالي {club.totalEvents})</p>
          </div>
          <span className="chip info">
            <CalendarDays size={11} /> مرتّبة من الأحدث
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {sortedEvents.map((ev) => (
            <div
              key={ev.eventId}
              className="event-item"
              style={{ flexDirection: 'column', alignItems: 'stretch', gap: 12 }}
            >
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div className="event-date">
                  <strong>{ev.day}</strong>
                  <span>{ev.month.slice(0, 3)}</span>
                </div>
                <div className="event-body">
                  <h4 style={{ marginBottom: 6 }}>{ev.title}</h4>
                  <div className="event-meta" style={{ marginBottom: 8 }}>
                    <span><MapPin size={11} /> {ev.location}</span>
                    <span><Clock size={11} /> {ev.time} • {ev.hour}:{String(ev.minute || '0').padStart(2, '0')}</span>
                    <span><Users size={11} /> {ev.participants} مستفيد</span>
                    <span><Award size={11} /> {ev.points} نقطة</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span
                      className="chip"
                      style={{
                        padding: '3px 10px',
                        fontSize: 10.5,
                        color: colorForCategory(ev.category),
                        borderColor: colorForCategory(ev.category) + '40',
                        background: colorForCategory(ev.category) + '12',
                      }}
                    >
                      <Tag size={10} /> {ev.category}
                    </span>
                    <span className="chip violet" style={{ padding: '3px 10px', fontSize: 10.5 }}>
                      {ev.type}
                    </span>
                    <span className="chip warn" style={{ padding: '3px 10px', fontSize: 10.5 }}>
                      فئة {ev.label}
                    </span>
                  </div>
                </div>
              </div>

              {ev.details && (
                <div style={{ paddingRight: 74 }}>
                  <p
                    style={{
                      fontSize: 12.5,
                      color: 'var(--text-secondary)',
                      lineHeight: 1.7,
                      whiteSpace: 'pre-wrap',
                      maxHeight: expandedEvent === ev.eventId ? 'none' : 80,
                      overflow: 'hidden',
                      position: 'relative',
                      marginBottom: 6,
                    }}
                  >
                    {ev.details}
                  </p>
                  {ev.details.length > 200 && (
                    <button
                      onClick={() => setExpandedEvent(expandedEvent === ev.eventId ? null : ev.eventId)}
                      style={{
                        fontSize: 11.5,
                        color: club.color,
                        fontWeight: 700,
                        padding: '4px 0',
                      }}
                    >
                      {expandedEvent === ev.eventId ? 'إخفاء التفاصيل ▲' : 'عرض المزيد ▼'}
                    </button>
                  )}
                </div>
              )}

              {(ev.images.length > 0 || ev.video) && (
                <div style={{ paddingRight: 74, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {ev.images.slice(0, 4).map((src, idx) => (
                    <a key={idx} href={src} target="_blank" rel="noreferrer"
                       style={{
                         width: 72, height: 72, borderRadius: 12,
                         overflow: 'hidden',
                         border: '1px solid var(--border)',
                         display: 'block',
                         position: 'relative',
                         background: 'var(--bg-2)',
                         boxShadow: 'var(--shadow-soft)',
                       }}>
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                      />
                    </a>
                  ))}
                  {ev.video && (
                    <a href={ev.video} target="_blank" rel="noreferrer"
                       style={{
                         width: 72, height: 72, borderRadius: 12,
                         display: 'grid', placeItems: 'center',
                         background: `linear-gradient(135deg, ${club.color}25, ${club.color}10)`,
                         border: `1px solid ${club.color}40`,
                         color: club.color,
                       }}>
                      <Video size={22} />
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card fade-in d-6" style={{ background: `linear-gradient(135deg, ${club.color}08, transparent)` }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: `${club.color}15`,
            color: club.color,
            display: 'grid', placeItems: 'center',
          }}>
            <UserCheck size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: 14, fontWeight: 800, marginBottom: 3 }}>آلية احتساب النقاط</h4>
            <p style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
              النقاط تُحسب وفق <strong>آلية تقييم الأنشطة الطلابية</strong> الصادرة عن عمادة شؤون الطلاب بجامعة القصيم،
              بناءً على نوع الفعالية وفئة التقييم (أ/ب/ج/د).
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
