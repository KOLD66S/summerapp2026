import React from 'react'
import { Users, CalendarDays, Trophy, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const stats = [
  {
    icon: Users,
    label: 'إجمالي الأعضاء',
    value: '4,328',
    trend: '+12.4%',
    up: true,
    color: 'var(--accent)',
    bg: 'var(--accent-soft)',
    glow: 'rgba(99, 102, 241, 0.18)',
  },
  {
    icon: Trophy,
    label: 'الأندية النشطة',
    value: '24',
    trend: '+3',
    up: true,
    color: 'var(--gold)',
    bg: 'var(--gold-soft)',
    glow: 'rgba(212, 175, 55, 0.18)',
  },
  {
    icon: CalendarDays,
    label: 'فعاليات هذا الشهر',
    value: '37',
    trend: '+8.2%',
    up: true,
    color: 'var(--sky)',
    bg: 'var(--sky-soft)',
    glow: 'rgba(56, 189, 248, 0.18)',
  },
  {
    icon: TrendingUp,
    label: 'معدل المشاركة',
    value: '86.5%',
    trend: '-2.1%',
    up: false,
    color: 'var(--violet)',
    bg: 'var(--violet-soft)',
    glow: 'rgba(168, 85, 247, 0.18)',
  },
]

export default function StatsGrid() {
  return (
    <div className="stats-grid">
      {stats.map((s, i) => (
        <div
          key={i}
          className={`stat-card fade-in d-${i + 1}`}
          style={{ '--glow': s.glow, '--icon-color': s.color, '--icon-bg': s.bg }}
        >
          <div className="stat-head">
            <div className="stat-icon">
              <s.icon size={20} strokeWidth={2.2} />
            </div>
            <div className={`stat-trend ${s.up ? '' : 'down'}`}>
              {s.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {s.trend}
            </div>
          </div>
          <div className="stat-value">{s.value}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
