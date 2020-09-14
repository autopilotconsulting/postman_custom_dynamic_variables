import { buildDynamicVariables } from './buildDynamicVariables';
import { Postman } from './types/postman';

const setter: Postman.VariableSetter = (name, value) => pm.environment.set(name, value);

const url = pm.request.url.toString();
buildDynamicVariables(url, setter);

const body = pm.request.body;
if (body) {
  buildDynamicVariables(body.raw, setter);
}

pm.request.headers.each(header => {
  buildDynamicVariables(header.value, setter);
});