import { buildDynamicVariables } from '../src/buildDynamicVariables';
import { generators } from '../src/generators';

jest.mock('../src/generators', () => ({
  generators: {
    makeSomethingDynamicPlease: jest.fn(),
  }
}));

function getMockGenerator(name: string) {
  return generators[name] as jest.Mock<any, any>;
}

describe(buildDynamicVariables, () => {
  beforeEach(jest.clearAllMocks);

  it('should add a value for a token found in the generators', () => {
    getMockGenerator('makeSomethingDynamicPlease').mockReturnValueOnce(217);

    const testValue = {
      test: '{{makeSomethingDynamicPlease}}'
    };

    const setter = jest.fn();
    buildDynamicVariables(JSON.stringify(testValue), setter);

    expect(setter).toHaveBeenCalledWith('makeSomethingDynamicPlease', 217);
  });

  it('should not replace tokens it does not know how to replace', () => {
    const testValue = {
      test: '{{pleaseLeaveMeAlone}}'
    };

    const setter = jest.fn();
    buildDynamicVariables(JSON.stringify(testValue), setter);
    expect(setter).not.toHaveBeenCalled();
  });

  it('should pass arguments to the generators', () => {
    const testValue = {
      test: '{{makeSomethingDynamicPlease_217_1118_Lulu}}'
    };

    const setter = jest.fn();
    buildDynamicVariables(JSON.stringify(testValue), setter);

    const generator = getMockGenerator('makeSomethingDynamicPlease');
    expect(generator).toHaveBeenCalledWith('217', '1118', 'Lulu');
  });

  it('should not pass tags to the generators', () => {
    const testValue = {
      test: '{{makeSomethingDynamicPlease_-10_10#tilt}}'
    };

    const setter = jest.fn();
    buildDynamicVariables(JSON.stringify(testValue), setter);

    const generator = getMockGenerator('makeSomethingDynamicPlease');
    expect(generator).toHaveBeenCalledWith('-10', '10');
  });
});