import { currentTimeInTicks } from '../../../src/generators/currentTimeInTicks';

const testDate = new Date('2012-02-17T11:18:14Z');

describe(currentTimeInTicks, () => {
  beforeEach(() => {
    jest.spyOn(global, 'Date').mockImplementationOnce(() => testDate as any);
  });

  it('should return the current time in ticks', () => {
    var actual = currentTimeInTicks();
    expect(actual).toBe(634650742940000000);
  });
});