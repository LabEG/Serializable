import {Serializable} from "../classes/Serializable";
import {AcceptedTypes} from "../models/AcceptedType";
import {SerializationSettings} from "../models/SerializationSettings";
import {fromJSON} from "./FromJSON";
import {onWrongType} from "./OnWrongType";

/**
 * Deserializes a single property value from JSON data based on accepted type definitions.
 * This function iterates through accepted types and attempts to match and convert the JSON value
 * to the appropriate TypeScript type. Supports primitives, arrays, dates, and complex object types.
 *
 * @param {object} obj - The object instance to which the property belongs
 * @param {string} prop - The name of the property being deserialized
 * @param {AcceptedTypes[]} acceptedTypes - Array of type constructors or type definitions that the property can accept
 * @param {unknown} jsonValue - The raw JSON value to deserialize and convert
 * @param {Partial<SerializationSettings>} [settings] - Optional settings to customize deserialization behavior
 * @returns {unknown} The deserialized and typed value, or the original property value if no type match is found
 *
 * @remarks
 * Supported type conversions:
 * - `null` - Preserves null values
 * - `undefined` (void 0) - For deep copy operations
 * - `Boolean` - Converts boolean values and Boolean objects
 * - `Number` - Converts numeric values and Number objects
 * - `String` - Converts string values and String objects
 * - `Object` - Converts plain objects
 * - `Date` - Parses ISO strings, Date objects, and validates date values
 * - `Array` - Recursively deserializes array elements
 * - `Serializable` subclasses - Creates instances and calls fromJSON
 * - Custom classes - Creates instances and applies fromJSON for non-Serializable classes
 * - Instance checks - Validates existing instances of specific classes
 *
 * If no type matches, calls `onWrongType` error handler and returns the original property value.
 *
 * @example
 * ```typescript
 * const acceptedTypes = [String, Number];
 * const result = deserializeProperty(obj, "age", acceptedTypes, "30");
 * // Returns the string "30" since String is checked first
 * ```
 */
// eslint-disable-next-line max-lines-per-function, max-statements, complexity
export const deserializeProperty = (
    obj: object,
    prop: string,
    acceptedTypes: AcceptedTypes[],
    jsonValue: unknown,
    settings?: Partial<SerializationSettings>
// eslint-disable-next-line max-params
): unknown => {
    for (const acceptedType of acceptedTypes) { // Type Symbol is not a property
        if (// Null
            acceptedType === null &&
            jsonValue === null
        ) {
            return null;
        } else if (// Void, for deep copy classes only, JSON doesn't have a void type
            acceptedType === void 0 &&
            jsonValue === void 0
        ) {
            return void 0;
        } else if (// Boolean, Boolean
            acceptedType === Boolean &&
            (typeof jsonValue === "boolean" || jsonValue instanceof Boolean)
        ) {
            return Boolean(jsonValue);
        } else if (// Number, Number
            acceptedType === Number &&
            (typeof jsonValue === "number" || jsonValue instanceof Number)
        ) {
            return Number(jsonValue);
        } else if (// String, String
            acceptedType === String &&
            (typeof jsonValue === "string" || jsonValue instanceof String)
        ) {
            return String(jsonValue);
        } else if (// Object, Object
            acceptedType === Object &&
            (typeof jsonValue === "object")
        ) {
            return Object(jsonValue);
        } else if (// Date
            acceptedType === Date &&
            (typeof jsonValue === "string" || jsonValue instanceof String || jsonValue instanceof Date)
        ) {
            // 0 year, 0 month, 0 days, 0 hours, 0 minutes, 0 seconds
            let unicodeTime: number = new Date("0000-01-01T00:00:00.000").getTime();

            if (typeof jsonValue === "string") {
                unicodeTime = Date.parse(jsonValue);
            } else if (jsonValue instanceof String) {
                unicodeTime = Date.parse(String(jsonValue));
            } else if (jsonValue instanceof Date) {
                unicodeTime = jsonValue.getTime();
            }
            if (isNaN(unicodeTime)) { // Preserve invalid time
                if (obj instanceof Serializable) {
                    obj.onWrongType(prop, "is an invalid date", jsonValue);
                } else {
                    onWrongType(obj, prop, "is an invalid date", jsonValue);
                }
            }

            return new Date(unicodeTime);
        } else if (// Array
            Array.isArray(acceptedType) &&
            Array.isArray(jsonValue)
        ) {
            if (acceptedType[0] === void 0) {
                if (obj instanceof Serializable) {
                    obj.onWrongType(prop, "invalid type", jsonValue);
                } else {
                    onWrongType(obj, prop, "invalid type", jsonValue);
                }
            }

            return jsonValue.map((arrayValue: unknown) => deserializeProperty(
                obj,
                prop,
                acceptedType,
                arrayValue,
                settings
            ));
        } else if (// Serializable
            acceptedType !== null &&
            acceptedType !== void 0 &&
            !Array.isArray(acceptedType) &&
            (
                acceptedType.prototype instanceof Serializable ||
                acceptedType instanceof Function
            ) &&
            jsonValue !== null &&
            jsonValue !== void 0 &&
            typeof jsonValue === "object" && !Array.isArray(jsonValue)
        ) {
            if (acceptedType.prototype instanceof Serializable) {
                const TypeConstructor = acceptedType as new () => Serializable;

                return new TypeConstructor().fromJSON(jsonValue, settings);
            }

            // Class without Serializable base class
            const TypeConstructor = acceptedType as new () => object;

            return fromJSON(new TypeConstructor(), jsonValue, settings);
        } else if (// Instance any other class, not Serializable, for parsing from other class instances
            acceptedType instanceof Function &&
            jsonValue instanceof acceptedType
        ) {
            return jsonValue;
        }
    }

    // Process incorrect type and return default value
    if (obj instanceof Serializable) {
        obj.onWrongType(prop, "is invalid", jsonValue);
    } else {
        onWrongType(obj, prop, "is invalid", jsonValue);
    }

    return Reflect.get(obj, prop);
};
