import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NavigationState {
  currentPage: string
  previousPages: string[]
  pageData: Record<string, any>
}

const initialState: NavigationState = {
  currentPage: '/',
  previousPages: [],
  pageData: {},
}

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigateTo: (state, action: PayloadAction<{ page: string; data?: any }>) => {
      // Add current page to history before changing
      if (state.currentPage && state.currentPage !== action.payload.page) {
        state.previousPages.push(state.currentPage)
        // Keep only last 10 pages in history
        if (state.previousPages.length > 10) {
          state.previousPages.shift()
        }
      }
      state.currentPage = action.payload.page
      if (action.payload.data) {
        state.pageData[action.payload.page] = action.payload.data
      }
    },
    navigateBack: (state) => {
      const previousPage = state.previousPages.pop()
      if (previousPage) {
        state.currentPage = previousPage
      }
    },
    clearNavigationHistory: (state) => {
      state.previousPages = []
    },
    setPageData: (state, action: PayloadAction<{ page: string; data: any }>) => {
      state.pageData[action.payload.page] = action.payload.data
    },
  },
})

export const { navigateTo, navigateBack, clearNavigationHistory, setPageData } = navigationSlice.actions
export default navigationSlice.reducer
