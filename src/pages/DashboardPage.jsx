import React, { useEffect, useState } from 'react'
import {
  Users, CalendarDays, Trophy, TrendingUp, ArrowUpRight, ArrowDownRight,
  Plus, Download, Sparkles, MapPin, Clock, Crown,
  UserPlus, CheckCircle2, FileText, Award, Calendar, ChevronLeft
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, RadialBarChart, RadialBar
} from 'recharts'
import { clubs, events, engagementData, collegeData, budgetData, activityItems } from '../data'
import { Link } from '../router'

function useCounter(target, duration = 1400) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(target * eased))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration])
  return val
}

function StatCard({ icon: Icon, label, value, trend, up, color, bg, glow, suffix, delay }) {
  const num = useCounter(value)
  return (
    <div
      className={`stat-card fade-in d-${delay}`}
      style={{ '--glow': glow, '--icon-color': color, '--icon-bg': bg }}
    >
      <div className="stat-head">
        <div className="stat-icon"><Icon size={20} strokeWidth={2.3} /></div>
        <div className={`stat-trend ${up ? '' : 'down'}`}>
          {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trend}
        </div>
      </div>
      <div className="stat-value">{num.toLocaleString('ar-EG')}{suffix || ''}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <>
      <div className="hero fade-in">
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div className="chip gold" style={{ marginBottom: 10 }}>
              <Sparkles size={12} /> منصة عمادة شؤون الطلاب - جامعة القصيم
            </div>
            <h1 style={{
              fontSize: 32, fontWeight: 900, letterSpacing: -0.6, lineHeight: 1.2,
              background: 'linear-gradient(135deg, #fff 0%, #c7d2fe 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
            }}>
              أهلاً وسهلاً، د. خالد 👋
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 8, maxWidth: 600 }}>
              نظرة شاملة على أداء الأندية الطلابية، الفعاليات، والمؤشرات الحيوية لحظياً
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn">
              <Download size={15} /> تصدير
            </button>
            <button className="btn primary">
              <Plus size={15} /> فعالية جديدة
            </button>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard delay={1} icon={Users} label="إجمالي الأعضاء" value={4328} trend="+12.4%" up
          color="var(--accent)" bg="var(--accent-soft)" glow="rgba(99,102,241,0.25)" />
        <StatCard delay={2} icon={Trophy} label="الأندية النشطة" value={24} trend="+3 نوادٍ" up
          color="var(--gold)" bg="var(--gold-soft)" glow="rgba(251,191,36,0.25)" />
        <StatCard delay={3} icon={CalendarDays} label="فعاليات الشهر" value={37} trend="+8.2%" up
          color="var(--cyan)" bg="var(--cyan-soft)" glow="rgba(6,182,212,0.25)" />
        <StatCard delay={4} icon={TrendingUp} label="معدل المشاركة" value={86} suffix="%" trend="-2.1%" up={false}
          color="var(--violet)" bg="var(--violet-soft)" glow="rgba(168,85,247,0.25)" />
      </div>

      <div className="grid-2">
        <EngagementChart />
        <UpcomingEvents />
      </div>

      <div className="grid-2">
        <TopClubs />
        <BudgetDonut />
      </div>

      <div className="grid-2">
        <CollegeBars />
        <RecentActivity />
      </div>

      <SatisfactionStrip />

      <footer style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-muted)', fontSize: 12 }}>
        © 2026 عمادة شؤون الطلاب — جامعة القصيم • تم البناء بتقنيات سحابية متقدمة
      </footer>
    </>
  )
}

