import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DashboardState {
  activeSection: string | null
  activeSubSection: string | null
  sidebarOpen: boolean
}

const initialState: DashboardState = {
  activeSection: 'kpis',
  activeSubSection: 'overview',
  sidebarOpen: true,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<string | null>) => {
      state.activeSection = action.payload
    },
    setActiveSubSection: (state, action: PayloadAction<string | null>) => {
      state.activeSubSection = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
  },
})

export const { setActiveSection, setActiveSubSection, toggleSidebar } = dashboardSlice.actions
export default dashboardSlice.reducer

