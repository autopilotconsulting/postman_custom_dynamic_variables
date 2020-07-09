import { Postman } from '../../src/types/postman';
import * as moment from 'moment';

describe('pre-request', () => {
  const exampleBody = {
    testRandomFloat: '{{randomFloat_1_2}}',
    testRandomInteger: '{{randomInteger_1_2}}',
    testSample: '{{sample_pip_lu_hatch}}',
    testCurrentTimeUtc: '{{currentTimeUtc_YYYY/MM}}',
  };

  var fakeSetter = jest.fn();

  var pm: Postman = {
    request: {
      url: { toString: () => 'http://localhost/record/{{sample_1_2#id}}' },
      body: {
        raw: JSON.stringify(exampleBody),
      },
    },
    environment: {
      set: fakeSetter,
    },
  };

  beforeEach(() => {
    Object.assign(global, { pm });
  });

  afterEach(() => {
    delete (global as any).pm;
    jest.resetModules();
  });

  const expectCallToMatch = <T>(call: number, name: string, expectation: (value: T) => void) => {
    if (fakeSetter.mock.calls.length < call) {
      const message = [
        `Expected at least ${call} calls but only had ${fakeSetter.mock.calls.length}!`,
        'Calls:',
        ...fakeSetter.mock.calls.map(call => call.join(", ")),
      ].join("\n");
      throw new Error(message);
    }

    const value = fakeSetter.mock.calls[call - 1][1] as T;
    const type = Object.getPrototypeOf(value).constructor;

    expect(fakeSetter).toHaveBeenNthCalledWith(call, name, expect.any(type));
    expectation(value);
  }

  it('should replace the known set of tokens', () => {
    require('../../src/pre-request');

    expectCallToMatch<number>(1, 'randomFloat_1_2', (value) => {
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThan(2);
    });

    expectCallToMatch<number>(2, 'randomInteger_1_2', (value) => {
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(2);
      expect(value).toEqual(Math.round(value));
    });

    expectCallToMatch<string>(3, 'sample_pip_lu_hatch', (value) => {
      // TODO: make or find a toBeIn() matcher
      expect(['pip', 'lu', 'hatch']).toContain(value);
    });

    expectCallToMatch<string>(4, 'currentTimeUtc_YYYY/MM', (value) => {
      const expected = moment.utc().format('YYYY/MM');
      expect(value).toEqual(expected);
    });

    expectCallToMatch<string>(5, 'sample_1_2#id', (value) => {
      expect(['1', '2']).toContain(value);
    });
  });
});