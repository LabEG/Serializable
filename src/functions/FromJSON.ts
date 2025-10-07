

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import {Serializable} from "../classes/Serializable.js";
import {AcceptedTypes} from "../models/AcceptedType.js";
import {SerializationSettings} from "../models/SerializationSettings.js";
import {deserializeProperty} from "./DeserializeProperty.js";
import {getPropertyName} from "./GetPropertyName.js";
import {onWrongType} from "./OnWrongType.js";

/**
 * Deserializes JSON data into an existing object instance, populating its properties.
 * This function reads metadata from @JsonProperty decorators to determine property types
 * and performs appropriate type conversions. It supports both Serializable and plain object instances.
 *
 * @template T - The type of object being deserialized (extends Serializable or plain object)
 * @param {T} obj - The target object instance to populate with deserialized data
 * @param {object} json - The JSON object containing source data for deserialization
 * @param {Partial<SerializationSettings>} [settings] - Optional settings to customize deserialization behavior
 * @returns {T} The same object instance with properties populated from JSON
 *
 * @remarks
 * The function performs the following steps:
 * 1. Validates that json is an object (not null, array, or primitive)
 * 2. Iterates through all properties of the target object
 * 3. Resolves JSON property names using @JsonName decorators and naming strategies
 * 4. Falls back to original property names for deep copy operations
 * 5. Deserializes each property value according to its type metadata
 * 6. Calls error handlers for invalid or missing data
 *
 * Property name resolution priority:
 * - @JsonName decorator value
 * - Naming strategy transformation (snake_case, camelCase, etc.)
 * - Original property name (fallback for deep copy)
 *
 * @example
 * ```typescript
 * class User extends Serializable {
 *   @JsonProperty(String)
 *   name: string;
 *
 *   @JsonProperty(Number)
 *   age: number;
 * }
 *
 * const user = new User();
 * fromJSON(user, { name: "John", age: 30 });
 * console.log(user.name); // "John"
 * console.log(user.age);  // 30
 * ```
 *
 * @example
 * ```typescript
 * // Using with plain objects (non-Serializable)
 * class Product {
 *   @JsonProperty(String)
 *   title: string;
 * }
 *
 * const product = new Product();
 * fromJSON(product, { title: "Laptop" });
 * ```
 */
// eslint-disable-next-line max-statements
export const fromJSON = <T extends (Serializable | object)>(obj: T, json: object, settings?: Partial<SerializationSettings>): T => {
    const unknownJson: unknown = json;

    if (
        unknownJson === null ||
        Array.isArray(unknownJson) ||
        typeof unknownJson !== "object"
    ) {
        if (obj instanceof Serializable) {
            obj.onWrongType(String(unknownJson), "is not an object", unknownJson);
        } else {
            onWrongType(obj, String(unknownJson), "is not an object", unknownJson);
        }
        return obj;
    }

    // eslint-disable-next-line guard-for-in
    for (const thisProp in obj) {
        // Naming strategy and jsonName decorator
        let jsonProp: string = obj instanceof Serializable ?
            obj.getJsonPropertyName(thisProp, settings) :
            getPropertyName(obj, thisProp, settings);

        // For deep copy
        if (!unknownJson?.hasOwnProperty(jsonProp) && unknownJson?.hasOwnProperty(thisProp)) {
            jsonProp = thisProp;
        }

        if (
            unknownJson?.hasOwnProperty(jsonProp) &&
            obj.hasOwnProperty(thisProp) &&
            Reflect.hasMetadata("ts-serializable:jsonTypes", obj.constructor.prototype, thisProp)
        ) {
            const acceptedTypes: AcceptedTypes[] = Reflect.getMetadata(
                "ts-serializable:jsonTypes",
                obj.constructor.prototype,
                thisProp
            ) as [];
            const jsonValue: unknown = Reflect.get(unknownJson, jsonProp) as unknown;

            const extractedValue = obj instanceof Serializable ?
                obj.deserializeProperty(thisProp, acceptedTypes, jsonValue, settings) :
                deserializeProperty(obj, thisProp, acceptedTypes, jsonValue, settings);

            Reflect.set(obj, thisProp, extractedValue);
        }
    }

    return obj;
};

