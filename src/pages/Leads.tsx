import { useState, useEffect } from 'react'
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import DashboardSidebar from '../components/Dashboard/DashboardSidebar'
import { fetchAllContacts, Contact, fetchCompletedMeetings, CompletedMeeting } from '../services/api'

const Leads = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const [expandedContactId, setExpandedContactId] = useState<string | null>(null)
  const [meetingDropdownOpen, setMeetingDropdownOpen] = useState<string | null>(null)

  useEffect(() => {
    if (location.state?.highlightContactId) {
      setExpandedContactId(location.state.highlightContactId)
      // Optional: scroll to element logic could be added here
    }
  }, [location.state])


  // Fetch completed meetings for past meeting summaries
  const { data: completedMeetings } = useQuery<CompletedMeeting[], Error>({
    queryKey: ['completedMeetings'],
    queryFn: fetchCompletedMeetings,
  })

  const toggleMeetingDropdown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setMeetingDropdownOpen(prev => prev === id ? null : id)
  }

  // Get past meetings for a contact by matching name/company
  const getPastMeetingsForContact = (lead: Contact): CompletedMeeting[] => {
    if (!completedMeetings || !lead) return []

    const leadName = lead.company_name || `${lead.first_name || ''} ${lead.last_name || ''}`.trim()
    if (!leadName) return []

    return completedMeetings.filter(m => {
      const meetingName = (m.company_name || m.contact_name || '').toLowerCase()
      const searchName = leadName.toLowerCase()
      return meetingName.includes(searchName) || searchName.includes(meetingName)
    }).slice(0, 5) // Limit to 5 most recent
  }

  const { data: leads, isLoading, error } = useQuery<Contact[], Error>({
    queryKey: ['contacts'],
    queryFn: fetchAllContacts,
  })

  // Calculate statistics from real data
  const totalLeads = leads?.length || 0;
  const hotLeads = leads?.filter(l => (l.outcome || l.last_outcome_status) === 'HOT').length || 0;
  const warmLeads = leads?.filter(l => (l.outcome || l.last_outcome_status) === 'WARM').length || 0;
  // const coldLeads = leads?.filter(l => (l.outcome || l.last_outcome_status) === 'COLD').length || 0;
  // Total Value is not in DB currently, remove or placeholder? User said "remove them" from UI columns.
  // But header stats cards might still be wanted. The user said "in the shown UI we don't have source, value, so remove them and add the other details in the UI it need to be take from the db".
  // I will keep stats but Value might be 0 or calculated if I had value. Since I don't, I might hide the Value card or show 0.
  // The user said "remove them" referencing "source, value". I assumes column.
  // I'll keep the Value card as placeholder or remove it?
  // "in the ui it's not reflecting whatever the data is there reflect it in the UI if anything is missing just remove it and maintain the folder structure and in the shown UI we don't have source, value, so remove them"
  // It implies removing from the table. I'll probably leave the top cards but set Value to N/A or 0.

  const getStatusColor = (status: string | null | undefined) => {
    const s = status?.toUpperCase();
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
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  const getDisplayName = (lead: Contact) => {
    if (lead.company_name) return lead.company_name;
    if (lead.first_name || lead.last_name) return `${lead.first_name || ''} ${lead.last_name || ''}`.trim();
    return 'Unknown';
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-1">
            <button
              onClick={() => navigate(-1)}
              className="btn-secondary p-2 rounded-lg"
              title="Go back"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
          </div>
          <p className="text-slate-600 text-sm ml-11">Manage and track your leads</p>
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

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Warm Leads</p>
                <p className="text-2xl font-bold text-orange-600">{warmLeads}</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Hiding Total Value or showing N/A since it's not in DB */}

          {/* Total Value Card Removed */}
        </div>

        {/* Leads Table */}
        <div className="glass-card p-6" style={{ position: 'relative', zIndex: 1 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">All Leads</h2>
          </div>

          {isLoading ? (
            <div className="text-center py-8 text-slate-500">Loading contacts...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">Error loading contacts</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full" style={{ position: 'relative' }}>
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Contact</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                    {/* Removed Source and Value cols */}
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Last Contact</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads?.map((lead) => (
                    <React.Fragment key={lead.contact_id}>
                      <tr
                        className={`border-b border-slate-100 transition-colors ${expandedContactId === lead.contact_id ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'
                          }`}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            {expandedContactId === lead.contact_id && (
                              <div className="w-1 h-8 bg-blue-600 rounded-full mr-2"></div>
                            )}
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
                        {/* Removed Source and Value cells */}
                        <td className="py-3 px-4">
                          <p className="text-sm text-slate-600">{formatDate(lead.last_activity_at || lead.created_at)}</p>
                        </td>
                        <td className="py-3 px-4">
                          {getPastMeetingsForContact(lead).length > 0 && (
                            <button
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                              onClick={(e) => { e.stopPropagation(); toggleMeetingDropdown(lead.contact_id, e); }}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>Meetings ({getPastMeetingsForContact(lead).length})</span>
                              <svg
                                className={`w-3 h-3 transition-transform ${meetingDropdownOpen === lead.contact_id ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          )}
                          {meetingDropdownOpen === lead.contact_id && (
                            <div
                              className="absolute right-0 mt-2 w-[400px] bg-white rounded-lg shadow-xl border border-blue-200 z-30 p-4 max-h-80 overflow-y-auto"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="space-y-3">
                                {getPastMeetingsForContact(lead).map((meeting, idx) => (
                                  <div key={meeting.meeting_id} className="pb-3 border-b border-slate-200 last:border-0">
                                    <p className="text-xs text-slate-500 mb-1.5">
                                      {meeting.scheduled_at ? new Date(meeting.scheduled_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Date unknown'}
                                    </p>
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                      {meeting.mom_text || 'No MOM available'}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                      {expandedContactId === lead.contact_id && (
                        <tr className="bg-blue-50/50 animate-in fade-in active-row-detail">
                          <td colSpan={5} className="py-4 px-6 border-b border-blue-100">
                            <div className="space-y-6">
                              <h4 className="font-semibold text-slate-800 border-b border-blue-200 pb-2 text-base">Past Meeting MOM Details</h4>
                              {getPastMeetingsForContact(lead).length === 0 ? (
                                <div className="text-center py-8">
                                  <p className="text-slate-500 text-sm">No past meetings found for this contact.</p>
                                </div>
                              ) : (
                                <div className="space-y-4">
                                  {getPastMeetingsForContact(lead).map((meeting) => (
                                    <div key={meeting.meeting_id} className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                                      <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                          <div className="flex items-center space-x-2 mb-2">
                                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Completed</span>
                                            <span className="text-sm text-slate-600">
                                              {meeting.scheduled_at ? new Date(meeting.scheduled_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                                hour: 'numeric',
                                                minute: '2-digit'
                                              }) : 'Date unknown'}
                                            </span>
                                          </div>
                                          <p className="font-semibold text-slate-900 text-base mb-1">
                                            {meeting.contact_name || 'Meeting'} {meeting.company_name && `- ${meeting.company_name}`}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="mt-3 pt-3 border-t border-slate-200">
                                        <p className="text-xs font-medium text-slate-600 mb-2">Meeting Minutes (MOM):</p>
                                        {meeting.mom_text ? (
                                          <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                                            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                                              {meeting.mom_text}
                                            </p>
                                          </div>
                                        ) : (
                                          <p className="text-sm text-slate-400 italic">No meeting minutes available for this meeting.</p>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                  {(!leads || leads.length === 0) && (
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
