import { Postman } from './types/postman';
import { generators } from './generators';

const TOKEN_FINDER = /\{\{(.+?)\}\}/g;

function splitToken(token: string): string[] {
  const [methodParts] = token.split('#');
  const [methodName, ...args] = methodParts.split('_');

  return [token, methodName, ...args];
}

export function buildDynamicVariables(body: string, setter: Postman.VariableSetter): void {
  const tokens = [...body.matchAll(TOKEN_FINDER)]
    .map(([_, token]) => splitToken(token));

  for (let [token, methodName, ...args] of tokens) {
    if (generators[methodName]) {
      const value = generators[methodName](...args);
      setter(token, value);
    }
  }
}