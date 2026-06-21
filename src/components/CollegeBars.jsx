import React from 'react'
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const data = [
  { college: 'الحاسب', value: 624 },
  { college: 'الهندسة', value: 512 },
  { college: 'الطب', value: 398 },
  { college: 'الآداب', value: 471 },
  { college: 'العلوم', value: 286 },
  { college: 'التربية', value: 342 },
  { college: 'إدارة', value: 405 },
]

export default function CollegeBars() {
  return (
    <div className="card fade-in d-3">
      <div className="card-head">
        <div>
          <h3>مشاركة الكليات</h3>
          <p>عدد الأعضاء في الأندية حسب الكلية</p>
        </div>
        <span className="chip success">+18% هذا الفصل</span>
      </div>

      <div style={{ width: '100%', height: 220 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="college" stroke="#6b7494" tick={{ fontSize: 11 }} />
            <YAxis stroke="#6b7494" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                background: 'rgba(17,23,39,0.95)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 14,
              }}
              cursor={{ fill: 'rgba(99,102,241,0.06)' }}
            />
            <Bar dataKey="value" fill="url(#barGrad)" radius={[8, 8, 0, 0]} name="الأعضاء" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
