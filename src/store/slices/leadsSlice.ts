import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Lead {
  contact_id: string
  first_name: string | null
  last_name: string | null
  company_name: string | null
  email: string | null
  phone?: string | null | undefined
  outcome: string | null
  last_outcome_status: string | null
  last_activity_at: string | null
  created_at: string | null
  next_follow_up_due_at?: string | null | undefined
  next_follow_up_type?: string | null | undefined
  emails?: any[]
  phones?: any[]
  [key: string]: any
}

interface LeadsState {
  leads: Lead[]
  filteredLeads: Lead[]
  selectedLead: Lead | null
  expandedLeadId: string | null
  filter: 'all' | 'pending' | 'hot' | 'warm' | 'cold' | 'won' | 'lost'
  searchTerm: string
  isLoading: boolean
  error: string | null
}

const initialState: LeadsState = {
  leads: [],
  filteredLeads: [],
  selectedLead: null,
  expandedLeadId: null,
  filter: 'all',
  searchTerm: '',
  isLoading: false,
  error: null,
}

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    setLeads: (state, action: PayloadAction<Lead[]>) => {
      state.leads = action.payload
      state.filteredLeads = filterLeads(action.payload, state.filter, state.searchTerm)
    },
    setFilter: (state, action: PayloadAction<LeadsState['filter']>) => {
      state.filter = action.payload
      state.filteredLeads = filterLeads(state.leads, action.payload, state.searchTerm)
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
      state.filteredLeads = filterLeads(state.leads, state.filter, action.payload)
    },
    selectLead: (state, action: PayloadAction<Lead | null>) => {
      state.selectedLead = action.payload
    },
    expandLead: (state, action: PayloadAction<string | null>) => {
      state.expandedLeadId = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    updateLead: (state, action: PayloadAction<Lead>) => {
      const index = state.leads.findIndex(l => l.contact_id === action.payload.contact_id)
      if (index !== -1) {
        state.leads[index] = action.payload
        state.filteredLeads = filterLeads(state.leads, state.filter, state.searchTerm)
      }
    },
  },
})

function filterLeads(leads: Lead[], filter: LeadsState['filter'], searchTerm: string): Lead[] {
  let filtered = leads

  // Apply status filter
  if (filter !== 'all') {
    filtered = filtered.filter(lead => {
      const status = (lead.outcome || lead.last_outcome_status || '').toUpperCase()
      if (filter === 'pending') {
        return !status || status === 'PENDING' || status === 'NEW'
      }
      return status === filter.toUpperCase()
    })
  }

  // Apply search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase()
    filtered = filtered.filter(lead => {
      const name = `${lead.first_name || ''} ${lead.last_name || ''}`.toLowerCase()
      const company = (lead.company_name || '').toLowerCase()
      const email = (lead.email || '').toLowerCase()
      const phone = (lead.phone || '').toLowerCase()
      return name.includes(term) || company.includes(term) || email.includes(term) || phone.includes(term)
    })
  }

  return filtered
}

export const {
  setLeads,
  setFilter,
  setSearchTerm,
  selectLead,
  expandLead,
  setLoading,
  setError,
  updateLead,
} = leadsSlice.actions
export default leadsSlice.reducer
