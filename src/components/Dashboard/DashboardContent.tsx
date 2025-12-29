import { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { setActiveSection, setActiveSubSection } from '../../store/slices/dashboardSlice'
import { fetchContacts, fetchDashboardSummary, SearchItem, fetchUpcomingMeetings } from '../../services/api'
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

  // Get username from API
  const { data: summary } = useQuery({
    queryKey: ['dashboardSummary'],
    queryFn: () => fetchDashboardSummary(),
    refetchInterval: 60000 // Update summary every minute
  });

  const userName = summary?.user_full_name || localStorage.getItem('userName') || 'Shivani';

  const { data: upcomingMeetingsData } = useQuery({
    queryKey: ['upcomingMeetings'],
    queryFn: () => fetchUpcomingMeetings(20),
    refetchInterval: 60000
  });

  const now = new Date();
  // Show ALL scheduled meetings in the Upcoming list, even if technically overdue, so user sees them.
  const upcomingMeetings = upcomingMeetingsData || [];
  const overdueMeetings = upcomingMeetingsData?.filter(m => m.scheduled_at && new Date(m.scheduled_at) <= now) || [];

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
          // Filter out meetings, only show contacts as requested
          // if (data.meetings) {
          //   data.meetings.forEach(m => items.push({
          //     id: m.meeting_id,
          //     type: 'meeting',
          //     title: 'Meeting',
          //     subtitle: m.scheduled_at ? new Date(m.scheduled_at).toLocaleDateString() : undefined
          //   }))
          // }

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
      case 'meetings-completed': // Fallthrough or explicit return
      case 'completed-meeting':
        return <CompletedMeetingDetails />
      case 'upcoming-meeting':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">Upcoming Meetings ({upcomingMeetings.length})</h2>

            {upcomingMeetings.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-slate-500 text-lg font-medium">No upcoming meetings</p>
                <p className="text-slate-400 text-sm mt-2">Schedule a meeting to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingMeetings.map(meeting => (
                  <div key={meeting.meeting_id} className="glass-card p-5 flex items-center justify-between hover:shadow-lg transition-all">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 text-base">{meeting.contact_name}</h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <p className="text-sm text-slate-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {meeting.scheduled_at ? new Date(meeting.scheduled_at).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : 'Date TBD'}
                          </p>
                          <span className="badge-blue px-2 py-0.5 rounded text-xs font-medium">
                            {meeting.status || 'scheduled'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/meetings')}
                      className="btn-primary px-6 py-2 rounded-lg text-sm font-medium ml-4"
                    >
                      Join Meeting
                    </button>
                  </div>
                ))}
              </div>
            )}
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
    <div className="flex-1 overflow-y-auto p-8">
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
                className="input-glass rounded-lg pl-10 pr-4 py-2 text-slate-700 text-sm w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                onFocus={() => { if (searchTerm) setShowResults(true) }}
              />
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-blue-200 py-2 max-h-96 overflow-y-auto z-50">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-slate-100 last:border-0"
                      onMouseDown={(e) => {
                        e.preventDefault(); // Prevent input blur
                        console.log('Clicked result:', result)
                        setSearchTerm('') // Clear search
                        setShowResults(false) // Hide dropdown
                        if (result.type === 'contact') {
                          navigate('/leads', { state: { highlightContactId: result.id } })
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
                        <span className="text-xs px-2 py-1 badge-blue rounded-full capitalize">
                          {result.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <select className="input-glass rounded-lg px-4 py-2 text-slate-700 text-sm">
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
