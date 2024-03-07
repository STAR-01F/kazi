const isStreak = (dates: Date[]) => {
  // Sort the dates in ascending order
  dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  let longestStreak = 0;
  let currentStreak = 0;

  for (let i = 1; i < dates.length; i++) {
    const dateBefore = new Date(dates[i - 1]);
    const currentDate = new Date(dates[i]);

    dateBefore.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    // Add one day to dateBefore
    dateBefore.setDate(dateBefore.getDate() + 1);

    // Check if currentDate is not the day after dateBefore
    if (currentDate.getTime() !== dateBefore.getTime()) {
    currentStreak ++
    } else {
    longestStreak = Math.max(longestStreak, currentStreak);
    currentStreak = 1;
    }
    
    //
    longestStreak = Math.max(longestStreak, currentStreak);

    return {
      bestStreak: longestStreak,
      currentStreak: currentStreak,
      isPB: longestStreak === currentStreak,
    };
  }
};

export default isStreak;
