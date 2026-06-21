import React from 'react'
import {
  ArrowRight, Users, CalendarDays, Star, TrendingUp, Award,
  MapPin, Clock, Wallet, Sparkles
} from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts'
import { clubs, events, engagementData } from '../data'
import { Link, useRouter } from '../router'

export default function ClubDetailPage({ id }) {
  const club = clubs.find((c) => c.id === id) || clubs[0]
  const clubEvents = events.filter((e) => e.club === club.name).slice(0, 5)
  const { navigate } = useRouter()

  const fakeMonthly = engagementData.map((d, i) => ({
    month: d.month,
    members: Math.round(d.members * (0.08 + i * 0.012)),
    events: Math.max(1, Math.round(d.events * 0.4)),
  }))

  return (
    <>
      <button
        onClick={() => navigate('/clubs')}
        className="chip fade-in"
        style={{ alignSelf: 'flex-start', padding: '6px 14px', cursor: 'pointer' }}
      >
        <ArrowRight size={13} /> العودة إلى الأندية
      </button>

      <div
        className="hero fade-in d-1"
        style={{
          background: `linear-gradient(135deg, ${club.color}30, ${club.color}10, rgba(10,13,26,0.6))`,
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{
            width: 110, height: 110, borderRadius: 28, display: 'grid', placeItems: 'center',
            fontSize: 54, background: `linear-gradient(135deg, ${club.color}50, ${club.color}20)`,
            border: `2px solid ${club.color}`, boxShadow: `0 0 60px ${club.color}50`
          }}>
            {club.logo}
          </div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
              <span className="chip" style={{ borderColor: club.color, color: club.color, background: `${club.color}15` }}>
                {club.college}
              </span>
              <span className="chip gold"><Star size={11} /> {club.rating}</span>
              <span className="chip success"><TrendingUp size={11} /> +{club.growth}%</span>
            </div>
            <h1 style={{
              fontSize: 32, fontWeight: 900, letterSpacing: -0.5,
              background: 'linear-gradient(135deg, #fff, #c7d2fe)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              marginBottom: 6
            }}>
              {club.name}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 600 }}>{club.description}</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn"><Wallet size={14} /> الميزانية</button>
            <button className="btn primary"><Sparkles size={14} /> دعم النادي</button>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card fade-in d-2" style={{ '--glow': `${club.color}30`, '--icon-color': club.color, '--icon-bg': `${club.color}20` }}>
          <div className="stat-head">
            <div className="stat-icon"><Users size={20} strokeWidth={2.3} /></div>
            <div className="stat-trend"><TrendingUp size={12} />+{club.growth}%</div>
          </div>
          <div className="stat-value">{club.members.toLocaleString('ar-EG')}</div>
          <div className="stat-label">إجمالي الأعضاء</div>
        </div>
        <div className="stat-card fade-in d-3" style={{ '--glow': 'rgba(6,182,212,0.25)', '--icon-color': 'var(--cyan)', '--icon-bg': 'var(--cyan-soft)' }}>
          <div className="stat-head">
            <div className="stat-icon"><CalendarDays size={20} strokeWidth={2.3} /></div>
            <div className="stat-trend"><TrendingUp size={12} />+22%</div>
          </div>
          <div className="stat-value">{club.events}</div>
          <div className="stat-label">فعاليات هذا الفصل</div>
        </div>
        <div className="stat-card fade-in d-4" style={{ '--glow': 'rgba(251,191,36,0.25)', '--icon-color': 'var(--gold)', '--icon-bg': 'var(--gold-soft)' }}>
          <div className="stat-head">
            <div className="stat-icon"><Award size={20} strokeWidth={2.3} /></div>
            <div className="stat-trend"><Star size={12} />ممتاز</div>
          </div>
          <div className="stat-value">{club.rating}</div>
          <div className="stat-label">تقييم الطلاب</div>
        </div>
        <div className="stat-card fade-in d-5" style={{ '--glow': 'rgba(16,185,129,0.25)', '--icon-color': 'var(--emerald)', '--icon-bg': 'var(--emerald-soft)' }}>
          <div className="stat-head">
            <div className="stat-icon"><Wallet size={20} strokeWidth={2.3} /></div>
            <div className="stat-trend"><TrendingUp size={12} />متاح</div>
          </div>
          <div className="stat-value">{(club.budget / 1000).toFixed(0)}K</div>
          <div className="stat-label">الميزانية (SAR)</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card fade-in d-3">
          <div className="card-head">
            <div>
              <h3>نمو العضوية</h3>
              <p>تطور أعداد الأعضاء عبر الأشهر</p>
            </div>
          </div>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <AreaChart data={fakeMonthly}>
                <defs>
                  <linearGradient id={`grad-${club.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={club.color} stopOpacity={0.6} />
                    <stop offset="100%" stopColor={club.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" stroke="#6b7494" tick={{ fontSize: 11 }} />
                <YAxis stroke="#6b7494" tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="members" stroke={club.color} strokeWidth={2.5} fill={`url(#grad-${club.id})`} name="الأعضاء" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card fade-in d-4">
          <div className="card-head">
            <div>
              <h3>الإنجازات والجوائز</h3>
              <p>أبرز ما حققه النادي</p>
            </div>
            <span className="chip gold"><Award size={11} /> متميز</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {club.achievements.map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: 14,
                borderRadius: 'var(--radius-md)', background: 'rgba(251,191,36,0.05)',
                border: '1px solid rgba(251,191,36,0.2)'
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, display: 'grid', placeItems: 'center',
                  background: 'var(--gold-soft)', color: 'var(--gold)',
                  border: '1px solid var(--gold)', boxShadow: '0 0 20px var(--gold-glow)'
                }}>
                  <Award size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: 14, fontWeight: 800, display: 'block' }}>{a}</strong>
                  <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>عام 2025-2026</span>
                </div>
                <Sparkles size={14} color="var(--gold)" />
              </div>
            ))}
            <div style={{
              padding: 18, borderRadius: 'var(--radius-md)',
              background: `linear-gradient(135deg, ${club.color}15, transparent)`,
              border: `1px dashed ${club.color}60`, textAlign: 'center'
            }}>
              <strong style={{ fontSize: 22, fontWeight: 900, color: club.color }}>{club.achievements.length}+</strong>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>إنجاز موثّق هذا العام</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card fade-in d-5">
        <div className="card-head">
          <div>
            <h3>فعاليات النادي القادمة</h3>
            <p>الفعاليات المجدولة لهذا النادي</p>
          </div>
          <Link to="/events" className="chip">عرض الكل</Link>
        </div>
        {clubEvents.length > 0 ? (
          <div>
            {clubEvents.map((e) => (
              <div key={e.id} className="event-item">
                <div className="event-date">
                  <strong>{e.day}</strong>
                  <span>{e.month}</span>
                </div>
                <div className="event-body">
                  <h4>{e.title}</h4>
                  <div className="event-meta">
                    <span><MapPin size={11} /> {e.location}</span>
                    <span><Clock size={11} /> {e.time}</span>
                    <span><Users size={11} /> {e.attendees}/{e.capacity}</span>
                    <span className={`chip ${e.tag}`} style={{ padding: '2px 8px', fontSize: 10.5 }}>{e.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 30, color: 'var(--text-muted)' }}>
            لا توجد فعاليات قادمة مجدولة حالياً
          </div>
        )}
      </div>
    </>
  )
}
