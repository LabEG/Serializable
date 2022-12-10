/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import("reflect-metadata"); // Polyfill
import {assert} from "chai";

import type {User as IUser} from "./models/User";
import type {FriendExt} from "./models/UserExt";

describe("Serializable", () => {
    describe("decorators", () => {
        it("user property marked as jsonIgnore must by dropped", async () => {
            const {User} = await import("./models/User");
            const json: Record<string, unknown>[] = await import("./jsons/json-generator.json", {assert: {type: "json"}});

            const user = new User().fromJSON(json[0]);
            user.isExpanded = true;
            const obj = JSON.parse(JSON.stringify(user)) as IUser;

            assert.isUndefined(obj.isExpanded);
        });

        it("class can be extended by decorator jsonObject", async () => {
            const {UserExt} = await import("./models/UserExt");
            const json = await import("./jsons/json-generator.json", {assert: {type: "json"}});
            const [object] = Reflect.get(json, "default") as typeof json;

            const user = new UserExt().fromJSON(object);

            assert.isTrue(user instanceof UserExt);
            assert.strictEqual(user.id, object.id, "id is not equal");
            assert.strictEqual(user.index, object.index, "index is not equal");
            assert.strictEqual(user.guid, object.guid, "guid is not equal");
            assert.strictEqual(user.isActive, object.isActive, "isActive is not equal");
            assert.strictEqual(user.balance, object.balance, "balance is not equal");
            assert.strictEqual(user.picture, object.picture, "picture is not equal");
            assert.strictEqual(user.age, object.age, "age is not equal");
            assert.strictEqual(user.eyeColor, object.eyeColor, "eyeColor is not equal");
            assert.strictEqual(user.name, object.name, "name is not equal");
            assert.strictEqual(user.company, object.company, "company is not equal");
            assert.strictEqual(user.email, object.email, "email is not equal");
            assert.strictEqual(user.phone, object.phone, "phone is not equal");
            assert.strictEqual(user.address, object.address, "address is not equal");
            assert.strictEqual(user.about, object.about, "about is not equal");
            assert.strictEqual(user.latitude, object.latitude, "latitude is not equal");
            assert.strictEqual(user.longitude, object.longitude, "longitude is not equal");
            assert.deepEqual(user.tags, object.tags, "tags is not equal");
            assert.strictEqual(user.greeting, object.greeting, "greeting is not equal");
            assert.strictEqual(user.favoriteFruit, object.favoriteFruit, "favoriteFruit is not equal");

            user.friends.forEach((friend: FriendExt, index: number) => {
                assert.strictEqual(friend.id, object.friends[index].id, `friend ${index} id is not equal`);
                assert.strictEqual(friend.name, object.friends[index].name, `friend ${index} name is not equal`);
            });
        });
    });
});
