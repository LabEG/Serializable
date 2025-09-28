/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import {deserializeProperty} from "../functions/DeserializeProperty.js";
import type {AcceptedTypes} from "../models/AcceptedType.js";
import {SerializationSettings} from "../models/SerializationSettings.js";
import {classToFormData} from "../functions/ClassToFormData.js";
import {getPropertyName} from "../functions/GetPropertyName.js";
import {fromJSON} from "../functions/FromJSON.js";

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
        return fromJSON<this>(this, json, settings);
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
    public onWrongType (prop: string, message: string, jsonValue: unknown): void {
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
    public deserializeProperty (
        prop: string,
        acceptedTypes: AcceptedTypes[],
        jsonValue: unknown,
        settings?: Partial<SerializationSettings>
    ): unknown {
        return deserializeProperty(this, prop, acceptedTypes, jsonValue, settings);
    }

    /**
     * Extract the correct name for a property.
     * Considers decorators for transforming the property name.
     *
     * @param {string} property Source name of the property
     * @param {Partial<SerializationSettings>} settings Serialization settings
     * @returns
     */
    public getJsonPropertyName (property: string, settings?: Partial<SerializationSettings>): string {
        return getPropertyName(this, property, settings);
    }

}
