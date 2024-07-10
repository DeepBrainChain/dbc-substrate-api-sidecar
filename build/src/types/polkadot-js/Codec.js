"use strict";
// Copyright 2017-2023 Parity Technologies (UK) Ltd.
// This file is part of Substrate API Sidecar.
//
// Substrate API Sidecar is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCodec = void 0;
function isCodec(thing) {
    // Null errors on .hash access so we do not check for .hash
    return (!!thing &&
        thing.encodedLength !== undefined &&
        thing.registry !== undefined &&
        thing.isEmpty !== undefined &&
        typeof thing.eq === 'function' &&
        typeof thing.toHex === 'function' &&
        typeof thing.toHuman === 'function' &&
        typeof thing.toJSON === 'function' &&
        typeof thing.toRawType === 'function' &&
        typeof thing.toString === 'function' &&
        typeof thing.toU8a === 'function');
}
exports.isCodec = isCodec;
//# sourceMappingURL=Codec.js.map