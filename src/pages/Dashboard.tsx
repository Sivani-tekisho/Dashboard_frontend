import { useState } from 'react'
import DashboardSidebar from '../components/Dashboard/DashboardSidebar'
import DashboardContent from '../components/Dashboard/DashboardContent'

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <DashboardContent />
    </div>
  )
}

export default Dashboard

