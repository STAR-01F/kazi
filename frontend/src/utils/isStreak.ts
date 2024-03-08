const isStreak = (dates: Date[]) => {
  console.log(dates, 'dates');
  // Sort the dates in ascending order
  dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  let currentStreak = 1;
  let longestStreak = 1;

  for (let i = 1; i < dates.length - 1; i++) {
    const dateBefore = new Date(dates[i - 1]);
    const currentDate = new Date(dates[i]);

    // Set the time of both dates to 00:00:00 for an accurate comparison
    dateBefore.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    // Add one day to dateBefore
    dateBefore.setDate(dateBefore.getDate() + 1);

    console.log(dateBefore, currentDate, 'dateBefore, currentDate');

    // Check if currentDate is the day after dateBefore
    if (currentDate.getTime() === dateBefore.getTime()) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }
  return {
    bestStreak: longestStreak,
    currentStreak: currentStreak,
    isPB: longestStreak === currentStreak,
  };
};

export default isStreak;
