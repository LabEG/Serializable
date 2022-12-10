import type { AcceptedTypes } from "../models/AcceptedType.js";
import { SerializationSettings } from "../models/SerializationSettings.js";
/**
 * Class how help you deserialize object to classes.
 *
 * @export
 * @class Serializable
 */
export declare class Serializable {
    /**
     * Global setting for serialization and deserialization
     *
     * @static
     * @type {SerializationSettings}
     * @memberof Serializable
     */
    static defaultSettings: SerializationSettings;
    /**
     * Deserialize object from static method.
     *
     * Example:
     * const obj: MyObject = MyObject.fromJSON({...data});
     *
     * @static
     * @param {object} json
     * @returns {object}
     * @memberof Serializable
     */
    static fromJSON<T extends Serializable>(this: new () => T, json: object, settings?: Partial<SerializationSettings>): T;
    /**
     * Deserialize object from static method.
     *
     * Example:
     * const obj: MyObject = MyObject.fromString({...data});
     *
     * @static
     * @param {object} json
     * @returns {object}
     * @memberof Serializable
     */
    static fromString<T extends Serializable>(this: new () => T, str: string, settings?: Partial<SerializationSettings>): T;
    /**
     * Fill property of current model by data from string.
     *
     * Example:
     * const obj: MyObject = new MyObject().fromString("{...data}"");
     *
     * @param {string} str
     * @returns {this}
     * @memberof Serializable
     */
    fromString(str: string, settings?: Partial<SerializationSettings>): this;
    /**
     * Fill property of current model by data from json.
     *
     * Example:
     * const obj: MyObject = new MyObject().fromJSON({...data});
     *
     * @param {object} json
     * @returns {this}
     * @memberof Serializable
     */
    fromJSON(json: object, settings?: Partial<SerializationSettings>): this;
    /**
     * Process serialization for @jsonIgnore decorator
     *
     * @returns {object}
     * @memberof Serializable
     */
    toJSON(): Record<string, unknown>;
    /**
     * Process serialization for @jsonIgnore decorator
     *
     * @returns {string}
     * @memberof Serializable
     */
    toString(): string;
    /**
     * Process exceptions from wrong types.
     * By default just print warning in console, but can by override for drop exception or logging to backend.
     *
     * @protected
     * @param {string} prop
     * @param {string} message
     * @param {(unknown)} jsonValue
     * @memberof Serializable
     */
    protected onWrongType(prop: string, message: string, jsonValue: unknown): void;
    /**
     * //todo: write jsdoc
     *
     * @private
     * @param {object} object
     * @param {string} prop
     * @param {AcceptedTypes[]} acceptedTypes
     * @param {(unknown)} jsonValue
     * @returns {(Object | null | void)}
     * @memberof Serializable
     */
    protected deserializeProperty(prop: string, acceptedTypes: AcceptedTypes[], jsonValue: unknown, settings?: Partial<SerializationSettings>): unknown;
    protected getJsonPropertyName(thisProperty: string, settings?: Partial<SerializationSettings>): string;
}
