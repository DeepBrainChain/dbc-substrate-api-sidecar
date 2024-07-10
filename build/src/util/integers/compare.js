"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subIntegers = void 0;
/**
 * Compare the difference between two values. Ensures that we substract by the largest value.
 */
const subIntegers = (a, b) => {
    return a.gt(b) ? a.sub(b) : b.sub(a);
};
exports.subIntegers = subIntegers;
//# sourceMappingURL=compare.js.map