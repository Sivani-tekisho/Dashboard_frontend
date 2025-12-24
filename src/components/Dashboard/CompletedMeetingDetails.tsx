import { useState, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchCompletedMeetings, saveMeetingMoM, CompletedMeeting } from '../../services/api'

const CompletedMeetingDetails = () => {
  const [expandedMeetings, setExpandedMeetings] = useState<string[]>([])
  // State to track text input for each meeting: { [meeting_id]: "text..." }
  const [momInputs, setMomInputs] = useState<Record<string, string>>({})
  const queryClient = useQueryClient()

  const { data: meetings, isLoading, error } = useQuery<CompletedMeeting[], Error>({
    queryKey: ['completedMeetings'],
    queryFn: fetchCompletedMeetings,
  })

  // Mutation to save MoM
  const mutation = useMutation({
    mutationFn: saveMeetingMoM,
    onSuccess: () => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['completedMeetings'] });
      queryClient.invalidateQueries({ queryKey: ['contacts'] }); // Refresh leads to show new status
      queryClient.invalidateQueries({ queryKey: ['dashboardSummary'] }); 
      alert("MoM Saved & Analysis Started!");
    },
    onError: (err) => {
      alert("Failed to save MoM: " + err.message);
    }
  });

  const toggleMeeting = (id: string) => {
    setExpandedMeetings(prev =>
      prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]
    )
  }

  const handleMoMChange = (id: string, text: string) => {
    setMomInputs(prev => ({ ...prev, [id]: text }))
  }

  const handleSaveMoM = (id: string) => {
    const text = momInputs[id];
    if (!text || text.length < 10) {
      alert("Please enter a valid summary (at least 10 chars).");
      return;
    }
    mutation.mutate({ meeting_id: id, mom_text: text });
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
      // If MoM exists in DB, use it. Else check if we have local input first, or default text.
      summary: m.mom_text || (m.mom_exists ? 'Meeting minutes available (loading details...)' : null),
    }))
  }, [meetings])

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Loading completed meetings...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error loading meetings</div>
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
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">Completed</span>
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
                
                {meeting.mom_exists ? (
                   // Read Mode
                   <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {meeting.mom_text || meeting.summary || "Summary content not loaded."}
                      </p>
                      <div className="mt-2 flex items-center space-x-2">
                         <span className="text-xs text-green-600 font-medium flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Analysis Complete
                         </span>
                      </div>
                   </div>
                ) : (
                   // Edit Mode
                   <div className="space-y-3">
                      <textarea 
                        className="w-full text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                        rows={4}
                        placeholder="Type the meeting summary here to generate AI analysis..."
                        value={momInputs[meeting.meeting_id] || ''}
                        onChange={(e) => handleMoMChange(meeting.meeting_id, e.target.value)}
                      />
                      <div className="flex justify-end">
                        <button 
                          onClick={() => handleSaveMoM(meeting.meeting_id)}
                          disabled={mutation.isPending}
                          className="bg-brand-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 flex items-center space-x-2"
                        >
                           {mutation.isPending ? (
                             <>
                               <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                               <span>Analyzing...</span>
                             </>
                           ) : (
                             <>
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                               <span>Generate AI Analysis</span>
                             </>
                           )}
                        </button>
                      </div>
                   </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default CompletedMeetingDetails