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
const yauzl = require('yauzl')
const debug = require('debug')('image:source:zip-archive')

class ZipArchive extends EventEmitter {

  constructor( filename, options ) {
    this.path = filename
    this.info = {
      size: -1,
      uncompressedSize: -1,
      blockSize: -1,
    }
  }

  prepare(callback) {
    return process.nextTick(() => callback.call(this))
  }

  // NOTE: How should metadata be handled with this architecture,
  // as the location might actually not exist (yet)?
  // Should this just error in that case?
  getMetadata(callback) {
    yauzl.open(this.path, {
      lazyEntries: true
    }, (error, zipFile) => {

      if(error) {
        return readable.destroy(error)
      }

      zipFile.readEntry()

      zipFile.on('entry', (entry) => {
        if(!isWhatWeNeed(entry.fileName)) {
          return zipFile.readEntry()
        }

        if(isMetadataFile(entry.fileName)) {
          // TODO: Read & store on `this.info`
        } else {
          // TODO: Create readable stream and pipe to passthrough
        }
      })

    })
  }

  createReadStream(options) {
    var readable = new stream.PassThrough()
    return readable
  }

  createSparseReadStream(options) {
    throw new Error('Sparse read stream not supported')
  }

}

ZipArchive.extensions = [ '.zip', '.etch' ]
ZipArchive.mimeTypes = [ 'application/zip' ]
ZipArchive.defaultExtension = '.zip'

module.exports = ZipArchive
