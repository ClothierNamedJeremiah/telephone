export function numberToMinutesAndSeconds(value: number): string {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;

  const minutesStr = minutes.toString().padStart(2, '0');
  const secondsStr = seconds.toString().padStart(2, '0');

  return `${minutesStr}:${secondsStr}`;
}

export function shuffleArray<T>(array: T[]): T[] {
  // First, make a copy of the array to avoid mutating the original
  const shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indices i and j in the copied array
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
