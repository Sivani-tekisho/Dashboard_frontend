import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setActiveSection, setActiveSubSection } from '../../store/slices/dashboardSlice'

import { fetchDashboardSummary, DateRangePreset } from '../../services/api'
import { useQuery } from '@tanstack/react-query'

interface SidebarItem {
  id: string
  label: string
  icon: JSX.Element
  value?: number
  subItems?: SidebarItem[]
  isLink?: boolean
  link?: string
}

const DashboardSidebar = ({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { activeSection, activeSubSection } = useAppSelector((state) => state.dashboard)
  const [expandedSections, setExpandedSections] = useState<string[]>(['kpis', 'meetings'])

  // Fetch Sidebar Stats
  const { data: summaryData } = useQuery({
    queryKey: ['dashboardSummary', 'SIDEBAR'], // Use a key to share cache potentially, or independent
    queryFn: () => fetchDashboardSummary(DateRangePreset.THIS_YEAR), // Default to THIS_MONTH for sidebar badges? Or remove preset? 
    // Ideally sidebar represents consistent state. Let's use THIS_MONTH as default context.
    refetchInterval: 60000,
  })

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const menuItems: SidebarItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      id: 'kpis',
      label: 'KPIs',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      subItems: [
        { id: 'overview', label: 'Overview', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
        { id: 'leads', label: 'Leads', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, isLink: true, link: '/leads' },
        { id: 'contacts-touched', label: 'Contacts Touched', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>, value: summaryData?.contacts_touched },
        { id: 'meetings-completed', label: 'Meetings Completed', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, value: summaryData?.funnel_breakdown.meetings_completed },
        { id: 'emails-drafted', label: 'Emails Drafted', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, value: summaryData?.emails_drafted },
        { id: 'conversion-rate', label: 'Conversion Rate', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
      ],
    },
    {
      id: 'meetings',
      label: 'Meeting',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      subItems: [
        {
          id: 'followup-meeting',
          label: 'Follow-up Meeting',
          icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
          subItems: [
            { id: 'meeting-overdue', label: 'Overdue', icon: <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, value: summaryData?.overdue_followups_count },
          ],
        },
        { id: 'completed-meeting', label: 'Completed Meeting', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { id: 'upcoming-meeting', label: 'Upcoming Meeting', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, value: summaryData?.upcoming_meetings_count },
      ],
    },
  ]

  const handleItemClick = (itemId: string, isSubItem: boolean = false, item?: SidebarItem, parentId?: string) => {
    // Handle navigation links
    if (item?.isLink && item.link) {
      navigate(item.link)
      return
    }

    if (isSubItem) {
      // Set both the sub-section and the parent section
      if (parentId) {
        dispatch(setActiveSection(parentId))
      }
      dispatch(setActiveSubSection(itemId))
    } else {
      dispatch(setActiveSection(itemId))
      if (menuItems.find((item) => item.id === itemId)?.subItems) {
        toggleSection(itemId)
      }
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed left-0 top-20 bg-white text-slate-600 p-2 rounded-r-lg z-10 shadow-md border border-slate-200 hover:bg-slate-50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    )
  }

  return (
    <div className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-white">
        <div className="flex items-center space-x-2">
          <span className="text-slate-800 font-semibold text-lg">Dashboard</span>
        </div>
        <button
          onClick={onToggle}
          className="text-slate-400 hover:text-slate-600 transition-colors"
          title="Close sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4">
        {/* KPIs Section */}
        <div className="px-3 mb-4">
          {menuItems.filter(item => item.id === 'kpis').map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleItemClick(item.id)}
                className={`group w-full px-3 py-2.5 flex items-center justify-between text-left transition-all rounded-lg ${activeSection === item.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <span>{item.icon}</span>
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {item.subItems && (
                  <svg
                    className={`w-4 h-4 transition-all ${expandedSections.includes(item.id) ? 'rotate-90' : ''
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>

              {/* Sub Items */}
              {item.subItems && expandedSections.includes(item.id) && (
                <div className="mt-2 ml-3 space-y-1">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => handleItemClick(subItem.id, true, subItem, item.id)}
                      className={`group w-full px-3 py-2 flex items-center justify-between text-left transition-all rounded-lg ${activeSubSection === subItem.id
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{subItem.icon}</span>
                        <span className="text-sm">{subItem.label}</span>
                      </div>
                      {subItem.value !== undefined && (
                        <span className="font-semibold text-sm text-slate-700">{subItem.value}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Meeting Section */}
        <div className="px-3 mb-4">
          {menuItems.filter(item => item.id === 'meetings').map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleItemClick(item.id)}
                className={`group w-full px-3 py-2.5 flex items-center justify-between text-left transition-all rounded-lg ${activeSection === item.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <span>{item.icon}</span>
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {item.subItems && (
                  <svg
                    className={`w-4 h-4 transition-all ${expandedSections.includes(item.id) ? 'rotate-90' : ''
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>

              {/* Sub Items */}
              {item.subItems && expandedSections.includes(item.id) && (
                <div className="mt-2 ml-3 space-y-1">
                  {item.subItems.map((subItem) => {
                    // Handle nested sub-items (like Follow-up Meeting -> Overdue)
                    if (subItem.subItems) {
                      return (
                        <div key={subItem.id}>
                          <button
                            onClick={() => toggleSection(subItem.id)}
                            className={`group w-full px-3 py-2 flex items-center justify-between text-left transition-all rounded-lg ${activeSubSection?.startsWith(subItem.id)
                              ? 'bg-white text-slate-900 shadow-sm'
                              : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                              }`}
                          >
                            <div className="flex items-center space-x-2">
                              <span>{subItem.icon}</span>
                              <span className="text-sm">{subItem.label}</span>
                            </div>
                            <svg
                              className={`w-3 h-3 transition-all ${expandedSections.includes(subItem.id) ? 'rotate-90' : ''
                                }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                          {expandedSections.includes(subItem.id) && subItem.subItems && (
                            <div className="ml-3 mt-1 space-y-1">
                              {subItem.subItems.map((nestedItem) => (
                                <button
                                  key={nestedItem.id}
                                  onClick={() => handleItemClick(nestedItem.id, true, nestedItem, item.id)}
                                  className={`w-full px-3 py-2 flex items-center justify-between text-left transition-all rounded-lg ${activeSubSection === nestedItem.id
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                                    }`}
                                >
                                  <div className="flex items-center space-x-2">
                                    <span>{nestedItem.icon}</span>
                                    <span className="text-sm">{nestedItem.label}</span>
                                  </div>
                                  {nestedItem.value !== undefined && (
                                    <span className="font-semibold text-sm text-slate-700">{nestedItem.value}</span>
                                  )}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    }
                    // Regular sub-items
                    return (
                      <button
                        key={subItem.id}
                        onClick={() => handleItemClick(subItem.id, true, subItem, item.id)}
                        className={`group w-full px-3 py-2 flex items-center justify-between text-left transition-all rounded-lg ${activeSubSection === subItem.id
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                          }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span>{subItem.icon}</span>
                          <span className="text-sm">{subItem.label}</span>
                        </div>
                        {subItem.value !== undefined && (
                          <span className="font-semibold text-sm text-slate-700">{subItem.value}</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">SK</span>
          </div>
          <div className="flex-1">
            <p className="text-slate-800 font-medium text-sm">Shivani</p>
            <p className="text-slate-500 text-xs">ShivaniKarnati@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardSidebar