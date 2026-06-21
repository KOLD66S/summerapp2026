import React from 'react'
import { Download, Share2, TrendingUp, Sparkles, Activity, Target, Zap } from 'lucide-react'
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart, Area, Bar,
  ScatterChart, Scatter, ZAxis
} from 'recharts'
import { radarData, engagementData, clubs, collegeData } from '../data'

const scatterData = clubs.map((c) => ({
  x: c.members,
  y: c.events,
  z: c.budget,
  name: c.name,
  color: c.color,
}))

export default function AnalyticsPage() {
  return (
    <>
      <div className="page-header fade-in">
        <div>
          <h1>التحليلات المتقدمة</h1>
          <p>رؤى عميقة ومؤشرات أداء حقيقية للأندية والفعاليات</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn"><Share2 size={15} /> مشاركة</button>
          <button className="btn primary"><Download size={15} /> تصدير التقرير</button>
        </div>
      </div>

      <div className="kpi-grid fade-in d-1">
        <div className="kpi-mini">
          <div className="kpi-mini-label"><Sparkles size={11} style={{ verticalAlign: 'middle' }} /> مؤشر النشاط العام</div>
          <div className="kpi-mini-value" style={{ color: 'var(--emerald)' }}>92.4</div>
          <div className="kpi-mini-sub">+6.2 نقطة من الفصل السابق</div>
        </div>
        <div className="kpi-mini">
          <div className="kpi-mini-label"><Target size={11} style={{ verticalAlign: 'middle' }} /> تحقيق الأهداف</div>
          <div className="kpi-mini-value" style={{ color: 'var(--cyan)' }}>87%</div>
          <div className="kpi-mini-sub">من المستهدف السنوي</div>
        </div>
        <div className="kpi-mini">
          <div className="kpi-mini-label"><Zap size={11} style={{ verticalAlign: 'middle' }} /> سرعة الاستجابة</div>
          <div className="kpi-mini-value" style={{ color: 'var(--violet)' }}>1.4<span style={{ fontSize: 14, color: 'var(--text-muted)' }}> يوم</span></div>
          <div className="kpi-mini-sub">معدل معالجة الطلبات</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card fade-in d-2">
          <div className="card-head">
            <div>
              <h3>الأداء الشامل للأندية</h3>
              <p>تقييم متعدد الأبعاد للأنشطة الطلابية</p>
            </div>
            <span className="chip violet"><Sparkles size={11} /> AI-Powered</span>
          </div>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="skill" stroke="#a8b0d4" tick={{ fontSize: 12, fontWeight: 700 }} />
                <PolarRadiusAxis stroke="#6b7494" tick={{ fontSize: 10 }} />
                <Radar
                  name="الأداء"
                  dataKey="value"
                  stroke="#6366f1"
                  fill="url(#radarFill)"
                  fillOpacity={0.5}
                  strokeWidth={2.5}
                />
                <defs>
                  <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity={0.3} />
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
              <h3>رضا الطلاب</h3>
              <p>مؤشر الرضا الشهري عن الأنشطة</p>
            </div>
          </div>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" stroke="#6b7494" tick={{ fontSize: 11 }} />
                <YAxis stroke="#6b7494" tick={{ fontSize: 11 }} domain={[70, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="satisfaction"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, stroke: '#0a0d1a', r: 5 }}
                  activeDot={{ r: 8, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
                  name="نسبة الرضا %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card fade-in d-4">
        <div className="card-head">
          <div>
            <h3>خريطة الأندية - علاقة الأعضاء بالفعاليات والميزانية</h3>
            <p>كل نقطة تمثل نادياً • الحجم = الميزانية</p>
          </div>
          <span className="chip info"><Activity size={11} /> Scatter Analysis</span>
        </div>
        <div style={{ width: '100%', height: 360 }}>
          <ResponsiveContainer>
            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                type="number"
                dataKey="x"
                name="الأعضاء"
                stroke="#6b7494"
                tick={{ fontSize: 11 }}
                label={{ value: 'عدد الأعضاء', position: 'insideBottom', offset: -10, fill: '#a8b0d4' }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="الفعاليات"
                stroke="#6b7494"
                tick={{ fontSize: 11 }}
                label={{ value: 'عدد الفعاليات', angle: -90, position: 'insideLeft', fill: '#a8b0d4' }}
              />
              <ZAxis type="number" dataKey="z" range={[200, 1200]} name="الميزانية" />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload[0]) {
                    const d = payload[0].payload
                    return (
                      <div style={{
                        background: 'rgba(10,13,26,0.95)',
                        border: `1px solid ${d.color}`,
                        borderRadius: 12, padding: '10px 14px',
                        boxShadow: `0 8px 30px ${d.color}40`
                      }}>
                        <strong style={{ display: 'block', marginBottom: 4 }}>{d.name}</strong>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>الأعضاء: {d.x}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>الفعاليات: {d.y}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>الميزانية: {d.z.toLocaleString('ar-EG')} ر.س</div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              {scatterData.map((d, i) => (
                <Scatter key={i} data={[d]} fill={d.color} fillOpacity={0.8} />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card fade-in d-5">
        <div className="card-head">
          <div>
            <h3>تحليل مركّب — نمو الأعضاء والفعاليات</h3>
            <p>مزيج بين أعداد الأعضاء (شريط) ومنحنى الفعاليات</p>
          </div>
        </div>
        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer>
            <ComposedChart data={engagementData}>
              <defs>
                <linearGradient id="composeBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.3} />
                </linearGradient>
                <linearGradient id="composeArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" stroke="#6b7494" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" stroke="#6b7494" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" stroke="#6b7494" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar yAxisId="left" dataKey="members" fill="url(#composeBar)" radius={[6, 6, 0, 0]} name="الأعضاء" />
              <Area yAxisId="right" type="monotone" dataKey="events" stroke="#06b6d4" strokeWidth={2.5} fill="url(#composeArea)" name="الفعاليات" />
              <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#10b981" strokeWidth={2.5} dot={false} name="الرضا" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card fade-in d-6" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.05))' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, display: 'grid', placeItems: 'center',
            background: 'var(--grad-primary)', color: '#fff',
            boxShadow: '0 12px 32px var(--accent-glow)'
          }}>
            <Sparkles size={26} />
          </div>
          <div style={{ flex: 1, minWidth: 300 }}>
            <div className="chip violet" style={{ marginBottom: 10 }}>توصيات ذكية</div>
            <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 8 }}>تحليل الذكاء الاصطناعي يوصي بالتالي:</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.7 }}>
                <TrendingUp size={16} color="var(--emerald)" style={{ marginTop: 2, flexShrink: 0 }} />
                <span><strong style={{ color: '#fff' }}>زيادة الميزانية لنادي ريادة الأعمال</strong> — يحقق أعلى نمو شهري (+41.7%) وعائد عالٍ على كل ريال مستثمر.</span>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.7 }}>
                <Target size={16} color="var(--cyan)" style={{ marginTop: 2, flexShrink: 0 }} />
                <span><strong style={{ color: '#fff' }}>دمج فعاليات نادي البحث ونادي الذكاء الاصطناعي</strong> — تشابه في الجمهور المستهدف بنسبة 78%.</span>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.7 }}>
                <Zap size={16} color="var(--gold)" style={{ marginTop: 2, flexShrink: 0 }} />
                <span><strong style={{ color: '#fff' }}>تفعيل برنامج حوافز كلية الطب</strong> — أقل نسبة مشاركة (8%) رغم حجم الكلية.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
