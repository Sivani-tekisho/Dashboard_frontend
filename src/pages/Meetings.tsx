import { useState } from 'react'
import DashboardSidebar from '../components/Dashboard/DashboardSidebar'
import { useNavigate } from 'react-router-dom'

const Meetings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <button
                onClick={() => navigate(-1)}
                className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Go back"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-slate-900">Meetings</h1>
            </div>
            <p className="text-slate-600 text-sm ml-11">Manage your meetings and schedule follow-ups</p>
          </div>
          <button 
            onClick={() => navigate('/meetings')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Meeting</span>
          </button>
        </div>

        {/* Meeting Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upcoming Meetings */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Upcoming Meetings</h2>
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-semibold text-slate-900">Client Review - Q4 Strategy</p>
                <p className="text-sm text-slate-600">Today at 2:00 PM</p>
                <button 
                  onClick={() => navigate('/meetings')}
                  className="mt-2 bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Join Meeting
                </button>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <p className="font-semibold text-slate-900">Team Standup</p>
                <p className="text-sm text-slate-600">Tomorrow at 10:00 AM</p>
                <button 
                  onClick={() => navigate('/meetings')}
                  className="mt-2 bg-green-500 text-white px-4 py-1.5 rounded-lg hover:bg-green-600 transition-colors text-sm"
                >
                  Join Meeting
                </button>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <p className="font-semibold text-slate-900">Sales Pipeline Review</p>
                <p className="text-sm text-slate-600">Dec 17 at 3:30 PM</p>
                <button 
                  onClick={() => navigate('/meetings')}
                  className="mt-2 bg-purple-500 text-white px-4 py-1.5 rounded-lg hover:bg-purple-600 transition-colors text-sm"
                >
                  Join Meeting
                </button>
              </div>
            </div>
          </div>

          {/* Completed Meetings */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Completed Meetings</h2>
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-gray-300 pl-4 py-2">
                <p className="font-semibold text-slate-900">Product Demo</p>
                <p className="text-sm text-slate-600">Dec 14 at 11:00 AM</p>
                <p className="text-xs text-slate-500 mt-1">Completed</p>
              </div>
              
              <div className="border-l-4 border-gray-300 pl-4 py-2">
                <p className="font-semibold text-slate-900">Onboarding Session</p>
                <p className="text-sm text-slate-600">Dec 13 at 2:00 PM</p>
                <p className="text-xs text-slate-500 mt-1">Completed</p>
              </div>
            </div>
          </div>

          {/* Overdue Follow-ups */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Overdue Follow-ups</h2>
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <p className="font-semibold text-slate-900">Follow-up with ABC Corp</p>
                <p className="text-sm text-red-600">Overdue by 2 days</p>
                <button 
                  onClick={() => navigate('/meetings')}
                  className="mt-2 bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  Schedule Now
                </button>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <p className="font-semibold text-slate-900">Client Check-in</p>
                <p className="text-sm text-red-600">Overdue by 1 day</p>
                <button 
                  onClick={() => navigate('/meetings')}
                  className="mt-2 bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  Schedule Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Meeting Statistics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
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
    </div>
  )
}

export default Meetings

