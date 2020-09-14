import { Postman, Header } from '../../src/types/postman';

describe('pre-request', () => {
  const testDate = new Date('2012-02-17T11:18:14Z');

  const exampleBody = {
    testRandomFloat: '{{randomFloat_1_2}}',
    testRandomInteger: '{{randomInteger_1_2}}',
    testSample: '{{sample_pip_lu_hatch}}',
    testCurrentTimeUtc: '{{currentTimeUtc_YYYY/MM}}',
    testCurrentTimeInTicks: '{{currentTimeInTicks}}',
  };

  const fakeSetter = jest.fn();

  const headers: Header[] = [
    { key: 'Authorization', value: 'HMAC-SHA256 api-key-id:{{hmacBody_SHA256_secret}}' }
  ];

  const pm: Postman = {
    request: {
      url: { toString: () => 'http://localhost/record/{{sample_1_2#id}}' },
      body: {
        raw: JSON.stringify(exampleBody),
      },
      headers: {
        each: (iterator) => {
          headers.forEach(iterator);
        }
      },
    },
    environment: {
      set: fakeSetter,
    },
  };

  beforeEach(() => {
    Object.assign(global, { pm });
    jest.spyOn(global, 'Date').mockImplementation(() => testDate as any);
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

    // from url
    expectCallToMatch<string>(1, 'sample_1_2#id', (value) => {
      expect(['1', '2']).toContain(value);
    });

    // from request body
    expectCallToMatch<number>(2, 'randomFloat_1_2', (value) => {
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThan(2);
    });

    expectCallToMatch<number>(3, 'randomInteger_1_2', (value) => {
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(2);
      expect(value).toEqual(Math.round(value));
    });

    expectCallToMatch<string>(4, 'sample_pip_lu_hatch', (value) => {
      // TODO: make or find a toBeIn() matcher
      expect(['pip', 'lu', 'hatch']).toContain(value);
    });

    expectCallToMatch<string>(5, 'currentTimeUtc_YYYY/MM', (value) => {
      expect(value).toEqual('2012/02');
    });

    expectCallToMatch<number>(6, 'currentTimeInTicks', (value) => {
      expect(value).toBe(634650742940000000);
    });

    expectCallToMatch<string>(7, 'hmacBody_SHA256_secret', (value) => {
      expect(value).toBe('70079fa16fa836b8fec40b70b872f116f4edf41c594d79cf5932fe8532589de1');
    });
  });
});