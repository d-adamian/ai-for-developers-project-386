import { useState } from 'react';
import { Grid, Paper, Title, Stack, Alert, LoadingOverlay } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { EventDetails } from './EventDetails';
import { TimeSlots } from './TimeSlots';
import { useEventTypes, useAvailability, useCreateBooking } from '../../api/client';
import type { TimeSlot } from '../../types';

export function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const { data: eventTypes, isLoading: eventTypesLoading, error: eventTypesError } = useEventTypes();
  const eventType = eventTypes?.[0] || null;

  const { data: availability, isLoading: slotsLoading } = useAvailability(
    eventType?.id,
    selectedDate
  );

  const createBooking = useCreateBooking();

  const handleBook = async () => {
    if (!eventType || !selectedSlot) return;

    try {
      await createBooking.mutateAsync({
        eventTypeId: eventType.id,
        startTime: selectedSlot.startTime,
        guestName: 'Guest',
        guestEmail: 'guest@example.com',
      });
      setBookingSuccess(true);
      setSelectedSlot(null);
      setSelectedDate(undefined);
    } catch {
      // Error handled by mutation state
    }
  };

  const handleDateSelect = (date: string | null) => {
    setSelectedDate(date || undefined);
    setSelectedSlot(null);
  };

  if (eventTypesError) {
    return (
      <Alert color="red" title="Ошибка">
        Не удалось загрузить типы событий
      </Alert>
    );
  }

  if (eventTypesLoading || !eventType) {
    return <LoadingOverlay visible />;
  }

  return (
    <Stack gap="lg">
      {bookingSuccess && (
        <Alert color="green" onClose={() => setBookingSuccess(false)}>
          Бронирование успешно создано!
        </Alert>
      )}

      <Grid>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Paper p="md" withBorder>
            <EventDetails
              eventType={eventType}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              onBook={handleBook}
              isBookingLoading={createBooking.isPending}
            />
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 7 }}>
          <Paper p="md" withBorder style={{ position: 'relative' }}>
            <LoadingOverlay visible={slotsLoading} />
            <Stack gap="md">
              <Title order={3}>Календарь</Title>
              <DatePicker
                value={selectedDate}
                onChange={handleDateSelect}
              />
              {selectedDate && (
                <>
                  <Title order={4}>Статус слотов</Title>
                  <TimeSlots
                    slots={availability?.slots || []}
                    selectedSlot={selectedSlot}
                    onSelect={setSelectedSlot}
                  />
                </>
              )}
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}