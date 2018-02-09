/*
 * Copyright 2017 resin.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict'

const Image = require( '../' )
const Destination = module.exports

// class Destination extends EventEmitter {

//   constructor(options) {
//     this.fs = options.fs
//     this.state = 'metadata' || 'prepare' || 'write' || 'verify'
//   }

//   prepare(callback) {

//   }

//   getMetadata(callback) {

//   }

//   createWriteStream(options) {

//   }

//   createSparseWriteStream(options) {

//   }

// }

// Destination.extensions = []
// Destination.mimeTypes = []
// Destination.supports = {
//   customFs: false,
//   sparseStream: false,
// }

Destination.from = (filename) => {

}
