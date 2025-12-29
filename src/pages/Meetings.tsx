import { useState, useMemo } from 'react'
import DashboardSidebar from '../components/Dashboard/DashboardSidebar'
import { useQuery } from '@tanstack/react-query'
import { fetchUpcomingMeetings, fetchCompletedMeetings, fetchDashboardSummary } from '../services/api'

const Meetings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('all')

  const { data: upcomingData } = useQuery({
    queryKey: ['upcomingMeetingsFull'],
    queryFn: () => fetchUpcomingMeetings(20)
  })

  const { data: completedData } = useQuery({
    queryKey: ['completedMeetings'],
    queryFn: () => fetchCompletedMeetings()
  })

  const { data: summary } = useQuery({
    queryKey: ['dashboardSummary'],
    queryFn: () => fetchDashboardSummary(),
  })

  const userName = summary?.user_full_name || localStorage.getItem('userName') || 'Shivani'

  const upcomingList = upcomingData || []
  const completedList = completedData || []

  // Format current date
  const currentDate = useMemo(() => {
    const date = new Date()
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }, [])

  // Format meeting date and time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  // Filter meetings based on search and month
  const filterMeetings = (meetings: any[]) => {
    return meetings.filter(meeting => {
      // Search filter
      const matchesSearch = searchTerm === '' ||
        (meeting.contact_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (meeting.company_name?.toLowerCase().includes(searchTerm.toLowerCase()))

      // Month filter
      let matchesMonth = true
      if (selectedMonth !== 'all' && meeting.scheduled_at) {
        const meetingDate = new Date(meeting.scheduled_at)
        const currentDate = new Date()

        if (selectedMonth === 'this_week') {
          const weekAgo = new Date()
          weekAgo.setDate(currentDate.getDate() - 7)
          matchesMonth = meetingDate >= weekAgo && meetingDate <= currentDate
        } else if (selectedMonth === 'this_month') {
          matchesMonth = meetingDate.getMonth() === currentDate.getMonth() &&
            meetingDate.getFullYear() === currentDate.getFullYear()
        } else if (selectedMonth === 'quarter') {
          const quarter = Math.floor(currentDate.getMonth() / 3)
          const meetingQuarter = Math.floor(meetingDate.getMonth() / 3)
          matchesMonth = meetingQuarter === quarter &&
            meetingDate.getFullYear() === currentDate.getFullYear()
        } else if (selectedMonth === 'this_year') {
          matchesMonth = meetingDate.getFullYear() === currentDate.getFullYear()
        }
      }

      return matchesSearch && matchesMonth
    })
  }

  const filteredUpcomingMeetings = filterMeetings(upcomingList)
  const filteredCompletedMeetings = filterMeetings(completedList)

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
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
            <div className="flex items-center space-x-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search contacts or companies..."
                  className="input-glass rounded-lg pl-10 pr-4 py-2 text-slate-700 text-sm w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <select
                className="input-glass rounded-lg px-4 py-2 text-slate-700 text-sm"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="this_week">This Week</option>
                <option value="this_month">This Month</option>
                <option value="quarter">Quarter</option>
                <option value="this_year">This Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-slate-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'upcoming'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
            >
              Upcoming Meetings ({filteredUpcomingMeetings.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'completed'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
            >
              Completed Meetings ({filteredCompletedMeetings.length})
            </button>
          </nav>
        </div>

        {/* Meeting Content */}
        {activeTab === 'upcoming' ? (
          <div className="space-y-3">
            {filteredUpcomingMeetings.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-slate-500 text-lg font-medium">No upcoming meetings found</p>
                <p className="text-slate-400 text-sm mt-2">
                  {searchTerm || selectedMonth !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Schedule a meeting to get started'}
                </p>
              </div>
            ) : (
              filteredUpcomingMeetings.map((meeting) => (
                <div
                  key={meeting.meeting_id}
                  className="glass-card p-5 flex items-center justify-between hover:shadow-lg transition-all"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 text-lg">
                          {meeting.contact_name || 'Meeting'}
                        </h3>
                        {meeting.company_name && (
                          <p className="text-sm text-slate-500">{meeting.company_name}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 ml-13">
                      <div className="flex items-center text-sm text-slate-600">
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {meeting.scheduled_at ? formatDateTime(meeting.scheduled_at) : 'Date TBD'}
                      </div>
                      <span className="badge-blue px-3 py-1 rounded-full text-xs font-medium">
                        {meeting.status || 'scheduled'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      console.log('Joining meeting:', meeting.meeting_id)
                    }}
                    className="btn-primary px-6 py-2.5 rounded-lg text-sm font-medium"
                  >
                    Join Meeting
                  </button>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredCompletedMeetings.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-slate-500 text-lg font-medium">No completed meetings found</p>
                <p className="text-slate-400 text-sm mt-2">
                  {searchTerm || selectedMonth !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Completed meetings will appear here'}
                </p>
              </div>
            ) : (
              filteredCompletedMeetings.map((meeting) => (
                <div
                  key={meeting.meeting_id}
                  className="glass-card p-5 flex items-center justify-between hover:shadow-lg transition-all"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 text-lg">
                          {meeting.contact_name || 'Meeting'}
                        </h3>
                        {meeting.company_name && (
                          <p className="text-sm text-slate-500">{meeting.company_name}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 ml-13">
                      <div className="flex items-center text-sm text-slate-600">
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {meeting.scheduled_at ? formatDateTime(meeting.scheduled_at) : 'N/A'}
                      </div>
                      <span className="badge-green px-3 py-1 rounded-full text-xs font-medium">
                        Completed
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      console.log('Viewing meeting:', meeting.meeting_id)
                    }}
                    className="btn-secondary px-6 py-2.5 rounded-lg text-sm font-medium text-blue-600"
                  >
                    View Details
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Meeting Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Meetings</p>
                <p className="text-2xl font-bold text-blue-600">{upcomingList.length + completedList.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedList.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Upcoming</p>
                <p className="text-2xl font-bold text-blue-600">{upcomingList.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Meetings
