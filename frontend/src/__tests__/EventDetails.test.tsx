import { describe, it, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import { EventDetails } from '../components/BookingPage/EventDetails';
import type { EventType, TimeSlot } from '../types';
import { MantineProvider } from '@mantine/core';
import type { ReactElement } from 'react';

const mockEventType: EventType = {
  id: '1',
  name: 'Встреча 15 минут',
  description: 'Короткий тип события для быстрого созвона.',
  durationMinutes: 15,
};

const mockSlot: TimeSlot = {
  startTime: '2026-03-31T09:00:00Z',
  endTime: '2026-03-31T09:15:00Z',
  isAvailable: true,
};

function renderWithProviders(ui: ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>);
}

describe('EventDetails', () => {
  it('renders event type name', () => {
    renderWithProviders(
      <EventDetails
        eventType={mockEventType}
        selectedDate={null}
        selectedSlot={null}
        onBook={() => {}}
        isBookingLoading={false}
      />
    );
    expect(screen.getByText('Встреча 15 минут')).toBeInTheDocument();
  });

  it('renders duration badge', () => {
    renderWithProviders(
      <EventDetails
        eventType={mockEventType}
        selectedDate={null}
        selectedSlot={null}
        onBook={() => {}}
        isBookingLoading={false}
      />
    );
    expect(screen.getByText('15 мин')).toBeInTheDocument();
  });

  it('renders description', () => {
    renderWithProviders(
      <EventDetails
        eventType={mockEventType}
        selectedDate={null}
        selectedSlot={null}
        onBook={() => {}}
        isBookingLoading={false}
      />
    );
    expect(screen.getByText('Короткий тип события для быстрого созвона.')).toBeInTheDocument();
  });

  it('shows "Время не выбрано" when no slot selected', () => {
    renderWithProviders(
      <EventDetails
        eventType={mockEventType}
        selectedDate="2026-03-31"
        selectedSlot={null}
        onBook={() => {}}
        isBookingLoading={false}
      />
    );
    expect(screen.getByText('Время не выбрано')).toBeInTheDocument();
  });

  it('shows selected time when slot is provided', () => {
    renderWithProviders(
      <EventDetails
        eventType={mockEventType}
        selectedDate="2026-03-31"
        selectedSlot={mockSlot}
        onBook={() => {}}
        isBookingLoading={false}
      />
    );
    expect(screen.getByText('09:00 – 09:15')).toBeInTheDocument();
  });

  it('shows booking button', () => {
    renderWithProviders(
      <EventDetails
        eventType={mockEventType}
        selectedDate="2026-03-31"
        selectedSlot={mockSlot}
        onBook={() => {}}
        isBookingLoading={false}
      />
    );
    expect(screen.getByText('Забронировать')).toBeInTheDocument();
  });

  it('button is disabled when no slot selected', () => {
    renderWithProviders(
      <EventDetails
        eventType={mockEventType}
        selectedDate="2026-03-31"
        selectedSlot={null}
        onBook={() => {}}
        isBookingLoading={false}
      />
    );
    expect(screen.getByRole('button', { name: 'Забронировать' })).toBeDisabled();
  });

  it('button is enabled when all required fields are present', () => {
    renderWithProviders(
      <EventDetails
        eventType={mockEventType}
        selectedDate="2026-03-31"
        selectedSlot={mockSlot}
        onBook={() => {}}
        isBookingLoading={false}
      />
    );
    expect(screen.getByRole('button', { name: 'Забронировать' })).toBeEnabled();
  });

  it('calls onBook when button is clicked', async () => {
    const onBook = vi.fn();
    renderWithProviders(
      <EventDetails
        eventType={mockEventType}
        selectedDate="2026-03-31"
        selectedSlot={mockSlot}
        onBook={onBook}
        isBookingLoading={false}
      />
    );
    await screen.getByRole('button', { name: 'Забронировать' }).click();
    expect(onBook).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    renderWithProviders(
      <EventDetails
        eventType={null}
        selectedDate={null}
        selectedSlot={null}
        onBook={() => {}}
        isBookingLoading={false}
      />
    );
    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });
});