import React from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import StatsGrid from './components/StatsGrid'
import EngagementChart from './components/EngagementChart'
import TopClubs from './components/TopClubs'
import UpcomingEvents from './components/UpcomingEvents'
import BudgetDonut from './components/BudgetDonut'
import CollegeBars from './components/CollegeBars'
import RecentActivity from './components/RecentActivity'
import { Plus, Download } from 'lucide-react'

export default function App() {
  return (
    <div className="app">
      <Sidebar />

      <div className="main-area">
        <Topbar />

        <main className="content">
          <div className="page-header fade-in">
            <div>
              <h1>أهلاً وسهلاً، د. خالد 👋</h1>
              <p>إليك نظرة عامة على أداء الأندية الطلابية في جامعة القصيم</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn">
                <Download size={15} />
                تصدير التقرير
              </button>
              <button className="btn primary">
                <Plus size={15} />
                فعالية جديدة
              </button>
            </div>
          </div>

          <StatsGrid />

          <div className="grid-2">
            <EngagementChart />
            <UpcomingEvents />
          </div>

          <div className="grid-2">
            <TopClubs />
            <BudgetDonut />
          </div>

          <div className="grid-2">
            <CollegeBars />
            <RecentActivity />
          </div>

          <footer style={{ textAlign: 'center', padding: '20px 0 0', color: 'var(--text-muted)', fontSize: 12 }}>
            © 2026 عمادة شؤون الطلاب — جامعة القصيم • صُمم بـ ❤️ للأندية الطلابية
          </footer>
        </main>
      </div>
    </div>
  )
}
