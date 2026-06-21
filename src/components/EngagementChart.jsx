import React from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { Activity } from 'lucide-react'

const data = [
  { month: 'يناير', members: 2400, events: 12 },
  { month: 'فبراير', members: 2780, events: 18 },
  { month: 'مارس', members: 3050, events: 22 },
  { month: 'أبريل', members: 3320, events: 19 },
  { month: 'مايو', members: 3680, events: 28 },
  { month: 'يونيو', members: 3980, events: 31 },
  { month: 'يوليو', members: 4150, events: 26 },
  { month: 'أغسطس', members: 4328, events: 37 },
]

export default function EngagementChart() {
  return (
    <div className="card fade-in d-2">
      <div className="card-head">
        <div>
          <h3>تطور المشاركة الطلابية</h3>
          <p>الأعضاء والفعاليات خلال آخر 8 أشهر</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="chip info">
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} /> الأعضاء
          </span>
          <span className="chip violet">
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--violet)' }} /> الفعاليات
          </span>
        </div>
      </div>

      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" stroke="#6b7494" tick={{ fontSize: 11 }} />
            <YAxis stroke="#6b7494" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                background: 'rgba(17,23,39,0.95)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 14,
              }}
              labelStyle={{ color: '#f4f6fb', fontWeight: 700 }}
              cursor={{ stroke: 'rgba(99,102,241,0.25)', strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="members"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#colorMembers)"
              name="الأعضاء"
            />
            <Area
              type="monotone"
              dataKey="events"
              stroke="#a855f7"
              strokeWidth={2.5}
              fill="url(#colorEvents)"
              name="الفعاليات"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
