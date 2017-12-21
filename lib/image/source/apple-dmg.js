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
const UDIF = require('udif')
const debug = require('debug')('image:source:apple-dmg')

class AppleDmg extends EventEmitter {

  constructor(filename, options) {
    this.path = filename
    this.info = {
      size: -1,
      uncompressedSize: -1,
    }
  }

  getMetadata(callback) {
    // TODO: Use transport based fs (http,torrent,etc.)
    fs.stat(this.path, (error, stats) => {
      if (error) {
        return callback.call(this, error)
      }
      this.info.size = stats.size
      UDIF.getUncompressedSize(this.path, (error, size) => {
        if (error) {
          return callback.call(this, error)
        }
        this.info.uncompressedSize = size
        callback.call(this, error, this.info)
      })
    })
  }

  createReadStream(options) {
    return UDIF.createReadStream(this.path, options)
  }

  createSparseReadStream() {
    throw new Error('Not implemented')
    return UDIF.createSparseReadStream(this.path, options)
  }

}

AppleDmg.mimeTypes = [ 'application/x-apple-diskimage' ]
AppleDmg.extensions = [ '.dmg' ]
AppleDmg.defaultExtension = '.dmg'

module.exports = AppleDmg
