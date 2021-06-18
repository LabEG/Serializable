/* eslint-disable camelcase */
import("reflect-metadata"); // Polyfill
import {assert} from "chai";
import {Serializable, SnakeCaseNamingStrategy, jsonObject, jsonProperty, jsonName} from "../src";

describe("Serializable", () => {
    describe("readme samples", () => {
        it("naming strategies sample", () => {
            const json = {
                first_name: "Jack",
                last_name: "Sparrow",
                date_of_birth: "1690-05-05T21:29:43.000Z",
                "very::strange::json:name": "I love jewelry"
            };

            @jsonObject({namingStrategy: new SnakeCaseNamingStrategy()})
            class User extends Serializable {

                @jsonProperty(String, null)
                public firstName: string | null = null;

                @jsonProperty(String, null)
                public lastName: string | null = null;

                @jsonProperty(Date, null)
                public dateOfBirth: Date | null = null;

                @jsonName("very::strange::json:name")
                @jsonProperty(String, null)
                public veryStrangePropertyName: string | null = null;

            }

            const user = new User().fromJSON(json);

            assert.strictEqual(user.firstName, json.first_name); // True
            assert.strictEqual(user.lastName, json.last_name); // True
            assert.strictEqual(user.dateOfBirth?.toISOString(), json.date_of_birth); // True
            assert.strictEqual(user.veryStrangePropertyName, json["very::strange::json:name"]); // True
        });
    });
});
