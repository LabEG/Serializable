/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import("reflect-metadata"); // Polyfill
import {assert} from "chai";

describe("Serializable", () => {
    describe("bonus features", () => {
        it("serializable must support deep copy", async () => {
            const {User} = await import("./models/User");
            const json: Record<string, unknown>[] = await import("./jsons/json-generator.json", {assert: {type: "json"}});

            const user1 = new User().fromJSON(json[0]);
            const user2 = new User().fromJSON(user1);

            assert.deepEqual(user1, user2);
        });
    });
});
