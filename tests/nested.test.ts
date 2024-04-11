import {assert} from "chai";
import {TestClass as TestClass1} from "./generator/ts/generated1";
import {TestClass as TestClass2} from "./generator/ts/generated2";
import {TestClass as TestClass3} from "./generator/ts/generated2";
import type {Serializable} from "../src";

// eslint-disable-next-line func-names
const itTestClass = function <T extends Serializable> (idx: number, TestClass: new () => T): void {
    it("deserialized object should be equal to the original object", () => {
        const testObject = new TestClass();

        const testObjectSerialized = testObject.toJSON();

        const testObjectDeserialized = (new TestClass()).fromJSON(testObjectSerialized);


        assert.deepStrictEqual(testObject, testObjectDeserialized);
    });
};

describe("Nested classes", () => {
    itTestClass(1, TestClass1);
    itTestClass(2, TestClass2);
    itTestClass(2, TestClass3);
});