function EngagementChart() {
  return (
    <div className="card fade-in d-2">
      <div className="card-head">
        <div>
          <h3>تطور المشاركة الطلابية</h3>
          <p>الأعضاء والفعاليات خلال آخر 8 أشهر</p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <span className="chip info"><span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)' }} /> الأعضاء</span>
          <span className="chip violet"><span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--violet)' }} /> الفعاليات</span>
        </div>
      </div>
      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer>
          <AreaChart data={engagementData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="month" stroke="#6b7494" tick={{ fontSize: 11 }} />
            <YAxis stroke="#6b7494" tick={{ fontSize: 11 }} />
            <Tooltip cursor={{ stroke: 'rgba(99,102,241,0.25)', strokeWidth: 1 }} />
            <Area type="monotone" dataKey="members" stroke="#6366f1" strokeWidth={2.5} fill="url(#colorMembers)" name="الأعضاء" />
            <Area type="monotone" dataKey="events" stroke="#a855f7" strokeWidth={2.5} fill="url(#colorEvents)" name="الفعاليات" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function UpcomingEvents() {
  const upcoming = events.slice(0, 4)
  return (
    <div className="card fade-in d-3">
      <div className="card-head">
        <div>
          <h3>الفعاليات القادمة</h3>
          <p>{events.length} فعاليات مجدولة</p>
        </div>
        <Link to="/events" className="chip">عرض الكل <ChevronLeft size={12} /></Link>
      </div>
      <div>
        {upcoming.map((e) => (
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
                <span className={`chip ${e.tag}`} style={{ padding: '2px 8px', fontSize: 10.5 }}>{e.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TopClubs() {
  const top = clubs.slice(0, 5)
  return (
    <div className="card fade-in d-4">
      <div className="card-head">
        <div>
          <h3>الأندية الأكثر نشاطاً</h3>
          <p>ترتيب الأندية حسب الأداء هذا الفصل</p>
        </div>
        <Link to="/clubs" className="chip">عرض الكل <ChevronLeft size={12} /></Link>
      </div>
      <div>
        {top.map((c, i) => (
          <Link to={`/club/${c.id}`} key={c.id} className="club-row">
            <div
              className="club-logo"
              style={{ background: `linear-gradient(135deg, ${c.color}30, ${c.color}10)`, border: `1px solid ${c.color}50`, boxShadow: `0 0 16px ${c.color}30` }}
            >
              {c.logo}
            </div>
            <div className="club-info">
              <h4>
                {i === 0 && <Crown size={13} color="var(--gold)" style={{ verticalAlign: 'middle', marginLeft: 4 }} />}
                {c.name}
              </h4>
              <span>{c.college}</span>
            </div>
            <div className="club-meta">
              <div className="meta-item">
                <strong>{c.members}</strong>
                <span>عضو</span>
              </div>
              <div className="meta-item">
                <strong>{c.events}</strong>
                <span>فعالية</span>
              </div>
              <div className="meta-item">
                <strong style={{ color: 'var(--gold)' }}>{c.rating}</strong>
                <span>تقييم</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function BudgetDonut() {
  const total = budgetData.reduce((s, d) => s + d.value, 0)
  return (
    <div className="card fade-in d-5">
      <div className="card-head">
        <div>
          <h3>توزيع الميزانية</h3>
          <p>الفصل الدراسي الحالي</p>
        </div>
        <span className="chip success">540K SAR</span>
      </div>
      <div style={{ position: 'relative', width: '100%', height: 200 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={budgetData}
              innerRadius={62}
              outerRadius={88}
              paddingAngle={3}
              dataKey="value"
              startAngle={90}
              endAngle={450}
            >
              {budgetData.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', pointerEvents: 'none'
        }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: 1 }}>الإجمالي</span>
          <strong style={{ fontSize: 22, fontWeight: 900 }}>{total}%</strong>
          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>موزّع</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
        {budgetData.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: d.color, flexShrink: 0, boxShadow: `0 0 10px ${d.color}` }} />
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', flex: 1, fontWeight: 600 }}>{d.name}</span>
            <strong style={{ fontSize: 13, fontWeight: 900 }}>{d.value}%</strong>
          </div>
        ))}
      </div>
    </div>
  )
}

function CollegeBars() {
  return (
    <div className="card fade-in d-6">
      <div className="card-head">
        <div>
          <h3>مشاركة الكليات</h3>
          <p>عدد الأعضاء حسب الكلية</p>
        </div>
        <span className="chip success">+18% هذا الفصل</span>
      </div>
      <div style={{ width: '100%', height: 240 }}>
        <ResponsiveContainer>
          <BarChart data={collegeData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="college" stroke="#6b7494" tick={{ fontSize: 11 }} />
            <YAxis stroke="#6b7494" tick={{ fontSize: 11 }} />
            <Tooltip cursor={{ fill: 'rgba(99,102,241,0.06)' }} />
            <Bar dataKey="members" fill="url(#barGrad)" radius={[8, 8, 0, 0]} name="الأعضاء" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function RecentActivity() {
  const iconMap = { join: UserPlus, approve: CheckCircle2, award: Award, request: FileText, schedule: Calendar }
  return (
    <div className="card fade-in d-7">
      <div className="card-head">
        <div>
          <h3>آخر النشاطات</h3>
          <p>تحديثات لحظية من جميع الأندية</p>
        </div>
        <span className="chip success">
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--emerald)', boxShadow: '0 0 10px var(--emerald)' }} />
          مباشر
        </span>
      </div>
      <div>
        {activityItems.map((it, i) => {
          const Icon = iconMap[it.type]
          return (
            <div key={i} className="activity-item">
              <div className="activity-dot" style={{ background: it.bg, color: it.color, boxShadow: `0 0 16px ${it.color}55` }}>
                <Icon size={15} strokeWidth={2.4} />
              </div>
              <div className="activity-body">
                <p>{it.text} <strong>{it.bold}</strong>{it.text2 || ''}</p>
                <span>{it.time}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SatisfactionStrip() {
  const data = [{ name: 'رضا', value: 93, fill: '#10b981' }]
  return (
    <div className="card fade-in d-8" style={{ background: 'linear-gradient(120deg, rgba(16,185,129,0.1), rgba(6,182,212,0.05))' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 24, alignItems: 'center' }}>
        <div style={{ width: 160, height: 160, position: 'relative' }}>
          <ResponsiveContainer>
            <RadialBarChart innerRadius="70%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
              <RadialBar background dataKey="value" cornerRadius={20} fill="#10b981" />
            </RadialBarChart>
          </ResponsiveContainer>
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
            <strong style={{ fontSize: 32, fontWeight: 900, color: 'var(--emerald)' }}>93%</strong>
          </div>
        </div>
        <div>
          <div className="chip success" style={{ marginBottom: 10 }}>
            <Sparkles size={12} /> أعلى مستوى رضا في تاريخ المنصة
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 900, letterSpacing: -0.3, marginBottom: 6 }}>
            رضا الطلاب عن الأنشطة وصل لـ 93% هذا الفصل
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.7 }}>
            بناءً على استبيان شامل لأكثر من 2,800 طالب وطالبة. زيادة بنسبة 6 نقاط مئوية مقارنة بالفصل السابق،
            مع تحسن ملحوظ في جودة الفعاليات والتجهيزات.
          </p>
        </div>
      </div>
    </div>
  )
}
