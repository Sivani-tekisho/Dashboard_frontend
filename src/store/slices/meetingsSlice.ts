import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Meeting {
  meeting_id: string
  contact_id?: string | null
  contact_name: string | null
  scheduled_at: string | null
  completed_at?: string | null
  outcome?: string | null
  notes?: string | null
  [key: string]: any
}

interface MeetingsState {
  meetings: Meeting[]
  upcomingMeetings: Meeting[]
  completedMeetings: Meeting[]
  overdueMeetings: Meeting[]
  selectedMeeting: Meeting | null
  filter: 'all' | 'upcoming' | 'completed' | 'overdue'
  isLoading: boolean
  error: string | null
}

const initialState: MeetingsState = {
  meetings: [],
  upcomingMeetings: [],
  completedMeetings: [],
  overdueMeetings: [],
  selectedMeeting: null,
  filter: 'all',
  isLoading: false,
  error: null,
}

const meetingsSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {
    setMeetings: (state, action: PayloadAction<Meeting[]>) => {
      state.meetings = action.payload
      categorizeMeetings(state)
    },
    setUpcomingMeetings: (state, action: PayloadAction<Meeting[]>) => {
      state.upcomingMeetings = action.payload
    },
    setCompletedMeetings: (state, action: PayloadAction<Meeting[]>) => {
      state.completedMeetings = action.payload
    },
    setOverdueMeetings: (state, action: PayloadAction<Meeting[]>) => {
      state.overdueMeetings = action.payload
    },
    selectMeeting: (state, action: PayloadAction<Meeting | null>) => {
      state.selectedMeeting = action.payload
    },
    setFilter: (state, action: PayloadAction<MeetingsState['filter']>) => {
      state.filter = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    updateMeeting: (state, action: PayloadAction<Meeting>) => {
      const index = state.meetings.findIndex(m => m.meeting_id === action.payload.meeting_id)
      if (index !== -1) {
        state.meetings[index] = action.payload
        categorizeMeetings(state)
      }
    },
  },
})

function categorizeMeetings(state: MeetingsState) {
  const now = new Date()
  state.upcomingMeetings = state.meetings.filter(m => 
    m.scheduled_at && new Date(m.scheduled_at) > now && !m.completed_at
  )
  state.completedMeetings = state.meetings.filter(m => m.completed_at)
  state.overdueMeetings = state.meetings.filter(m => 
    m.scheduled_at && new Date(m.scheduled_at) <= now && !m.completed_at
  )
}

export const {
  setMeetings,
  setUpcomingMeetings,
  setCompletedMeetings,
  setOverdueMeetings,
  selectMeeting,
  setFilter,
  setLoading,
  setError,
  updateMeeting,
} = meetingsSlice.actions
export default meetingsSlice.reducer
