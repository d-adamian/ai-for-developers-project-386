export interface EventType {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface AvailabilityResponse {
  date: string;
  slots: TimeSlot[];
}

export interface Booking {
  id: string;
  eventTypeId: string;
  eventTypeName: string;
  startTime: string;
  endTime: string;
  guestName: string;
  guestEmail: string;
  createdAt: string;
}

export interface CreateBookingRequest {
  eventTypeId: string;
  startTime: string;
  guestName: string;
  guestEmail: string;
}