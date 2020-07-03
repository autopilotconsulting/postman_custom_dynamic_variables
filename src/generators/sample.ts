export function sample(...options: string[]): string | null {
  return _.sample(options) || null;
}