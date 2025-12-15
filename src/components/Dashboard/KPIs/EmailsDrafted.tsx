const EmailsDrafted = () => {
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
            <p className="text-4xl font-bold text-blue-600">35</p>
            <p className="text-blue-600 text-sm font-medium mt-2">5 pending send</p>
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
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div>
              <p className="font-medium text-slate-800">Follow-up: Project Proposal</p>
              <p className="text-sm text-slate-600">To: client@example.com</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Send
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div>
              <p className="font-medium text-slate-800">Meeting Recap</p>
              <p className="text-sm text-slate-600">To: team@example.com</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailsDrafted



