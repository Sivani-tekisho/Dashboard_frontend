import { fetchContacts, type SearchResult } from '../../../services/api'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { useAppDispatch } from '../../../store/hooks'
import { setActiveSubSection } from '../../../store/slices/dashboardSlice'

const ContactsTouched = () => {
  const dispatch = useAppDispatch()
  
  // Use useQuery to fetch contacts. 
  // We're fetching all contacts (conceptually "touched") by not providing a specific query or relying on default behavior if API supports it.
  // Ideally, "Contacts Touched" implies contacts with interactions. The Search API might return all contacts for now.
  const { data: searchResult, isLoading, error } = useQuery<SearchResult, Error>({
    queryKey: ['contactsTouched'],
    queryFn: () => fetchContacts(''), // Empty query to hopefully get all or relevant contacts
  })

  const contacts = searchResult?.contacts || []

  const handleBack = () => {
    dispatch(setActiveSubSection('overview'))
  }

  if (isLoading) {
    return <div className="p-10 flex justify-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div></div>
  }

  if (error) {
    return <div className="p-10 text-red-500">Error loading contacts: {error.message}</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <button
            onClick={handleBack}
            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Go back"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-4xl font-bold text-slate-800">Contacts Touched</h1>
        </div>
        <p className="text-slate-600 ml-11">View and manage all contacts you've interacted with</p>
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
              <div key={contact.contact_id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div>
                  <p className="font-medium text-slate-800">
                    {contact.first_name} {contact.last_name}
                    {contact.company_name && <span className="text-slate-500 font-normal ml-2">({contact.company_name})</span>}
                  </p>
                  <p className="text-sm text-slate-600">{contact.email || 'No email'}</p>
                </div>
                <span className="text-sm text-slate-500">
                  {contact.created_at
                    ? formatDistanceToNow(new Date(contact.created_at), { addSuffix: true })
                    : (contact.last_activity_at
                      ? formatDistanceToNow(new Date(contact.last_activity_at), { addSuffix: true })
                      : 'No activity')}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactsTouched



