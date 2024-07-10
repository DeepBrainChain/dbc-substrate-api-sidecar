"use strict";
// Copyright 2017-2024 Parity Technologies (UK) Ltd.
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
exports.XcmDecoder = void 0;
var ChainType;
(function (ChainType) {
    ChainType["Relay"] = "Relay";
    ChainType["Parachain"] = "Parachain";
})(ChainType || (ChainType = {}));
class XcmDecoder {
    constructor(api, specName, extrinsics, paraId) {
        this.api = api;
        this.specName = specName;
        this.curChainType = this.getCurChainType(specName);
        this.messages = this.getMessages(api, extrinsics, paraId);
    }
    getCurChainType(specName) {
        const relay = ['polkadot', 'kusama', 'westend', 'rococo'];
        if (relay.includes(specName.toLowerCase())) {
            return ChainType.Relay;
        }
        else {
            return ChainType.Parachain;
        }
    }
    getMessages(api, extrinsics, paraId) {
        const xcmMessages = { horizontalMessages: [], downwardMessages: [], upwardMessages: [] };
        if (this.curChainType === ChainType.Relay) {
            extrinsics.forEach((extrinsic) => {
                const frame = extrinsic.method;
                if (frame.pallet === 'paraInherent' && frame.method === 'enter') {
                    const data = extrinsic.args.data;
                    data.backedCandidates.forEach((candidate) => {
                        if (!paraId || candidate.candidate.descriptor.paraId.toString() === paraId.toString()) {
                            const horizontalMsgs = this.checkMessagesInRelay(api, candidate, 'horizontal', paraId);
                            if (horizontalMsgs != null && horizontalMsgs.length > 0) {
                                horizontalMsgs.forEach((msg) => {
                                    var _a;
                                    (_a = xcmMessages.horizontalMessages) === null || _a === void 0 ? void 0 : _a.push(msg);
                                });
                            }
                            const upwardMsgs = this.checkMessagesInRelay(api, candidate, 'upward', paraId);
                            if (upwardMsgs != null && upwardMsgs.length > 0) {
                                upwardMsgs.forEach((msg) => {
                                    var _a;
                                    (_a = xcmMessages.upwardMessages) === null || _a === void 0 ? void 0 : _a.push(msg);
                                });
                            }
                        }
                    });
                }
            });
        }
        else if (this.curChainType === ChainType.Parachain) {
            extrinsics.forEach((extrinsic) => {
                const frame = extrinsic.method;
                if (frame.pallet === 'parachainSystem' && frame.method === 'setValidationData') {
                    const data = extrinsic.args.data;
                    data.downwardMessages.forEach((msg) => {
                        var _a;
                        const message = msg.msg;
                        if (message && message.toString().length > 0) {
                            const xcmMessageDecoded = this.decodeMsg(api, message);
                            const downwardMessage = {
                                sentAt: msg.sentAt,
                                msg: message.toString(),
                                data: xcmMessageDecoded,
                            };
                            (_a = xcmMessages.downwardMessages) === null || _a === void 0 ? void 0 : _a.push(downwardMessage);
                        }
                    });
                    data.horizontalMessages.forEach((msgs, index) => {
                        if (!paraId || index.toString() === paraId.toString()) {
                            msgs.forEach((msg) => {
                                var _a;
                                const xcmMessageDecoded = this.decodeMsg(api, msg.data.slice(1));
                                const horizontalMessage = {
                                    sentAt: msg.sentAt,
                                    originParaId: index,
                                    data: xcmMessageDecoded,
                                };
                                (_a = xcmMessages.horizontalMessages) === null || _a === void 0 ? void 0 : _a.push(horizontalMessage);
                            });
                        }
                    });
                }
            });
        }
        return xcmMessages;
    }
    checkMessagesInRelay(api, candidate, messageType, paraId) {
        const messages = [];
        const xcmMessages = messageType === 'upward'
            ? candidate.candidate.commitments.upwardMessages
            : candidate.candidate.commitments.horizontalMessages;
        if (xcmMessages.length > 0) {
            const paraIdCandidate = candidate.candidate.descriptor.paraId.toString();
            xcmMessages.forEach((msg) => {
                const msgData = messageType === 'upward'
                    ? msg
                    : msg.data.slice(1);
                const xcmMessageDecoded = this.decodeMsg(api, msgData);
                if (!paraId || paraIdCandidate === paraId.toString()) {
                    if (messageType === 'upward') {
                        if (messages.length > 0 && messages[messages.length - 1].originParaId === paraIdCandidate) {
                            messages[messages.length - 1].data = messages[messages.length - 1].data.concat(xcmMessageDecoded);
                        }
                        else {
                            const upwardMessage = {
                                originParaId: paraIdCandidate,
                                data: xcmMessageDecoded,
                            };
                            messages.push(upwardMessage);
                        }
                    }
                    else {
                        const horizontalMessage = {
                            originParaId: paraIdCandidate,
                            destinationParaId: msg.recipient.toString(),
                            data: xcmMessageDecoded,
                        };
                        messages.push(horizontalMessage);
                    }
                }
            });
            return messages;
        }
        else {
            return null;
        }
    }
    decodeMsg(api, message) {
        const instructions = [];
        let xcmMessage = message;
        let instructionLength = 0;
        while (xcmMessage.length != 0) {
            const xcmInstructions = api.createType('XcmVersionedXcm', xcmMessage);
            instructions.push(xcmInstructions);
            instructionLength = xcmInstructions.toU8a().length;
            xcmMessage = xcmMessage.slice(instructionLength);
        }
        return instructions;
    }
}
exports.XcmDecoder = XcmDecoder;
//# sourceMappingURL=XCMDecoder.js.map