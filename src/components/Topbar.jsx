import React from 'react'
import { Search, Bell, MessageCircle, Settings as Cog, Moon } from 'lucide-react'

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="search">
        <input placeholder="ابحث عن نادٍ، فعالية، أو طالب..." />
        <Search size={18} className="search-icon" />
      </div>

      <button className="icon-btn" title="الإشعارات">
        <Bell size={18} />
        <span className="dot" />
      </button>
      <button className="icon-btn" title="الرسائل">
        <MessageCircle size={18} />
      </button>
      <button className="icon-btn" title="الوضع الليلي">
        <Moon size={18} />
      </button>
      <button className="icon-btn" title="الإعدادات">
        <Cog size={18} />
      </button>
    </header>
  )
}
