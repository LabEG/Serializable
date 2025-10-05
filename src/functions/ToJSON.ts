/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-prototype-builtins */

import {Serializable} from "../classes/Serializable";
import {getPropertyName} from "./GetPropertyName";

/**
 * Serializes an object or Serializable instance to a plain JavaScript object suitable for JSON conversion.
 * This function iterates through all own properties and creates a new object with transformed property names,
 * respecting @JsonIgnore decorators and naming strategies.
 *
 * @param {Serializable | object} obj - The object or Serializable instance to serialize
 * @returns {Record<string, unknown>} A plain object with all serializable properties
 *
 * @remarks
 * - Symbol properties are automatically skipped
 * - Properties marked with @JsonIgnore decorator are excluded
 * - Property names are transformed according to @JsonName decorators and naming strategies
 * - For Serializable instances, uses the instance's getJsonPropertyName method
 * - For plain objects, uses the standalone getPropertyName function
 *
 * @example
 * ```typescript
 * class User extends Serializable {
 *   @JsonProperty()
 *   firstName: string = "John";
 *
 *   @JsonProperty()
 *   lastName: string = "Doe";
 *
 *   @JsonIgnore()
 *   password: string = "secret";
 * }
 *
 * const user = new User();
 * const json = toJSON(user);
 * // Returns: { firstName: "John", lastName: "Doe" }
 * // Note: password is excluded due to @JsonIgnore
 * ```
 */
export const toJSON = (obj: Serializable | object): Record<string, unknown> => {
    const toJson: Record<string, unknown> = {};
    const keys = Reflect.ownKeys(obj);

    for (const key of keys) {
        if (typeof key === "symbol") {
            // eslint-disable-next-line no-continue
            continue;
        }

        if (obj.hasOwnProperty(key)) {
            if (Reflect.getMetadata("ts-serializable:jsonIgnore", obj.constructor.prototype, key) !== true) {
                const toProp = obj instanceof Serializable ?
                    obj.getJsonPropertyName(key) :
                    getPropertyName(obj, key);
                Reflect.set(toJson, toProp, Reflect.get(obj, key));
            }
        }
    }

    return toJson;
};
