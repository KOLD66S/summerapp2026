import React from 'react'
import {
  LayoutDashboard, Users, CalendarDays, BarChart3,
  Trophy, UserCheck, FileBarChart, Settings,
  HelpCircle, LogOut, Sparkles, Camera, GraduationCap
} from 'lucide-react'
import { useRouter, Link, matchRoute } from '../router'
import { summary, programName, supervisor } from '../thamar'
import { specializedSummary } from '../specializedClubs'

const mainNav = [
  { icon: LayoutDashboard, label: 'لوحة التحكم', to: '/', name: 'dashboard' },
  { icon: Users, label: 'الأندية', to: '/clubs', name: 'clubs', badge: String(summary.totalClubs), badgeStyle: 'thamar' },
  { icon: GraduationCap, label: 'الأندية التخصصية', to: '/specialized', name: 'specialized', badge: String(specializedSummary.totalClubs), badgeStyle: 'gold' },
  { icon: CalendarDays, label: 'الأنشطة', to: '/events', name: 'events', badge: String(summary.totalActivities) },
  { icon: BarChart3, label: 'التحليلات', to: '/analytics', name: 'analytics' },
  { icon: Trophy, label: 'لوحة المتميزين', to: '/leaderboard', name: 'leaderboard', badgeStyle: 'gold', badge: '★' },
  { icon: UserCheck, label: 'المشرفون', to: '/supervisors', name: 'supervisors' },
  { icon: FileBarChart, label: 'التقارير', to: '/reports', name: 'reports' },
]

const bottomNav = [
  { icon: Settings, label: 'الإعدادات', to: '/settings', name: 'settings' },
  { icon: HelpCircle, label: 'الدعم والمساعدة', to: '/help', name: 'help' },
]

export default function Sidebar() {
  const { path } = useRouter()
  const current = matchRoute(path)

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">{programName.charAt(0)}</div>
        <div className="brand-text">
          <h1>{programName}</h1>
          <span>الأندية الطلابية</span>
        </div>
        <div className="live-pulse">
          <span className="live-pulse-dot" />
          LIVE
        </div>
      </div>

      <div className="nav-section-title">القائمة الرئيسية</div>
      {mainNav.map((item) => (
        <Link
          key={item.name}
          to={item.to}
          className={`nav-item ${current.name === item.name ? 'active' : ''}`}
        >
          <item.icon size={18} strokeWidth={2.2} />
          <span>{item.label}</span>
          {item.badge && <span className={`badge ${item.badgeStyle || ''}`}>{item.badge}</span>}
        </Link>
      ))}

      <div className="nav-section-title">عام</div>
      {bottomNav.map((item) => (
        <Link
          key={item.name}
          to={item.to}
          className={`nav-item ${current.name === item.name ? 'active' : ''}`}
        >
          <item.icon size={18} strokeWidth={2.2} />
          <span>{item.label}</span>
        </Link>
      ))}

      <button className="nav-item" style={{ color: 'var(--rose)' }}>
        <LogOut size={18} strokeWidth={2.2} />
        <span>تسجيل الخروج</span>
      </button>

      <div className="sidebar-footer">
        <div className="user-card">
          <div className="avatar">{supervisor.initial}</div>
          <div className="user-card-info">
            <h4>{supervisor.name}</h4>
            <span>{supervisor.title}</span>
          </div>
          <Sparkles size={16} color="#d97706" style={{ marginRight: 'auto', filter: 'drop-shadow(0 0 6px rgba(217,119,6,0.5))' }} />
        </div>
      </div>
    </aside>
  )
}
