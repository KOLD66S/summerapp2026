import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  { name: 'الفعاليات', value: 42, color: '#6366f1' },
  { name: 'المسابقات', value: 26, color: '#a855f7' },
  { name: 'التجهيزات', value: 18, color: '#38bdf8' },
  { name: 'التسويق', value: 14, color: '#10b981' },
]

const total = '٢٤٠,٠٠٠'

export default function BudgetDonut() {
  return (
    <div className="card fade-in d-4">
      <div className="card-head">
        <div>
          <h3>توزيع الميزانية</h3>
          <p>الفصل الدراسي الحالي</p>
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', height: 200 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={62}
              outerRadius={88}
              paddingAngle={3}
              dataKey="value"
              startAngle={90}
              endAngle={450}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: 'rgba(17,23,39,0.95)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 14,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>الإجمالي</span>
          <strong style={{ fontSize: 20, fontWeight: 800 }}>{total}</strong>
          <span style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>ريال سعودي</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', flex: 1, fontWeight: 600 }}>{d.name}</span>
            <strong style={{ fontSize: 13, fontWeight: 800 }}>{d.value}%</strong>
          </div>
        ))}
      </div>
    </div>
  )
}
