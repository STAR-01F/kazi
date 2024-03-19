export const sortDates = (dates: Date[]): Date[] => {
  // Convert and sort dates, ensuring time components are ignored
  const uniqueSortedDates = Array.from(
    new Set(dates.map((date) => new Date(date).setHours(0, 0, 0, 0)))
  )
    .sort((a, b) => b - a)
    .map((date) => new Date(date)); // Convert timestamps back to Date objects

  return uniqueSortedDates;
};
