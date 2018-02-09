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
const debug = require('debug')('image:blockdevice')
const BlockReadStream = require('./block-read-stream')
const BlockWriteStream = require('./block-write-stream')

class BlockDevice extends EventEmitter {

  constructor( filename, options ) {
    this.path = filename
    this.info = {
      size: 0,
      uncompressedSize: 0,
      blockSize: 512,
    }
    this.fd = options.fd || null
  }

  getMetadata(callback) {
    process.nextTick(() => {
      callback(new Error('Not implemented: BlockDevice.getMetadata()'))
    })
  }

  prepareWrite() {
    // NOTE: This should probably be integrated into .open()
    // in the BlockWriteStream() while integrating that into this
    // Win32: disk clean
  }

  prepareRead() {
    // NOOP
  }

  getMetadata() {

  }

  createReadStream(options) {
    return new BlockReadStream({
      fd: options.fd || this.fd,
      path: options.path || this.path,
      flags: options.flags || this.flags,
      mode: options.mode || this.mode,
      autoClose: options.autoClose || this.autoClose,
      start: options.start,
      end: options.end
    })
  }

  // TODO: Put a BlockStream in front of this
  // NOTE: Actually, DON'T DO THAT, as we need to get the actual write speed
  // This might also be something to think about for other formats as well;
  // Where should progress / speed measurement sit, and how should the data be accessed?
  createWriteStream(options) {
    return new BlockWriteStream({
      fd: options.fd || this.fd,
      path: options.path || this.path,
      flags: options.flags || this.flags,
      mode: options.mode || this.mode,
      autoClose: options.autoClose || this.autoClose
    })
  }

}

BlockDevice.mimeTypes = []
BlockDevice.extensions = []
BlockDevice.defaultExtension = null

module.exports = BlockDevice
