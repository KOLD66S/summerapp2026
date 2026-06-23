import React from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import DashboardPage from './pages/DashboardPage'
import ClubsPage from './pages/ClubsPage'
import SpecializedClubsPage from './pages/SpecializedClubsPage'
import SpecializedClubDetailPage from './pages/SpecializedClubDetailPage'
import EventsPage from './pages/EventsPage'
import ClubDetailPage from './pages/ClubDetailPage'
import AnalyticsPage from './pages/AnalyticsPage'
import LeaderboardPage from './pages/LeaderboardPage'
import SupervisorsPage from './pages/SupervisorsPage'
import PlaceholderPage from './pages/PlaceholderPage'
import { RouterProvider, useRouter, matchRoute } from './router'

function RouteSwitch() {
  const { path } = useRouter()
  const route = matchRoute(path)

  switch (route.name) {
    case 'dashboard': return <DashboardPage />
    case 'clubs': return <ClubsPage />
    case 'specialized': return <SpecializedClubsPage />
    case 'specializedDetail': return <SpecializedClubDetailPage id={route.params.id} />
    case 'events': return <EventsPage />
    case 'club': return <ClubDetailPage id={route.params.id} />
    case 'analytics': return <AnalyticsPage />
    case 'leaderboard': return <LeaderboardPage />
    case 'supervisors': return <SupervisorsPage />
    case 'reports': return <PlaceholderPage title="التقارير" description="تقارير دورية وملخصات تنفيذية" />
    case 'settings': return <PlaceholderPage title="الإعدادات" description="إعدادات المنصة والمستخدمين" />
    case 'help': return <PlaceholderPage title="الدعم والمساعدة" description="مركز المساعدة والأسئلة الشائعة" />
    default: return <DashboardPage />
  }
}

export default function App() {
  return (
    <RouterProvider>
      <div className="app">
        <Sidebar />
        <div className="main-area">
          <Topbar />
          <main className="content" key={window.location.hash}>
            <RouteSwitch />
          </main>
        </div>
      </div>
    </RouterProvider>
  )
}
