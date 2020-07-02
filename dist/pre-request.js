(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generators = void 0;
const randomFloat_1 = require("./randomFloat");
const randomInteger_1 = require("./randomInteger");
const sample_1 = require("./sample");
const generators = {
    randomFloat: randomFloat_1.randomFloat, randomInteger: randomInteger_1.randomInteger, sample: sample_1.sample
};
exports.generators = generators;
Object.freeze(generators);

},{"./randomFloat":2,"./randomInteger":3,"./sample":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomFloat = void 0;
function randomFloat(minString, maxString) {
    const min = +minString;
    const max = +maxString;
    return Math.random() * (max - min) + min;
}
exports.randomFloat = randomFloat;

},{}],3:[function(require,module,exports){
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

},{"./randomFloat":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sample = void 0;
function sample(...options) {
    return _.sample(options) || null;
}
exports.sample = sample;

},{}],5:[function(require,module,exports){
"use strict";
// Copyright (c) 2020, Autopilot Consulting, LLC
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the <organization> nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
Object.defineProperty(exports, "__esModule", { value: true });
const generators_1 = require("./generators");
const TOKEN_FINDER = /\{\{(.+?)\}\}/g;
const body = pm.request.body.raw;
const tokens = [...body.matchAll(TOKEN_FINDER)]
    .map(([_, token]) => [token, ...token.split('_')]);
for (let [token, methodName, ...args] of tokens) {
    if (generators_1.generators[methodName]) {
        const value = generators_1.generators[methodName](...args);
        pm.environment.set(token, value);
    }
}

},{"./generators":1}]},{},[5]);
