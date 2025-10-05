import {Serializable} from "../classes/Serializable";
import {AcceptedTypes} from "../models/AcceptedType";
import {SerializationSettings} from "../models/SerializationSettings";
import {fromJSON} from "./FromJSON";
import {onWrongType} from "./OnWrongType";

/**
 * Deserializes a property value from JSON based on the accepted types.
 * This function attempts to convert the provided JSON value into one of the specified accepted types,
 * handling primitives, arrays, dates, and serializable objects.
 *
 * @param obj - The object instance to which the property belongs.
 * @param prop - The name of the property being deserialized.
 * @param acceptedTypes - An array of accepted types for the property.
 * @param jsonValue - The JSON value to deserialize.
 * @param settings - Optional serialization settings to customize the deserialization process.
 * @returns The deserialized value matching one of the accepted types, or the original property value if deserialization fails.
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
