"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class how help you deserialize object to classes.
 *
 * @export
 * @class Serializable
 */
var Serializable = /** @class */ (function () {
    function Serializable() {
    }
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
    Serializable.fromJSON = function (json) {
        return new this().fromJSON(json);
    };
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
    Serializable.prototype.fromJSON = function (json) {
        var ujson = json;
        if (ujson === null ||
            Array.isArray(ujson) ||
            typeof ujson !== "object") {
            this.onWrongType("", "is not object", ujson);
            return this;
        }
        for (var prop in ujson) {
            // json.hasOwnProperty(prop) - preserve for deserialization for other classes with methods
            if (ujson.hasOwnProperty(prop) &&
                this.hasOwnProperty(prop) &&
                Reflect.hasMetadata("ts-serializable:jsonTypes", this.constructor.prototype, prop)) {
                var acceptedTypes = Reflect.getMetadata("ts-serializable:jsonTypes", this.constructor.prototype, prop);
                var jsonValue = Reflect.get(ujson, prop);
                Reflect.set(this, prop, this.deserializeProperty(prop, acceptedTypes, jsonValue));
            }
        }
        return this;
    };
    /**
     * Process serelization for @jsonIgnore decorator
     *
     * @returns {object}
     * @memberof Serializable
     */
    Serializable.prototype.toJSON = function () {
        var json = Object.assign({}, this);
        for (var prop in json) {
            // json.hasOwnProperty(prop) - preserve for deserialization for other classes with methods
            if (json.hasOwnProperty(prop) && this.hasOwnProperty(prop)) {
                var isIgnore = Reflect.getMetadata("ts-serializable:jsonIgnore", this.constructor.prototype, prop);
                if (isIgnore) {
                    Reflect.set(json, prop, void 0);
                }
            }
        }
        return json;
    };
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
    Serializable.prototype.onWrongType = function (prop, message, jsonValue) {
        // tslint:disable-next-line:no-console
        console.error(this.constructor.name + ".fromJSON: json." + prop + " " + message + ":", jsonValue);
    };
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
    // tslint:disable-next-line:cyclomatic-complexity
    Serializable.prototype.deserializeProperty = function (prop, acceptedTypes, jsonValue) {
        var _this = this;
        var _loop_1 = function (acceptedType) {
            if ( // null
            acceptedType === null &&
                jsonValue === null) {
                return { value: null };
            }
            else if ( // void, for classes deep copy only, json don't have void type
            acceptedType === void 0 &&
                jsonValue === void 0) {
                return { value: void 0 };
            }
            else if ( // boolean, Boolean
            acceptedType === Boolean &&
                (typeof jsonValue === "boolean" || jsonValue instanceof Boolean)) {
                return { value: Boolean(jsonValue) };
            }
            else if ( // number, Number
            acceptedType === Number &&
                (typeof jsonValue === "number" || jsonValue instanceof Number)) {
                return { value: Number(jsonValue) };
            }
            else if ( // string, String
            acceptedType === String &&
                (typeof jsonValue === "string" || jsonValue instanceof String)) {
                return { value: String(jsonValue) };
            }
            else if ( // object, Object
            acceptedType === Object &&
                (typeof jsonValue === "object")) {
                return { value: Object(jsonValue) };
            }
            else if ( // Date
            acceptedType === Date &&
                (typeof jsonValue === "string" || jsonValue instanceof String || jsonValue instanceof Date)) {
                // 0 year, 0 month, 0 days, 0 hours, 0 minutes, 0 seconds
                var unicodeTime = new Date("0000-01-01T00:00:00.000").getTime();
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
                    this_1.onWrongType(prop, "is invalid date", jsonValue);
                }
                return { value: new Date(unicodeTime) };
            }
            else if ( // Array
            Array.isArray(acceptedType)
                && Array.isArray(jsonValue)) {
                if (acceptedType[0] === void 0) {
                    this_1.onWrongType(prop, "invalid type", jsonValue);
                }
                return { value: jsonValue.map(function (arrayValue) {
                        return _this.deserializeProperty(prop, acceptedType, arrayValue);
                    }) };
            }
            else if ( // Serializable
            acceptedType !== null &&
                acceptedType !== void 0 &&
                !Array.isArray(acceptedType) &&
                acceptedType.prototype instanceof Serializable &&
                jsonValue !== null &&
                jsonValue !== void 0 &&
                typeof jsonValue === "object" && !Array.isArray(jsonValue)) {
                var typeConstructor = acceptedType;
                return { value: new typeConstructor().fromJSON(jsonValue) };
            }
            else if ( // instance any other class, not Serializable, for parse from other classes instance
            acceptedType instanceof Function &&
                jsonValue instanceof acceptedType) {
                return { value: jsonValue };
            }
        };
        var this_1 = this;
        for (var _i = 0, acceptedTypes_1 = acceptedTypes; _i < acceptedTypes_1.length; _i++) {
            var acceptedType = acceptedTypes_1[_i];
            var state_1 = _loop_1(acceptedType);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        // process wrong type and return default value
        this.onWrongType(prop, "is invalid", jsonValue);
        return Reflect.get(this, prop);
    };
    return Serializable;
}());
exports.Serializable = Serializable;
