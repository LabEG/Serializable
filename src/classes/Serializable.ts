
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import {deserializeProperty} from "../functions/DeserializeProperty.js";
import type {AcceptedTypes} from "../models/AcceptedType.js";
import {SerializationSettings} from "../models/SerializationSettings.js";
import {classToFormData} from "../functions/ClassToFormData.js";
import {getPropertyName} from "../functions/GetPropertyName.js";
import {fromJSON} from "../functions/FromJSON.js";
import {toJSON} from "../functions/ToJSON.js";

/**
 * Base class that provides serialization and deserialization functionality for converting
 * objects to and from JSON format. This class uses decorators to define how properties
 * should be serialized and deserialized.
 *
 * @export
 * @class Serializable
 * @example
 * ```typescript
 * class User extends Serializable {
 *   @JsonProperty()
 *   name: string;
 *
 *   @JsonProperty()
 *   age: number;
 * }
 *
 * const user = User.fromJSON({ name: "John", age: 30 });
 * const json = user.toJSON();
 * ```
 */
export class Serializable {

    /**
     * Global default settings for all serialization and deserialization operations.
     * These settings can be overridden per operation by passing custom settings.
     *
     * @static
     * @type {SerializationSettings}
     * @memberof Serializable
     */
    public static defaultSettings: SerializationSettings = new SerializationSettings();

    /**
     * Creates a new instance of the class and deserializes JSON data into it.
     * This is a convenient static method that combines instantiation and deserialization.
     *
     * @static
     * @template T - The type of the Serializable class
     * @param {object} json - The JSON object to deserialize
     * @param {Partial<SerializationSettings>} [settings] - Optional settings to override default serialization behavior
     * @returns {T} A new instance of the class with properties populated from the JSON
     * @memberof Serializable
     * @example
     * ```typescript
     * const user = User.fromJSON({ name: "John", age: 30 });
     * ```
     */
    public static fromJSON<T extends Serializable>(
        this: new () => T,
        json: object,
        settings?: Partial<SerializationSettings>
    ): T {
        return new this().fromJSON(json, settings);
    }

    /**
     * Creates a new instance of the class and deserializes JSON string data into it.
     * Automatically parses the JSON string before deserialization.
     *
     * @static
     * @template T - The type of the Serializable class
     * @param {string} str - The JSON string to parse and deserialize
     * @param {Partial<SerializationSettings>} [settings] - Optional settings to override default serialization behavior
     * @returns {T} A new instance of the class with properties populated from the parsed JSON
     * @memberof Serializable
     * @throws {SyntaxError} If the string is not valid JSON
     * @example
     * ```typescript
     * const user = User.fromString('{"name":"John","age":30}');
     * ```
     */
    public static fromString<T extends Serializable>(
        this: new () => T,
        str: string,
        settings?: Partial<SerializationSettings>
    ): T {
        return new this().fromJSON(JSON.parse(str), settings);
    }

    /**
     * Populates the current instance's properties with data from a JSON object.
     * Uses metadata from decorators to determine how to deserialize each property.
     *
     * @param {object} json - The JSON object containing data to populate the instance
     * @param {Partial<SerializationSettings>} [settings] - Optional settings to override default serialization behavior
     * @returns {this} The current instance for method chaining
     * @memberof Serializable
     * @example
     * ```typescript
     * const user = new User();
     * user.fromJSON({ name: "John", age: 30 });
     * ```
     */
    public fromJSON (json: object, settings?: Partial<SerializationSettings>): this {
        return fromJSON<this>(this, json, settings);
    }

    /**
     * Populates the current instance's properties with data from a JSON string.
     * Automatically parses the JSON string before populating properties.
     *
     * @param {string} str - The JSON string to parse and use for populating the instance
     * @param {Partial<SerializationSettings>} [settings] - Optional settings to override default serialization behavior
     * @returns {this} The current instance for method chaining
     * @memberof Serializable
     * @throws {SyntaxError} If the string is not valid JSON
     * @example
     * ```typescript
     * const user = new User();
     * user.fromString('{"name":"John","age":30}');
     * ```
     */
    public fromString (str: string, settings?: Partial<SerializationSettings>): this {
        return this.fromJSON(JSON.parse(str), settings);
    }

