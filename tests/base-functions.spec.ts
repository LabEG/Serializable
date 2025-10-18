/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import("reflect-metadata"); // Polyfill
import {assert} from "chai";
import {describe, it} from "node:test";

import type {User as IUser, Friend as IFriend} from "./models/User";
import type {UserSimple as IUserSimple, FriendSimple as IFriendSimple} from "./models/UserSimple";
import {fromJSON} from "../src/functions/FromJSON";

describe("Base functions", () => {
    it("should deserialize JSON to User instance using instance method fromJSON()", async () => {
        const {User} = await import("./models/User");
        const json = await import("./jsons/json-generator.json", {with: {type: "json"}});

        const [object] = Reflect.get(json, "default") as typeof json;

        const user: IUser = new User().fromJSON(object);

        assert.isTrue(user instanceof User);
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

        user.friends.forEach((friend: IFriend, index: number) => {
            assert.strictEqual(friend.id, object.friends[index].id, `friend ${String(index)} id is not equal`);
            assert.strictEqual(friend.name, object.friends[index].name, `friend ${String(index)} name is not equal`);
        });
    });

    it("should deserialize JSON to User instance using static method fromJSON()", async () => {
        const {User} = await import("./models/User");
        const json = await import("./jsons/json-generator.json", {with: {type: "json"}});
        const [object] = Reflect.get(json, "default") as typeof json;

        const user: IUser = User.fromJSON(object);

        assert.isTrue(user instanceof User);
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

        user.friends.forEach((friend: IFriend, index: number) => {
            assert.strictEqual(friend.id, object.friends[index].id, `friend ${String(index)} id is not equal`);
            assert.strictEqual(friend.name, object.friends[index].name, `friend ${String(index)} name is not equal`);
        });
    });

    it("should deserialize JSON string to User instance using instance method fromString()", async () => {
        const {User} = await import("./models/User");
        const json = await import("./jsons/json-generator.json", {with: {type: "json"}});
        const [object] = Reflect.get(json, "default") as typeof json;

        const user: IUser = new User().fromString(JSON.stringify(object));

        assert.isTrue(user instanceof User);
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

        user.friends.forEach((friend: IFriend, index: number) => {
            assert.strictEqual(friend.id, object.friends[index].id, `friend ${String(index)} id is not equal`);
            assert.strictEqual(friend.name, object.friends[index].name, `friend ${String(index)} name is not equal`);
        });
    });

    it("should deserialize JSON string to User instance using static method fromString()", async () => {
        const {User} = await import("./models/User");
        const json = await import("./jsons/json-generator.json", {with: {type: "json"}});
        const [object] = Reflect.get(json, "default") as typeof json;

        const user: IUser = User.fromString(JSON.stringify(object));

        assert.isTrue(user instanceof User);
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

        user.friends.forEach((friend: IFriend, index: number) => {
            assert.strictEqual(friend.id, object.friends[index].id, `friend ${String(index)} id is not equal`);
            assert.strictEqual(friend.name, object.friends[index].name, `friend ${String(index)} name is not equal`);
        });
    });

    it("should deserialize JSON to plain class instance using standalone fromJSON() function", async () => {
        const {UserSimple} = await import("./models/UserSimple");
        const json = await import("./jsons/json-generator.json", {with: {type: "json"}});

        const [object] = Reflect.get(json, "default") as typeof json;

        const user: IUserSimple = fromJSON(new UserSimple(), object);

        assert.isTrue(user instanceof UserSimple);
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

        user.friends.forEach((friend: IFriendSimple, index: number) => {
            assert.strictEqual(friend.id, object.friends[index].id, `friend ${String(index)} id is not equal`);
            assert.strictEqual(friend.name, object.friends[index].name, `friend ${String(index)} name is not equal`);
        });
    });

    it("should deserialize JSON by passing class constructor to standalone fromJSON() function", async () => {
        const {UserSimple} = await import("./models/UserSimple");
        const json = await import("./jsons/json-generator.json", {with: {type: "json"}});

        const [object] = Reflect.get(json, "default") as typeof json;

        const user: IUserSimple = fromJSON(UserSimple, object);

        assert.isTrue(user instanceof UserSimple);
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

        user.friends.forEach((friend: IFriendSimple, index: number) => {
            assert.strictEqual(friend.id, object.friends[index].id, `friend ${String(index)} id is not equal`);
            assert.strictEqual(friend.name, object.friends[index].name, `friend ${String(index)} name is not equal`);
        });
    });
});
