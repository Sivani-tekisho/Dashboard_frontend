import { useEffect, useState, useMemo } from 'react'
import { useAppDispatch } from '../../../store/hooks'
import { setActiveSubSection } from '../../../store/slices/dashboardSlice'
import { fetchKPIs, type KPIData } from '../../../services/api'

const KPIOverview = () => {
  const dispatch = useAppDispatch()
  const [kpiData, setKpiData] = useState<KPIData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    
    const loadKPIs = async () => {
      try {
        if (!isMounted) return
        
        setLoading(true)
        setError(null)
        
        // TODO: Replace with actual user_id when available
        // For now, you need to provide a user_id - backend requires it
        // Example: const data = await fetchKPIs('your-user-uuid-here')
        // Or modify backend to make user_id optional for testing
        
        // Try to fetch without user_id first (will fail if backend requires it)
        const data = await fetchKPIs()
        
        if (!isMounted) return
        setKpiData(data)
      } catch (err: any) {
        if (!isMounted) return
        
        const errorMessage = err?.message || 'Failed to load KPIs. Please check your backend connection.'
        setError(errorMessage)
        console.error('Error loading KPIs:', err)
        
        // Set fallback data for testing if backend is not available
        setKpiData({
          contactsTouched: { value: 142, change: '+12% from last month', changePercent: 12 },
          meetingsCompleted: { value: 28, change: '+8% from last month', changePercent: 8 },
          emailsDrafted: { value: 35, pending: 5 },
          momCoverage: { value: 89, change: '+5% from last month', changePercent: 5 },
          conversionRate: { value: 24, change: '+3% from last month', changePercent: 3 },
          hotLeads: { value: 18, requireFollowUp: 12 },
        })
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadKPIs()
    
    // Optional: Refresh every 30 seconds (increased from 30s to reduce flickering)
    const interval = setInterval(() => {
      if (isMounted) {
        loadKPIs()
      }
    }, 60000) // Changed to 60 seconds
    
    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  // Memoize kpiCards to prevent re-creation on every render
  const kpiCards = useMemo(() => {
    if (!kpiData) return []
    
    return [
    {
      id: 'contacts-touched',
      title: 'Contacts Touched',
      value: kpiData.contactsTouched.value.toString(),
      change: kpiData.contactsTouched.change,
      changeType: 'positive',
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
      value: kpiData.meetingsCompleted.value.toString(),
      change: kpiData.meetingsCompleted.change,
      changeType: 'positive',
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
      value: kpiData.emailsDrafted.value.toString(),
      additionalInfo: `${kpiData.emailsDrafted.pending} pending send`,
      icon: (
        <div className="w-12 h-12 bg-brand-light rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      ),
    },
    {
      id: null, // No specific page for MoM Coverage
      title: 'MoM Coverage',
      value: `${kpiData.momCoverage.value}%`,
      change: kpiData.momCoverage.change,
      changeType: 'positive',
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
      value: `${kpiData.conversionRate.value}%`,
      change: kpiData.conversionRate.change,
      changeType: 'positive',
      icon: (
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      ),
    },
    {
      id: null, // No specific page for Hot Leads
      title: 'Hot Leads',
      value: kpiData.hotLeads.value.toString(),
      additionalInfo: `${kpiData.hotLeads.requireFollowUp} require follow-up`,
      icon: (
        <div className="w-12 h-12 bg-brand-primary/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </div>
      ),
    },
  ]
  }, [kpiData])

  if (loading) {
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

  if (error && !kpiData) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">KPIs Overview</h1>
          <p className="text-gray-600 text-sm">Track your key performance indicators</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-red-200">
          <p className="text-red-600 font-medium mb-2">Error: {error}</p>
          <div className="text-red-500 text-sm space-y-1">
            <p><strong>Common issues:</strong></p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>Backend requires <code className="bg-red-100 px-1 rounded">user_id</code> parameter - check console for details</li>
              <li>Make sure backend is running at http://localhost:8000</li>
              <li>Backend command: <code className="bg-red-100 px-1 rounded">uvicorn main:app --reload --host 0.0.0.0 --port 8000</code></li>
              <li>Check browser console (F12) for full error details</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">KPIs Overview</h2>
          <p className="text-slate-500 text-sm">Track your key performance indicators</p>
        </div>
        {error && (
          <div className="bg-amber-50 rounded-lg px-4 py-2 border border-amber-200">
            <p className="text-amber-700 text-sm">⚠️ Using fallback data</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiCards.map((card, index) => (
          <div
            key={index}
            onClick={() => {
              if (card.id) {
                dispatch(setActiveSubSection(card.id))
              }
            }}
            className={`bg-white border border-slate-200 rounded-2xl p-6 transition-all hover:shadow-lg ${
              card.id ? 'cursor-pointer hover:border-blue-300' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-slate-600 text-sm font-medium mb-3">{card.title}</h3>
                <p className="text-4xl font-bold text-blue-600">{card.value}</p>
              </div>
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {index === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />}
                  {index === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                  {index === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                  {index === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
                  {index === 4 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
                  {index === 5 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />}
                </svg>
              </div>
            </div>
            {card.change && (
              <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                <span>↑</span>
                {card.change}
              </p>
            )}
            {card.additionalInfo && (
              <p className="text-slate-500 text-sm mt-2">{card.additionalInfo}</p>
            )}
          </div>
        ))}
      </div>

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
                <div className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-all cursor-pointer" style={{height: '60%'}}></div>
                <span className="text-xs text-slate-500">Jan</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-all cursor-pointer" style={{height: '75%'}}></div>
                <span className="text-xs text-slate-500">Feb</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-all cursor-pointer" style={{height: '55%'}}></div>
                <span className="text-xs text-slate-500">Mar</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-all cursor-pointer" style={{height: '85%'}}></div>
                <span className="text-xs text-slate-500">Apr</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-all cursor-pointer" style={{height: '70%'}}></div>
                <span className="text-xs text-slate-500">May</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-blue-600 rounded-t-lg hover:bg-blue-700 transition-all cursor-pointer shadow-lg" style={{height: '95%'}}></div>
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

