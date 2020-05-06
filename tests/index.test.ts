/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import("reflect-metadata"); // polyfill
import { assert } from "chai";

import { User } from "./models/User";

describe("Serializable", () => {
    describe("json-generator", () => {
        it("user from method fromJSON must be instance of User", async() => {
            const { User } = await import("./models/User");
            const json: object[] = await import("./jsons/json-generator.json");

            const user = new User().fromJSON(json[0]);

            assert.isTrue(user instanceof User);
        });

        it("user from static method fromJSON must be instance of User", async() => {
            const { User } = await import("./models/User");
            const json: object[] = await import("./jsons/json-generator.json");

            const user: User = User.fromJSON(json[0]);

            assert.isTrue(user instanceof User);
        });

        it("user created from other instance of user must be equals", async() => {
            const { User } = await import("./models/User");
            const json: object[] = await import("./jsons/json-generator.json");

            const user1 = new User().fromJSON(json[0]);
            const user2 = new User().fromJSON(user1);

            assert.deepEqual(user1, user2);
        });

        it("user property marked as jsonIgnore must by dropped", async() => {
            const { User } = await import("./models/User");
            const json: object[] = await import("./jsons/json-generator.json");

            const user = new User().fromJSON(json[0]);
            user.isExpanded = true;
            const obj = JSON.parse(JSON.stringify(user)) as User;

            assert.isUndefined(obj.isExpanded);
        });
    });
});
