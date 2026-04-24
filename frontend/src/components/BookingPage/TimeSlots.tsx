import { Stack, Text, UnstyledButton, Group } from '@mantine/core';
import type { TimeSlot } from '../../types';

interface TimeSlotsProps {
  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelect: (slot: TimeSlot) => void;
}

function formatTime(time: string): string {
  const match = time.match(/T(\d{2}):(\d{2}):/);
  if (match) {
    return `${match[1]}:${match[2]}`;
  }
  return time;
}

export function TimeSlots({ slots, selectedSlot, onSelect }: TimeSlotsProps) {
  if (slots.length === 0) {
    return <Text c="dimmed">Нет доступных слотов</Text>;
  }

  return (
    <Stack gap="xs">
      {slots.map((slot, index) => {
        const isSelected = selectedSlot?.startTime === slot.startTime;
        return (
          <UnstyledButton
            key={index}
            onClick={() => onSelect(slot)}
            disabled={!slot.isAvailable}
            data-selected={isSelected}
            data-available={slot.isAvailable}
            style={(theme) => ({
              padding: theme.spacing.sm,
              borderRadius: theme.radius.sm,
              border: '1px solid',
              borderColor: isSelected
                ? theme.colors.blue[6]
                : theme.colors.gray[3],
              backgroundColor: isSelected
                ? theme.colors.blue[0]
                : slot.isAvailable
                ? 'transparent'
                : theme.colors.gray[1],
              cursor: slot.isAvailable ? 'pointer' : 'not-allowed',
              opacity: slot.isAvailable ? 1 : 0.5,
              textAlign: 'left',
              '&:hover': slot.isAvailable
                ? { backgroundColor: theme.colors.gray[0] }
                : undefined,
            })}
          >
            <Group justify="space-between">
              <Text size="sm">
                {formatTime(slot.startTime)} – {formatTime(slot.endTime)}
              </Text>
              <Text size="sm" c={slot.isAvailable ? 'green' : 'red'}>
                {slot.isAvailable ? 'Свободно' : 'Занято'}
              </Text>
            </Group>
          </UnstyledButton>
        );
      })}
    </Stack>
  );
}