
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000

export function calculateDifferenceBetweenDates(dateA: Date, dateB: Date): number {
  let deltaTime = Math.abs(dateA.getTime() - dateB.getTime());
  let deltaDays = Math.floor(deltaTime/ONE_DAY_IN_MS)
  return deltaDays
}

export function makeDateFromBrDateString(dateString: string): Date{
  let dateValues: Array<number> = dateString.split("/").map(v=>parseInt(v)).reverse()
  return new Date(dateValues[0], dateValues[1]-1, dateValues[2])
}