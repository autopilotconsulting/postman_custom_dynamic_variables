import { Postman } from '../types/postman';

import { currentTimeInTicks } from './currentTimeInTicks';
import { currentTimeUtc } from './currentTimeUtc';
import { hmacBody } from './hmacBody';
import { randomFloat } from './randomFloat';
import { randomInteger } from './randomInteger';
import { sample } from './sample';

export type VariableGenerator = (...args: string[]) => Postman.VariableValueType;

type FunctionMap = {
  [key: string]: VariableGenerator;
}

const generators: FunctionMap = {
  currentTimeInTicks, currentTimeUtc, hmacBody, randomFloat, randomInteger, sample
};
Object.freeze(generators);

export { generators };