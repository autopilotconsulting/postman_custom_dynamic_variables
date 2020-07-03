import { buildDynamicVariables } from './buildDynamicVariables';
import { Postman } from './types/postman';

const body = pm.request.body.raw;
const setter: Postman.VariableSetter = (name, value) => pm.environment.set(name, value);

buildDynamicVariables(body, setter);