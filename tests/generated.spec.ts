import {assert} from "chai";
import {TestClass as TestClass1} from "./models/generated/generated1.js";
import {TestClass as TestClass2} from "./models/generated/generated2.js";
import {TestClass as TestClass3} from "./models/generated/generated3.js";
import type {Serializable} from "../src/index.js";

// eslint-disable-next-line func-names
const itTestClass = function <T extends Serializable> (TestClass: new () => T): void {
    it("deserialized object should be equal to the original object", () => {
        const testObject = new TestClass();

        const testObjectSerialized = testObject.toJSON();

        const testObjectDeserialized = (new TestClass()).fromJSON(testObjectSerialized);

        assert.deepStrictEqual(testObject, testObjectDeserialized);
    });
};

describe.skip("Nested classes", () => {
    itTestClass(TestClass1);
    itTestClass(TestClass2);
    itTestClass(TestClass3);
});
