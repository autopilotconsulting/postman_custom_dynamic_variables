(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDynamicVariables = void 0;
const generators_1 = require("./generators");
const TOKEN_FINDER = /\{\{(.+?)\}\}/g;
function splitToken(token) {
    const [methodParts] = token.split('#');
    const [methodName, ...args] = methodParts.split('_');
    return [token, methodName, ...args];
}
function buildDynamicVariables(body, setter) {
    const tokens = [...body.matchAll(TOKEN_FINDER)]
        .map(([_, token]) => splitToken(token));
    for (let [token, methodName, ...args] of tokens) {
        if (generators_1.generators[methodName]) {
            const value = generators_1.generators[methodName](...args);
            setter(token, value);
        }
    }
}
exports.buildDynamicVariables = buildDynamicVariables;

},{"./generators":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentTimeUtc = void 0;
const moment = require("moment");
function currentTimeUtc(format) {
    const currentMoment = moment.utc();
    return currentMoment.format(format);
}
exports.currentTimeUtc = currentTimeUtc;

},{"moment":"moment"}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generators = void 0;
const currentTimeUtc_1 = require("./currentTimeUtc");
const randomFloat_1 = require("./randomFloat");
const randomInteger_1 = require("./randomInteger");
const sample_1 = require("./sample");
const generators = {
    currentTimeUtc: currentTimeUtc_1.currentTimeUtc, randomFloat: randomFloat_1.randomFloat, randomInteger: randomInteger_1.randomInteger, sample: sample_1.sample
};
exports.generators = generators;
Object.freeze(generators);

},{"./currentTimeUtc":2,"./randomFloat":4,"./randomInteger":5,"./sample":6}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomFloat = void 0;
function randomFloat(minString, maxString) {
    const min = +minString;
    const max = +maxString;
    return Math.random() * (max - min) + min;
}
exports.randomFloat = randomFloat;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomInteger = void 0;
const randomFloat_1 = require("./randomFloat");
function randomInteger(minString, maxString) {
    const max = +maxString + 1;
    const value = randomFloat_1.randomFloat(minString, `${max}`);
    return Math.floor(value);
}
exports.randomInteger = randomInteger;

},{"./randomFloat":4}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sample = void 0;
function sample(...options) {
    return _.sample(options) || null;
}
exports.sample = sample;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buildDynamicVariables_1 = require("./buildDynamicVariables");
const setter = (name, value) => pm.environment.set(name, value);
const body = pm.request.body;
if (body) {
    buildDynamicVariables_1.buildDynamicVariables(body.raw, setter);
}
const url = pm.request.url.toString();
buildDynamicVariables_1.buildDynamicVariables(url, setter);

},{"./buildDynamicVariables":1}]},{},[7]);
