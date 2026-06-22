import React from 'react'
import { Download, Share2, TrendingUp, Sparkles, Activity, Target, Zap, Award } from 'lucide-react'
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart, Area, Bar,
  ScatterChart, Scatter, ZAxis, PieChart, Pie, Cell
} from 'recharts'
import { clubs, summary, monthlyTrend, activityTypes, modes, programName, colorForType } from '../thamar'

const scatterData = clubs.map((c) => ({
  x: c.activities,
  y: c.uniqueStudents,
  z: c.points,
  name: c.name,
  color: c.color,
}))

const radarData = clubs.slice(0, 6).map(c => ({
  club: c.name.replace('نادي ', ''),
  activities: c.activities,
  full: Math.max(...clubs.map(c => c.activities)),
}))

export default function AnalyticsPage() {
  return (
    <>
      <div className="page-header fade-in">
        <div>
          <h1>التحليلات المتقدمة</h1>
          <p>رؤى عميقة ومؤشرات أداء فعلية مستخرجة من بيانات {programName}</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn"><Share2 size={15} /> مشاركة</button>
          <button className="btn primary"><Download size={15} /> تصدير التقرير</button>
        </div>
      </div>

      <div className="kpi-grid fade-in d-1">
        <div className="kpi-mini">
          <div className="kpi-mini-label"><Sparkles size={11} style={{ verticalAlign: 'middle' }} /> متوسط أنشطة النادي</div>
          <div className="kpi-mini-value" style={{ color: 'var(--accent)' }}>
            {Math.round(summary.totalActivities / summary.totalClubs)}
          </div>
          <div className="kpi-mini-sub">نشاط لكل نادٍ في المتوسط</div>
        </div>
        <div className="kpi-mini">
          <div className="kpi-mini-label"><Target size={11} style={{ verticalAlign: 'middle' }} /> متوسط المشاركين</div>
          <div className="kpi-mini-value" style={{ color: 'var(--cyan)' }}>
            {Math.round(summary.totalParticipants / summary.totalActivities)}
          </div>
          <div className="kpi-mini-sub">مشارك لكل نشاط</div>
        </div>
        <div className="kpi-mini">
          <div className="kpi-mini-label"><Zap size={11} style={{ verticalAlign: 'middle' }} /> متوسط النقاط</div>
          <div className="kpi-mini-value" style={{ color: 'var(--violet)' }}>
            {Math.round(summary.totalPoints / summary.totalActivities)}
          </div>
          <div className="kpi-mini-sub">نقطة لكل نشاط</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card fade-in d-2">
          <div className="card-head">
            <div>
              <h3>توزيع الأداء بين الأندية</h3>
              <p>عدد الأنشطة لأبرز 6 أندية</p>
            </div>
            <span className="chip violet"><Sparkles size={11} /> رادار</span>
          </div>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(15,23,42,0.08)" />
                <PolarAngleAxis dataKey="club" tick={{ fontSize: 11, fontWeight: 700, fill: '#475569' }} />
                <PolarRadiusAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Radar
                  name="الأنشطة"
                  dataKey="activities"
                  stroke="#4f46e5"
                  fill="url(#radarFill)"
                  fillOpacity={0.5}
                  strokeWidth={2.5}
                />
                <defs>
                  <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.25} />
                  </linearGradient>
                </defs>
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card fade-in d-3">
          <div className="card-head">
            <div>
              <h3>منحنى النمو الشهري</h3>
              <p>تطور الأنشطة عبر الأشهر</p>
            </div>
          </div>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.05)" />
                <XAxis dataKey="short" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="activities"
                  stroke="#059669"
                  strokeWidth={3}
                  dot={{ fill: '#059669', strokeWidth: 2, stroke: '#fff', r: 5 }}
                  activeDot={{ r: 8, fill: '#059669', stroke: '#fff', strokeWidth: 2 }}
                  name="أنشطة"
                />
                <Line
                  type="monotone"
                  dataKey="points"
                  stroke="#7c3aed"
                  strokeWidth={2.5}
                  strokeDasharray="5 5"
                  dot={{ fill: '#7c3aed', strokeWidth: 2, stroke: '#fff', r: 4 }}
                  name="نقاط"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card fade-in d-4">
        <div className="card-head">
          <div>
            <h3>خريطة الأندية - علاقة الأنشطة بعدد الطلاب والنقاط</h3>
            <p>كل نقطة تمثل نادياً • حجم الدائرة = النقاط</p>
          </div>
          <span className="chip info"><Activity size={11} /> تحليل ثلاثي الأبعاد</span>
        </div>
        <div style={{ width: '100%', height: 360 }}>
          <ResponsiveContainer>
            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.05)" />
              <XAxis
                type="number"
                dataKey="x"
                name="الأنشطة"
                stroke="#64748b"
                tick={{ fontSize: 11 }}
                label={{ value: 'عدد الأنشطة', position: 'insideBottom', offset: -10, fill: '#475569' }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="الطلاب الفريدون"
                stroke="#64748b"
                tick={{ fontSize: 11 }}
                label={{ value: 'الطلاب الفريدون', angle: -90, position: 'insideLeft', fill: '#475569' }}
              />
              <ZAxis type="number" dataKey="z" range={[120, 800]} name="النقاط" />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload[0]) {
                    const d = payload[0].payload
                    return (
                      <div style={{
                        background: '#fff',
                        border: `2px solid ${d.color}`,
                        borderRadius: 12, padding: '10px 14px',
                        boxShadow: `0 8px 30px ${d.color}30`
                      }}>
                        <strong style={{ display: 'block', marginBottom: 4, color: 'var(--text-primary)' }}>{d.name}</strong>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>الأنشطة: {d.x}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>الطلاب: {d.y}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>النقاط: {d.z}</div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              {scatterData.map((d, i) => (
                <Scatter key={i} data={[d]} fill={d.color} fillOpacity={0.75} />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card fade-in d-5">
        <div className="card-head">
          <div>
            <h3>تحليل مركّب — الأنشطة والمشاركات والنقاط</h3>
            <p>عرض متكامل للنمو الشهري</p>
          </div>
        </div>
        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer>
            <ComposedChart data={monthlyTrend}>
              <defs>
                <linearGradient id="composeBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.85} />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.3} />
                </linearGradient>
                <linearGradient id="composeArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0891b2" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.05)" />
              <XAxis dataKey="short" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar yAxisId="left" dataKey="activities" fill="url(#composeBar)" radius={[6, 6, 0, 0]} name="أنشطة" />
              <Area yAxisId="right" type="monotone" dataKey="participants" stroke="#0891b2" strokeWidth={2.5} fill="url(#composeArea)" name="مشاركات" />
              <Line yAxisId="right" type="monotone" dataKey="points" stroke="#059669" strokeWidth={2.5} dot={false} name="نقاط" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card fade-in d-6" style={{ background: 'linear-gradient(135deg, rgba(5,150,105,0.08), rgba(8,145,178,0.04))' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, display: 'grid', placeItems: 'center',
            background: 'var(--grad-thamar)', color: '#fff',
            boxShadow: '0 12px 32px rgba(5, 150, 105, 0.35)'
          }}>
            <Sparkles size={26} />
          </div>
          <div style={{ flex: 1, minWidth: 300 }}>
            <div className="chip violet" style={{ marginBottom: 10 }}>توصيات ذكية</div>
            <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 8 }}>تحليل البيانات يكشف عن الفرص التالية:</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.7 }}>
                <TrendingUp size={16} color="var(--emerald)" style={{ marginTop: 2, flexShrink: 0 }} />
                <span><strong style={{ color: 'var(--text-primary)' }}>{clubs[0].name}</strong> هو الأعلى أداءً بـ {clubs[0].activities} نشاطاً — نموذج يحتذى به للتوسع.</span>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.7 }}>
                <Target size={16} color="var(--cyan)" style={{ marginTop: 2, flexShrink: 0 }} />
                <span><strong style={{ color: 'var(--text-primary)' }}>{Math.round((modes.find(m => m.name === 'حضوري')?.value || 0) / summary.totalActivities * 100)}% من الأنشطة حضورية</strong> — يدل على عودة قوية للتفاعل المباشر بعد الجائحة.</span>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.7 }}>
                <Award size={16} color="var(--gold)" style={{ marginTop: 2, flexShrink: 0 }} />
                <span><strong style={{ color: 'var(--text-primary)' }}>{activityTypes[0].name}</strong> الأكثر شيوعاً ({activityTypes[0].value} نشاط) — يستحق دعماً إضافياً وميزانية مخصصة.</span>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.7 }}>
                <Zap size={16} color="var(--violet)" style={{ marginTop: 2, flexShrink: 0 }} />
                <span><strong style={{ color: 'var(--text-primary)' }}>{summary.uniqueStudents} طالباً فريداً</strong> ولدوا {summary.totalParticipants.toLocaleString('ar-EG')} مشاركة — متوسط {(summary.totalParticipants / summary.uniqueStudents).toFixed(1)} نشاط/طالب.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
