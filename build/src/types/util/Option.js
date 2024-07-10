"use strict";
// Copyright 2017-2022 Parity Technologies (UK) Ltd.
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
exports.isNull = exports.isSome = void 0;
/**
 * Check if a `IOption` is `T`.
 *
 * @param option api-sidecar TS option type, conceptually mimics Rust option
 */
function isSome(option) {
    return option !== null;
}
exports.isSome = isSome;
/**
 * Check if a something is null. Meant to complement `isSome` for `IOption`.
 *
 * @param thing unknown value
 */
function isNull(thing) {
    return thing === null;
}
exports.isNull = isNull;
//# sourceMappingURL=Option.js.map