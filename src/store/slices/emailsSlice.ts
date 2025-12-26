import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Email {
  email_id: string
  contact_id: string | null
  subject: string
  body: string
  status: 'draft' | 'sent' | 'scheduled'
  sent_at: string | null
  created_at: string
  [key: string]: any
}

interface EmailsState {
  emails: Email[]
  drafts: Email[]
  sentEmails: Email[]
  selectedEmail: Email | null
  filter: 'all' | 'draft' | 'sent' | 'scheduled'
  isLoading: boolean
  error: string | null
}

const initialState: EmailsState = {
  emails: [],
  drafts: [],
  sentEmails: [],
  selectedEmail: null,
  filter: 'all',
  isLoading: false,
  error: null,
}

const emailsSlice = createSlice({
  name: 'emails',
  initialState,
  reducers: {
    setEmails: (state, action: PayloadAction<Email[]>) => {
      state.emails = action.payload
      categorizeEmails(state)
    },
    selectEmail: (state, action: PayloadAction<Email | null>) => {
      state.selectedEmail = action.payload
    },
    setFilter: (state, action: PayloadAction<EmailsState['filter']>) => {
      state.filter = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    addEmail: (state, action: PayloadAction<Email>) => {
      state.emails.push(action.payload)
      categorizeEmails(state)
    },
    updateEmail: (state, action: PayloadAction<Email>) => {
      const index = state.emails.findIndex(e => e.email_id === action.payload.email_id)
      if (index !== -1) {
        state.emails[index] = action.payload
        categorizeEmails(state)
      }
    },
    deleteEmail: (state, action: PayloadAction<string>) => {
      state.emails = state.emails.filter(e => e.email_id !== action.payload)
      categorizeEmails(state)
    },
  },
})

function categorizeEmails(state: EmailsState) {
  state.drafts = state.emails.filter(e => e.status === 'draft')
  state.sentEmails = state.emails.filter(e => e.status === 'sent')
}

export const {
  setEmails,
  selectEmail,
  setFilter,
  setLoading,
  setError,
  addEmail,
  updateEmail,
  deleteEmail,
} = emailsSlice.actions
export default emailsSlice.reducer
