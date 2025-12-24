import { fetchAllContacts, type Contact } from '../../../services/api'
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'

const ContactsTouched = () => {
  const location = useLocation()
  const highlightContactId = location.state?.highlightContactId
  const [expandedContactId, setExpandedContactId] = useState<string | null>(null)

  useEffect(() => {
    if (highlightContactId) {
      setExpandedContactId(highlightContactId)
    }
  }, [highlightContactId])
  const { data: searchResult, isLoading, error } = useQuery<Contact[], Error>({
    queryKey: ['contactsTouched'],
    queryFn: fetchAllContacts,
  })

  const contacts = searchResult || []

  if (isLoading) {
    return <div className="p-10 flex justify-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div></div>
  }

  if (error) {
    return <div className="p-10 text-red-500">Error loading contacts: {error.message}</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Contacts Touched</h1>
        <p className="text-slate-600">View and manage all contacts you've interacted with</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-slate-600 text-sm mb-1">Total Contacts</p>
            <p className="text-4xl font-bold text-blue-600">{contacts.length}</p>
            {/* Change KPI not yet available from backend */}
            {/* <p className="text-green-600 text-sm font-medium mt-2">+12% from last month</p> */}
          </div>
          <div className="w-20 h-20 bg-blue-50 rounded-lg flex items-center justify-center">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent Contacts</h2>
        <div className="space-y-4">
          {contacts.length === 0 ? (
            <p className="text-slate-500 text-sm">No contacts found.</p>
          ) : (
            contacts.slice(0, 10).map((contact) => (
              <div
                key={contact.contact_id}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${expandedContactId === contact.contact_id
                    ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-100'
                    : 'bg-white border-slate-200 hover:border-blue-200'
                  }`}
                onClick={() => setExpandedContactId(prev => prev === contact.contact_id ? null : contact.contact_id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">
                      {contact.first_name} {contact.last_name}
                      {contact.company_name && <span className="text-slate-500 font-normal ml-2">({contact.company_name})</span>}
                    </p>
                    <p className="text-sm text-slate-600">{contact.designation || contact.email || 'No additional info'}</p>
                  </div>
                  <span className="text-sm text-slate-500">
                    {contact.created_at
                      ? formatDistanceToNow(new Date(contact.created_at), { addSuffix: true })
                      : 'No activity'}
                  </span>
                </div>

                {/* Expanded Details */}
                {expandedContactId === contact.contact_id && (
                  <div className="mt-4 pt-4 border-t border-slate-200/50 animate-in slide-in-from-top-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <p className="font-semibold text-slate-700">Contact Details</p>
                        {contact.designation && <p><span className="text-slate-500">Designation:</span> {contact.designation}</p>}
                        {contact.company_name && <p><span className="text-slate-500">Company:</span> {contact.company_name}</p>}
                      </div>
                      <div className="space-y-2">
                        <p className="font-semibold text-slate-700">Contact Info</p>
                        {/* Emails */}
                        {contact.emails && contact.emails.length > 0 ? (
                          <div className="flex flex-col gap-1">
                            <span className="text-slate-500">Emails:</span>
                            {contact.emails.map((e, idx) => (
                              <span key={idx} className="bg-white/50 px-2 py-1 rounded inline-block w-fit">
                                {e.email} {e.is_primary && <span className="text-xs bg-blue-100 text-blue-700 px-1 rounded ml-1">Primary</span>}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p><span className="text-slate-500">Email:</span> {contact.email || 'N/A'}</p>
                        )}

                        {/* Phones */}
                        {contact.phones && contact.phones.length > 0 ? (
                          <div className="flex flex-col gap-1 mt-2">
                            <span className="text-slate-500">Phones:</span>
                            {contact.phones.map((p, idx) => (
                              <span key={idx} className="bg-white/50 px-2 py-1 rounded inline-block w-fit">
                                {p.phone_number} {p.is_primary && <span className="text-xs bg-green-100 text-green-700 px-1 rounded ml-1">Primary</span>}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p><span className="text-slate-500">Phone:</span> {contact.phone || 'N/A'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactsTouched



