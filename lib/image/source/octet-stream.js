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
const fs = require('fs')
const path = require('path')
const debug = require('debug')('image:source:octet-stream')

class OctectStream extends EventEmitter {

  constructor(filename, options) {
    this.path = filename
  }

  getMetadata(callback) {
    process.nextTick(() => {
      callback(new Error('Not implemented: OctectStream.getMetadata()'))
    })
  }

  createReadStream() {
    throw new Error('Not implemented')
  }

  createSparseReadStream() {
    throw new Error('Not implemented')
  }

}

OctectStream.mimeTypes = [
  'application/octet-stream',
  'application/x-xz',
  'application/gzip',
  'application/x-bzip2'
]

OctectStream.extensions = [
  '.img', '.bin', '.raw',
  '.hddimg', '.sdcard', '.rpi-sdimg', '.dsk',
  '.bz2', '.bzip2', '.bz', '.bzip',
  '.gz', '.gzip',
  '.xz', '.lzma'
]

OctectStream.defaultExtension = '.img'

module.exports = OctectStream
