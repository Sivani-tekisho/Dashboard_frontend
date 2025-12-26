import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from './slices/dashboardSlice'
import navigationReducer from './slices/navigationSlice'
import leadsReducer from './slices/leadsSlice'
import meetingsReducer from './slices/meetingsSlice'
import emailsReducer from './slices/emailsSlice'

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    navigation: navigationReducer,
    leads: leadsReducer,
    meetings: meetingsReducer,
    emails: emailsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

