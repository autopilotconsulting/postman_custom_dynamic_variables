import { randomFloat } from './randomFloat';

export function randomInteger(minString: string, maxString: string): number {
  const max = +maxString + 1;
  const value = randomFloat(minString, `${max}`);

  return Math.floor(value);
}