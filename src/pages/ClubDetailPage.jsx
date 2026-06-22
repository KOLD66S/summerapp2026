import React from 'react'
import {
  ArrowRight, Users, CalendarDays, Award, Activity, MapPin, Clock,
  UserCheck, Sparkles, TrendingUp
} from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from 'recharts'
import { clubs, allActivities, colorForType } from '../thamar'
import { useRouter } from '../router'

export default function ClubDetailPage({ id }) {
  const club = clubs.find((c) => c.id === id) || clubs[0]
  const clubActs = allActivities.filter(a => a.clubName === club.name)
  const { navigate } = useRouter()

  // Monthly breakdown for this club
  const monthly = {}
  for (const a of clubActs) {
    const k = (a.date || '').slice(0, 7)
    if (!k) continue
    if (!monthly[k]) monthly[k] = { month: k, count: 0, participants: 0, points: 0 }
    monthly[k].count += 1
    monthly[k].participants += a.participantCount
    monthly[k].points += a.points
  }
  const months = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']
  const monthlyData = Object.values(monthly).sort((a, b) => a.month.localeCompare(b.month))
    .map(m => {
      const [yr, mo] = m.month.split('-')
      return { ...m, short: months[parseInt(mo) - 1] }
    })

  // Activity types for this club
  const typesMap = {}
  for (const a of clubActs) {
    typesMap[a.type] = (typesMap[a.type] || 0) + 1
  }
  const typesData = Object.entries(typesMap).map(([name, value]) => ({ name, value }))

  const recent = [...clubActs].sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 6)

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
          background: `linear-gradient(135deg, ${club.color}18, ${club.color}08, rgba(255,255,255,0.5))`,
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{
            width: 110, height: 110, borderRadius: 28, display: 'grid', placeItems: 'center',
            fontSize: 56, background: `linear-gradient(135deg, ${club.color}25, ${club.color}10)`,
            border: `2px solid ${club.color}50`, boxShadow: `0 16px 50px ${club.color}30`
          }} className="float-action">
            {club.logo}
          </div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
              <span className="chip" style={{ borderColor: club.color + '60', color: club.color, background: `${club.color}12` }}>
                <UserCheck size={11} /> {club.supervisor}
              </span>
              <span className="chip success"><Activity size={11} /> {club.activities} نشاط</span>
              <span className="chip gold"><Award size={11} /> {club.points} نقطة</span>
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: -0.5, color: 'var(--text-primary)', marginBottom: 6 }}>
              {club.name}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 600 }}>
              نادٍ نشط في برنامج ثمر بإشراف {club.supervisors.length} {club.supervisors.length > 1 ? 'مشرفين' : 'مشرف'}،
              نفّذ {club.activities} نشاطاً متنوعاً عبر {club.types.length} نوع مختلف.
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
          <div className="stat-value">{club.activities}</div>
          <div className="stat-label">إجمالي الأنشطة</div>
        </div>
        <div className="stat-card fade-in d-3" style={{ '--glow': 'rgba(8,145,178,0.18)', '--icon-color': 'var(--cyan)', '--icon-bg': 'var(--cyan-soft)' }}>
          <div className="stat-head">
            <div className="stat-icon"><Users size={20} strokeWidth={2.3} /></div>
            <div className="stat-trend"><TrendingUp size={12} /> فريد</div>
          </div>
          <div className="stat-value">{club.uniqueStudents}</div>
          <div className="stat-label">طلاب فريدون</div>
        </div>
        <div className="stat-card fade-in d-4" style={{ '--glow': 'rgba(217,119,6,0.18)', '--icon-color': 'var(--gold)', '--icon-bg': 'var(--gold-soft)' }}>
          <div className="stat-head">
            <div className="stat-icon"><Award size={20} strokeWidth={2.3} /></div>
            <div className="stat-trend"><Sparkles size={12} /> ممتاز</div>
          </div>
          <div className="stat-value">{club.points}</div>
          <div className="stat-label">النقاط المكتسبة</div>
        </div>
        <div className="stat-card fade-in d-5" style={{ '--glow': 'rgba(5,150,105,0.18)', '--icon-color': 'var(--emerald)', '--icon-bg': 'var(--emerald-soft)' }}>
          <div className="stat-head">
            <div className="stat-icon"><CalendarDays size={20} strokeWidth={2.3} /></div>
            <div className="stat-trend"><TrendingUp size={12} /> متنوع</div>
          </div>
          <div className="stat-value">{club.types.length}</div>
          <div className="stat-label">أنواع الأنشطة</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card fade-in d-3">
          <div className="card-head">
            <div>
              <h3>تطور النشاط الشهري</h3>
              <p>عدد الأنشطة والمشاركات</p>
            </div>
          </div>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id={`grad-${club.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={club.color} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={club.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.05)" />
                <XAxis dataKey="short" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke={club.color} strokeWidth={2.5} fill={`url(#grad-${club.id})`} name="أنشطة" />
                <Area type="monotone" dataKey="participants" stroke="#7c3aed" strokeWidth={2} fill="none" name="مشاركات" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card fade-in d-4">
          <div className="card-head">
            <div>
              <h3>توزيع الأنشطة حسب النوع</h3>
              <p>{typesData.length} نوع مختلف</p>
            </div>
          </div>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={typesData} innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {typesData.map((entry) => (
                    <Cell key={entry.name} fill={colorForType(entry.name, club.color)} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            {typesData.slice(0, 4).map((t) => (
              <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: colorForType(t.name, club.color), flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: 'var(--text-secondary)', flex: 1, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</span>
                <strong style={{ fontSize: 12, fontWeight: 800 }}>{t.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card fade-in d-5">
        <div className="card-head">
          <div>
            <h3>آخر أنشطة النادي</h3>
            <p>أحدث {recent.length} أنشطة منفذة</p>
          </div>
        </div>
        <div>
          {recent.map((a) => (
            <div key={a.activityId} className="event-item">
              <div className="event-date">
                <strong>{a.day}</strong>
                <span>{a.month.slice(0, 3)}</span>
              </div>
              <div className="event-body">
                <h4>{a.title}</h4>
                <div className="event-meta">
                  <span><MapPin size={11} /> {a.location || '—'}</span>
                  <span><Clock size={11} /> {a.time}</span>
                  <span><Users size={11} /> {a.participantCount} مشارك</span>
                  <span><Award size={11} /> {a.points} نقطة</span>
                  <span className="chip" style={{ padding: '2px 8px', fontSize: 10.5, color: colorForType(a.type), borderColor: colorForType(a.type) + '40', background: colorForType(a.type) + '12' }}>
                    {a.mode}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
