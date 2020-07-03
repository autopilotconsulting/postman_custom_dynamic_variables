import { Postman } from '../../src/types/postman';
import { buildDynamicVariables } from '../../src/buildDynamicVariables';

jest.mock('../../src/buildDynamicVariables', () => ({
  buildDynamicVariables: jest.fn(),
}));

describe('pre-request', () => {
  var fakeSetter = jest.fn();

  var pm: Postman = {
    request: {
      body: {
        raw: 'This is my body!!',
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
  });

  it('should buildDynamicVariables', () => {
    require('../../src/pre-request');

    expect(buildDynamicVariables).toHaveBeenCalledWith('This is my body!!', expect.any(Function));
    const setterProxy = (buildDynamicVariables as jest.Mock<any, any>).mock.calls[0][1];

    setterProxy('city', 'Letterkenny');
    expect(fakeSetter).toHaveBeenCalledWith('city', 'Letterkenny');
  });
});