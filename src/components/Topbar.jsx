import React, { useState, useEffect } from 'react'
import { Search, Bell, MessageCircle, Sun, ChevronLeft } from 'lucide-react'
import { useRouter, matchRoute } from '../router'
import { programName } from '../thamar'

const titles = {
  dashboard: 'لوحة التحكم',
  clubs: 'الأندية',
  events: 'الأنشطة',
  analytics: 'التحليلات',
  leaderboard: 'لوحة المتميزين',
  supervisors: 'المشرفون',
  reports: 'التقارير',
  settings: 'الإعدادات',
  club: 'تفاصيل النادي',
}

export default function Topbar() {
  const { path } = useRouter()
  const route = matchRoute(path)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const timeStr = now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
  const dateStr = now.toLocaleDateString('ar-SA', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span>{programName}</span>
        <ChevronLeft size={14} />
        <strong>{titles[route.name] || 'لوحة التحكم'}</strong>
      </div>

      <div className="search">
        <input placeholder="ابحث عن نشاط، نادٍ، أو طالب..." />
        <Search size={17} className="search-icon" />
        <kbd className="search-kbd">⌘K</kbd>
      </div>

      <button className="icon-btn" title="الإشعارات">
        <Bell size={18} />
        <span className="dot" />
      </button>
      <button className="icon-btn" title="الرسائل">
        <MessageCircle size={18} />
      </button>
      <button className="icon-btn" title="الوضع النهاري">
        <Sun size={18} />
      </button>

      <div className="live-time">
        <strong>{timeStr}</strong>
        <span>{dateStr}</span>
      </div>
    </header>
  )
}
