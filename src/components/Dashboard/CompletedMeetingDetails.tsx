import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchCompletedMeetings, CompletedMeeting } from '../../services/api'

const CompletedMeetingDetails = () => {
  const [expandedMeetings, setExpandedMeetings] = useState<string[]>([])

  const { data: meetings, isLoading, error } = useQuery<CompletedMeeting[], Error>({
    queryKey: ['completedMeetings'],
    queryFn: fetchCompletedMeetings,
  })

  const toggleMeeting = (id: string) => {
    setExpandedMeetings(prev =>
      prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]
    )
  }

  const meetingList = useMemo(() => {
    if (!meetings) return []
    return meetings.map((m) => ({
      ...m,
      title: m.company_name ? `${m.contact_name} - ${m.company_name}` : m.contact_name || 'Meeting',
      date: m.scheduled_at ? new Date(m.scheduled_at).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }) : 'N/A',
      summary: m.mom_text || (m.mom_exists ? 'Meeting minutes available.' : 'No summary available.'),
    }))
  }, [meetings])

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Loading completed meetings...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-blue-500">Error loading meetings</div>
  }

  if (!meetingList.length) {
    return (
      <div className="p-8 text-center text-slate-500">
        <p>No completed meetings found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Completed Meetings</h2>
      {meetingList.map((meeting) => (
        <div key={meeting.meeting_id} className="glass-card p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">Completed</span>
                <span className="text-sm text-slate-600">{meeting.date}</span>
              </div>
              <p className="font-semibold text-slate-900 text-lg">{meeting.title}</p>
            </div>
            <button
              onClick={() => toggleMeeting(meeting.meeting_id)}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <span>{expandedMeetings.includes(meeting.meeting_id) ? 'Hide' : 'Show'} Details</span>
              <svg
                className={`w-4 h-4 transition-transform ${expandedMeetings.includes(meeting.meeting_id) ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {expandedMeetings.includes(meeting.meeting_id) && (
            <div className="mt-4 pt-4 border-t border-slate-200 space-y-4 animate-in slide-in-from-top-2 duration-200">
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Meeting Summary / MOM:</p>
                <p className="text-sm text-slate-600 leading-relaxed bg-blue-50/50 p-3 rounded-lg">
                  {meeting.summary}
                </p>
              </div>
              {/* Removed hardcoded attendees and action items for now as back-end doesn't provide them yet */}
              {/* 
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Meeting Details:</p>
                <p className="text-sm text-slate-600">Attendees: {meeting.attendeesCount} people</p>
              </div>
              */}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default CompletedMeetingDetails