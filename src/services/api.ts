import { Property, SiteVisitBooking, AdminStats } from '../types';

export async function fetchProperties(params?: {
  city?: string;
  search?: string;
  bhk?: number;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Property[]> {
  try {
    const query = new URLSearchParams();
    if (params?.city && params.city !== 'All') query.append('city', params.city);
    if (params?.search) query.append('search', params.search);
    if (params?.bhk && params.bhk > 0) query.append('bhk', params.bhk.toString());
    if (params?.type && params.type !== 'All') query.append('type', params.type);
    if (params?.minPrice) query.append('minPrice', params.minPrice.toString());
    if (params?.maxPrice) query.append('maxPrice', params.maxPrice.toString());

    const res = await fetch(`/api/properties?${query.toString()}`);
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Failed to fetch properties:', err);
    return [];
  }
}

export async function fetchPropertyById(id: string): Promise<Property | null> {
  try {
    const res = await fetch(`/api/properties/${id}`);
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    console.error(`Failed to fetch property ${id}:`, err);
    return null;
  }
}

export async function performNlpSearch(query: string) {
  try {
    const res = await fetch('/api/ai/nlp-search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    return await res.json();
  } catch (err) {
    console.error('NLP Search error:', err);
    return { success: false, results: [] };
  }
}

export async function sendChatMessage(messages: { sender: string; text: string }[], userContext?: any) {
  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, userContext }),
    });
    return await res.json();
  } catch (err) {
    console.error('Chat error:', err);
    return {
      success: false,
      data: {
        replyText: 'Sorry, I am having trouble connecting to the AI server. Please try again.',
        suggestedProperties: [],
      },
    };
  }
}

export async function bookSiteVisit(data: {
  propertyId: string;
  date: string;
  timeSlot: string;
  userName: string;
  userPhone: string;
  userEmail: string;
}): Promise<{ success: boolean; data?: SiteVisitBooking; message: string }> {
  try {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error('Booking error:', err);
    return { success: false, message: 'Failed to schedule booking' };
  }
}

export async function fetchBookings(): Promise<SiteVisitBooking[]> {
  try {
    const res = await fetch('/api/bookings');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Fetch bookings error:', err);
    return [];
  }
}

export async function fetchAdminStats(): Promise<AdminStats | null> {
  try {
    const res = await fetch('/api/admin/stats');
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    console.error('Admin stats error:', err);
    return null;
  }
}

export async function createProperty(propertyData: Partial<Property>): Promise<{ success: boolean; data?: Property }> {
  try {
    const res = await fetch('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(propertyData),
    });
    return await res.json();
  } catch (err) {
    console.error('Create property error:', err);
    return { success: false };
  }
}

export async function deleteProperty(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
    const json = await res.json();
    return json.success;
  } catch (err) {
    console.error('Delete property error:', err);
    return false;
  }
}
