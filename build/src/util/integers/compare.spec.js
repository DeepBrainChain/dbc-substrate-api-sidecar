"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bn_js_1 = __importDefault(require("bn.js"));
const compare_1 = require("./compare");
describe('Compare integers', () => {
    describe('subIntegers', () => {
        it('Should return the correct value for any ordered input', () => {
            const foo = new bn_js_1.default(100);
            const bar = new bn_js_1.default(101);
            expect((0, compare_1.subIntegers)(foo, bar).toString()).toBe('1');
            expect((0, compare_1.subIntegers)(bar, foo).toString()).toBe('1');
        });
    });
});
//# sourceMappingURL=compare.spec.js.map