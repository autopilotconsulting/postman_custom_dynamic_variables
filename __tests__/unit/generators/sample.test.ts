import * as _ from 'lodash';

import { sample } from '../../../src/generators/sample';
const SAMPLE_SIZE = 100000;

describe(sample, () => {
  it('should pseudorandomly select an element from a list', () => {
    var values = _.range(SAMPLE_SIZE).map(() => sample("pip", "hatch", "lu"));
    var groups = _.groupBy(values, value => value);

    expect(Object.keys(groups).sort()).toEqual(['hatch', 'lu', 'pip']);
    expect(groups['pip'].length / SAMPLE_SIZE).toBeCloseTo(.333);
    expect(groups['lu'].length / SAMPLE_SIZE).toBeCloseTo(.333);
    expect(groups['hatch'].length / SAMPLE_SIZE).toBeCloseTo(.333);
  });

  it('should return null if no options are provided', () => {
    var value = sample();
    expect(value).toBeNull();
  });
});