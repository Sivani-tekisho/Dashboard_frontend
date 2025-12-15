import { useNavigate } from 'react-router-dom'

const QuickActions = () => {
  const navigate = useNavigate()

  const actions = [
    {
      id: 'scan-contact',
      title: 'Scan Contact',
      subtitle: 'Scan a business card',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'bg-purple-600 hover:bg-purple-700',
      onClick: () => navigate('/card-scanner'),
    },
    {
      id: 'search-contact',
      title: 'Search Contact',
      subtitle: 'Find existing contacts',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      color: 'bg-purple-400 hover:bg-purple-500',
      onClick: () => navigate('/dashboard'),
    },
    {
      id: 'start-meeting',
      title: 'Start Meeting',
      subtitle: 'Begin a new meeting',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-green-600 hover:bg-green-700',
      onClick: () => navigate('/meetings'),
    },
    {
      id: 'draft-email',
      title: 'Draft Email',
      subtitle: 'Compose follow-up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-orange-600 hover:bg-orange-700',
      onClick: () => navigate('/emails'),
    },
  ]

  return (
    <div className="glass-card p-6 mb-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={`${action.color} text-white rounded-lg p-4 transition-all transform hover:scale-105 hover:shadow-lg text-left`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {action.icon}
              </div>
              <div className="flex-1">
                <p className="font-bold text-base mb-1">{action.title}</p>
                <p className="text-sm text-white/90">{action.subtitle}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuickActions

