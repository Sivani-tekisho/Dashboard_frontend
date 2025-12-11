const MeetingsCompleted = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Meetings Completed</h1>
        <p className="text-gray-600">Track all your completed meetings and their outcomes</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-600 text-sm mb-1">Total Meetings</p>
            <p className="text-4xl font-bold text-green-600">28</p>
            <p className="text-green-600 text-sm font-medium mt-2">+8% from last month</p>
          </div>
          <div className="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Meetings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Q4 Planning Session</p>
              <p className="text-sm text-gray-600">With TechCorp Team</p>
            </div>
            <span className="text-sm text-gray-500">Completed</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Product Demo</p>
              <p className="text-sm text-gray-600">With ABC Industries</p>
            </div>
            <span className="text-sm text-gray-500">Completed</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Client Review</p>
              <p className="text-sm text-gray-600">With XYZ Company</p>
            </div>
            <span className="text-sm text-gray-500">Completed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MeetingsCompleted



