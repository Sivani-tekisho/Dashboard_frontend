interface TeamMember {
  id: string
  name: string
  title: string
  email: string
  phone: string
  avatar: string
  contacts: number
  meetings: number
  conversion: number
}

const TeamMemberCards = () => {
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'John Doe',
      title: 'Sales Manager',
      email: 'john@company.com',
      phone: '+1 234 567 8900',
      avatar: 'JD',
      contacts: 142,
      meetings: 28,
      conversion: 24,
    },
    {
      id: '2',
      name: 'Jane Smith',
      title: 'Account Executive',
      email: 'jane@company.com',
      phone: '+1 234 567 8901',
      avatar: 'JS',
      contacts: 98,
      meetings: 19,
      conversion: 21,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {teamMembers.map((member) => (
        <div
          key={member.id}
          className="bg-white rounded-lg p-5 hover:shadow-md transition-all border border-gray-200"
        >
          {/* Member Header */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">{member.avatar}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-gray-800 font-semibold text-lg">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.title}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mb-4 space-y-2">
            <p className="text-gray-600 text-sm">{member.email}</p>
            <p className="text-gray-600 text-sm">{member.phone}</p>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <p className="text-gray-800 font-semibold">{member.contacts}</p>
              <p className="text-gray-500 text-xs">Contacts</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-800 font-semibold">{member.meetings}</p>
              <p className="text-gray-500 text-xs">Meetings</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-gray-800 font-semibold">{member.conversion}%</p>
              <p className="text-gray-500 text-xs">Conversion</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TeamMemberCards

