import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { navigateTo } from '../store/slices/navigationSlice'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const handleNavigate = (path: string) => {
    dispatch(navigateTo({ page: path }))
    navigate(path)
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-blue-600 font-bold text-xl bg-blue-50 px-2 py-1 rounded">LQ</span>
              <span className="text-slate-800 font-semibold text-lg">LeadQ.AI</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleNavigate('/')}
              className={`px-4 py-2 rounded-lg transition-all ${
                isActive('/')
                  ? 'text-blue-600 bg-blue-50/70 backdrop-blur-sm'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50/70'
              }`}
            >
              <span className="font-medium">Home</span>
            </button>

            <button
              onClick={() => handleNavigate('/card-scanner')}
              className={`px-4 py-2 rounded-lg transition-all ${
                isActive('/card-scanner')
                  ? 'text-blue-600 bg-blue-50/70 backdrop-blur-sm'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50/70'
              }`}
            >
              <span className="font-medium">Card Scanner</span>
            </button>

            <button
              onClick={() => handleNavigate('/dashboard')}
              className={`px-4 py-2 rounded-lg transition-all ${
                isActive('/dashboard')
                  ? 'text-blue-600 bg-blue-50/70 backdrop-blur-sm'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50/70'
              }`}
            >
              <span className="font-medium">Dashboard</span>
            </button>

            <button
              onClick={() => handleNavigate('/meetings')}
              className={`px-4 py-2 rounded-lg transition-all ${
                isActive('/meetings')
                  ? 'text-blue-600 bg-blue-50/70 backdrop-blur-sm'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50/70'
              }`}
            >
              <span className="font-medium">Meetings</span>
            </button>

            <button
              onClick={() => handleNavigate('/emails')}
              className={`px-4 py-2 rounded-lg transition-all ${
                isActive('/emails')
                  ? 'text-blue-600 bg-blue-50/70 backdrop-blur-sm'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50/70'
              }`}
            >
              <span className="font-medium">Emails</span>
            </button>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <button className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings */}
            <button className="p-2 text-slate-600 hover:text-blue-600 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>

            {/* User Account */}
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">SK</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
