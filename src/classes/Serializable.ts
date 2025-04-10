/* eslint-disable max-lines */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import type {AcceptedTypes} from "../models/AcceptedType.js";
import {SerializationSettings} from "../models/SerializationSettings.js";
import {classToFormData} from "../utils/ClassToFormData.js";
import {getPropertyName} from "../utils/GetProperyName.js";

/**
 * Class that helps you deserialize objects to classes.
 *
 * @export
 * @class Serializable
 */
export class Serializable {

    /**
     * Global settings for serialization and deserialization.
     *
     * @static
     * @type {SerializationSettings}
     * @memberof Serializable
     */
    public static defaultSettings: SerializationSettings = new SerializationSettings();

    /**
     * Deserialize an object using a static method.
     *
     * Example:
     * const obj: MyObject = MyObject.fromJSON({...data});
     *
     * @static
     * @param {object} json
     * @returns {object}
     * @memberof Serializable
     */
    public static fromJSON<T extends Serializable>(
        this: new () => T,
        json: object,
        settings?: Partial<SerializationSettings>
    ): T {
        return new this().fromJSON(json, settings);
    }

    /**
     * Deserialize an object from a string using a static method.
     *
     * Example:
     * const obj: MyObject = MyObject.fromString("{...data}");
     *
     * @static
     * @param {string} str
     * @returns {object}
     * @memberof Serializable
     */
    public static fromString<T extends Serializable>(
        this: new () => T,
        str: string,
        settings?: Partial<SerializationSettings>
    ): T {
        return new this().fromJSON(JSON.parse(str), settings);
    }

    /**
     * Fill properties of the current model with data from a string.
     *
     * Example:
     * const obj: MyObject = new MyObject().fromString("{...data}");
     *
     * @param {string} str
     * @returns {this}
     * @memberof Serializable
     */
    public fromString (str: string, settings?: Partial<SerializationSettings>): this {
        return this.fromJSON(JSON.parse(str), settings);
    }

    /**
     * Fill properties of the current model with data from JSON.
     *
     * Example:
     * const obj: MyObject = new MyObject().fromJSON({...data});
     *
     * @param {object} json
     * @returns {this}
     * @memberof Serializable
     */
    public fromJSON (json: object, settings?: Partial<SerializationSettings>): this {
        const unknownJson: unknown = json;

        if (
            unknownJson === null ||
            Array.isArray(unknownJson) ||
            typeof unknownJson !== "object"
        ) {
            this.onWrongType(String(unknownJson), "is not an object", unknownJson);
            return this;
        }

        // eslint-disable-next-line guard-for-in
        for (const thisProp in this) {
            // Naming strategy and jsonName decorator
            let jsonProp: string = this.getJsonPropertyName(thisProp, settings);

            // For deep copy
            if (!unknownJson?.hasOwnProperty(jsonProp) && unknownJson?.hasOwnProperty(thisProp)) {
                jsonProp = thisProp;
            }

            if (
                unknownJson?.hasOwnProperty(jsonProp) &&
                this.hasOwnProperty(thisProp) &&
                Reflect.hasMetadata("ts-serializable:jsonTypes", this.constructor.prototype, thisProp)
            ) {
                const acceptedTypes: AcceptedTypes[] = Reflect.getMetadata(
                    "ts-serializable:jsonTypes",
                    this.constructor.prototype,
                    thisProp
                ) as [];
                const jsonValue: unknown = Reflect.get(unknownJson, jsonProp) as unknown;
                const extractedValue = this.deserializeProperty(thisProp, acceptedTypes, jsonValue, settings);
                Reflect.set(this, thisProp, extractedValue);
            }
        }

        return this;
    }

