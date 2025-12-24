import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import DashboardSidebar from '../components/Dashboard/DashboardSidebar'
import { fetchAllContacts, Contact } from '../services/api'

const Leads = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const [expandedContactId, setExpandedContactId] = useState<string | null>(null)

  useEffect(() => {
    if (location.state?.highlightContactId) {
      setExpandedContactId(location.state.highlightContactId)
      // Optional: scroll to element logic could be added here
    }
  }, [location.state])

  const toggleExpand = (id: string) => {
    setExpandedContactId(prev => prev === id ? null : id)
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
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">All Leads</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Add Lead
            </button>
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
                    {/* Removed Source and Value cols */}
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Last Contact</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads?.map((lead) => (
                    <>
                      <tr
                        key={lead.contact_id}
                        className={`border-b border-slate-100 transition-colors cursor-pointer ${expandedContactId === lead.contact_id ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'
                          }`}
                        onClick={() => toggleExpand(lead.contact_id)}
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
                          <div className="flex items-center space-x-2">
                            <button
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                              onClick={(e) => { e.stopPropagation(); toggleExpand(lead.contact_id); }}
                            >
                              {expandedContactId === lead.contact_id ? 'Hide' : 'View'}
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expandedContactId === lead.contact_id && (
                        <tr className="bg-blue-50/50 animate-in fade-in active-row-detail">
                          <td colSpan={5} className="py-4 px-6 border-b border-blue-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                              <div className="space-y-3">
                                <h4 className="font-semibold text-slate-800 border-b border-blue-200 pb-1">Professional Details</h4>
                                <div className="grid grid-cols-[100px_1fr] gap-2">
                                  <span className="text-slate-500">Designation:</span>
                                  <span className="font-medium text-slate-700">{lead.designation || 'N/A'}</span>

                                  <span className="text-slate-500">Company:</span>
                                  <span className="font-medium text-slate-700">{lead.company_name || 'N/A'}</span>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <h4 className="font-semibold text-slate-800 border-b border-blue-200 pb-1">Contact Information</h4>

                                {/* Emails */}
                                <div className="mb-2">
                                  <p className="text-slate-500 mb-1">Emails:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {lead.emails && lead.emails.length > 0 ? (
                                      lead.emails.map((e, idx) => (
                                        <span key={idx} className="bg-white border border-blue-100 px-2 py-1 rounded text-slate-700 flex items-center shadow-sm">
                                          {e.email}
                                          {e.is_primary && <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">Primary</span>}
                                          {e.type && <span className="ml-1 text-slate-400 text-xs">({e.type})</span>}
                                        </span>
                                      ))
                                    ) : (
                                      <span className="text-slate-400 italic">No emails recorded</span>
                                    )}
                                  </div>
                                </div>

                                {/* Phones */}
                                <div>
                                  <p className="text-slate-500 mb-1">Phones:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {lead.phones && lead.phones.length > 0 ? (
                                      lead.phones.map((p, idx) => (
                                        <span key={idx} className="bg-white border border-green-100 px-2 py-1 rounded text-slate-700 flex items-center shadow-sm">
                                          {p.phone_number}
                                          {p.is_primary && <span className="ml-2 px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Primary</span>}
                                          {p.type && <span className="ml-1 text-slate-400 text-xs">({p.type})</span>}
                                        </span>
                                      ))
                                    ) : (
                                      <span className="text-slate-400 italic">No phones recorded</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
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
