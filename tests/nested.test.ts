import {assert} from "chai";
import {TestClass} from "./generator/ts/generated";

describe("Nested classes", () => {
    const numberOfIterations = 3;
    for (let iteration = 1; iteration <= numberOfIterations; iteration += 1) {
        it("deserialized object should be equal to the original object", () => {
            const testObject = new TestClass();

            const testObjectSerialized = testObject.toJSON();

            const testObjectDeserialized = TestClass.fromJSON(testObjectSerialized);

            assert.deepStrictEqual(testObject, testObjectDeserialized);
        });
    }
});
