/* eslint-disable @typescript-eslint/no-unsafe-call, no-prototype-builtins */

import { AcceptedTypes } from "../models/AcceptedType";
import { SerializationSettings } from "../models/SerializationSettings";

/**
 * Class how help you deserialize object to classes.
 *
 * @export
 * @class Serializable
 */
export class Serializable {

    /**
     * Global setting for serialization and deserialization
     *
     * @static
     * @type {SerializationSettings}
     * @memberof Serializable
     */
    public static defaultSettings: SerializationSettings = new SerializationSettings();

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
    public static fromJSON<T extends Serializable>(
        this: new () => T,
        json: object,
        settings?: Partial<SerializationSettings>
    ): T {
        // tslint:disable-next-line:static-this
        return new this().fromJSON(json, settings);
    }

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
    public fromJSON(json: object, settings?: Partial<SerializationSettings>): this {
        const unknownJson: unknown = json;

        if (
            unknownJson === null ||
            Array.isArray(unknownJson) ||
            typeof unknownJson !== "object"
        ) {
            this.onWrongType(String(unknownJson), "is not object", unknownJson);
            return this;
        }

        // eslint-disable-next-line guard-for-in
        for (const thisProp in this) {
            // naming strategy and jsonName decorator
            let jsonProp: string = this.getJsonPropertyName(thisProp, settings);

            // for deep copy
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
                const jsonValue: unknown = Reflect.get(unknownJson, jsonProp);
                const extractedValue = this.deserializeProperty(thisProp, acceptedTypes, jsonValue, settings);
                Reflect.set(this, thisProp, extractedValue);
            }
        }

        return this;
    }

    /**
     * Process serialization for @jsonIgnore decorator
     *
     * @returns {object}
     * @memberof Serializable
     */
    public toJSON(): object {
        const fromJson: object = { ...this };
        const toJson: object = {};

        for (const prop in fromJson) {
            // json.hasOwnProperty(prop) - preserve for deserialization for other classes with methods
            if (fromJson.hasOwnProperty(prop) && this.hasOwnProperty(prop)) {
                if (Reflect.getMetadata("ts-serializable:jsonIgnore", this.constructor.prototype, prop) || false) {
                    // eslint-disable-next-line no-continue
                    continue;
                }

                const toProp = this.getJsonPropertyName(prop);

                Reflect.set(toJson, toProp, Reflect.get(fromJson, prop));
            }
        }

        return toJson;
    }

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
    protected onWrongType(prop: string, message: string, jsonValue: unknown): void {
        // eslint-disable-next-line no-console
        console.error(`${this.constructor.name}.fromJSON: json.${prop} ${message}:`, jsonValue);
    }

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
    // eslint-disable-next-line complexity
    protected deserializeProperty(
        prop: string,
        acceptedTypes: AcceptedTypes[],
        jsonValue: unknown,
        settings?: Partial<SerializationSettings>
    ): Object | null | void {
        for (const acceptedType of acceptedTypes) { // type Symbol is not a property
            if (// null
                acceptedType === null &&
                jsonValue === null
            ) {
                return null;
            } else if (// void, for classes deep copy only, json don't have void type
                acceptedType === void 0 &&
                jsonValue === void 0
            ) {
                return void 0;
            } else if (// boolean, Boolean
                acceptedType === Boolean &&
                (typeof jsonValue === "boolean" || jsonValue instanceof Boolean)
            ) {
                return Boolean(jsonValue);
            } else if (// number, Number
                acceptedType === Number &&
                (typeof jsonValue === "number" || jsonValue instanceof Number)
            ) {
                return Number(jsonValue);
            } else if (// string, String
                acceptedType === String &&
                (typeof jsonValue === "string" || jsonValue instanceof String)
            ) {
                return String(jsonValue);
            } else if (// object, Object
                acceptedType === Object &&
                (typeof jsonValue === "object")
            ) {
                return Object(jsonValue) as Object;
            } else if (// Date
                acceptedType === Date &&
                (typeof jsonValue === "string" || jsonValue instanceof String || jsonValue instanceof Date)
            ) {
                // 0 year, 0 month, 0 days, 0 hours, 0 minutes, 0 seconds
                let unicodeTime: number = new Date("0000-01-01T00:00:00.000").getTime();
                // tslint:disable-next-line:strict-type-predicates
                if (typeof jsonValue === "string") {
                    unicodeTime = Date.parse(jsonValue);
                } else if (jsonValue instanceof String) {
                    unicodeTime = Date.parse(String(jsonValue));
                } else if (jsonValue instanceof Date) {
                    unicodeTime = jsonValue.getTime();
                }
                if (isNaN(unicodeTime)) { // preserve invalid time
                    this.onWrongType(prop, "is invalid date", jsonValue);
                }

                return new Date(unicodeTime);
            } else if (// Array
                Array.isArray(acceptedType) &&
                Array.isArray(jsonValue)
            ) {
                if (acceptedType[0] === void 0) {
                    this.onWrongType(prop, "invalid type", jsonValue);
                }

                return jsonValue.map((arrayValue: Object | void | null) => this.deserializeProperty(
                    prop,
                    acceptedType,
                    arrayValue,
                    settings
                ));
            } else if (// Serializable
                acceptedType !== null &&
                acceptedType !== void 0 &&
                !Array.isArray(acceptedType) &&
                acceptedType.prototype instanceof Serializable &&
                jsonValue !== null &&
                jsonValue !== void 0 &&
                typeof jsonValue === "object" && !Array.isArray(jsonValue)
            ) {
                const TypeConstructor: new () => Serializable = acceptedType as new () => Serializable;

                return new TypeConstructor().fromJSON(jsonValue as object, settings);
            } else if (// instance any other class, not Serializable, for parse from other classes instance
                acceptedType instanceof Function &&
                jsonValue instanceof acceptedType
            ) {
                return jsonValue;
            }
        }

        // process wrong type and return default value
        this.onWrongType(prop, "is invalid", jsonValue);

        return Reflect.get(this, prop) as Object | null | void;
    }

    protected getJsonPropertyName(thisProperty: string, settings?: Partial<SerializationSettings>): string {
        if (Reflect.hasMetadata("ts-serializable:jsonName", this.constructor.prototype, thisProperty)) {
            return Reflect.getMetadata("ts-serializable:jsonName", this.constructor.prototype, thisProperty) as string;
        }

        if (settings?.namingStrategy) {
            return settings.namingStrategy.toJsonName(thisProperty);
        }

        if (Reflect.hasMetadata("ts-serializable:jsonObject", this.constructor)) {
            const objectSettings: Partial<SerializationSettings> = Reflect.getMetadata(
                "ts-serializable:jsonObject",
                this.constructor
            );
            return objectSettings.namingStrategy?.toJsonName(thisProperty) ?? thisProperty;
        }

        if (Serializable.defaultSettings.namingStrategy) {
            const { namingStrategy } = Serializable.defaultSettings;
            return namingStrategy?.toJsonName(thisProperty) ?? thisProperty;
        }

        return thisProperty;
    }

}
