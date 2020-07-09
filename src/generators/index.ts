import { Postman } from '../types/postman';

import { currentTimeUtc } from './currentTimeUtc';
import { randomFloat } from './randomFloat';
import { randomInteger } from './randomInteger';
import { sample } from './sample';

export type VariableGenerator = (...args: string[]) => Postman.VariableValueType;

type FunctionMap = {
  [key: string]: VariableGenerator;
}

const generators: FunctionMap = {
  currentTimeUtc, randomFloat, randomInteger, sample
};
Object.freeze(generators);

export { generators };