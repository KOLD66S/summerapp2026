import React, { useEffect, useState } from 'react'
import {
  Users, CalendarDays, Trophy, Award, Sparkles, Download, Plus,
  MapPin, Clock, Crown, UserCheck, Camera, Activity, TrendingUp,
  ChevronLeft, Target
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, BarChart, Bar, RadialBarChart, RadialBar
} from 'recharts'
import {
  summary, clubs, activities, activityTypes, monthlyTrend, modes,
  topSupervisors, supervisor, programName, programTagline, colorForType
} from '../thamar'
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

function StatCard({ icon: Icon, label, value, trend, up = true, color, bg, glow, suffix, delay }) {
  const num = useCounter(value)
  return (
    <div
      className={`stat-card fade-in d-${delay}`}
      style={{ '--glow': glow, '--icon-color': color, '--icon-bg': bg }}
    >
      <div className="stat-head">
        <div className="stat-icon"><Icon size={20} strokeWidth={2.3} /></div>
        {trend && (
          <div className={`stat-trend ${up ? '' : 'down'}`}>
            <TrendingUp size={12} /> {trend}
          </div>
        )}
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
            <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
              <span className="chip success">
                <Sparkles size={12} /> منصة {programName}
              </span>
              <span className="chip violet">
                إشراف {supervisor.name}
              </span>
            </div>
            <h1 style={{ fontSize: 34, fontWeight: 900, letterSpacing: -0.8, lineHeight: 1.2, color: 'var(--text-primary)' }}>
              أهلاً وسهلاً، <span className="text-gradient">{supervisor.name}</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14.5, marginTop: 8, maxWidth: 620 }}>
              نظرة شاملة على أداء الأندية والأنشطة الطلابية في {programName} — البيانات المعروضة لحظية ومستندة على سجلات المنصة.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn"><Download size={15} /> تصدير</button>
            <button className="btn primary"><Plus size={15} /> نشاط جديد</button>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard delay={1} icon={Activity} label="إجمالي الأنشطة" value={summary.totalActivities}
          color="var(--accent)" bg="var(--accent-soft)" glow="rgba(79,70,229,0.18)" trend="+22%" />
        <StatCard delay={2} icon={Users} label="الأندية النشطة" value={summary.totalClubs}
          color="var(--emerald)" bg="var(--emerald-soft)" glow="rgba(5,150,105,0.18)" trend="نشط" />
        <StatCard delay={3} icon={UserCheck} label="مشاركات الطلاب" value={summary.totalParticipants}
          color="var(--cyan)" bg="var(--cyan-soft)" glow="rgba(8,145,178,0.18)" trend="+18%" />
        <StatCard delay={4} icon={Award} label="مجموع النقاط" value={summary.totalPoints}
          color="var(--violet)" bg="var(--violet-soft)" glow="rgba(124,58,237,0.18)" trend="إنجاز" />
      </div>

      <div className="kpi-grid fade-in d-5">
        <div className="kpi-mini">
          <div className="kpi-mini-label"><Users size={11} style={{ verticalAlign: 'middle' }} /> طلاب فريدون</div>
          <div className="kpi-mini-value">{summary.uniqueStudents.toLocaleString('ar-EG')}</div>
          <div className="kpi-mini-sub">طالب وطالبة مشاركون فعلياً</div>
        </div>
        <div className="kpi-mini">
          <div className="kpi-mini-label"><UserCheck size={11} style={{ verticalAlign: 'middle' }} /> المشرفون</div>
          <div className="kpi-mini-value">{summary.totalSupervisors}</div>
          <div className="kpi-mini-sub">عضو هيئة تدريس مشرف</div>
        </div>
        <div className="kpi-mini">
          <div className="kpi-mini-label"><Camera size={11} style={{ verticalAlign: 'middle' }} /> صور موثقة</div>
          <div className="kpi-mini-value">{summary.totalPhotos.toLocaleString('ar-EG')}</div>
          <div className="kpi-mini-sub">من الأنشطة والفعاليات</div>
        </div>
      </div>

      <div className="grid-2">
        <ActivityTrend />
        <TopClubsCard />
      </div>

      <div className="grid-2">
        <RecentEventsCard />
        <ActivityTypesDonut />
      </div>

      <div className="grid-2">
        <ModeBars />
        <TopSupervisorsCard />
      </div>

      <SatisfactionStrip />

      <footer style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-muted)', fontSize: 12 }}>
        © 2026 {programName} • {supervisor.name} • جامعة القصيم
      </footer>
    </>
  )
}

