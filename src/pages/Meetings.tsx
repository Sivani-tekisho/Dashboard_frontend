import { useState } from 'react'
import DashboardSidebar from '../components/Dashboard/DashboardSidebar'
import DashboardContent from '../components/Dashboard/DashboardContent'

const Meetings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Meetings</h1>
          <p className="text-gray-600 text-sm">Manage your meetings and schedule follow-ups</p>
        </div>

        {/* Meeting Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upcoming Meetings */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Upcoming Meetings</h2>
              <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-semibold text-gray-800">Client Review - Q4 Strategy</p>
                <p className="text-sm text-gray-600">Today at 2:00 PM</p>
                <button className="mt-2 bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                  Join Meeting
                </button>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <p className="font-semibold text-gray-800">Team Standup</p>
                <p className="text-sm text-gray-600">Tomorrow at 10:00 AM</p>
                <button className="mt-2 bg-green-500 text-white px-4 py-1.5 rounded-lg hover:bg-green-600 transition-colors text-sm">
                  Join Meeting
                </button>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <p className="font-semibold text-gray-800">Sales Pipeline Review</p>
                <p className="text-sm text-gray-600">Dec 17 at 3:30 PM</p>
                <button className="mt-2 bg-purple-500 text-white px-4 py-1.5 rounded-lg hover:bg-purple-600 transition-colors text-sm">
                  Join Meeting
                </button>
              </div>
            </div>
          </div>

          {/* Completed Meetings */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Completed Meetings</h2>
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-gray-300 pl-4 py-2">
                <p className="font-semibold text-gray-800">Product Demo</p>
                <p className="text-sm text-gray-600">Dec 14 at 11:00 AM</p>
                <p className="text-xs text-gray-500 mt-1">Completed</p>
              </div>
              
              <div className="border-l-4 border-gray-300 pl-4 py-2">
                <p className="font-semibold text-gray-800">Onboarding Session</p>
                <p className="text-sm text-gray-600">Dec 13 at 2:00 PM</p>
                <p className="text-xs text-gray-500 mt-1">Completed</p>
              </div>
            </div>
          </div>

          {/* Overdue Follow-ups */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Overdue Follow-ups</h2>
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <p className="font-semibold text-gray-800">Follow-up with ABC Corp</p>
                <p className="text-sm text-red-600">Overdue by 2 days</p>
                <button className="mt-2 bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition-colors text-sm">
                  Schedule Now
                </button>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <p className="font-semibold text-gray-800">Client Check-in</p>
                <p className="text-sm text-red-600">Overdue by 1 day</p>
                <button className="mt-2 bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition-colors text-sm">
                  Schedule Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Meeting Statistics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Meetings</p>
                <p className="text-2xl font-bold text-gray-800">28</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-800">22</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-800">3</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-gray-800">3</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
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

