import { useState } from 'react'

interface CompletedMeetingDetailsProps {
  summaries: string[]
}

const CompletedMeetingDetails = ({ summaries }: CompletedMeetingDetailsProps) => {
  const [expandedMeetings, setExpandedMeetings] = useState<number[]>([])

  const meetings = [
    {
      id: 1,
      title: 'Product Demo - Tech Solutions Inc',
      date: 'Dec 14, 2025 at 2:00 PM',
      attendeesCount: 3,
      summary: summaries[0],
      actionItems: [
        'Send detailed proposal by Dec 18',
        'Schedule technical Q&A session',
        'Provide additional case studies'
      ]
    },
    {
      id: 2,
      title: 'Onboarding Session',
      date: 'Dec 13, 2025 at 11:00 AM',
      attendeesCount: 2,
      summary: summaries[1],
      actionItems: [
        'Follow-up training session scheduled',
        'Send welcome email with resources'
      ]
    },
    {
      id: 3,
      title: 'Quarterly Business Review',
      date: 'Dec 12, 2025 at 3:00 PM',
      attendeesCount: 3,
      summary: summaries[2],
      actionItems: [
        'Send case studies and references',
        'Schedule next check-in for mid-January'
      ]
    }
  ]

  const toggleMeeting = (id: number) => {
    setExpandedMeetings(prev =>
      prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Completed Meetings</h2>
      {meetings.map((meeting) => (
        <div key={meeting.id} className="glass-card p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">Completed</span>
                <span className="text-sm text-slate-600">{meeting.date}</span>
              </div>
              <p className="font-semibold text-slate-900 text-lg">{meeting.title}</p>
            </div>
            <button
              onClick={() => toggleMeeting(meeting.id)}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <span>{expandedMeetings.includes(meeting.id) ? 'Hide' : 'Show'} Details</span>
              <svg
                className={`w-4 h-4 transition-transform ${expandedMeetings.includes(meeting.id) ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {expandedMeetings.includes(meeting.id) && (
            <div className="mt-4 pt-4 border-t border-slate-200 space-y-4 animate-in slide-in-from-top-2 duration-200">
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Meeting Summary / MOM:</p>
                <p className="text-sm text-slate-600 leading-relaxed bg-blue-50/50 p-3 rounded-lg">
                  {meeting.summary}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Meeting Details:</p>
                <p className="text-sm text-slate-600">Attendees: {meeting.attendeesCount} people</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Action Items:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                  {meeting.actionItems.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default CompletedMeetingDetails