    /**
     * Process serialization for the @jsonIgnore decorator.
     *
     * @returns {object}
     * @memberof Serializable
     */
    public toJSON (): Record<string, unknown> {
        const toJson: Record<string, unknown> = {};
        const keys = Reflect.ownKeys(this);

        for (const key of keys) {
            if (typeof key === "symbol") {
                // eslint-disable-next-line no-continue
                continue;
            }

            if (this.hasOwnProperty(key)) {
                if (Reflect.getMetadata("ts-serializable:jsonIgnore", this.constructor.prototype, key) !== true) {
                    const toProp = this.getJsonPropertyName(key);
                    Reflect.set(toJson, toProp, Reflect.get(this, key));
                }
            }
        }

        return toJson;
    }

    /**
     * Serialize the class to FormData.
     *
     * Can be used to prepare an AJAX form with files.
     * Sending files via AJAX JSON is a heavy task because it requires converting files to base64 format.
     * The user interface can freeze for several seconds during this operation if the file is too large.
     * AJAX forms are a lightweight alternative.
     *
     * @param {string} formPrefix Prefix for form property names
     * @param {FormData} formData Can update an existing FormData
     * @returns {FormData}
     * @memberof Serializable
     */
    public toFormData (formPrefix?: string, formData?: FormData): FormData {
        return classToFormData(this, formPrefix, formData);
    }

    /**
     * Process serialization for the @jsonIgnore decorator.
     *
     * @returns {string}
     * @memberof Serializable
     */
    public toString (): string {
        return JSON.stringify(this.toJSON());
    }

    /**
     * Process exceptions for incorrect types.
     * By default, it just prints a warning in the console, but it can be overridden to throw exceptions or log to the backend.
     *
     * @protected
     * @param {string} prop
     * @param {string} message
     * @param {(unknown)} jsonValue
     * @memberof Serializable
     */
    protected onWrongType (prop: string, message: string, jsonValue: unknown): void {
        // eslint-disable-next-line no-console
        console.error(`${this.constructor.name}.fromJSON: json.${prop} ${message}:`, jsonValue);
    }

    /**
     * Deserialize one property.
     *
     * @private
     * @param {object} object
     * @param {string} prop
     * @param {AcceptedTypes[]} acceptedTypes
     * @param {(unknown)} jsonValue
     * @returns {(Object | null | void)}
     * @memberof Serializable
     */
    // eslint-disable-next-line max-params
    protected deserializeProperty (
        prop: string,
        acceptedTypes: AcceptedTypes[],
        jsonValue: unknown,
        settings?: Partial<SerializationSettings>
    ): unknown {
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
                    this.onWrongType(prop, "is an invalid date", jsonValue);
                }

                return new Date(unicodeTime);
            } else if (// Array
                Array.isArray(acceptedType) &&
                Array.isArray(jsonValue)
            ) {
                if (acceptedType[0] === void 0) {
                    this.onWrongType(prop, "invalid type", jsonValue);
                }

                return jsonValue.map((arrayValue: unknown) => this.deserializeProperty(
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
                    Boolean(Reflect.getMetadata("ts-serializable:jsonObjectExtended", acceptedType))
                ) &&
                jsonValue !== null &&
                jsonValue !== void 0 &&
                typeof jsonValue === "object" && !Array.isArray(jsonValue)
            ) {
                const TypeConstructor: new () => Serializable = acceptedType as new () => Serializable;

                return new TypeConstructor().fromJSON(jsonValue, settings);
            } else if (// Instance any other class, not Serializable, for parsing from other class instances
                acceptedType instanceof Function &&
                jsonValue instanceof acceptedType
            ) {
                return jsonValue;
            }
        }

        // Process incorrect type and return default value
        this.onWrongType(prop, "is invalid", jsonValue);

        return Reflect.get(this, prop);
    }

    /**
     * Extract the correct name for a property.
     * Considers decorators for transforming the property name.
     *
     * @param {string} property Source name of the property
     * @param {Partial<SerializationSettings>} settings Serialization settings
     * @returns
     */
    protected getJsonPropertyName (property: string, settings?: Partial<SerializationSettings>): string {
        return getPropertyName(this, property, settings);
    }

}
