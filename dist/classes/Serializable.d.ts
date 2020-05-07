import { AcceptedTypes } from "../models/AcceptedType";
import { SerializationSettings } from "../models/SerializationSettings";
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
     * Fill property of current model by data from json.
     *
     * Example:
     * const obj: MyObject = new MyObject().fromJSON({...data});
     *
     * @param {object} ujson
     * @returns {this}
     * @memberof Serializable
     */
    fromJSON(json: object, settings?: Partial<SerializationSettings>): this;
    /**
     * Process serelization for @jsonIgnore decorator
     *
     * @returns {object}
     * @memberof Serializable
     */
    toJSON(): object;
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
    protected deserializeProperty(prop: string, acceptedTypes: AcceptedTypes[], jsonValue: unknown, settings?: Partial<SerializationSettings>): Object | null | void;
    protected getJsonPropertyName(thisProperty: string, settings?: Partial<SerializationSettings>): string;
}
