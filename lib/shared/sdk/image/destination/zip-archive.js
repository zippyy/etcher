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

const EventEmitter = require('events')
const stream = require('readable-stream')
const fs = require('fs')
const path = require('path')
const yazl = require('yazl')
const debug = require('debug')('image:destination:zip-archive')

class ZipArchive extends EventEmitter {

  constructor( filename, options ) {
    this.path = filename
    this.info = {
      size: -1,
      uncompressedSize: -1,
      blockSize: -1,
    }
  }

  // NOTE: How should metadata be handled with this architecture,
  // as the location might actually not exist (yet)?
  // Should this just error in that case?
  getMetadata(callback) {
    process.nextTick(() => {
      callback(new Error('Not implemented: ZipArchive.getMetadata()'))
    })
  }

  createWriteStream(options) {

    var zipFile = new yazl.ZipFile()
    var destination = new fs.createWriteStream(this.path, options)
    var writable = new stream.Transform({
      transform(chunk, encoding, next) {
        return next(null, chunk)
      },
      flush(done) {
        // NOTE: To support adding generated blockmaps; stringify and
        // add the blockmap with `zipFile.addBuffer()` before ending;
        // same goes for other metadata (manifest.json, icons, etc.)
        zipFile.end()
        process.nextTick(done)
      }
    })

    // Propagate errors from internal streams to the exposed
    // writable to ensure errors can be handled and responded to
    ZipFile.outputStream.on('error', (error) => {
      writable.destroy(error)
    })

    destination.on('error', (error) => {
      writable.destroy(error)
    })

    zipFile.outputStream.pipe(destination)

    // Replace the .zip extension with a flat image extension,
    // as the input path will be the zip archive's filename
    var extname = path.extname(this.path)
    var filename = path.basename(this.path, extname) + '.img'

    zipFile.addReadStream(writable, filename)

    return writable

  }

  createSparseWriteStream(options) {
    throw new Error('Sparse write stream not supported')
  }

}

ZipArchive.extensions = [ '.zip', '.etch' ]
ZipArchive.mimeTypes = [ 'application/zip' ]
ZipArchive.defaultExtension = '.zip'

module.exports = ZipArchive
