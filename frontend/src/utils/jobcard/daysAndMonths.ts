export default function daysToDaysAndMonths(days: number): string {
  const months = Math.floor(days / 30);
  const remainingDays = days % 30;

  if (months === 0) {
    return `${remainingDays}d`;
  }
  return `${months}m ${remainingDays}d`;
}
