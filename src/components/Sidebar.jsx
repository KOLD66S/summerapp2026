import React from 'react'
import {
  LayoutDashboard, Users, CalendarDays, BarChart3,
  MessageSquare, Wallet, FileBarChart, Settings,
  HelpCircle, LogOut, Sparkles
} from 'lucide-react'
import { useRouter, Link, matchRoute } from '../router'

const mainNav = [
  { icon: LayoutDashboard, label: 'لوحة التحكم', to: '/', name: 'dashboard' },
  { icon: Users, label: 'الأندية', to: '/clubs', name: 'clubs', badge: '24' },
  { icon: CalendarDays, label: 'الفعاليات', to: '/events', name: 'events', badge: '8' },
  { icon: BarChart3, label: 'التحليلات', to: '/analytics', name: 'analytics' },
  { icon: MessageSquare, label: 'طلبات الاعتماد', to: '/requests', name: 'requests', badge: '5', badgeStyle: 'gold' },
  { icon: Wallet, label: 'الميزانية', to: '/budget', name: 'budget' },
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
        <div className="brand-logo">QU</div>
        <div className="brand-text">
          <h1>أندية القصيم</h1>
          <span>منصة عمادة شؤون الطلاب</span>
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
          <div className="avatar">خ</div>
          <div className="user-card-info">
            <h4>د. خالد العتيبي</h4>
            <span>عميد شؤون الطلاب</span>
          </div>
          <Sparkles size={16} color="var(--gold)" style={{ marginRight: 'auto', filter: 'drop-shadow(0 0 8px var(--gold))' }} />
        </div>
      </div>
    </aside>
  )
}
