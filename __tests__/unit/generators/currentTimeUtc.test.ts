import * as moment from 'moment-timezone';
import { currentTimeUtc } from '../../../src/generators/currentTimeUtc';

jest.mock('moment', () => ({
  utc: () => jest.requireActual('moment').utc('2012-02-17T11:18:14Z'),
}));

describe(currentTimeUtc, () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should return the current time in 8601 format by default', () => {
    const value = currentTimeUtc();
    expect(value).toBe('2012-02-17T11:18:14Z');
  });

  it('should format it with the format argument', () => {
    const value = currentTimeUtc('YYYY');
    expect(value).toBe('2012');
  });
});