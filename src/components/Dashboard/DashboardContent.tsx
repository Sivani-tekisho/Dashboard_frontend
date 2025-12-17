import { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { setActiveSection, setActiveSubSection } from '../../store/slices/dashboardSlice'
import { fetchContacts, SearchItem } from '../../services/api'
import KPIOverview from './KPIs/KPIOverview'
import ContactsTouched from './KPIs/ContactsTouched'
import EmailsDrafted from './KPIs/EmailsDrafted'
import ConversionRate from './KPIs/ConversionRate'
import CompletedMeetingDetails from './CompletedMeetingDetails'

const DashboardContent = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { activeSection, activeSubSection } = useAppSelector((state) => state.dashboard)

  // Search State
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])
  const [showResults, setShowResults] = useState(false)
  const searchTimeoutRef = useRef<any>(null)

  // Debug logging
  console.log('DashboardContent - activeSection:', activeSection, 'activeSubSection:', activeSubSection)

  // Get username from localStorage or use default
  const userName = useMemo(() => {
    return localStorage.getItem('userName') || 'Shivani'
  }, [])

  // Memoize currentDate to prevent recalculation on every render
  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }, [])

  // Search Handler
  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)

    if (searchTerm.length >= 1) {
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          // Explicitly use fetchContacts which hits the /api/v1/search endpoint
          const data = await fetchContacts(searchTerm)
          const items: SearchItem[] = []

          if (data.contacts) {
            data.contacts.forEach(c => items.push({
              id: c.contact_id,
              type: 'contact',
              title: `${c.first_name || ''} ${c.last_name || ''} `.trim() || 'Unknown',
              subtitle: c.company_name || undefined
            }))
          }
          if (data.meetings) {
            data.meetings.forEach(m => items.push({
              id: m.meeting_id,
              type: 'meeting',
              title: 'Meeting',
              subtitle: m.scheduled_at ? new Date(m.scheduled_at).toLocaleDateString() : undefined
            }))
          }

          setSearchResults(items)
          setShowResults(true)
        } catch (error) {
          console.error("Search error:", error)
        }
      }, 300)
    } else {
      setSearchResults([])
      setShowResults(false)
    }

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
    }
  }, [searchTerm])

  // Render content based on active sub-section
  const renderContent = () => {
    switch (activeSubSection) {
      case 'overview':
        return <KPIOverview />
      case 'contacts-touched':
        return <ContactsTouched />
      case 'emails-drafted':
        return <EmailsDrafted />
      case 'conversion-rate':
        return <ConversionRate />
      case 'meeting-overdue':
        return (
          <div className="space-y-6">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Overdue Follow-ups</h2>
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-4">
                <div
                  onClick={() => navigate('/meetings')}
                  className="border-l-4 border-blue-500 pl-4 py-4 cursor-pointer hover:bg-blue-50/50 rounded-r-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-base mb-1">Q4 Strategy Review Meeting</p>
                      <p className="text-sm text-blue-600 mb-1">Overdue by 2 days</p>
                      <p className="text-xs text-slate-500">Scheduled for: Dec 12, 2025 at 2:00 PM</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate('/meetings')
                      }}
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium ml-4"
                    >
                      Join Meeting
                    </button>
                  </div>
                </div>

                <div
                  onClick={() => navigate('/meetings')}
                  className="border-l-4 border-blue-500 pl-4 py-4 cursor-pointer hover:bg-blue-50/50 rounded-r-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-base mb-1">Client Check-in Meeting</p>
                      <p className="text-sm text-blue-600 mb-1">Overdue by 1 day</p>
                      <p className="text-xs text-slate-500">Scheduled for: Dec 13, 2025 at 10:00 AM</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate('/meetings')
                      }}
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium ml-4"
                    >
                      Join Meeting
                    </button>
                  </div>
                </div>

                <div
                  onClick={() => navigate('/meetings')}
                  className="border-l-4 border-blue-500 pl-4 py-4 cursor-pointer hover:bg-blue-50/50 rounded-r-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-base mb-1">Project Status Update Meeting</p>
                      <p className="text-sm text-blue-600 mb-1">Overdue by 3 days</p>
                      <p className="text-xs text-slate-500">Scheduled for: Dec 11, 2025 at 3:00 PM</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate('/meetings')
                      }}
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium ml-4"
                    >
                      Join Meeting
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Meeting Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Total Meetings</p>
                    <p className="text-2xl font-bold text-blue-600">28</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Completed</p>
                    <p className="text-2xl font-bold text-blue-600">22</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Upcoming</p>
                    <p className="text-2xl font-bold text-blue-600">3</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Overdue</p>
                    <p className="text-2xl font-bold text-blue-600">3</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'meetings-completed': // Fallthrough or explicit return
      case 'completed-meeting':
        return <CompletedMeetingDetails />
      case 'upcoming-meeting':
        return (
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Upcoming Meetings</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-4 py-3 bg-blue-50 rounded-r-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">Client Review - Q4 Strategy</p>
                    <p className="text-sm text-slate-600 mt-1">Today at 2:00 PM</p>
                    <p className="text-xs text-slate-500 mt-1">Duration: 1 hour • Attendees: 4 people</p>
                  </div>
                  <button
                    onClick={() => navigate('/meetings')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm ml-4"
                  >
                    Join Meeting
                  </button>
                </div>
              </div>
              <div className="border-l-4 border-blue-600 pl-4 py-3 bg-blue-50 rounded-r-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">Team Standup</p>
                    <p className="text-sm text-slate-600 mt-1">Tomorrow at 10:00 AM</p>
                    <p className="text-xs text-slate-500 mt-1">Duration: 30 minutes • Attendees: 6 people</p>
                  </div>
                  <button
                    onClick={() => navigate('/meetings')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm ml-4"
                  >
                    Join Meeting
                  </button>
                </div>
              </div>
              <div className="border-l-4 border-blue-600 pl-4 py-3 bg-blue-50 rounded-r-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">Sales Pipeline Review</p>
                    <p className="text-sm text-slate-600 mt-1">Dec 17 at 3:30 PM</p>
                    <p className="text-xs text-slate-500 mt-1">Duration: 45 minutes • Attendees: 3 people</p>
                  </div>
                  <button
                    onClick={() => navigate('/meetings')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm ml-4"
                  >
                    Join Meeting
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-6">
            <div className="glass-card p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome to Your Dashboard</h2>
                <p className="text-slate-600 mb-6">Select a section from the sidebar to view detailed analytics and metrics.</p>
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => {
                      dispatch(setActiveSection('kpis'))
                      dispatch(setActiveSubSection('overview'))
                    }}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    View KPI Overview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-white">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Good morning, {userName}
            </h1>
            <p className="text-slate-500 text-sm">{currentDate}</p>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-3 relative z-50">
            <div className="relative">
              <input
                type="text"
                placeholder="Search contacts or companies..."
                className="bg-white/60 backdrop-blur-md border border-slate-200/50 rounded-lg pl-10 pr-4 py-2 text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 text-sm w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                onFocus={() => { if (searchTerm) setShowResults(true) }}
              />
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-slate-200 py-2 max-h-96 overflow-y-auto z-50">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0"
                      onClick={() => {
                        console.log('Clicked result:', result)
                        // TODO: Navigate to detail view
                        if (result.type === 'contact') {
                          navigate('/leads') // Or specific contact view
                        } else if (result.type === 'meeting') {
                          navigate('/meetings')
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-900">{result.title}</p>
                          {result.subtitle && <p className="text-xs text-slate-500">{result.subtitle}</p>}
                        </div>
                        <span className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-600 capitalize">
                          {result.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <select className="bg-white/60 backdrop-blur-md border border-slate-200/50 rounded-lg px-4 py-2 text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 text-sm">
              <option>This Month</option>
              <option>This Week</option>
              <option>Quarter</option>
              <option>This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dynamic Content */}
      {renderContent()}
    </div>
  )
}

export default DashboardContent
