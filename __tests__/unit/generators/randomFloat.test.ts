import { randomFloat } from '../../../src/generators/randomFloat';

const SAMPLE_SIZE = 100000;

describe(randomFloat, () => {
  it('should pseudorandomly select an float between two bounds with an exclusive max', () => {
    const results: { [key: number]: number } = {};

    for (let i = 0; i < SAMPLE_SIZE; ++i) {
      const value = randomFloat("-3", "3");
      const group = Math.floor(value);

      if (typeof results[group] === 'undefined') {
        results[group] = 0;
      }

      results[group]++;
    }

    const expectedKeys = ['-3', '-2', '-1', '0', '1', '2'];
    expect(Object.keys(results).sort()).toEqual(expectedKeys.sort());

    for (let key in results) {
      const count = results[key] / SAMPLE_SIZE;
      expect(count).toBeCloseTo(1 / expectedKeys.length, 2);
    }
  });
});