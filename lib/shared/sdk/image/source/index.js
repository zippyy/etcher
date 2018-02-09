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
const Source = module.exports

// class Source extends EventEmitter {

//   constructor(options) {
//     this.fs = options.fs
//     this.state = 'metadata' || 'prepare' || 'read' || 'verify'
//   }

//   prepare(callback) {

//   }

//   getMetadata(callback) {

//   }

//   createReadStream(options) {

//   }

//   createSparseReadStream(options) {

//   }

// }

// Source.icon = 'format-name.svg'
// Source.extensions = []
// Source.mimeTypes = []
// // Whether the stream pipeline needs to be in `objectMode`.
// // This will be useful for file-copy streams when copying files
// // from an ISO to a formatted device (streams of streams).
// Source.objectMode = false
// Source.supports = {
//   customFs: false,
//   sparseStream: false,
//   verification: false,
// }

Source.AppleDmg = require( './apple-dmg' )
Source.OctetStream = require( './octet-stream' )
Source.ZipArchive = require( './zip-archive' )
// Source.BlockDevice = require( './blockdevice' )

/**
 * @description List of source formats
 * @type {Array}
 */
Source.formats = [
  Source.AppleDmg,
  Source.OctetStream,
  Source.ZipArchive,
]

/**
 * @description List of supported filename extensions
 * @type {Array<String>}
 * @constant
 */
Source.supportedExtensions = Source.formats.reduce((extensions, source) => {
  return extensions.concat(source.extensions)
}, [])

/**
 * @description List of supported MIME types
 * @type {Array<String>}
 * @constant
 */
Source.supportedMimeTypes = Source.formats.reduce((mimeTypes, source) => {
  return mimeTypes.concat(source.mimeTypes)
}, [])

/**
 * @description Create a source from a given filename / URL
 * @param {String} filename
 * @param {Function} callback - callback(error, source)
 */
Source.from = (filename, callback) => {

  var customFs = null
  var url = require('url')
  var path = require('path')
  var location = url.parse(filename)

  switch (location.protocol) {
    case 'http:': case 'https:':
      customFs = new Image.Filesystem.Http(filename); break
    case 'ftp:':
      customFs = new Image.Filesystem.Ftp(filename); break
    case 'magnet:':
      customFs = new Image.Filesystem.Torrent(filename); break
    case 'file:':
    default:
      // ...
      break
  }

  // NOTE: Windows paths don't go well with url.parse()
  filename = url.parse(filename).pathname || '/'

  // NOTE: This might be better off being implemented as a "format" (?)
  // var magnet = 'magnet:?xt=urn:btih:34e2b78745138186976cbc27939b1b34d18bd5b3&dn=TIMIT.zip&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com'
  // else if (/^magnet:/i.test(filename)) { // Torrent (Magnet URL)
  //   fs = new Image.Filesystem.Torrent(filename)
  //   filename = url.parse(filename).pathname || '/'
  // }

  var stats = fs.stat(filename, (error, stats) => {
    if (error) {
      // TODO: ...
      return void callback(error)
    }

    if (stats.isBlockDevice && stats.isBlockDevice()) {
      // Block device
    } else {
      // Image file
    }
  })

}
