import { useMemo } from 'react'
import { useAppSelector } from '../../store/hooks'
import TeamPerformanceOverview from './TeamPerformanceOverview'
import TeamMemberCards from './TeamMemberCards'
import KPIOverview from './KPIs/KPIOverview'
import ContactsTouched from './KPIs/ContactsTouched'
import MeetingsCompleted from './KPIs/MeetingsCompleted'
import EmailsDrafted from './KPIs/EmailsDrafted'
import ConversionRate from './KPIs/ConversionRate'

const DashboardContent = () => {
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
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Good morning, Shivani <span className="text-xl"></span>
          </h1>
          <p className="text-gray-600 text-sm">{currentDate}</p>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search contacts or companies..."
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 pl-10 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
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

      {/* Dynamic Content */}
      {renderContent()}
    </div>
  )
}

export default DashboardContent
