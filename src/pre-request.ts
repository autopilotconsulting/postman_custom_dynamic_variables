import { buildDynamicVariables } from './buildDynamicVariables';
import { Postman } from './types/postman';

const body = pm.request.body;
const setter: Postman.VariableSetter = (name, value) => pm.environment.set(name, value);

if (body) {
  buildDynamicVariables(body.raw, setter);
}