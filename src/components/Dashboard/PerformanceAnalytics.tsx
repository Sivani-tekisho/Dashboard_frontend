const PerformanceAnalytics = () => {
  // Sample data for the graph
  const graphData = [
    { day: 16, contacts: 0, meetings: 0 },
    { day: 15, contacts: 0, meetings: 0 },
    { day: 14, contacts: 0, meetings: 0 },
    { day: 13, contacts: 0, meetings: 0 },
    { day: 12, contacts: 0, meetings: 0 },
    { day: 11, contacts: 0, meetings: 0 },
    { day: 10, contacts: 0, meetings: 0 },
    { day: 9, contacts: 0, meetings: 0 },
    { day: 8, contacts: 45, meetings: 8 },
    { day: 7, contacts: 0, meetings: 0 },
    { day: 6, contacts: 0, meetings: 0 },
    { day: 5, contacts: 52, meetings: 12 },
    { day: 4, contacts: 0, meetings: 0 },
    { day: 3, contacts: 0, meetings: 0 },
    { day: 2, contacts: 0, meetings: 0 },
    { day: 1, contacts: 0, meetings: 0 },
  ]

  const maxContacts = Math.max(...graphData.map(d => d.contacts))
  const maxMeetings = Math.max(...graphData.map(d => d.meetings))

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Performance Analytics</h3>
      
      {/* Usage Bars */}
      <div className="space-y-3 mb-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Contacts</span>
            <span className="text-sm text-slate-600">~142/370 (38% used)</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '38%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Meetings</span>
            <span className="text-sm text-slate-600">~28/74 (38% used)</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '38%' }}></div>
          </div>
        </div>
      </div>

      {/* Line Graph */}
      <div className="border-t border-slate-200 pt-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-slate-700">Daily Activity</span>
          <div className="flex items-center space-x-4 text-xs text-slate-600">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Contacts</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Meetings</span>
            </div>
          </div>
        </div>
        
        {/* Graph Container */}
        <div className="relative h-48 bg-slate-50 rounded-lg p-4">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-4 bottom-4 flex flex-col justify-between text-xs text-slate-500 pr-2">
            <span>{maxContacts}</span>
            <span>{Math.floor(maxContacts * 0.75)}</span>
            <span>{Math.floor(maxContacts * 0.5)}</span>
            <span>{Math.floor(maxContacts * 0.25)}</span>
            <span>0</span>
          </div>
          
          {/* Graph Area */}
          <div className="ml-8 h-full relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-t border-slate-200"></div>
              ))}
            </div>
            
            {/* Data points and lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Contacts line */}
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                points={graphData.map((d, i) => {
                  const x = (i / (graphData.length - 1)) * 100
                  const y = maxContacts > 0 ? 100 - (d.contacts / maxContacts) * 100 : 100
                  return `${x},${y}`
                }).join(' ')}
              />
              
              {/* Meetings line */}
              <polyline
                fill="none"
                stroke="#9333ea"
                strokeWidth="2"
                points={graphData.map((d, i) => {
                  const x = (i / (graphData.length - 1)) * 100
                  const y = maxMeetings > 0 ? 100 - (d.meetings / maxMeetings) * 100 : 100
                  return `${x},${y}`
                }).join(' ')}
              />
              
              {/* Data points */}
              {graphData.map((d, i) => {
                if (d.contacts === 0 && d.meetings === 0) return null
                const x = (i / (graphData.length - 1)) * 100
                const contactsY = maxContacts > 0 ? 100 - (d.contacts / maxContacts) * 100 : 100
                const meetingsY = maxMeetings > 0 ? 100 - (d.meetings / maxMeetings) * 100 : 100
                return (
                  <g key={i}>
                    {d.contacts > 0 && (
                      <circle cx={x} cy={contactsY} r="2" fill="#3b82f6" />
                    )}
                    {d.meetings > 0 && (
                      <circle cx={x} cy={meetingsY} r="2" fill="#9333ea" />
                    )}
                  </g>
                )
              })}
            </svg>
            
            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-500 -mb-5">
              {graphData.filter((_, i) => i % 3 === 0).map((d, i) => (
                <span key={i}>{d.day}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerformanceAnalytics

