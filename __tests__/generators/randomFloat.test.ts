import { randomFloat } from '../../src/generators/randomFloat';

const SAMPLE_SIZE = 100000;

describe(randomFloat, () => {
  it('should pseudorandomly select an float between two bounds with an exclusive max', () => {
    for (let i = 0; i < SAMPLE_SIZE; ++i) {
      const value = randomFloat("11", "18");
      const isValid = value >= 11 && value < 18;
      if (!isValid) {
        expect(value).toBeGreaterThanOrEqual(11);
        expect(value).toBeLessThan(18);
      }
    }
  });
});