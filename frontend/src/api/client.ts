import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { EventType, AvailabilityResponse, CreateBookingRequest, Booking } from '../types';

const API_BASE = '/api';

async function fetchEventTypes(): Promise<EventType[]> {
  const res = await fetch(`${API_BASE}/event-types`);
  if (!res.ok) {
    throw new Error('Failed to fetch event types');
  }
  return res.json();
}

async function fetchAvailability(eventTypeId: string, date: string): Promise<AvailabilityResponse> {
  const res = await fetch(`${API_BASE}/availability?eventTypeId=${eventTypeId}&date=${date}`);
  if (!res.ok) {
    throw new Error('Failed to fetch availability');
  }
  return res.json();
}

async function createBooking(request: CreateBookingRequest): Promise<Booking> {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create booking');
  }
  return res.json();
}

export function useEventTypes() {
  return useQuery({
    queryKey: ['eventTypes'],
    queryFn: fetchEventTypes,
  });
}

export function useAvailability(eventTypeId: string | undefined, date: string | undefined) {
  return useQuery({
    queryKey: ['availability', eventTypeId, date],
    queryFn: () => fetchAvailability(eventTypeId!, date!),
    enabled: !!eventTypeId && !!date,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availability'] });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}