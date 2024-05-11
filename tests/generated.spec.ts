import {assert} from "chai";
import {TestClass as TestClass1} from "./models/generated/generated1.js";
import {TestClass as TestClass2} from "./models/generated/generated2.js";
import {TestClass as TestClass3} from "./models/generated/generated3.js";

// Think about guessing complex union types in the future.
describe.skip("Nested classes", () => {
    it("deserialized object TestClass1 should be equal to the original object", () => {
        const testObject = new TestClass1();
        const testObjectSerialized = testObject.toJSON();
        const testObjectDeserialized = new TestClass1().fromJSON(testObjectSerialized);
        assert.deepStrictEqual(testObject, testObjectDeserialized);
    });

    it("deserialized object TestClass2 should be equal to the original object", () => {
        const testObject = new TestClass2();
        const testObjectSerialized = testObject.toJSON();
        const testObjectDeserialized = new TestClass2().fromJSON(testObjectSerialized);
        assert.deepStrictEqual(testObject, testObjectDeserialized);
    });

    it("deserialized object TestClass3 should be equal to the original object", () => {
        const testObject = new TestClass3();
        const testObjectSerialized = testObject.toJSON();
        const testObjectDeserialized = new TestClass3().fromJSON(testObjectSerialized);
        assert.deepStrictEqual(testObject, testObjectDeserialized);
    });
});
