import { Badge, Title, Text, Button, Stack } from '@mantine/core';
import type { EventType, TimeSlot } from '../../types';

interface EventDetailsProps {
  eventType: EventType | null;
  selectedDate: string | null | undefined;
  selectedSlot: TimeSlot | null;
  onBook: () => void;
  isBookingLoading: boolean;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

function formatTime(slot: TimeSlot): string {
  const start = slot.startTime.split('T')[1]?.slice(0, 5) || slot.startTime;
  const end = slot.endTime.split('T')[1]?.slice(0, 5) || slot.endTime;
  return `${start} – ${end}`;
}

export function EventDetails({
  eventType,
  selectedDate,
  selectedSlot,
  onBook,
  isBookingLoading,
}: EventDetailsProps) {
  const canBook = eventType && selectedDate && selectedSlot;

  return (
    <Stack gap="md">
      {eventType ? (
        <>
          <Title order={2}>{eventType.name}</Title>
          <Badge size="lg">{eventType.durationMinutes} мин</Badge>
          <Text size="sm" c="dimmed">
            {eventType.description}
          </Text>

          <Stack gap="xs">
            <Text size="sm" fw={500}>
              Выбранная дата
            </Text>
            <Text>
              {selectedDate ? formatDate(selectedDate) : '—'}
            </Text>
          </Stack>

          <Stack gap="xs">
            <Text size="sm" fw={500}>
              Выбранное время
            </Text>
            <Text>{selectedSlot ? formatTime(selectedSlot) : 'Время не выбрано'}</Text>
          </Stack>

          <Button
            onClick={onBook}
            disabled={!canBook}
            loading={isBookingLoading}
            fullWidth
          >
            Забронировать
          </Button>
        </>
      ) : (
        <Text>Загрузка...</Text>
      )}
    </Stack>
  );
}