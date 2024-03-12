const isStreak = (dates: Date[]) => {
  console.log(dates, 'dates');
  if (dates.length === 0) {
    return {bestStreak: 0, currentStreak: 0, isPB: true};
  }

  // Convert and sort dates, ensuring time components are ignored
  const uniqueSortedDates = Array.from(
    new Set(dates.map((date) => new Date(date).setHours(0, 0, 0, 0)))
  )
    .sort((a, b) => a - b)
    .map((date) => new Date(date)); // Convert timestamps back to Date objects

  if (uniqueSortedDates.length === 0) {
    return {bestStreak: 0, currentStreak: 0, isPB: true};
  }

  let longestStreak = 1;
  let currentStreak = 1;
  let previousDate = uniqueSortedDates[0];

  for (let i = 1; i < uniqueSortedDates.length; i++) {
    const currentDate = uniqueSortedDates[i];
    const differenceInDays =
      (currentDate.getTime() - previousDate.getTime()) / (1000 * 3600 * 24);

    if (differenceInDays === 1) {
      currentStreak++;
    } else {
      // Reset current streak if dates are not consecutive
      currentStreak = 1;
    }

    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
    }

    previousDate = currentDate;
  }

  // Determine current streak based on the most recent date's proximity to today's date
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const mostRecentDate = uniqueSortedDates[uniqueSortedDates.length - 1];
  if (!mostRecentDate) {
    return {
      bestStreak: longestStreak,
      currentStreak: 0,
      isPB: longestStreak === 0,
    }; // Safe guard against undefined mostRecentDate
  }
  const differenceToToday =
    (today.getTime() - mostRecentDate.getTime()) / (1000 * 3600 * 24);

  // If the most recent date is not today, reset current streak
  const finalCurrentStreak = differenceToToday === 0 ? currentStreak : 0;

  return {
    bestStreak: longestStreak,
    currentStreak: finalCurrentStreak,
    isPB: longestStreak >= finalCurrentStreak,
  };
};

export default isStreak;
