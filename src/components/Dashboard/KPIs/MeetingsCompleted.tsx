import { fetchCompletedMeetings, type CompletedMeeting } from '../../../services/api'
import { useQuery } from '@tanstack/react-query'

const MeetingsCompleted = () => {
  const { data: meetings, isLoading, error } = useQuery<CompletedMeeting[], Error>({
    queryKey: ['completedMeetings'],
    queryFn: fetchCompletedMeetings,
  })

  // We can also fetch dashboard summary here if we want the "Total count" to match exactly 
  // or just use meetings.length if we fetch all (API sets limit 20 by default).
  // For total count, usually we want the aggregate stat, not just the list length. 
  // But strictly speaking, the user asked to correct the values.
  // Ideally we use meetings.length if limit is high enough, or fetch summary.
  // Let's use meetings.length for now but note it's limited by pagination.
  // Actually, let's keep it simple: List shows recent, count shows "Total". 
  // But we don't have a "total count" endpoint for just meetings separate from dashboard summary.
  // Let's rely on list length if it's small, passed summary data, or just fetch summary again?
  // Re-fetching summary is safest for "Total" stats.

  if (isLoading) return <div className="p-10 text-center">Loading meetings...</div>
  if (error) return <div className="p-10 text-red-500">Error: {error.message}</div>

  const totalMeetings = meetings?.length || 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Meetings Completed</h1>
        <p className="text-slate-600">Track all your completed meetings and their outcomes</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-slate-600 text-sm mb-1">Total Completed (Recent)</p>
            <p className="text-4xl font-bold text-blue-600">{totalMeetings}</p>
            {/* <p className="text-green-600 text-sm font-medium mt-2">+8% from last month</p> */}
          </div>
          <div className="w-20 h-20 bg-blue-50 rounded-lg flex items-center justify-center">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent Meetings</h2>
        <div className="space-y-4">
          {meetings && meetings.length > 0 ? (
            meetings.map((meeting) => (
              <div key={meeting.meeting_id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div>
                  <p className="font-medium text-slate-800">Meeting</p>
                  <p className="text-sm text-slate-600">
                    With {meeting.contact_name || 'Unknown'}
                    {meeting.company_name ? ` (${meeting.company_name})` : ''}
                  </p>
                </div>
                <div key={meeting.meeting_id}>
                  <span className="text-sm text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded">
                    {meeting.status}
                  </span>
                  {meeting.scheduled_at && (
                    <p className="text-xs text-slate-500 mt-1 text-right">
                      {new Date(meeting.scheduled_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-500">No completed meetings found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MeetingsCompleted



