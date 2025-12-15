import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import TeamPerformanceOverview from './TeamPerformanceOverview'
import TeamMemberCards from './TeamMemberCards'
import KPIOverview from './KPIs/KPIOverview'
import ContactsTouched from './KPIs/ContactsTouched'
import MeetingsCompleted from './KPIs/MeetingsCompleted'
import EmailsDrafted from './KPIs/EmailsDrafted'
import ConversionRate from './KPIs/ConversionRate'

const DashboardContent = () => {
  const navigate = useNavigate()
  const { activeSubSection } = useAppSelector((state) => state.dashboard)
  
  // Memoize currentDate to prevent recalculation on every render
  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }, [])

  // Random summaries for completed meetings
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
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Overdue Follow-up Meetings</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4 py-3 bg-red-50 rounded-r-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">Follow-up with ABC Corp</p>
                    <p className="text-sm text-red-600 mt-1">Overdue by 2 days</p>
                    <p className="text-xs text-gray-600 mt-1">Original meeting: Dec 12, 2025</p>
                  </div>
                  <button 
                    onClick={() => navigate('/meetings')}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                  >
                    Schedule Now
                  </button>
                </div>
              </div>
              <div className="border-l-4 border-red-500 pl-4 py-3 bg-red-50 rounded-r-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">Client Check-in - XYZ Inc</p>
                    <p className="text-sm text-red-600 mt-1">Overdue by 1 day</p>
                    <p className="text-xs text-gray-600 mt-1">Original meeting: Dec 13, 2025</p>
                  </div>
                  <button 
                    onClick={() => navigate('/meetings')}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                  >
                    Schedule Now
                  </button>
                </div>
              </div>
              <div className="border-l-4 border-red-500 pl-4 py-3 bg-red-50 rounded-r-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">Project Status Update</p>
                    <p className="text-sm text-red-600 mt-1">Overdue by 3 days</p>
                    <p className="text-xs text-gray-600 mt-1">Original meeting: Dec 11, 2025</p>
                  </div>
                  <button 
                    onClick={() => navigate('/meetings')}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                  >
                    Schedule Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      case 'completed-meeting':
        const randomSummary = completedMeetingSummaries[Math.floor(Math.random() * completedMeetingSummaries.length)]
        return (
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-semibold text-gray-800">Completed Meeting</h2>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">Completed</span>
                <span className="text-sm text-gray-600">Dec 14, 2025 at 2:00 PM</span>
              </div>
              <p className="font-semibold text-gray-800 mb-2">Product Demo - Tech Solutions Inc</p>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Meeting Summary:</p>
                <p className="text-sm text-gray-600 leading-relaxed">{randomSummary}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Attendees:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">John Doe (Client)</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Jane Smith (Client)</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Shivani Karnati (You)</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Action Items:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  <li>Send detailed proposal by Dec 18</li>
                  <li>Schedule technical Q&A session</li>
                  <li>Provide additional case studies</li>
                </ul>
              </div>
            </div>
          </div>
        )
      case 'upcoming-meeting':
        return (
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Meetings</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded-r-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">Client Review - Q4 Strategy</p>
                    <p className="text-sm text-gray-600 mt-1">Today at 2:00 PM</p>
                    <p className="text-xs text-gray-500 mt-1">Duration: 1 hour</p>
                    <p className="text-xs text-gray-500 mt-1">Attendees: 4 people</p>
                  </div>
                  <button 
                    onClick={() => navigate('/meetings')}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm ml-4"
                  >
                    Join Meeting
                  </button>
                </div>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded-r-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">Team Standup</p>
                    <p className="text-sm text-gray-600 mt-1">Tomorrow at 10:00 AM</p>
                    <p className="text-xs text-gray-500 mt-1">Duration: 30 minutes</p>
                    <p className="text-xs text-gray-500 mt-1">Attendees: 6 people</p>
                  </div>
                  <button 
                    onClick={() => navigate('/meetings')}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm ml-4"
                  >
                    Join Meeting
                  </button>
                </div>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-3 bg-purple-50 rounded-r-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">Sales Pipeline Review</p>
                    <p className="text-sm text-gray-600 mt-1">Dec 17 at 3:30 PM</p>
                    <p className="text-xs text-gray-500 mt-1">Duration: 45 minutes</p>
                    <p className="text-xs text-gray-500 mt-1">Attendees: 3 people</p>
                  </div>
                  <button 
                    onClick={() => navigate('/meetings')}
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm ml-4"
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
          <>
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Manage your team members and view their performance
              </h2>
              <TeamPerformanceOverview />
            </div>
            <div>
              <TeamMemberCards />
            </div>
          </>
        )
    }
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              Good morning, Shivani <span className="text-xl"></span>
            </h1>
            <p className="text-gray-600 text-sm">{currentDate}</p>
          </div>

          {/* Search and Filters - Right Corner */}
          <div className="flex items-center space-x-3">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search contacts or companies..."
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 pl-10 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select className="bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm">
              <option>This Month</option>
              <option>This Week</option>
              <option>Quarter</option>
              <option>This Year</option>
            </select>
            <button className="bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 hover:bg-gray-50 transition-all flex items-center space-x-2 text-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
