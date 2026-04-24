import { describe, it, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import { TimeSlots } from '../components/BookingPage/TimeSlots';
import type { TimeSlot } from '../types';
import { MantineProvider } from '@mantine/core';
import type { ReactElement } from 'react';

const mockSlots: TimeSlot[] = [
  { startTime: '2026-03-31T09:00:00Z', endTime: '2026-03-31T09:15:00Z', isAvailable: true },
  { startTime: '2026-03-31T09:15:00Z', endTime: '2026-03-31T09:30:00Z', isAvailable: true },
  { startTime: '2026-03-31T09:30:00Z', endTime: '2026-03-31T09:45:00Z', isAvailable: false },
];

function renderWithProviders(ui: ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>);
}

describe('TimeSlots', () => {
  it('renders all slots', () => {
    renderWithProviders(
      <TimeSlots
        slots={mockSlots}
        selectedSlot={null}
        onSelect={() => {}}
      />
    );
    expect(screen.getByText('09:00 – 09:15')).toBeInTheDocument();
    expect(screen.getByText('09:15 – 09:30')).toBeInTheDocument();
    expect(screen.getByText('09:30 – 09:45')).toBeInTheDocument();
  });

  it('shows "Свободно" for available slots', () => {
    renderWithProviders(
      <TimeSlots
        slots={mockSlots}
        selectedSlot={null}
        onSelect={() => {}}
      />
    );
    expect(screen.getAllByText('Свободно').length).toBe(2);
  });

  it('shows "Занято" for unavailable slots', () => {
    renderWithProviders(
      <TimeSlots
        slots={mockSlots}
        selectedSlot={null}
        onSelect={() => {}}
      />
    );
    expect(screen.getByText('Занято')).toBeInTheDocument();
  });

  it('shows empty message when no slots', () => {
    renderWithProviders(
      <TimeSlots
        slots={[]}
        selectedSlot={null}
        onSelect={() => {}}
      />
    );
    expect(screen.getByText('Нет доступных слотов')).toBeInTheDocument();
  });

  it('calls onSelect when clicking an available slot', async () => {
    const onSelect = vi.fn();
    renderWithProviders(
      <TimeSlots
        slots={mockSlots}
        selectedSlot={null}
        onSelect={onSelect}
      />
    );
    await screen.getByText('09:00 – 09:15').click();
    expect(onSelect).toHaveBeenCalledWith(mockSlots[0]);
  });

  it('highlights selected slot', () => {
    renderWithProviders(
      <TimeSlots
        slots={mockSlots}
        selectedSlot={mockSlots[0]}
        onSelect={() => {}}
      />
    );
    const button = screen.getByText('09:00 – 09:15').closest('button');
    expect(button?.getAttribute('data-selected')).toBe('true');
  });
});