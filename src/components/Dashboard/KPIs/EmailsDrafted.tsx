import { fetchDraftedEmails, type EmailDetail } from '../../../services/api'
import { useQuery } from '@tanstack/react-query'

const EmailsDrafted = () => {
  const { data: emails, isLoading, error } = useQuery<EmailDetail[], Error>({
    queryKey: ['draftedEmails'],
    queryFn: fetchDraftedEmails,
  })

  // Assuming all queried are drafts based on backend query order/limit.
  const totalEmails = emails?.length || 0
  const pendingEmails = emails?.filter(e => e.status !== 'SENT').length || 0

  if (isLoading) return <div className="p-10 text-center">Loading emails...</div>
  if (error) return <div className="p-10 text-red-500">Error: {error.message}</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Emails Drafted</h1>
        <p className="text-slate-600">Manage your drafted emails and track email performance</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-slate-600 text-sm mb-1">Total Emails</p>
            <p className="text-4xl font-bold text-blue-600">{totalEmails}</p>
            {pendingEmails > 0 && (
              <p className="text-blue-600 text-sm font-medium mt-2">{pendingEmails} pending send</p>
            )}
          </div>
          <div className="w-20 h-20 bg-blue-50 rounded-lg flex items-center justify-center">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Pending Emails</h2>
        <div className="space-y-4">
          {emails && emails.length > 0 ? (
            emails.map((email) => (
              <div key={email.email_id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <p className="font-medium text-slate-800">{email.subject || 'No Subject'}</p>
                  <p className="text-sm text-slate-600">To: {email.recipient || 'Unknown'}</p>
                  {email.drafted_at && <p className="text-xs text-slate-400">{new Date(email.drafted_at).toLocaleDateString()}</p>}
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Send
                </button>
              </div>
            ))
          ) : (
            <p className="text-slate-500">No drafted emails found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmailsDrafted



