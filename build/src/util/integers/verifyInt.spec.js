"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyInt_1 = require("./verifyInt");
describe('Verify integers', () => {
    describe('verifyUInt', () => {
        it('Should correctly handle unsigned integers correctly', () => {
            expect((0, verifyInt_1.verifyUInt)(0)).toBe(true);
            expect((0, verifyInt_1.verifyUInt)(1)).toBe(true);
            expect((0, verifyInt_1.verifyUInt)(-1)).toBe(false);
        });
    });
    describe('verifyNonZeroUInt', () => {
        it('Should correctly handle unsigned integers correctly', () => {
            expect((0, verifyInt_1.verifyNonZeroUInt)(1)).toBe(true);
            expect((0, verifyInt_1.verifyNonZeroUInt)(0)).toBe(false);
            expect((0, verifyInt_1.verifyNonZeroUInt)(-1)).toBe(false);
        });
    });
});
//# sourceMappingURL=verifyInt.spec.js.map