function ActivityTrend() {
  return (
    <div className="card fade-in d-3">
      <div className="card-head">
        <div>
          <h3>تطور الأنشطة عبر الأشهر</h3>
          <p>نمو عدد الأنشطة والمشاركات الشهرية</p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <span className="chip info"><span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)' }} /> أنشطة</span>
          <span className="chip violet"><span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--violet)' }} /> مشاركات</span>
        </div>
      </div>
      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer>
          <AreaChart data={monthlyTrend} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.42} />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="parGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.05)" />
            <XAxis dataKey="short" stroke="#64748b" tick={{ fontSize: 11 }} />
            <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
            <Tooltip />
            <Area type="monotone" dataKey="activities" stroke="#4f46e5" strokeWidth={2.5} fill="url(#actGrad)" name="أنشطة" />
            <Area type="monotone" dataKey="participants" stroke="#7c3aed" strokeWidth={2.5} fill="url(#parGrad)" name="مشاركات" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function TopClubsCard() {
  const top = clubs.slice(0, 5)
  return (
    <div className="card fade-in d-4">
      <div className="card-head">
        <div>
          <h3>الأندية الأكثر نشاطاً</h3>
          <p>ترتيب الأندية حسب عدد الأنشطة</p>
        </div>
        <Link to="/clubs" className="chip">عرض الكل <ChevronLeft size={12} /></Link>
      </div>
      <div>
        {top.map((c, i) => (
          <Link to={`/club/${c.id}`} key={c.id} className="club-row">
            <div
              className="club-logo"
              style={{
                background: `linear-gradient(135deg, ${c.color}25, ${c.color}10)`,
                border: `1px solid ${c.color}50`,
                boxShadow: `0 4px 16px ${c.color}25`
              }}
            >
              {c.logo}
            </div>
            <div className="club-info">
              <h4>
                {i === 0 && <Crown size={13} color="#d97706" style={{ verticalAlign: 'middle', marginLeft: 4 }} />}
                {c.name}
              </h4>
              <span>{c.supervisor}</span>
            </div>
            <div className="club-meta">
              <div className="meta-item">
                <strong>{c.activities}</strong>
                <span>نشاط</span>
              </div>
              <div className="meta-item">
                <strong>{c.members}</strong>
                <span>مشاركة</span>
              </div>
              <div className="meta-item">
                <strong style={{ color: 'var(--gold)' }}>{c.points}</strong>
                <span>نقطة</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function RecentEventsCard() {
  const recent = activities.slice(0, 5)
  return (
    <div className="card fade-in d-5">
      <div className="card-head">
        <div>
          <h3>آخر الأنشطة المنفذة</h3>
          <p>الأنشطة الأحدث في المنصة</p>
        </div>
        <Link to="/events" className="chip">عرض الكل <ChevronLeft size={12} /></Link>
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
                <span><MapPin size={11} /> {a.location || 'غير محدد'}</span>
                <span><Clock size={11} /> {a.time}</span>
                <span><Users size={11} /> {a.participantCount}</span>
                <span className="chip" style={{ padding: '2px 8px', fontSize: 10.5, color: colorForType(a.type), borderColor: colorForType(a.type) + '40', background: colorForType(a.type) + '12' }}>
                  {a.clubName}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ActivityTypesDonut() {
  const top = activityTypes.slice(0, 6)
  return (
    <div className="card fade-in d-6">
      <div className="card-head">
        <div>
          <h3>أنواع الأنشطة</h3>
          <p>توزيع الأنشطة حسب النوع</p>
        </div>
      </div>
      <div style={{ position: 'relative', width: '100%', height: 220 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={top} innerRadius={62} outerRadius={92} paddingAngle={3} dataKey="value" startAngle={90} endAngle={450}>
              {top.map((entry) => (
                <Cell key={entry.name} fill={colorForType(entry.name)} stroke="none" />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: 1 }}>الأنواع</span>
          <strong style={{ fontSize: 24, fontWeight: 900 }}>{summary.uniqueTypes}</strong>
          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>متنوعة</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
        {top.slice(0, 4).map((d) => (
          <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: colorForType(d.name), flexShrink: 0, boxShadow: `0 0 8px ${colorForType(d.name)}55` }} />
            <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', flex: 1, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</span>
            <strong style={{ fontSize: 13, fontWeight: 900 }}>{d.value}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}

function ModeBars() {
  const data = modes.map(m => ({ ...m, color: m.name === 'حضوري' ? '#059669' : '#7c3aed' }))
  return (
    <div className="card fade-in d-7">
      <div className="card-head">
        <div>
          <h3>نمط تنفيذ الأنشطة</h3>
          <p>التوزيع بين الحضوري والافتراضي</p>
        </div>
        <span className="chip success">{Math.round((modes.find(m => m.name === 'حضوري')?.value || 0) / summary.totalActivities * 100)}% حضوري</span>
      </div>
      <div style={{ width: '100%', height: 220 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }} layout="vertical">
            <defs>
              <linearGradient id="modeBar" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="100%" stopColor="#0891b2" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.05)" horizontal={false} />
            <XAxis type="number" stroke="#64748b" tick={{ fontSize: 11 }} />
            <YAxis type="category" dataKey="name" stroke="#64748b" tick={{ fontSize: 12, fontWeight: 700 }} width={80} />
            <Tooltip />
            <Bar dataKey="value" fill="url(#modeBar)" radius={[0, 8, 8, 0]} name="الأنشطة" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function TopSupervisorsCard() {
  const top = topSupervisors.slice(0, 5)
  return (
    <div className="card fade-in d-8">
      <div className="card-head">
        <div>
          <h3>المشرفون المتميزون</h3>
          <p>الأكثر إشرافاً على الأنشطة</p>
        </div>
        <Link to="/supervisors" className="chip">الكل <ChevronLeft size={12} /></Link>
      </div>
      <div>
        {top.map((s, i) => (
          <div key={s.name} className="activity-item">
            <div className="activity-dot" style={{
              background: i === 0 ? 'var(--gold-soft)' : 'var(--accent-soft)',
              color: i === 0 ? 'var(--gold)' : 'var(--accent)',
              borderColor: i === 0 ? 'var(--gold)' : 'var(--accent)'
            }}>
              <UserCheck size={16} strokeWidth={2.3} />
            </div>
            <div className="activity-body" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <p><strong>{s.name}</strong></p>
                <span>{s.activities} نشاط • {s.clubCount} ناد{s.clubCount > 1 ? '/أندية' : ''}</span>
              </div>
              <span className="chip gold" style={{ fontSize: 11 }}>{s.points} نقطة</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SatisfactionStrip() {
  const participationRate = Math.round((summary.totalParticipants / (summary.uniqueStudents * 2)) * 100)
  const data = [{ name: 'مشاركة', value: Math.min(participationRate, 95), fill: '#059669' }]
  return (
    <div className="card fade-in d-8" style={{ background: 'linear-gradient(120deg, rgba(5,150,105,0.06), rgba(8,145,178,0.04))' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 24, alignItems: 'center' }}>
        <div style={{ width: 160, height: 160, position: 'relative' }}>
          <ResponsiveContainer>
            <RadialBarChart innerRadius="70%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
              <RadialBar background={{ fill: 'rgba(5,150,105,0.10)' }} dataKey="value" cornerRadius={20} fill="#059669" />
            </RadialBarChart>
          </ResponsiveContainer>
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
            <strong style={{ fontSize: 30, fontWeight: 900, color: 'var(--emerald)' }}>{participationRate}%</strong>
          </div>
        </div>
        <div>
          <div className="chip success" style={{ marginBottom: 10 }}>
            <Sparkles size={12} /> {programName} يحقق نتائج استثنائية
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 900, letterSpacing: -0.3, marginBottom: 8 }}>
            معدل مشاركة الطلاب عبر {summary.totalClubs} أندية وصل لمستوى ممتاز
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.7 }}>
            بلغ إجمالي مشاركات الطلاب {summary.totalParticipants.toLocaleString('ar-EG')} مشاركة من {summary.uniqueStudents.toLocaleString('ar-EG')} طالب وطالبة فريد،
            بإشراف {summary.totalSupervisors} عضواً من هيئة التدريس و{summary.totalPhotos.toLocaleString('ar-EG')} صورة موثقة.
          </p>
        </div>
      </div>
    </div>
  )
}
