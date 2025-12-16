import { useQuery } from '@tanstack/react-query'
import { fetchDashboardSummary, DateRangePreset, type DashboardSummary } from '../../../services/api'

const ConversionRate = () => {
  const selectedPreset = DateRangePreset.THIS_MONTH
  const { data: summaryData, isLoading, error } = useQuery<DashboardSummary, Error>({
    queryKey: ['dashboardSummary', selectedPreset],
    queryFn: () => fetchDashboardSummary(selectedPreset),
  })

  if (isLoading) return <div className="p-8 text-center text-slate-500">Loading conversion metrics...</div>
  if (error) return <div className="p-8 text-center text-red-500">Error loading metrics</div>
  if (!summaryData) return null

  // Calculate percentage of qualified leads relative to total
  const qualifiedPct = summaryData.total_leads > 0
    ? Math.round((summaryData.qualified_leads / summaryData.total_leads) * 100)
    : 0

  // Use pre-calculated rate from backend for consistency, or calculate locally
  const convertedPct = summaryData.conversion_rate

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Conversion Rate</h1>
        <p className="text-slate-600">Analyze your conversion metrics and trends</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-slate-600 text-sm mb-1">Current Rate</p>
            <p className="text-4xl font-bold text-blue-600">{summaryData.conversion_rate}%</p>
            <p className={`text-sm font-medium mt-2 ${summaryData.conversion_rate_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {summaryData.conversion_rate_change > 0 ? '+' : ''}{summaryData.conversion_rate_change}% from last month
            </p>
          </div>
          <div className="w-20 h-20 bg-blue-50 rounded-lg flex items-center justify-center">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Conversion Funnel</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-slate-600">Leads ({summaryData.total_leads})</span>
                <span className="text-sm font-medium text-slate-800">100%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-slate-600">Qualified ({summaryData.qualified_leads})</span>
                <span className="text-sm font-medium text-slate-800">{qualifiedPct}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${qualifiedPct}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-slate-600">Converted ({summaryData.converted_leads})</span>
                <span className="text-sm font-medium text-slate-800">{convertedPct}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${convertedPct}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Trend Analysis</h3>
          <div className="h-48 bg-blue-50 rounded-lg flex items-center justify-center">
            <p className="text-slate-400">Chart visualization coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConversionRate



