export function randomFloat(minString: string, maxString: string): number {
  const min = +minString;
  const max = +maxString;

  return Math.random() * (max - min) + min;
}