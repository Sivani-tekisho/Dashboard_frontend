const ContactsTouched = () => {
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
            <p className="text-4xl font-bold text-blue-600">142</p>
            <p className="text-green-600 text-sm font-medium mt-2">+12% from last month</p>
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
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div>
              <p className="font-medium text-slate-800">John Smith</p>
              <p className="text-sm text-slate-600">john.smith@example.com</p>
            </div>
            <span className="text-sm text-slate-500">2 days ago</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div>
              <p className="font-medium text-slate-800">Sarah Johnson</p>
              <p className="text-sm text-slate-600">sarah.j@example.com</p>
            </div>
            <span className="text-sm text-slate-500">3 days ago</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div>
              <p className="font-medium text-slate-800">Mike Davis</p>
              <p className="text-sm text-slate-600">mike.davis@example.com</p>
            </div>
            <span className="text-sm text-slate-500">5 days ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactsTouched



