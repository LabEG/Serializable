/* eslint-disable @typescript-eslint/no-unsafe-call, no-prototype-builtins */
import { SerializationSettings } from "../models/SerializationSettings";
/**
 * Class how help you deserialize object to classes.
 *
 * @export
 * @class Serializable
 */
export class Serializable {
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
    static fromJSON(json, settings) {
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
    fromJSON(json, settings) {
        const unknownJson = json;
        if (unknownJson === null ||
            Array.isArray(unknownJson) ||
            typeof unknownJson !== "object") {
            this.onWrongType(String(unknownJson), "is not object", unknownJson);
            return this;
        }
        // eslint-disable-next-line guard-for-in
        for (const thisProp in this) {
            // naming strategy and jsonName decorator
            let jsonProp = this.getJsonPropertyName(thisProp, settings);
            // for deep copy
            if (!(unknownJson === null || unknownJson === void 0 ? void 0 : unknownJson.hasOwnProperty(jsonProp)) && (unknownJson === null || unknownJson === void 0 ? void 0 : unknownJson.hasOwnProperty(thisProp))) {
                jsonProp = thisProp;
            }
            if ((unknownJson === null || unknownJson === void 0 ? void 0 : unknownJson.hasOwnProperty(jsonProp)) &&
                this.hasOwnProperty(thisProp) &&
                Reflect.hasMetadata("ts-serializable:jsonTypes", this.constructor.prototype, thisProp)) {
                const acceptedTypes = Reflect.getMetadata("ts-serializable:jsonTypes", this.constructor.prototype, thisProp);
                const jsonValue = Reflect.get(unknownJson, jsonProp);
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
    toJSON() {
        const fromJson = Object.assign({}, this);
        const toJson = {};
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
    onWrongType(prop, message, jsonValue) {
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
    deserializeProperty(prop, acceptedTypes, jsonValue, settings) {
        for (const acceptedType of acceptedTypes) { // type Symbol is not a property
            if ( // null
            acceptedType === null &&
                jsonValue === null) {
                return null;
            }
            else if ( // void, for deep copy classes only, json don't have void type
            acceptedType === void 0 &&
                jsonValue === void 0) {
                return void 0;
            }
            else if ( // boolean, Boolean
            acceptedType === Boolean &&
                (typeof jsonValue === "boolean" || jsonValue instanceof Boolean)) {
                return Boolean(jsonValue);
            }
            else if ( // number, Number
            acceptedType === Number &&
                (typeof jsonValue === "number" || jsonValue instanceof Number)) {
                return Number(jsonValue);
            }
            else if ( // string, String
            acceptedType === String &&
                (typeof jsonValue === "string" || jsonValue instanceof String)) {
                return String(jsonValue);
            }
            else if ( // object, Object
            acceptedType === Object &&
                (typeof jsonValue === "object")) {
                return Object(jsonValue);
            }
            else if ( // Date
            acceptedType === Date &&
                (typeof jsonValue === "string" || jsonValue instanceof String || jsonValue instanceof Date)) {
                // 0 year, 0 month, 0 days, 0 hours, 0 minutes, 0 seconds
                let unicodeTime = new Date("0000-01-01T00:00:00.000").getTime();
                // tslint:disable-next-line:strict-type-predicates
                if (typeof jsonValue === "string") {
                    unicodeTime = Date.parse(jsonValue);
                }
                else if (jsonValue instanceof String) {
                    unicodeTime = Date.parse(String(jsonValue));
                }
                else if (jsonValue instanceof Date) {
                    unicodeTime = jsonValue.getTime();
                }
                if (isNaN(unicodeTime)) { // preserve invalid time
                    this.onWrongType(prop, "is invalid date", jsonValue);
                }
                return new Date(unicodeTime);
            }
            else if ( // Array
            Array.isArray(acceptedType) &&
                Array.isArray(jsonValue)) {
                if (acceptedType[0] === void 0) {
                    this.onWrongType(prop, "invalid type", jsonValue);
                }
                return jsonValue.map((arrayValue) => this.deserializeProperty(prop, acceptedType, arrayValue, settings));
            }
            else if ( // Serializable
            acceptedType !== null &&
                acceptedType !== void 0 &&
                !Array.isArray(acceptedType) &&
                (acceptedType.prototype instanceof Serializable ||
                    Reflect.getMetadata("ts-serializable:jsonObjectExtended", acceptedType)) &&
                jsonValue !== null &&
                jsonValue !== void 0 &&
                typeof jsonValue === "object" && !Array.isArray(jsonValue)) {
                const TypeConstructor = acceptedType;
                return new TypeConstructor().fromJSON(jsonValue, settings);
            }
            else if ( // instance any other class, not Serializable, for parse from other classes instance
            acceptedType instanceof Function &&
                jsonValue instanceof acceptedType) {
                return jsonValue;
            }
        }
        // process wrong type and return default value
        this.onWrongType(prop, "is invalid", jsonValue);
        return Reflect.get(this, prop);
    }
    getJsonPropertyName(thisProperty, settings) {
        var _a, _b, _c;
        if (Reflect.hasMetadata("ts-serializable:jsonName", this.constructor.prototype, thisProperty)) {
            return Reflect.getMetadata("ts-serializable:jsonName", this.constructor.prototype, thisProperty);
        }
        if (settings === null || settings === void 0 ? void 0 : settings.namingStrategy) {
            return settings.namingStrategy.toJsonName(thisProperty);
        }
        if (Reflect.hasMetadata("ts-serializable:jsonObject", this.constructor)) {
            const objectSettings = Reflect.getMetadata("ts-serializable:jsonObject", this.constructor);
            return (_b = (_a = objectSettings.namingStrategy) === null || _a === void 0 ? void 0 : _a.toJsonName(thisProperty)) !== null && _b !== void 0 ? _b : thisProperty;
        }
        if (Serializable.defaultSettings.namingStrategy) {
            const { namingStrategy } = Serializable.defaultSettings;
            return (_c = namingStrategy === null || namingStrategy === void 0 ? void 0 : namingStrategy.toJsonName(thisProperty)) !== null && _c !== void 0 ? _c : thisProperty;
        }
        return thisProperty;
    }
}
/**
 * Global setting for serialization and deserialization
 *
 * @static
 * @type {SerializationSettings}
 * @memberof Serializable
 */
Serializable.defaultSettings = new SerializationSettings();
