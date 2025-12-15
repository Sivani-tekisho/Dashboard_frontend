import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import TeamPerformanceOverview from './TeamPerformanceOverview'
import KPIOverview from './KPIs/KPIOverview'
import PerformanceAnalytics from './PerformanceAnalytics'
import ContactsTouched from './KPIs/ContactsTouched'
import MeetingsCompleted from './KPIs/MeetingsCompleted'
import EmailsDrafted from './KPIs/EmailsDrafted'
import ConversionRate from './KPIs/ConversionRate'
import CompletedMeetingDetails from './CompletedMeetingDetails'

const DashboardContent = () => {
  const navigate = useNavigate()
  const { activeSubSection } = useAppSelector((state) => state.dashboard)
  
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

  // Completed meeting summaries
  const completedMeetingSummaries = [
    "The meeting covered our Q4 strategy review with the client. Key decisions were made regarding the product roadmap and timeline. Action items include finalizing the contract by next week and scheduling a follow-up technical discussion.",
    "Product demo session completed successfully. Client showed strong interest in the advanced features. Discussion focused on pricing tiers and integration requirements. Next steps: send detailed proposal and arrange technical Q&A session.",
    "Quarterly business review completed. Discussed performance metrics, market trends, and growth opportunities. Client requested additional case studies and references. Scheduled next check-in for mid-January.",
    "Onboarding session finished with positive feedback. Covered platform setup, initial configuration, and best practices. Client team members are eager to get started. Follow-up training session scheduled for next week.",
    "Strategic planning meeting concluded. Explored partnership opportunities and collaboration framework. Both parties agreed to proceed with initial pilot program. Legal team to review agreement details.",
  ]

  // Render content based on active sub-section
  const renderContent = () => {
    switch (activeSubSection) {
      case 'overview':
        return <KPIOverview />
      case 'contacts-touched':
        return <ContactsTouched />
      case 'meetings-completed':
        return <MeetingsCompleted />
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
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-4">
                <div 
                  onClick={() => navigate('/meetings')}
                  className="border-l-4 border-red-500 pl-4 py-4 cursor-pointer hover:bg-red-50/50 rounded-r-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-base mb-1">Q4 Strategy Review Meeting</p>
                      <p className="text-sm text-red-600 mb-1">Overdue by 2 days</p>
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
                  className="border-l-4 border-red-500 pl-4 py-4 cursor-pointer hover:bg-red-50/50 rounded-r-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-base mb-1">Client Check-in Meeting</p>
                      <p className="text-sm text-red-600 mb-1">Overdue by 1 day</p>
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
                  className="border-l-4 border-red-500 pl-4 py-4 cursor-pointer hover:bg-red-50/50 rounded-r-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-base mb-1">Project Status Update Meeting</p>
                      <p className="text-sm text-red-600 mb-1">Overdue by 3 days</p>
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
                    <p className="text-2xl font-bold text-green-600">22</p>
                  </div>
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Upcoming</p>
                    <p className="text-2xl font-bold text-purple-600">3</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Overdue</p>
                    <p className="text-2xl font-bold text-red-600">3</p>
                  </div>
                  <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'completed-meeting':
        return <CompletedMeetingDetails summaries={completedMeetingSummaries} />
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
              <div className="border-l-4 border-cyan-600 pl-4 py-3 bg-cyan-50 rounded-r-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">Team Standup</p>
                    <p className="text-sm text-slate-600 mt-1">Tomorrow at 10:00 AM</p>
                    <p className="text-xs text-slate-500 mt-1">Duration: 30 minutes • Attendees: 6 people</p>
                  </div>
                  <button 
                    onClick={() => navigate('/meetings')}
                    className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-cyan-500 hover:to-cyan-600 transition-all text-sm ml-4"
                  >
                    Join Meeting
                  </button>
                </div>
              </div>
              <div className="border-l-4 border-blue-700 pl-4 py-3 bg-blue-100 rounded-r-lg">
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
            {/* Overview Metrics */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Overview</h2>
              <TeamPerformanceOverview />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - 2/3 width */}
              <div className="lg:col-span-2 space-y-6">
                {/* Performance Analytics Graph */}
                <PerformanceAnalytics />
              </div>

              {/* Right Column - 1/3 width */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Contacts Today</p>
                          <p className="text-xl font-bold text-slate-900">23</p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500">+12%</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Completed</p>
                          <p className="text-xl font-bold text-slate-900">18</p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500">+8%</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Conversion Rate</p>
                          <p className="text-xl font-bold text-slate-900">24%</p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500">+2%</span>
                    </div>
                  </div>
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

          {/* Search and Filters */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search contacts or companies..."
                className="bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm w-64"
              />
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm">
              <option>This Month</option>
              <option>This Week</option>
              <option>Quarter</option>
              <option>This Year</option>
            </select>
            <button className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50 transition-all flex items-center space-x-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Content */}
      {renderContent()}
    </div>
  )
}

export default DashboardContent
