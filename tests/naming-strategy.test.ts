/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import("reflect-metadata"); // Polyfill
import {assert} from "chai";
import type {FriendSnake} from "./models/UserSnake";
import {SnakeCaseNamingStrategy} from "../src";

describe("Serializable", () => {
    describe("naming strategies", () => {
        it("deserialize must support snack case naming by fromJson parameters", async () => {
            const {UserSnake} = await import("./models/UserSnake");
            const json = await import("./jsons/json-generator-snake.json", {assert: {type: "json"}});
            const [object] = Reflect.get(json, "default") as typeof json;

            const user = new UserSnake().fromJSON(
                object,
                {namingStrategy: new SnakeCaseNamingStrategy()}
            );

            assert.isTrue(user instanceof UserSnake);
            assert.strictEqual(user.idSnake, object.id_snake, "idSnake is not equal");
            assert.strictEqual(user.indexSnake, object.index_snake, "indexSnake is not equal");
            assert.strictEqual(user.guidSnake, object.guid_snake, "guidSnake is not equal");
            assert.strictEqual(user.isActiveSnake, object.is_active_snake, "isActiveSnake is not equal");
            assert.strictEqual(user.balanceSnake, object.balance_snake, "balanceSnake is not equal");
            assert.strictEqual(user.pictureSnake, object.picture_snake, "pictureSnake is not equal");
            assert.strictEqual(user.ageSnake, object.age_snake, "ageSnake is not equal");
            assert.strictEqual(user.eyeColorSnake, object.eye_color_snake, "eyeColorSnake is not equal");
            assert.strictEqual(user.nameSnake, object.name_snake, "nameSnake is not equal");
            assert.strictEqual(user.companySnake, object.company_snake, "companySnake is not equal");
            assert.strictEqual(user.emailSnake, object.email_snake, "emailSnake is not equal");
            assert.strictEqual(user.phoneSnake, object.phone_snake, "phoneSnake is not equal");
            assert.strictEqual(user.addressSnake, object.address_snake, "addressSnake is not equal");
            assert.strictEqual(user.aboutSnake, object.about_snake, "aboutSnake is not equal");
            assert.strictEqual(user.latitudeSnake, object.latitude_snake, "latitudeSnake is not equal");
            assert.strictEqual(user.longitudeSnake, object.longitude_snake, "longitudeSnake is not equal");
            assert.deepEqual(user.tagsSnake, object.tags_snake, "tagsSnake is not equal");
            assert.strictEqual(user.greetingSnake, object.greeting_snake, "greetingSnake is not equal");
            assert.strictEqual(user.favoriteFruitSnake, object.favorite_fruit_snake, "favoriteFruitSnake is not equal");

            user.friendsSnake.forEach((friend: FriendSnake, index: number) => {
                assert.strictEqual(friend.idSnake, object.friends_snake[index].id_snake, `friend ${index} idSnake is not equal`);
                assert.strictEqual(friend.nameSnake, object.friends_snake[index].name_snake, `friend ${index} nameSnake is not equal`);
            });
        });

        it("deserialize must support snack case naming by jsonObject decorator", async () => {
            const {UserSnakeObject} = await import("./models/UserSnake");
            const json = await import("./jsons/json-generator-snake.json", {assert: {type: "json"}});
            const [object] = Reflect.get(json, "default") as typeof json;

            const user = new UserSnakeObject().fromJSON(object);

            assert.isTrue(user instanceof UserSnakeObject);
            assert.strictEqual(user.idSnake, object.id_snake, "idSnake is not equal");
            assert.strictEqual(user.indexSnake, object.index_snake, "indexSnake is not equal");
            assert.strictEqual(user.guidSnake, object.guid_snake, "guidSnake is not equal");
            assert.strictEqual(user.isActiveSnake, object.is_active_snake, "isActiveSnake is not equal");
            assert.strictEqual(user.balanceSnake, object.balance_snake, "balanceSnake is not equal");
            assert.strictEqual(user.pictureSnake, object.picture_snake, "pictureSnake is not equal");
            assert.strictEqual(user.ageSnake, object.age_snake, "ageSnake is not equal");
            assert.strictEqual(user.eyeColorSnake, object.eye_color_snake, "eyeColorSnake is not equal");
            assert.strictEqual(user.nameSnake, object.name_snake, "nameSnake is not equal");
            assert.strictEqual(user.companySnake, object.company_snake, "companySnake is not equal");
            assert.strictEqual(user.emailSnake, object.email_snake, "emailSnake is not equal");
            assert.strictEqual(user.phoneSnake, object.phone_snake, "phoneSnake is not equal");
            assert.strictEqual(user.addressSnake, object.address_snake, "addressSnake is not equal");
            assert.strictEqual(user.aboutSnake, object.about_snake, "aboutSnake is not equal");
            assert.strictEqual(user.latitudeSnake, object.latitude_snake, "latitudeSnake is not equal");
            assert.strictEqual(user.longitudeSnake, object.longitude_snake, "longitudeSnake is not equal");
            assert.deepEqual(user.tagsSnake, object.tags_snake, "tagsSnake is not equal");
            assert.strictEqual(user.greetingSnake, object.greeting_snake, "greetingSnake is not equal");
            assert.strictEqual(user.favoriteFruitSnake, object.favorite_fruit_snake, "favoriteFruitSnake is not equal");

            user.friendsSnake.forEach((friend: FriendSnake, index: number) => {
                assert.strictEqual(friend.idSnake, object.friends_snake[index].id_snake, `friend ${index} idSnake is not equal`);
                assert.strictEqual(friend.nameSnake, object.friends_snake[index].name_snake, `friend ${index} nameSnake is not equal`);
            });
        });

        it("serializer must support snack case naming by jsonObject decorator", async () => {
            const {UserSnakeObject} = await import("./models/UserSnake");
            const json = await import("./jsons/json-generator-snake.json", {assert: {type: "json"}});
            const [object] = Reflect.get(json, "default") as typeof json;

            const user = new UserSnakeObject().fromJSON(object);
            const serialized = JSON.parse(JSON.stringify(user)) as Record<string, unknown>;

            assert.strictEqual(serialized.id_snake, object.id_snake, "id_snake is not equal");
            assert.strictEqual(serialized.index_snake, object.index_snake, "index_snake is not equal");
            assert.strictEqual(serialized.guid_snake, object.guid_snake, "guid_snake is not equal");
            assert.strictEqual(serialized.is_active_snake, object.is_active_snake, "is_active_snake is not equal");
            assert.strictEqual(serialized.balance_snake, object.balance_snake, "balance_snake is not equal");
            assert.strictEqual(serialized.picture_snake, object.picture_snake, "picture_snake is not equal");
            assert.strictEqual(serialized.age_snake, object.age_snake, "age_snake is not equal");
            assert.strictEqual(serialized.eye_color_snake, object.eye_color_snake, "eye_color_snake is not equal");
            assert.strictEqual(serialized.name_snake, object.name_snake, "name_snake is not equal");
            assert.strictEqual(serialized.company_snake, object.company_snake, "company_snake is not equal");
            assert.strictEqual(serialized.email_snake, object.email_snake, "email_snake is not equal");
            assert.strictEqual(serialized.phone_snake, object.phone_snake, "phone_snake is not equal");
            assert.strictEqual(serialized.address_snake, object.address_snake, "address_snake is not equal");
            assert.strictEqual(serialized.about_snake, object.about_snake, "about_snake is not equal");
            assert.strictEqual(serialized.latitude_snake, object.latitude_snake, "latitude_snake is not equal");
            assert.strictEqual(serialized.longitude_snake, object.longitude_snake, "longitude_snake is not equal");
            assert.deepEqual(serialized.tags_snake, object.tags_snake, "tags_snake is not equal");
            assert.strictEqual(serialized.greeting_snake, object.greeting_snake, "greeting_snake is not equal");
            assert.strictEqual(serialized.favorite_fruit_snake, object.favorite_fruit_snake, "favorite_fruit_snake is not equal");

            (serialized.friends_snake as []).forEach((friend: Record<string, unknown>, index: number) => {
                assert.strictEqual(friend.id_snake, object.friends_snake[index].id_snake, `friend ${index} id_snake is not equal`);
                assert.strictEqual(friend.name_snake, object.friends_snake[index].name_snake, `friend ${index} name_snake is not equal`);
            });
        });

        it("method fromJSON must support snack case naming by jsonName decorator", async () => {
            const {UserNaming} = await import("./models/UserName");
            const json = await import("./jsons/user-naming.json", {assert: {type: "json"}});
            const pjson = Reflect.get(json, "default") as typeof json;

            const user = new UserNaming().fromJSON(pjson);

            assert.isTrue(user instanceof UserNaming);
            assert.strictEqual(user.id, pjson["user::profile::id"], "id is not equal");
            assert.strictEqual(user.firstName, pjson["user::profile::first:name"], "firstName is not equal");
            assert.strictEqual(user.lastName, pjson["user::profile::last:name"], "lastName is not equal");
        });

        it("serializable must support deep copy with naming strategy", async () => {
            const {UserSnakeObject} = await import("./models/UserSnake");
            const json = await import("./jsons/json-generator-snake.json", {assert: {type: "json"}});
            const [object] = Reflect.get(json, "default") as typeof json;

            const user1 = new UserSnakeObject().fromJSON(object);
            const user2 = new UserSnakeObject().fromJSON(user1);

            assert.deepEqual(user1, user2);
        });
    });
});
