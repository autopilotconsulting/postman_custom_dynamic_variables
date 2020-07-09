import { Postman } from '../../src/types/postman';

jest.mock('../../src/buildDynamicVariables', () => ({
  buildDynamicVariables: jest.fn(),
}));

describe('pre-request', () => {
  const fakeSetter = jest.fn();
  let buildDynamicVariables: jest.Mock<any, any>;

  function buildPostman(): Postman {
    return {
      request: {
        url: '',
        body: undefined,
      },
      environment: {
        set: fakeSetter,
      },
    }
  };

  beforeEach(() => {
    buildDynamicVariables = require('../../src/buildDynamicVariables').buildDynamicVariables;
    Object.assign(global, { pm: buildPostman() });
  });

  afterEach(() => {
    delete (global as any).pm;
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should build dynamic variables for the body', () => {
    pm.request.body = { raw: 'There is no body in the study!!' };
    require('../../src/pre-request');

    expect(buildDynamicVariables).toHaveBeenCalledWith('There is no body in the study!!', expect.any(Function));
    const setterProxy = (buildDynamicVariables as jest.Mock<any, any>).mock.calls[0][1];

    setterProxy('city', 'Letterkenny');
    expect(fakeSetter).toHaveBeenCalledWith('city', 'Letterkenny');
  });

  it('should build dynamic variables for the url', () => {
    pm.request.url = { toString: () => 'http://localhost' };
    require('../../src/pre-request');

    expect(buildDynamicVariables).toHaveBeenCalledWith('http://localhost', expect.any(Function));
    const setterProxy = (buildDynamicVariables as jest.Mock<any, any>).mock.calls[0][1];

    setterProxy('city', 'Letterkenny');
    expect(fakeSetter).toHaveBeenCalledWith('city', 'Letterkenny');
  });

  it('should not try to build dynamic variables for an emtpy body there is no body', () => {
    require('../../src/pre-request');
    expect(buildDynamicVariables).not.toHaveBeenCalledWith(undefined, expect.anything());
  });
});