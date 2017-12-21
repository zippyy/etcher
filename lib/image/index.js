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

// const EventEmitter = require('events')
// const fs = require('fs')

const Image = module.exports

// class Image extends EventEmitter {

//   constructor(filename, options) {
//     super()

//     this.info = null
//     this.fs = fs

//     Object.defineProperty(this, 'fs', {
//       enumerable: false
//     })
//   }

//   getMetadata(callback) {
//     if (this.info) {
//       callback(null, this.info)
//       return
//     }

//     this.fs.stat((error, stats) => {
//       this.info = stats || null
//       callback(error, this.info)
//     })
//   }

//   createReadStream() {
//     throw new Error('Not implemented')
//   }

//   createSparseReadStream() {
//     throw new Error('Not supported')
//   }

// }

// Image.Stats = class Stats {
//   constructor() {
//     this.size = -1
//     this.uncompressedSize = -1
//     this.isArchive = false
//     this.isCompressed = false
//     this.isSparse = false
//     this.isStreamDecodable = false
//   }
// }

// Image.from = (value) => {
//   if (/^(https|http|magnet):/i.test(value)) { // URL
//     if (/^magnet:/i.test(value)) { // Torrent
//       // return new Image.Torrent(value)
//       return new Image.Format(value, {
//         fs: new Image.Filesystem.Torrent()
//       })
//     } else { // HTTP
//       // return new Image.HTTP(value)
//       return new Image.Format(value, {
//         fs: new Image.Filesystem.HTTP()
//       })
//     }
//   } else { // Local file or block device
//     return Image.isBlockDevice(value) ?
//       new Image.BlockDevice(value) :
//       new Image.Format(value)
//   }
// }

Image.Filesystem = {
  Http: require('./filesystem/http'),
  Torrent: require('./filesystem/torrent'),
}

Image.Source = require( './source' )
Image.Destination = require( './destination' )