    /**
     * Serializes the current instance to a plain JavaScript object.
     * Respects @JsonIgnore decorators to exclude specific properties from serialization.
     * Applies naming strategies and @JsonName decorators for property name transformation.
     *
     * @returns {Record<string, unknown>} A plain object representation of the instance
     * @memberof Serializable
     * @example
     * ```typescript
     * const user = new User();
     * user.name = "John";
     * user.age = 30;
     * const json = user.toJSON(); // { name: "John", age: 30 }
     * ```
     */
    public toJSON (): Record<string, unknown> {
        return toJSON(this);
    }

    /**
     * Serializes the current instance to FormData format, suitable for multipart/form-data requests.
     * This is particularly useful for AJAX form submissions that include file uploads.
     * Unlike JSON serialization with base64-encoded files, FormData provides better performance
     * and avoids UI freezing when handling large files.
     *
     * @param {string} [formPrefix] - Optional prefix to prepend to all form field names
     * @param {FormData} [formData] - Optional existing FormData instance to append to
     * @returns {FormData} A FormData instance containing the serialized data
     * @memberof Serializable
     * @example
     * ```typescript
     * const user = new User();
     * user.name = "John";
     * user.avatar = fileInput.files[0];
     * const formData = user.toFormData();
     * // Use with fetch: fetch('/api/users', { method: 'POST', body: formData });
     * ```
     */
    public toFormData (formPrefix?: string, formData?: FormData): FormData {
        return classToFormData(this, formPrefix, formData);
    }

    /**
     * Serializes the current instance to a JSON string.
     * This is a convenience method that combines toJSON() with JSON.stringify().
     *
     * @returns {string} A JSON string representation of the instance
     * @memberof Serializable
     * @example
     * ```typescript
     * const user = new User();
     * user.name = "John";
     * user.age = 30;
     * const jsonString = user.toString(); // '{"name":"John","age":30}'
     * ```
     */
    public toString (): string {
        return JSON.stringify(this.toJSON());
    }

    /**
     * Handles type mismatch errors during deserialization.
     * By default, logs an error to the console. Can be overridden in subclasses to implement
     * custom error handling such as throwing exceptions, logging to external services, or
     * collecting validation errors.
     *
     * @public
     * @param {string} prop - The name of the property that has a type mismatch
     * @param {string} message - A description of the type error
     * @param {unknown} jsonValue - The actual value that caused the type mismatch
     * @memberof Serializable
     * @example
     * ```typescript
     * class User extends Serializable {
     *   onWrongType(prop: string, message: string, jsonValue: unknown): void {
     *     throw new Error(`Invalid ${prop}: ${message}`);
     *   }
     * }
     * ```
     */
    public onWrongType (prop: string, message: string, jsonValue: unknown): void {
        // eslint-disable-next-line no-console
        console.error(`${this.constructor.name}.fromJSON: json.${prop} ${message}:`, jsonValue);
    }

    /**
     * Deserializes a single property value based on its accepted types.
     * This method is used internally during deserialization to convert JSON values
     * to the appropriate TypeScript types defined by decorators.
     *
     * @public
     * @param {string} prop - The name of the property being deserialized
     * @param {AcceptedTypes[]} acceptedTypes - Array of allowed types for this property
     * @param {unknown} jsonValue - The JSON value to deserialize
     * @param {Partial<SerializationSettings>} [settings] - Optional settings to override default behavior
     * @returns {unknown} The deserialized value matching one of the accepted types
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
     * Determines the JSON property name for a given class property.
     * Takes into account @JsonName decorators and naming strategies (camelCase, snake_case, etc.)
     * defined in the serialization settings.
     *
     * @public
     * @param {string} property - The source property name as defined in the class
     * @param {Partial<SerializationSettings>} [settings] - Optional settings to override default naming behavior
     * @returns {string} The transformed property name to use in JSON
     * @memberof Serializable
     * @example
     * ```typescript
     * // With @JsonName decorator
     * class User extends Serializable {
     *   @JsonName("user_name")
     *   userName: string;
     * }
     * // user.getJsonPropertyName("userName") returns "user_name"
     * ```
     */
    public getJsonPropertyName (property: string, settings?: Partial<SerializationSettings>): string {
        return getPropertyName(this, property, settings);
    }

}
