/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import("reflect-metadata"); // polyfill
import { assert } from "chai";
import { SnackCaseNamingStrategy } from "../src/naming-strategies/SnackCaseNamingStrategy";
import { FriendSnake } from "./models/UserSnake";

describe("Serializable", () => {
    describe("json-generator", () => {
        it.only("method fromJSON must support snack case naming", async() => {
            const { UserSnake } = await import("./models/UserSnake");
            const json = await import("./jsons/json-generator-snake.json");
            const [object] = json;

            const user = new UserSnake().fromJSON(
                object,
                { namingStrategy: new SnackCaseNamingStrategy() }
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
    });
});
