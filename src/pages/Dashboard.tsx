import { useState, useEffect } from 'react'
import { useAppDispatch } from '../store/hooks'
import { setActiveSection, setActiveSubSection } from '../store/slices/dashboardSlice'
import DashboardSidebar from '../components/Dashboard/DashboardSidebar'
import DashboardContent from '../components/Dashboard/DashboardContent'

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const dispatch = useAppDispatch()

  // Ensure default state when dashboard loads
  useEffect(() => {
    dispatch(setActiveSection('kpis'))
    dispatch(setActiveSubSection('overview'))
  }, [dispatch])

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <DashboardContent />
    </div>
  )
}

export default Dashboard

