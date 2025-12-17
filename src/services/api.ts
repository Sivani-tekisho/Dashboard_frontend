import { QueryClient } from '@tanstack/react-query';
 
export const queryClient = new QueryClient();
 
export const API_BASE_URL = 'http://localhost:8000';
// Hardcoded user ID for demo purposes content
export const DEFAULT_USER_ID = '676b4801-993d-43d3-ae97-0082dfd82948';
 
export enum DateRangePreset {
    TODAY = "TODAY",
    THIS_WEEK = "THIS_WEEK",
    THIS_MONTH = "THIS_MONTH",
    THIS_QUARTER = "THIS_QUARTER",
    THIS_YEAR = "THIS_YEAR",
    CUSTOM = "CUSTOM"
}
 
export interface FunnelBreakdown {
    contacts_captured: number;
    meetings_scheduled: number;
    meetings_completed: number;
    emails_drafted: number;
    emails_sent: number;
    qualified_contacts: number;
    positive_outcomes: number;
}
 
export interface DashboardSummary {
    contacts_touched: number;
    emails_drafted: number;
    mom_coverage_percent: number;
    overdue_followups_count: number;
    cancelled_count: number;
    no_show_count: number;
    conversion_rate: number;
    conversion_rate_change: number;
    total_leads: number;
    qualified_leads: number;
    converted_leads: number;
    funnel_breakdown: FunnelBreakdown;
}
 
export interface Contact {
    contact_id: string;
    first_name: string | null;
    last_name: string | null;
    company_name: string | null;
    email: string | null;
    last_activity_at: string | null;
    created_at: string | null;
    next_follow_up_due_at: string | null;
    next_follow_up_type: string | null;
    last_outcome_status: string | null;
    outcome?: string | null;
    phone?: string | null;
}
 
export interface CompletedMeeting {
    meeting_id: string;
    contact_name: string | null;
    company_name: string | null;
    scheduled_at: string | null;
    status: string | null;
    mom_exists: boolean | null;
    mom_text?: string | null;
}
 
export interface EmailDetail {
    email_id: string;
    status: string | null;
    drafted_at: string | null;
    subject: string | null;
    recipient: string | null;
}
 
export interface Meeting {
    meeting_id: string;
    contact_id: string | null;
    scheduled_at: string | null;
    status: string | null;
    mom_exists: boolean | null;
    duration_seconds: number | null;
}
 
export interface Email {
    email_id: string;
    status: string | null;
    drafted_at: string | null;
    prompt_version: string | null;
}
 
export interface SearchResult {
    contacts: Contact[];
    meetings: Meeting[];
    emails: Email[];
}
 
export const fetchDashboardSummary = async (preset: DateRangePreset = DateRangePreset.THIS_MONTH): Promise<DashboardSummary> => {
    const params = new URLSearchParams({
        user_id: DEFAULT_USER_ID,
        preset: preset
    });
 
    // Example: http://localhost:8000/api/v1/dashboard/summary?user_id=...&preset=THIS_MONTH
    const response = await fetch(`${API_BASE_URL}/api/v1/dashboard/summary?${params.toString()}`);
 
    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
 
    return response.json();
};
 
export const fetchContacts = async (query: string = ''): Promise<SearchResult> => {
    // Re-using search endpoint to get all contacts if query is empty (or a space if backend requires min length)
    // The backend search might require min_length=1. Let's use wildcard '%' or a generic term if needed.
    // If backend requires min_length 1, we can try searching for something common or create a "get all" endpoint.
    // Based on search_global in backend, it uses ilike %query%. Using 'a' or '@' is a hack.
    // Ideally we should have a GET /contacts endpoint.
    // For now we try searching for '@' (common in emails) or check if we can add a simple get_contacts endpoint.
    // Let's assume we can search for '@' or just ' ' if backend allows.
    // The previous analysis showed search_global requires min_length=1.
 
    const params = new URLSearchParams({
        user_id: DEFAULT_USER_ID,
        query: query || '@' // Using @ as mostly everyone has an email
    });
 
    const response = await fetch(`${API_BASE_URL}/api/v1/search?${params.toString()}`);
    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
 
export const fetchAllContacts = async (): Promise<Contact[]> => {
    const params = new URLSearchParams({
        user_id: DEFAULT_USER_ID
    });
    const response = await fetch(`${API_BASE_URL}/api/v1/contacts?${params.toString()}`);
    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
 
export const fetchCompletedMeetings = async (): Promise<CompletedMeeting[]> => {
    const params = new URLSearchParams({
        user_id: DEFAULT_USER_ID
    });
    const response = await fetch(`${API_BASE_URL}/api/v1/meetings/completed?${params.toString()}`);
    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
 
export const fetchDraftedEmails = async (): Promise<EmailDetail[]> => {
    const params = new URLSearchParams({
        user_id: DEFAULT_USER_ID
    });
    const response = await fetch(`${API_BASE_URL}/api/v1/emails/drafted?${params.toString()}`);
    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
 
export interface SearchItem {
    id: string;
    type: 'contact' | 'meeting' | 'email' | 'lead';
    title: string;
    subtitle?: string;
}
 
export interface GlobalSearchResponse {
    results: SearchItem[];
    total: number;
}
 
export interface ConversionRateResponse {
    total_leads: number;
    qualified_leads: number;
    converted_leads: number;
    leads_percentage: number;
    qualified_percentage: number;
    converted_percentage: number;
    current_rate: number;
    rate_change: number;
}
 
export const fetchConversionRates = async (preset: DateRangePreset = DateRangePreset.THIS_MONTH): Promise<ConversionRateResponse> => {
    const params = new URLSearchParams({
        user_id: DEFAULT_USER_ID,
        preset: preset
    });
    const response = await fetch(`${API_BASE_URL}/api/v1/analytics/conversion-rates?${params.toString()}`);
    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
};