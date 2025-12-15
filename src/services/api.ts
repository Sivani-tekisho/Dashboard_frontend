// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

// Backend Response Interfaces
export interface BackendDashboardSummary {
  contacts_touched: number
  emails_drafted: number
  mom_coverage_percent: number
  overdue_followups_count: number
  cancelled_count: number
  no_show_count: number
  funnel_breakdown: {
    contacts_captured: number
    meetings_scheduled: number
    meetings_completed: number
    emails_drafted: number
    emails_sent: number
    positive_outcomes: number
  }
}

// Frontend KPI Data Interface
export interface KPIData {
  contactsTouched: {
    value: number
    change: string
    changePercent: number
  }
  meetingsCompleted: {
    value: number
    change: string
    changePercent: number
  }
  emailsDrafted: {
    value: number
    pending: number
  }
  momCoverage: {
    value: number
    change: string
    changePercent: number
  }
  conversionRate: {
    value: number
    change: string
    changePercent: number
  }
  hotLeads: {
    value: number
    requireFollowUp: number
  }
}

// Transform backend response to frontend format
const transformBackendData = (backendData: BackendDashboardSummary): KPIData => {
  // Calculate conversion rate (positive outcomes / meetings completed)
  const conversionRate = backendData.funnel_breakdown.meetings_completed > 0
    ? Math.round((backendData.funnel_breakdown.positive_outcomes / backendData.funnel_breakdown.meetings_completed) * 100)
    : 0

  // Calculate pending emails (drafted - sent)
  const pendingEmails = backendData.funnel_breakdown.emails_drafted - backendData.funnel_breakdown.emails_sent

  return {
    contactsTouched: {
      value: backendData.contacts_touched,
      change: '+0% from last month', // Backend doesn't provide change, using placeholder
      changePercent: 0,
    },
    meetingsCompleted: {
      value: backendData.funnel_breakdown.meetings_completed,
      change: '+0% from last month', // Backend doesn't provide change, using placeholder
      changePercent: 0,
    },
    emailsDrafted: {
      value: backendData.emails_drafted,
      pending: Math.max(0, pendingEmails),
    },
    momCoverage: {
      value: Math.round(backendData.mom_coverage_percent),
      change: '+0% from last month', // Backend doesn't provide change, using placeholder
      changePercent: 0,
    },
    conversionRate: {
      value: conversionRate,
      change: '+0% from last month', // Backend doesn't provide change, using placeholder
      changePercent: 0,
    },
    hotLeads: {
      value: backendData.funnel_breakdown.positive_outcomes,
      requireFollowUp: backendData.overdue_followups_count,
    },
  }
}

// Fetch KPIs from backend
export const fetchKPIs = async (userId?: string, startDate?: string, endDate?: string): Promise<KPIData> => {
  try {
    // Build query parameters
    const params = new URLSearchParams()
    if (userId) {
      params.append('user_id', userId)
    }
    if (startDate) {
      params.append('start_date', startDate)
    }
    if (endDate) {
      params.append('end_date', endDate)
    }

    const queryString = params.toString()
    const url = `${API_BASE_URL}/api/v1/dashboard/summary${queryString ? `?${queryString}` : ''}`

    console.log('Fetching KPIs from:', url)

    // Add timeout to prevent hanging
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add your auth token if needed
        // 'Authorization': `Bearer ${token}`
      },
      signal: controller.signal,
      mode: 'cors', // Explicitly set CORS mode
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      // Try to get error details from response
      let errorMessage = `HTTP error! status: ${response.status}`
      try {
        const errorData = await response.json()
        if (errorData.detail) {
          errorMessage = `${errorMessage} - ${JSON.stringify(errorData.detail)}`
        } else if (errorData.message) {
          errorMessage = `${errorMessage} - ${errorData.message}`
        }
      } catch (e) {
        // If response is not JSON, use status text
        errorMessage = `${errorMessage} - ${response.statusText}`
      }
      console.error('Backend error response:', errorMessage)
      throw new Error(errorMessage)
    }

    const backendData: BackendDashboardSummary = await response.json()
    console.log('Successfully fetched KPIs:', backendData)
    return transformBackendData(backendData)
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('Request timeout: Backend server not responding')
        throw new Error('Backend connection timeout - Is the server running?')
      }
      if (error.message.includes('fetch')) {
        console.error('Network error: Cannot reach backend server')
        throw new Error('Cannot connect to backend - Check if server is running on port 8000')
      }
    }
    console.error('Error fetching KPIs:', error)
    throw error
  }
}

// Industry Distribution endpoint
export interface IndustryStat {
  industry: string | null
  count: number
}

export const fetchIndustryDistribution = async (
  startDate?: string,
  endDate?: string
): Promise<IndustryStat[]> => {
  try {
    const params = new URLSearchParams()
    if (startDate) {
      params.append('start_date', startDate)
    }
    if (endDate) {
      params.append('end_date', endDate)
    }

    const queryString = params.toString()
    const url = `${API_BASE_URL}/analytics/industry-distribution${queryString ? `?${queryString}` : ''}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching industry distribution:', error)
    throw error
  }
}

// Daily Scans endpoint
export interface DailyScanStat {
  date: string
  count: number
}

export const fetchDailyScans = async (): Promise<DailyScanStat[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/daily-scans`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching daily scans:', error)
    throw error
  }
}

// Health check endpoint
export const checkHealth = async (): Promise<{ status: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error checking health:', error)
    throw error
  }
}

// Generic API call function for other endpoints
export const apiCall = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error calling API ${endpoint}:`, error)
    throw error
  }
}

