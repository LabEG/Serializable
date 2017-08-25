(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * //todo: write jsdoc
     *
     * @export
     * @class Serializable
     */
    var Serializable = (function () {
        function Serializable() {
        }
        /**
         * //todo: write jsdoc
         *
         * @static
         * @param {object} json
         * @returns {Object}
         * @memberof Serializable
         */
        Serializable.fromJSON = function (json) {
            return new this().fromJSON(json);
        };
        /**
         * //todo: write jsdoc
         *
         * @param {object} json
         * @returns {this}
         * @memberof Serializable
         */
        Serializable.prototype.fromJSON = function (json) {
            if (json === null ||
                Array.isArray(json) ||
                typeof json !== 'object') {
                this.onWrongType('', 'is not object', json);
                return this;
            }
            for (var prop in json) {
                // json.hasOwnProperty(prop) - preserve for deserialization for other classes with methods
                if (json.hasOwnProperty(prop) && this.hasOwnProperty(prop)) {
                    var acceptedTypes = Reflect.getMetadata('ts-serializable:jsonTypes', this.constructor.prototype, prop);
                    var jsonValue = Reflect.get(json, prop);
                    Reflect.set(this, prop, this.deserializeProperty(this, prop, acceptedTypes, jsonValue));
                }
            }
            return this;
        };
        /**
         * //todo: write jsdoc
         *
         * @returns {object}
         * @memberof Serializable
         */
        Serializable.prototype.toJSON = function () {
            return Object.assign({}, this);
        };
        /**
         * //todo: write jsdoc
         *
         * @protected
         * @param {string} prop
         * @param {string} message
         * @param {(Object | null | void)} jsonValue
         * @memberof Serializable
         */
        Serializable.prototype.onWrongType = function (prop, message, jsonValue) {
            console.error(this.constructor.name + ".fromJSON: json." + prop + " " + message + ":", jsonValue);
        };
        /**
         * //todo: write jsdoc
         *
         * @private
         * @param {object} object
         * @param {string} prop
         * @param {AcceptedTypes[]} acceptedTypes
         * @param {(Object | null | void)} jsonValue
         * @returns {(Object | null | void)}
         * @memberof Serializable
         */
        Serializable.prototype.deserializeProperty = function (object, prop, acceptedTypes, jsonValue) {
            var _this = this;
            var _loop_1 = function (type) {
                var acceptedType = acceptedTypes[type];
                if (acceptedType === null &&
                    jsonValue === null) {
                    return { value: null };
                }
                else if (acceptedType === void 0 &&
                    jsonValue === void 0) {
                    return { value: void 0 };
                }
                else if (acceptedType === Boolean &&
                    (typeof jsonValue === 'boolean' || jsonValue instanceof Boolean)) {
                    return { value: Boolean(jsonValue) };
                }
                else if (acceptedType === Number &&
                    (typeof jsonValue === 'number' || jsonValue instanceof Number)) {
                    return { value: Number(jsonValue) };
                }
                else if (acceptedType === String &&
                    (typeof jsonValue === 'string' || jsonValue instanceof String)) {
                    return { value: String(jsonValue) };
                }
                else if (acceptedType === Object &&
                    (typeof jsonValue === 'object')) {
                    return { value: Object(jsonValue) };
                }
                else if (acceptedType === Date &&
                    (typeof jsonValue === 'string' || jsonValue instanceof String || jsonValue instanceof Date)) {
                    var unicodeTime = new Date("0000-01-01T00:00:00.000").getTime(); // 0 year, 0 month, 0 days, 0 hours, 0 minutes, 0 seconds
                    if (typeof jsonValue === 'string') {
                        unicodeTime = Date.parse(jsonValue);
                    }
                    else if (jsonValue instanceof String) {
                        unicodeTime = Date.parse(String(jsonValue));
                    }
                    else if (jsonValue instanceof Date) {
                        unicodeTime = jsonValue.getTime();
                    }
                    if (isNaN(unicodeTime) || typeof unicodeTime !== 'number') {
                        this_1.onWrongType(prop, 'is invalid date', jsonValue);
                    }
                    return { value: new Date(unicodeTime) };
                }
                else if (Array.isArray(acceptedType)
                    && Array.isArray(jsonValue)) {
                    if (acceptedType[0] === void 0) {
                        this_1.onWrongType(prop, 'invalid type', jsonValue);
                    }
                    return { value: jsonValue.map(function (arrayValue) {
                            return _this.deserializeProperty(_this, prop, acceptedType, arrayValue);
                        }) };
                }
                else if (jsonValue !== null &&
                    jsonValue !== void 0 &&
                    typeof jsonValue === 'object' && !Array.isArray(jsonValue)) {
                    var typeConstructor = acceptedType;
                    return { value: new typeConstructor().fromJSON(jsonValue) };
                }
            };
            var this_1 = this;
            for (var type in acceptedTypes) {
                var state_1 = _loop_1(type);
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
});
