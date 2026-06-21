import React from 'react'
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Trophy,
  MessageSquare,
  Wallet,
  FileBarChart,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles
} from 'lucide-react'

const mainNav = [
  { icon: LayoutDashboard, label: 'الرئيسية', active: true },
  { icon: Users, label: 'الأندية', badge: '24' },
  { icon: CalendarDays, label: 'الفعاليات', badge: '7' },
  { icon: Trophy, label: 'المسابقات' },
  { icon: MessageSquare, label: 'الطلبات', badge: '12', badgeStyle: 'gold' },
  { icon: Wallet, label: 'الميزانية' },
  { icon: FileBarChart, label: 'التقارير' },
]

const bottomNav = [
  { icon: Settings, label: 'الإعدادات' },
  { icon: HelpCircle, label: 'الدعم والمساعدة' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">QU</div>
        <div className="brand-text">
          <h1>أندية القصيم</h1>
          <span>لوحة تحكم العمادة</span>
        </div>
      </div>

      <div className="nav-section-title">القائمة الرئيسية</div>
      {mainNav.map((item, i) => (
        <button key={i} className={`nav-item ${item.active ? 'active' : ''}`}>
          <item.icon size={18} strokeWidth={2.2} />
          <span>{item.label}</span>
          {item.badge && (
            <span className={`badge ${item.badgeStyle || ''}`}>{item.badge}</span>
          )}
        </button>
      ))}

      <div className="nav-section-title">عام</div>
      {bottomNav.map((item, i) => (
        <button key={i} className="nav-item">
          <item.icon size={18} strokeWidth={2.2} />
          <span>{item.label}</span>
        </button>
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
          <Sparkles size={16} color="var(--gold)" style={{ marginRight: 'auto' }} />
        </div>
      </div>
    </aside>
  )
}
