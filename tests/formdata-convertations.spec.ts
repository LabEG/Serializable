/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */

import("reflect-metadata"); // Polyfill
import {assert} from "chai";
import {describe, it} from "node:test";

// Import type {Friend as IFriend} from "./models/User";


describe("FormData convertation", () => {
    it("class can be converted to FormData", async () => {
        const {User} = await import("./models/User");
        const json = await import("./jsons/json-generator.json", {with: {type: "json"}});

        const [object] = Reflect.get(json, "default") as typeof json;

        const user = new User().fromJSON(object);

        const formData = user.toFormData();

        assert.isTrue(user instanceof User);
        assert.isTrue(formData.has("id"), "form don't have field id");
        assert.strictEqual(user.id, formData.get("id"), "id is not equal");
        assert.strictEqual(String(user.index), formData.get("index"), "index is not equal");
        assert.strictEqual(user.guid, formData.get("guid"), "guid is not equal");
        assert.strictEqual(String(user.isActive), formData.get("isActive"), "isActive is not equal");
        assert.strictEqual(user.balance, formData.get("balance"), "balance is not equal");
        assert.strictEqual(user.picture, formData.get("picture"), "picture is not equal");
        assert.strictEqual(String(user.age), formData.get("age"), "age is not equal");
        assert.strictEqual(user.eyeColor, formData.get("eyeColor"), "eyeColor is not equal");
        assert.strictEqual(user.name, formData.get("name"), "name is not equal");
        assert.strictEqual(user.company, formData.get("company"), "company is not equal");
        assert.strictEqual(user.email, formData.get("email"), "email is not equal");
        assert.strictEqual(user.phone, formData.get("phone"), "phone is not equal");
        assert.strictEqual(user.address, formData.get("address"), "address is not equal");
        assert.strictEqual(user.about, formData.get("about"), "about is not equal");
        assert.strictEqual(String(user.latitude), formData.get("latitude"), "latitude is not equal");
        assert.strictEqual(String(user.longitude), formData.get("longitude"), "longitude is not equal");
        assert.deepEqual(user.tags, formData.getAll("tags"), "tags is not equal");
        assert.strictEqual(user.greeting, formData.get("greeting"), "greeting is not equal");
        assert.strictEqual(user.favoriteFruit, formData.get("favoriteFruit"), "favoriteFruit is not equal");

        /*
         * Nodejs version of FormData don't support arrays of objects, but C# and browser version of FormData support him.
         * Because test run under nodejs env, this next part disabled. Check this code in future versions of nodejs.
         *
         * user.friends.forEach((friend: IFriend, index: number) => {
         *     assert.strictEqual(
         *         String(friend.id),
         *         formData.get(`friends[${index.toString()}].id`),
         *         `friend ${String(index)} id is not equal`
         *     );
         *     assert.strictEqual(
         *         friend.name,
         *         formData.get(`friends[${index.toString()}].name`),
         *         `friend ${String(index)} name is not equal`
         *     );
         * });
         */
    });
});
