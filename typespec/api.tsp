import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi";

using TypeSpec.Http;
using TypeSpec.Rest;
using OpenAPI;

@service({
  title: "Calendar Booking API",
  version: "1.0.0",
})
@server("http://localhost:3000", "Calendar Booking Server")
namespace CalendarBooking;

model EventType {
  id: string;
  name: string;
  description: string;
  durationMinutes: int32;
}

model CreateEventTypeRequest {
  name: string;
  description: string;
  durationMinutes: int32;
}

model Booking {
  id: string;
  eventTypeId: string;
  eventTypeName: string;
  startTime: utcDateTime;
  endTime: utcDateTime;
  guestName: string;
  guestEmail: string;
  createdAt: utcDateTime;
}

model CreateBookingRequest {
  eventTypeId: string;
  startTime: utcDateTime;
  guestName: string;
  guestEmail: string;
}

model TimeSlot {
  startTime: utcDateTime;
  endTime: utcDateTime;
  isAvailable: boolean;
}

model AvailabilityResponse {
  date: string;
  slots: TimeSlot[];
}

model Error {
  code: string;
  message: string;
}

model ValidationError {
  code: "VALIDATION_ERROR";
  details: {
    field: string;
    message: string;
  }[];
}

model SlotAlreadyTakenError {
  code: "SLOT_ALREADY_TAKEN";
  message: string;
}

model NotFoundError {
  code: "NOT_FOUND";
  message: string;
}

model UnauthorizedError {
  code: "UNAUTHORIZED";
  message: string;
}

@route("/event-types")
namespace EventTypes {
  @get
  @summary("List all event types")
  op listEventTypes(): EventType[] | Error;

  @post
  @summary("Create a new event type")
  @header("X-Admin-Key", string)
  op createEventType(
    @body request: CreateEventTypeRequest
  ): CreatedEventType<EventType> | UnauthorizedError | ValidationError;
}

@route("/bookings")
namespace Bookings {
  @get
  @summary("List all upcoming bookings (admin view)")
  @header("X-Admin-Key", string)
  op listBookings(): {
    @body bookings: Booking[];
  } | UnauthorizedError;

  @post
  @summary("Create a new booking")
  op createBooking(
    @body request: CreateBookingRequest
  ): CreatedEventType<Booking> | ValidationError | NotFoundError | SlotAlreadyTakenError;
}

@route("/availability")
namespace Availability {
  @get
  @summary("Get available time slots for an event type")
  op getAvailability(
    @query eventTypeId: string,
    @query date: string
  ): AvailabilityResponse | NotFoundError | ValidationError;
}
