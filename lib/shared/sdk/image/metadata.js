/*
 * Copyright 2018 resin.io
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

class Metadata {

  /**
   * Source / Destination metadata
   * @returns {Metadata}
   */
  constructor() {
    /** @type {String} Path / URL */
    this.path = ''
    /** @type {Number} Size of (compressed) image in bytes */
    this.compressedSize = 0
    /** @type {Number} Size of (uncompressed) image in bytes */
    this.size = 0
    /** @type {Number} Block size of image / blockdevice in bytes */
    this.blockSize = 0 || 512
    /** @type {Number} Logical block size in bytes */
    this.logicalBlockSize = 0 || 512
  }

}

module.exports = Metadata
