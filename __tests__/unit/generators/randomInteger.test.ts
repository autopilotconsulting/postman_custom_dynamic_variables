import { randomInteger } from '../../../src/generators/randomInteger';

const SAMPLE_SIZE = 100000;

interface Result {
  key: number;
  count: number;
}

describe(randomInteger, () => {
  it('should pseudorandomly select an integer between two bounds inclusively', () => {
    const results: { [key: string]: Result } = {};

    for (let i = 0; i < SAMPLE_SIZE; ++i) {
      const value = randomInteger("4", "6");
      if (!results[value]) {
        results[value] = { key: value, count: 0 };
      }

      results[value].count++;
    }

    var keys = Object.values(results).map(r => r.key).sort();
    expect(keys).toEqual([4, 5, 6]);

    expect(results['4'].count / SAMPLE_SIZE).toBeCloseTo(.333);
    expect(results['5'].count / SAMPLE_SIZE).toBeCloseTo(.333);
    expect(results['6'].count / SAMPLE_SIZE).toBeCloseTo(.333);
  });
});