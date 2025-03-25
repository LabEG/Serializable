

import("reflect-metadata"); // Polyfill
import {assert} from "chai";
import {describe, it} from "node:test";
import type {User as IUser} from "./models/User";

describe("Decorators", () => {
    it("user property marked as jsonIgnore must by dropped", async () => {
        const {User} = await import("./models/User");
        const json: Record<string, unknown>[] = await import("./jsons/json-generator.json", {with: {type: "json"}});
        const [object] = Reflect.get(json, "default") as typeof json;

        const user = new User().fromJSON(object);
        user.isExpanded = true;
        const obj = JSON.parse(JSON.stringify(user)) as IUser;

        assert.isUndefined(obj.isExpanded);
    });
});
