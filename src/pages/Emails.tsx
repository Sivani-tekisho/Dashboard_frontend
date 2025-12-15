import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardSidebar from '../components/Dashboard/DashboardSidebar'

const Emails = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
        <div className="mb-6">
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
            <h1 className="text-2xl font-bold text-slate-900">Emails</h1>
          </div>
          <p className="text-slate-600 text-sm ml-11">Manage your email communications and drafts</p>
        </div>

        {/* Email Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Emails Drafted</p>
                <p className="text-2xl font-bold text-blue-600">35</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Pending Send</p>
                <p className="text-2xl font-bold text-yellow-600">5</p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Sent</p>
                <p className="text-2xl font-bold text-green-600">30</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Opened</p>
                <p className="text-2xl font-bold text-purple-600">24</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Email List */}
        <div className="glass-card">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Email Drafts</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Compose New
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-slate-200">
            {/* Email Item */}
            <div className="p-6 hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-slate-900">Proposal Follow-up</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Pending</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">To: john.doe@example.com</p>
                  <p className="text-sm text-slate-500">Subject: Q4 Strategy Discussion - Next Steps</p>
                  <p className="text-xs text-slate-400 mt-2">Drafted 2 days ago</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
                  <button className="text-green-600 hover:text-green-700 text-sm">Send</button>
                </div>
              </div>
            </div>

            <div className="p-6 hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-slate-900">Meeting Confirmation</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Pending</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">To: sarah.wilson@example.com</p>
                  <p className="text-sm text-slate-500">Subject: Confirming Our Meeting Next Week</p>
                  <p className="text-xs text-slate-400 mt-2">Drafted 1 day ago</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
                  <button className="text-green-600 hover:text-green-700 text-sm">Send</button>
                </div>
              </div>
            </div>

            <div className="p-6 hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-slate-900">Thank You Note</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Sent</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">To: michael.brown@example.com</p>
                  <p className="text-sm text-slate-500">Subject: Thank You for Your Time Today</p>
                  <p className="text-xs text-slate-400 mt-2">Sent 3 days ago • Opened</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                </div>
              </div>
            </div>

            <div className="p-6 hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-slate-900">Project Update</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Pending</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">To: team@example.com</p>
                  <p className="text-sm text-slate-500">Subject: Weekly Project Status Update</p>
                  <p className="text-xs text-slate-400 mt-2">Drafted 4 hours ago</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
                  <button className="text-green-600 hover:text-green-700 text-sm">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Emails

