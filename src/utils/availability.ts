import { addDays } from 'date-fns'; // Import addDays from date-fns

// Simulate unavailable dates (for testing purposes)
const unavailableDates = [
  '2024-01-15',
  '2024-01-20',
  '2024-01-25',
  '2024-02-01',
  '2024-02-14',
  '2024-02-28',
];

// Simulate dates with limited spots (for testing purposes)
const limitedAvailabilityDates = [
  '2024-01-31',
  '2024-01-28',
  '2024-01-29',
  '2024-01-30',
];

export interface AvailabilityStatus {
  available: boolean;
  spotsLeft?: number;
  message?: string;
}

export function checkDateAvailability(date: Date): AvailabilityStatus {
  const dateString = date.toISOString().split('T')[0];

  // Check if date is in unavailable dates
  if (unavailableDates.includes(dateString)) {
    return {
      available: false,
      message: 'This date is fully booked'
    };
  }

  // Check if date is in limited availability dates
  if (limitedAvailabilityDates.includes(dateString)) {
    const spotsLeft = Math.floor(Math.random() * 3) + 1; // Random number between 1-3
    return {
      available: true,
      spotsLeft,
      message: `Only ${spotsLeft} spots left`
    };
  }

  // Date is fully available
  return {
    available: true,
    spotsLeft: 15, // Maximum group size
    message: 'Available'
  };
}

// New function to get available dates based on time slots
export function getAvailableDates(timeSlots: any[]): Date[] {
  const today = new Date();
  const availableDates: Date[] = [];

  timeSlots.forEach(slot => {
    const { available_days } = slot;
    const startDate = new Date(today);
    const endDate = addDays(new Date(today), 90); // Check availability for the next 90 days

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      if (available_days.includes(d.getDay())) {
        availableDates.push(new Date(d));
      }
    }
  });

  return availableDates;
}
