export default function daysPassedSinceUTC(date: Date): number {
  const currentDate = new Date();
  const utcDate = new Date(date.toISOString().substring(0, 10));
  const differenceInMilliseconds = currentDate.getTime() - utcDate.getTime();
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const daysPassed = Math.round(differenceInMilliseconds / millisecondsPerDay);
  return daysPassed;
}
