// Copyright (c) 2020, Autopilot Consulting, LLC
// All rights reserved.

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
//
// This is just an initial commit to keep these somewhere until I decide to do something useful.
// I'd like to use typescript because I love it.
// I'd also like to have tests . . . that should be pretty easy.
//
// The tokens have to be differentiated somehow if you want the values to be different.  I haven't decided on a uniform way.
// One way I did it is to have an extra argument at the end that gets ignored
// like in these examples:
// {
//     "currentPositionX": {{randomFloat_0_100_1}},
//     "currentPositionY": {{randomFloat_0_100_2}},
// }
//
// Here are the existing methods you can call
// {
//     "selectedGuid": "{{sample_089c3ace-75e5-43e9-9f66-b7c3e7b87132_6794B2BE-3B4D-4FDF-8B20-12E0342D673F_4A373BFF-1FFA-4076-8339-60C56B0CF158}}",
//     "randomIntegerBetween0And5": {{randomInteger_0_5_1}},
//     "randomFloatBetween0And100": {{randomFloat_0_100_1}},
// }
//
// If anybody happens across this little repo, I hope you find this useful.  Feel free to use it as is and feel free to contribute to it if you'd like.
//

const TOKEN_FINDER = /\{\{(.+?)\}\}/g;

const body = pm.request.body.raw;
const tokens = [...body.matchAll(TOKEN_FINDER)]
    .map(([_, token]) => [token, ...token.split('_')]);

const dynamicVariables = {
    randomFloat: (min, max) => Math.random() * (max - min) + min,
    randomInteger: (min, max) => Math.floor(dynamicVariables.randomFloat(min, 1 + 1 * max)),
    sample: (...options) => _.sample(options),
};

for (let [token, methodName, ...args] of tokens) {
    if (dynamicVariables[methodName]) {
        const value = dynamicVariables[methodName](...args);
        pm.environment.set(token, value);
    }
}
