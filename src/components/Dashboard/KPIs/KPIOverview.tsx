import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAppDispatch } from '../../../store/hooks'
import { setActiveSubSection } from '../../../store/slices/dashboardSlice'
import { fetchDashboardSummary, DateRangePreset, type DashboardSummary } from '../../../services/api'

const KPIOverview = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // TODO: Add date range selector in UI to control this state
  const selectedPreset = DateRangePreset.THIS_MONTH

  const { data: summaryData, isLoading, error } = useQuery<DashboardSummary, Error>({
    queryKey: ['dashboardSummary', selectedPreset],
    queryFn: () => fetchDashboardSummary(selectedPreset),
    refetchInterval: 60000, // Refresh every 60s
  })

  // Memoize kpiCards to prevent re-creation on every render
  const kpiCards = useMemo(() => {
    if (!summaryData) return []



    return [
      {
        id: 'contacts-touched',
        title: 'Contacts Touched',
        value: summaryData.contacts_touched.toString(),
        // Backend doesn't provide change % yet, hiding or generic for now
        // change: '+12% from last month', 
        // changeType: 'positive',
        icon: (
          <div className="w-12 h-12 bg-brand-primary/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        ),
      },
      {
        id: 'meetings-completed',
        title: 'Meetings Completed',
        value: summaryData.funnel_breakdown.meetings_completed.toString(),
        icon: (
          <div className="w-12 h-12 bg-brand-primary/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        ),
      },
      {
        id: 'emails-drafted',
        title: 'Emails Drafted',
        value: summaryData.emails_drafted.toString(),
        additionalInfo: `${summaryData.emails_drafted} pending send`, // Assuming drafted means pending
        icon: (
          <div className="w-12 h-12 bg-brand-light rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        ),
      },
      {
        id: null,
        title: 'MoM Coverage',
        value: `${summaryData.mom_coverage_percent}%`,
        icon: (
          <div className="w-12 h-12 bg-brand-primary/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        ),
      },
      {
        id: 'conversion-rate',
        title: 'Conversion Rate',
        value: `${summaryData.conversion_rate}%`,
        change: `${summaryData.conversion_rate_change > 0 ? '+' : ''}${summaryData.conversion_rate_change}% from last month`,
        changeType: summaryData.conversion_rate_change >= 0 ? 'positive' : 'negative',
        icon: (
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        ),
      },
      {
        id: 'leads',
        title: 'Leads',
        value: summaryData.contacts_touched.toString(),
        additionalInfo: `${summaryData.overdue_followups_count} require follow-up`,
        icon: (
          <div className="w-12 h-12 bg-brand-primary/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        ),
      },
    ]
  }, [summaryData])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">KPIs Overview</h1>
          <p className="text-gray-600 text-sm">Track your key performance indicators</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading KPIs from backend...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">KPIs Overview</h1>
          <p className="text-gray-600 text-sm">Track your key performance indicators</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-blue-200">
          <p className="text-blue-600 font-medium mb-2">Error loading data</p>
          <p className="text-gray-500 text-sm">{(error as Error).message}</p>
          <div className="mt-4">
            {/* Fallback info or retry button could go here */}
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions Section */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card Scanner */}
          <button
            onClick={() => navigate('/card-scanner')}
            className="bg-blue-50/70 backdrop-blur-sm rounded-2xl p-5 hover:shadow-lg hover:scale-105 transition-all text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Card Scanner</h3>
              </div>
            </div>
          </button>

          {/* Start Meeting */}
          <button
            onClick={() => navigate('/meetings')}
            className="bg-blue-50/70 backdrop-blur-sm rounded-2xl p-5 hover:shadow-lg hover:scale-105 transition-all text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Meeting</h3>
              </div>
            </div>
          </button>

          {/* Draft Email */}
          <button
            onClick={() => navigate('/emails')}
            className="bg-blue-50/70 backdrop-blur-sm rounded-2xl p-5 hover:shadow-lg hover:scale-105 transition-all text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Email</h3>
              </div>
            </div>
          </button>

          {/* Voice Agent */}
          <button
            onClick={() => navigate('/voice-agent')}
            className="bg-blue-50/70 backdrop-blur-sm rounded-2xl p-5 hover:shadow-lg hover:scale-105 transition-all text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Voice Agent</h3>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">KPIs Overview</h2>
          <p className="text-slate-500 text-sm">Track your key performance indicators</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiCards.map((card, index) => (
          <div
            key={index}
            onClick={() => {
              if (card.id === 'leads') {
                navigate('/leads')
              } else if (card.id) {
                dispatch(setActiveSubSection(card.id))
              }
            }}
            className={`bg-white border border-slate-200 rounded-2xl p-6 transition-all hover:shadow-lg ${card.id ? 'cursor-pointer hover:border-blue-300' : ''
              }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-slate-600 text-sm font-medium mb-3">{card.title}</h3>
                <p className="text-4xl font-bold text-blue-600">{card.value}</p>
              </div>
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center">
                {card.icon}
              </div>
            </div>
            {/* Removed change logic for now as it's not in backend
            {card.change && (
              <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                <span>↑</span>
                {card.change}
              </p>
            )}
            */}
            {card.additionalInfo && (
              <p className="text-slate-500 text-sm mt-2">{card.additionalInfo}</p>
            )}
          </div>
        ))}
      </div>

      {/* ... keeping the rest of the component (chart etc) ... */}
      {/* Performance Trend Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">
        <h2 className="text-lg font-bold text-blue-900 mb-4">Performance Trend</h2>
        <div className="h-64 bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 relative overflow-hidden">
          {/* Sample Line Chart */}
          <div className="relative h-full flex items-end justify-between gap-2">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-slate-400">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            {/* Chart bars */}
            <div className="flex-1 flex items-end justify-around gap-2 ml-8 mr-4">
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-all cursor-pointer" style={{ height: '60%' }}></div>
                <span className="text-xs text-slate-500">Jan</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-all cursor-pointer" style={{ height: '75%' }}></div>
                <span className="text-xs text-slate-500">Feb</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-all cursor-pointer" style={{ height: '55%' }}></div>
                <span className="text-xs text-slate-500">Mar</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-all cursor-pointer" style={{ height: '85%' }}></div>
                <span className="text-xs text-slate-500">Apr</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-all cursor-pointer" style={{ height: '70%' }}></div>
                <span className="text-xs text-slate-500">May</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-blue-600 rounded-t-lg hover:bg-blue-700 transition-all cursor-pointer shadow-lg" style={{ height: '95%' }}></div>
                <span className="text-xs text-slate-700 font-semibold">Jun</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute top-4 right-4 flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-slate-600">KPI Performance</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default KPIOverview