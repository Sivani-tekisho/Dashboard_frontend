import { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import DashboardSidebar from '../components/Dashboard/DashboardSidebar'
import {
  fetchAllContacts,
  Contact,
  fetchPastMeetingsSummary,
  PastMeetingsSummary,
  DateRangePreset,
  fetchContactCompletedMeetings,
  CompletedMeeting
} from '../services/api'

const Leads = () => {
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/f0ecc01d-46ea-4f76-a56b-1fc5d56c63a4',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Leads.tsx:15',message:'Leads component render',data:{pathname:window.location.pathname},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams<{ id?: string }>()
  
  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7244/ingest/f0ecc01d-46ea-4f76-a56b-1fc5d56c63a4',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Leads.tsx:24',message:'Location changed',data:{pathname:location.pathname,paramsId:params.id},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  }, [location.pathname, params.id]);
  // #endregion

  const [pastMeetingsSummaries, setPastMeetingsSummaries] = useState<Record<string, PastMeetingsSummary>>({})
  const [contactMeetings, setContactMeetings] = useState<Record<string, CompletedMeeting[]>>({})
  const [expandedMoMLeadId, setExpandedMoMLeadId] = useState<string | null>(null)
  const [dateFilter, setDateFilter] = useState<DateRangePreset>(DateRangePreset.THIS_MONTH)
  const [selectedLead, setSelectedLead] = useState<Contact | null>(null)

  // Handler functions
  const handleViewLead = (leadId: string) => {
    navigate(`/leads/${leadId}`)
  }

  const handleBack = () => {
    if (params.id) {
      // If viewing detail, go back to leads list
      navigate('/leads')
    } else {
      // Go back in browser history
      navigate(-1)
    }
  }

  // Fetch contacts
  const { data: leadsData, isLoading, error } = useQuery<Contact[], Error>({
    queryKey: ['contacts'],
    queryFn: fetchAllContacts
  })

  // Handle lead selection from URL params
  useEffect(() => {
    if (params.id && leadsData) {
      const lead = leadsData.find(l => l.contact_id === params.id)
      if (lead) {
        setSelectedLead(lead)
      }
    } else {
      setSelectedLead(null)
    }
  }, [params.id, leadsData])

  // Handle navigation from search
  useEffect(() => {
    if (location.state?.highlightContactId) {
      handleViewLead(location.state.highlightContactId)
    }
  }, [location.state])

  // Fetch past meetings summary when viewing detail
  useEffect(() => {
    const fetchSummary = async () => {
      const leadId = params.id
      if (leadId) {
        try {
          const summary = await fetchPastMeetingsSummary(leadId, dateFilter)
          setPastMeetingsSummaries(prev => ({ ...prev, [leadId]: summary }))
        } catch (error) {
          console.error('Failed to fetch past meetings summary:', error)
        }
      }
    }
    fetchSummary()
  }, [dateFilter, params.id])

  // Fetch completed meetings with MoM for all leads in the list
  useEffect(() => {
    const fetchMeetingsForLeads = async () => {
      if (leadsData && leadsData.length > 0 && !params.id) {
        // Only fetch for list view, not detail view
        const leadsToFetch = leadsData.filter(lead => !contactMeetings[lead.contact_id])
        
        if (leadsToFetch.length > 0) {
          // Fetch in batches to avoid overwhelming the API
          const batchSize = 5
          for (let i = 0; i < leadsToFetch.length; i += batchSize) {
            const batch = leadsToFetch.slice(i, i + batchSize)
            await Promise.all(
              batch.map(async (lead) => {
                try {
                  const meetings = await fetchContactCompletedMeetings(lead.contact_id)
                  setContactMeetings(prev => ({ ...prev, [lead.contact_id]: meetings }))
                } catch (error) {
                  console.error(`Failed to fetch meetings for lead ${lead.contact_id}:`, error)
                }
              })
            )
          }
        }
      }
    }
    fetchMeetingsForLeads()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadsData, params.id]) // contactMeetings intentionally excluded to avoid infinite loop

  // Calculate statistics from real data
  const totalLeads = leadsData?.length || 0
  const pendingLeads = leadsData?.filter(l => {
    const status = (l.outcome || l.last_outcome_status || '').toUpperCase()
    return !status || status === 'PENDING' || status === 'NEW'
  }).length || 0
  const hotLeads = leadsData?.filter(l => (l.outcome || l.last_outcome_status) === 'HOT').length || 0

  const getStatusColor = (status: string | null | undefined) => {
    const s = status?.toUpperCase()
    switch (s) {
      case 'HOT':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'WARM':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'COLD':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'WON':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'LOST':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getDisplayName = (lead: Contact) => {
    // Prioritize person's name over company name
    if (lead.first_name || lead.last_name) {
      const fullName = `${lead.first_name || ''} ${lead.last_name || ''}`.trim()
      if (fullName) return fullName
    }
    if (lead.company_name) return lead.company_name
    return 'Unknown'
  }

  // If viewing a specific lead detail
  if (params.id && selectedLead) {
    const lead = selectedLead
    const summary = pastMeetingsSummaries[lead.contact_id]

    return (
      <div className="flex h-[calc(100vh-4rem)]">
        <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <button
                onClick={handleBack}
                className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Go back"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-slate-900">{getDisplayName(lead)}</h1>
            </div>
          </div>

          {/* Lead Detail View */}
          <div className="space-y-6">
            {/* Lead Information Card */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Lead Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Name</p>
                  <p className="font-semibold text-slate-900">{getDisplayName(lead)}</p>
                </div>
                {lead.email && (
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Email</p>
                    <p className="text-slate-900">{lead.email}</p>
                  </div>
                )}
                {lead.phone && (
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Phone</p>
                    <p className="text-slate-900">{lead.phone}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-slate-600 mb-1">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(lead.outcome || lead.last_outcome_status)}`}>
                    {lead.outcome || lead.last_outcome_status || 'N/A'}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Last Contact</p>
                  <p className="text-slate-900">{formatDate(lead.last_activity_at || lead.created_at)}</p>
                </div>
                {lead.company_name && (
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Company</p>
                    <p className="text-slate-900">{lead.company_name}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Past Meetings Summary */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Past Meetings Summary
                </h2>
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-slate-600 font-medium">Filter by:</label>
                  <select
                    value={dateFilter}
                    onChange={(e) => {
                      setDateFilter(e.target.value as DateRangePreset)
                      setPastMeetingsSummaries({})
                    }}
                    className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={DateRangePreset.THIS_WEEK}>This Week</option>
                    <option value={DateRangePreset.THIS_MONTH}>This Month</option>
                    <option value={DateRangePreset.THIS_QUARTER}>This Quarter</option>
                    <option value={DateRangePreset.THIS_YEAR}>This Year</option>
                  </select>
                </div>
              </div>
              {summary ? (
                <div className="bg-white rounded-lg border border-blue-200 p-4 shadow-sm">
                  <p className="text-slate-700 leading-relaxed">
                    {summary.summary_text}
                  </p>
                  {summary.total_past_meetings > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <span className="text-sm text-slate-500">
                        Total past meetings: <span className="font-semibold text-blue-600">{summary.total_past_meetings}</span>
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center p-6 bg-white rounded-lg border border-slate-200">
                  <svg className="animate-spin h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-sm text-slate-500">Loading past meetings...</span>
                </div>
              )}
            </div>

            {/* Meeting Minutes of Meeting (MoM) */}
            {contactMeetings[lead.contact_id] && contactMeetings[lead.contact_id].length > 0 && (
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Meeting Minutes of Meeting (MoM)
                </h2>
                <div className="space-y-4">
                  {contactMeetings[lead.contact_id]
                    .filter(meeting => meeting.mom_exists && meeting.mom_text)
                    .map((meeting, index) => (
                      <div key={meeting.meeting_id || index} className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-slate-900">
                              {meeting.contact_name || 'Meeting'}
                            </p>
                            {meeting.scheduled_at && (
                              <p className="text-sm text-slate-500">
                                {new Date(meeting.scheduled_at).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            )}
                          </div>
                          {meeting.status && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              {meeting.status}
                            </span>
                          )}
                        </div>
                        {meeting.mom_text && (
                          <div className="mt-3 pt-3 border-t border-slate-200">
                            <p className="text-sm font-medium text-slate-700 mb-2">Minutes:</p>
                            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                              {meeting.mom_text}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  {contactMeetings[lead.contact_id].filter(m => m.mom_exists && m.mom_text).length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                      <p>No meeting minutes available for this contact.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Default list view
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-1">
            <button
              onClick={handleBack}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Go back"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
          </div>
          <div className="flex items-center justify-between ml-11">
            <p className="text-slate-600 text-sm">Manage and track your leads</p>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-slate-600 font-medium">Filter by:</label>
              <select
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value as DateRangePreset)
                  setPastMeetingsSummaries({})
                }}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={DateRangePreset.THIS_WEEK}>This Week</option>
                <option value={DateRangePreset.THIS_MONTH}>This Month</option>
                <option value={DateRangePreset.THIS_QUARTER}>This Quarter</option>
                <option value={DateRangePreset.THIS_YEAR}>This Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Leads</p>
                <p className="text-2xl font-bold text-blue-600">{totalLeads}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Pending Leads</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingLeads}</p>
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
                <p className="text-sm text-slate-600">Hot Leads</p>
                <p className="text-2xl font-bold text-red-600">{hotLeads}</p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">All Leads</h2>
          </div>

          {isLoading ? (
            <div className="text-center py-8 text-slate-500">Loading contacts...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">Error loading contacts</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Contact</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Last Contact</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leadsData?.map((lead) => (
                    <>
                      <tr
                        key={lead.contact_id}
                        className="border-b border-slate-100 transition-colors hover:bg-slate-50"
                      >
                        <td 
                          className="py-3 px-4 cursor-pointer" 
                          onClick={() => {
                            handleViewLead(lead.contact_id)
                          }}
                        >
                          <div className="flex items-center">
                            <p className="font-semibold text-slate-900">{getDisplayName(lead)}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {lead.email && <p className="text-sm text-slate-600">{lead.email}</p>}
                          {lead.phone && <p className="text-xs text-slate-500">{lead.phone}</p>}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(lead.outcome || lead.last_outcome_status)}`}>
                            {lead.outcome || lead.last_outcome_status || 'N/A'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm text-slate-600">{formatDate(lead.last_activity_at || lead.created_at)}</p>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setExpandedMoMLeadId(expandedMoMLeadId === lead.contact_id ? null : lead.contact_id)
                              }}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                              title="View Details"
                            >
                              {expandedMoMLeadId === lead.contact_id ? 'Hide' : 'View'}
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expandedMoMLeadId === lead.contact_id && (
                        <tr className="bg-blue-50/50">
                          <td colSpan={5} className="py-4 px-6 border-b border-blue-100">
                            <div className="space-y-3">
                              {/* MoM Summary Section */}
                              {contactMeetings[lead.contact_id]?.some(m => m.mom_exists && m.mom_text) ? (
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-slate-800 text-sm flex items-center">
                                      <svg className="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                      Meeting MoM Summary
                                    </h4>
                                    <div className="relative">
                                      <select
                                        className="text-xs border border-slate-300 rounded px-2 py-1 bg-white focus:outline-none"
                                      >
                                        <option>All Meetings</option>
                                        <option>Recent</option>
                                      </select>
                                    </div>
                                  </div>
                                  {contactMeetings[lead.contact_id]
                                    .filter(meeting => meeting.mom_exists && meeting.mom_text)
                                    .slice(0, 1) // Show only the most recent one
                                    .map((meeting, index) => (
                                      <div key={meeting.meeting_id || index} className="bg-white rounded-lg border border-purple-200 p-3 shadow-sm">
                                        {meeting.mom_text && (
                                          <div>
                                            <p className="text-sm text-slate-700 leading-relaxed">
                                              {meeting.mom_text.length > 200 
                                                ? meeting.mom_text.substring(0, 200) + '...' 
                                                : meeting.mom_text}
                                            </p>
                                            {meeting.scheduled_at && (
                                              <p className="text-xs text-slate-500 mt-2">
                                                {new Date(meeting.scheduled_at).toLocaleDateString('en-US', {
                                                  month: 'short',
                                                  day: 'numeric',
                                                  year: 'numeric'
                                                })}
                                              </p>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                </div>
                              ) : (
                                <div className="text-center py-4 text-slate-500 text-sm">
                                  No meeting minutes available for this lead.
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                  {(!leadsData || leadsData.length === 0) && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500">No leads found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Leads
