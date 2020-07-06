import { Postman } from '../../src/types/postman';
import { buildDynamicVariables } from '../../src/buildDynamicVariables';

jest.mock('../../src/buildDynamicVariables', () => ({
  buildDynamicVariables: jest.fn(),
}));

describe('pre-request', () => {
  var fakeSetter = jest.fn();

  function buildPostman(): Postman {
    return {
      request: {
        body: undefined,
      },
      environment: {
        set: fakeSetter,
      },
    }
  };

  beforeEach(() => {
    Object.assign(global, { pm: buildPostman() });
  });

  afterEach(() => {
    delete (global as any).pm;
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should build dynamic variables', () => {
    pm.request.body = { raw: 'There is no body in the study!!' };
    require('../../src/pre-request');

    expect(buildDynamicVariables).toHaveBeenCalledWith('There is no body in the study!!', expect.any(Function));
    const setterProxy = (buildDynamicVariables as jest.Mock<any, any>).mock.calls[0][1];

    setterProxy('city', 'Letterkenny');
    expect(fakeSetter).toHaveBeenCalledWith('city', 'Letterkenny');
  });

  it('should not try to build dynamic variables if there is no body', () => {
    require('../../src/pre-request');

    expect(buildDynamicVariables).not.toHaveBeenCalled();
  });
});