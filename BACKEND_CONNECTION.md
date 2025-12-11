# Backend Connection Guide

## ✅ Status: Connected

The frontend is now connected to your FastAPI backend.

## 📍 API Endpoint

**Main KPI Endpoint:**
- `GET /api/v1/dashboard/summary`

## ⚠️ Important Note: user_id Parameter

Your backend endpoint **requires** a `user_id` parameter, but the frontend is currently calling it **without** user_id. 

**Options:**

1. **For Testing (Temporary):** Modify your backend to make `user_id` optional:
   ```python
   user_id: Optional[uuid.UUID] = Query(None)
   ```

2. **Add user_id to Frontend:** When you're ready, update `KPIOverview.tsx`:
   ```typescript
   const data = await fetchKPIs('your-user-id-here')
   ```

3. **Use a Test user_id:** Pass a test UUID for now:
   ```typescript
   const data = await fetchKPIs('00000000-0000-0000-0000-000000000000')
   ```

## 📊 Data Mapping

The backend response is automatically transformed to match the frontend format:

| Backend Field | Frontend KPI |
|--------------|--------------|
| `contacts_touched` | Contacts Touched |
| `funnel_breakdown.meetings_completed` | Meetings Completed |
| `emails_drafted` | Emails Drafted |
| `mom_coverage_percent` | MoM Coverage |
| `funnel_breakdown.positive_outcomes / meetings_completed * 100` | Conversion Rate |
| `funnel_breakdown.positive_outcomes` | Hot Leads |
| `overdue_followups_count` | Hot Leads (require follow-up) |

## 🔧 Available API Functions

All functions are in `src/services/api.ts`:

1. **`fetchKPIs(userId?, startDate?, endDate?)`** - Main dashboard summary
2. **`fetchIndustryDistribution(startDate?, endDate?)`** - Industry stats
3. **`fetchDailyScans()`** - Daily scan statistics
4. **`checkHealth()`** - Health check endpoint
5. **`apiCall<T>(endpoint, options?)`** - Generic API caller

## 🚀 Testing

1. Start your backend:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

2. Start frontend:
   ```bash
   npm run dev
   ```

3. Navigate to: Dashboard → KPIs → Overview

4. Check browser console (F12) for any errors

## 📝 Environment Variables

The `.env` file contains:
```
VITE_API_BASE_URL=http://localhost:8000
```

Change this if your backend runs on a different port or URL.

