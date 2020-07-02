import { generators } from './generators';

const TOKEN_FINDER = /\{\{(.+?)\}\}/g;

const body = pm.request.body.raw;
const tokens = [...body.matchAll(TOKEN_FINDER)]
  .map(([_, token]) => [token, ...token.split('_')]);

for (let [token, methodName, ...args] of tokens) {
    if (generators[methodName]) {
        const value = generators[methodName](...args);
        pm.environment.set(token, value);
    }
}
