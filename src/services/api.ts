
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const API_BASE_URL = 'http://localhost:8000';
// Hardcoded user ID for demo purposes content
export const DEFAULT_USER_ID = '701a9770-b847-4ed5-a8fa-b8bb0b7981ea';

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
    positive_outcomes: number;
}

export interface DashboardSummary {
    contacts_touched: number;
    emails_drafted: number;
    mom_coverage_percent: number;
    overdue_followups_count: number;
    cancelled_count: number;
    no_show_count: number;
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
}

export interface CompletedMeeting {
    meeting_id: string;
    contact_name: string | null;
    company_name: string | null;
    scheduled_at: string | null;
    status: string | null;
    mom_exists: boolean | null;
}

export interface EmailDetail {
    email_id: string;
    status: string | null;
    drafted_at: string | null;
    subject: string | null;
    recipient: string | null;
}

export interface SearchResult {
    contacts: Contact[];
    // meetings: Meeting[];
    // emails: Email[];
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

export const searchGlobal = async (query: string, userId: string = DEFAULT_USER_ID): Promise<GlobalSearchResponse> => {
    if (!query || query.length < 1) {
        return { results: [], total: 0 };
    }

    const params = new URLSearchParams({
        user_id: userId,
        query: query
    });

    const response = await fetch(`${API_BASE_URL}/api/v1/search?${params.toString()}`);
    
    if (!response.ok) {
        throw new Error(`Search API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Transform the backend response to match SearchItem format
    const results: SearchItem[] = [];
    
    // Add contacts to results
    if (data.contacts && Array.isArray(data.contacts)) {
        data.contacts.forEach((contact: Contact) => {
            results.push({
                id: contact.contact_id,
                type: 'contact',
                title: `${contact.first_name || ''} ${contact.last_name || ''}`.trim() || 'Unknown',
                subtitle: contact.company_name || contact.email || undefined
            });
        });
    }

    // You can add meetings and emails here when backend supports them
    // if (data.meetings && Array.isArray(data.meetings)) { ... }
    // if (data.emails && Array.isArray(data.emails)) { ... }

    return {
        results,
        total: results.length
    };
}
1