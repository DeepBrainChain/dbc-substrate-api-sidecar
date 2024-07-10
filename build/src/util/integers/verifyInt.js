"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyNonZeroUInt = exports.verifyUInt = void 0;
/**
 * Verify all integers including zeroes.
 * @param num
 */
const verifyUInt = (num) => {
    return Number.isInteger(num) && num >= 0;
};
exports.verifyUInt = verifyUInt;
/**
 * Verify all integers except for zero. Will return false when zero is inputted.
 * @param num
 */
const verifyNonZeroUInt = (num) => {
    return Number.isInteger(num) && num > 0;
};
exports.verifyNonZeroUInt = verifyNonZeroUInt;
//# sourceMappingURL=verifyInt.js.map