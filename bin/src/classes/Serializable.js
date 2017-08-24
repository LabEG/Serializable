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
    var Serializable = (function () {
        function Serializable() {
        }
        // for next project
        Serializable.prototype.fromJSON = function (json) {
            if (json === null ||
                Array.isArray(json) ||
                typeof json !== 'object') {
                throw new Error(this.constructor.name + ".fromJSON: json is not object: " + json);
            }
            for (var prop in json) {
                // json.hasOwnProperty(prop) - preserve for deserialization for other classes with methods
                if (json.hasOwnProperty(prop) && this.hasOwnProperty(prop)) {
                    var acceptedTypes = Reflect.getMetadata('ts-serializable:jsonTypes', this.constructor.prototype, prop);
                    var jsonValue = Reflect.get(json, prop);
                    this.checkTypeAndSetValue();
                    for (var type in acceptedTypes) {
                        // null
                        if (acceptedTypes[type] === null && jsonValue === null) {
                            console.log('11111111111111111111111111111 to null');
                            Reflect.set(this, prop, null);
                            continue;
                        }
                        // void, for classes only, json don't have void type
                        if (acceptedTypes[type] === void 0 && jsonValue === void 0) {
                            console.log('11111111111111111111111111111 to void');
                            Reflect.set(this, prop, void 0);
                            continue;
                        }
                        // string, String
                        if (acceptedTypes[type] === String && (typeof jsonValue === 'string' || jsonValue instanceof String)) {
                            console.log('11111111111111111111111111111 to string', jsonValue);
                            Reflect.set(this, prop, String(jsonValue));
                            continue;
                        }
                        // number, Number
                        if (acceptedTypes[type] === Number && (typeof jsonValue === 'number' || jsonValue instanceof Number)) {
                            console.log('11111111111111111111111111111 to number', jsonValue);
                            Reflect.set(this, prop, Number(jsonValue));
                            continue;
                        }
                        // boolean, Boolean
                        if (acceptedTypes[type] === Boolean && (typeof jsonValue === 'boolean' || jsonValue instanceof Boolean)) {
                            console.log('11111111111111111111111111111 to boolean', jsonValue);
                            Reflect.set(this, prop, Boolean(jsonValue));
                            continue;
                        }
                        // object, Object
                        if (acceptedTypes[type] === Object && (typeof jsonValue === 'object' && !Array.isArray(jsonValue))) {
                            // todo: check on serializable
                            console.log('11111111111111111111111111111 to object', jsonValue);
                            Reflect.set(this, prop, Object(jsonValue));
                            continue;
                        }
                        // Array
                        if (acceptedTypes[type] === Array && Array.isArray(jsonValue)) {
                            console.log('11111111111111111111111111111 to array', jsonValue);
                            Reflect.set(this, prop, Object(jsonValue));
                            continue;
                        }
                    }
                }
            }
            return this;
        };
        Serializable.prototype.toJSON = function () {
            return Object.assign({}, this);
        };
        Serializable.prototype.onWrongType = function (propertyKey, wrongValue) {
            console.error(this.constructor.name + ".fromJSON: json." + propertyKey + " is invalid: ", wrongValue);
        };
        Serializable.prototype.checkTypeAndSetValue = function () {
        };
        return Serializable;
    }());
    exports.Serializable = Serializable;
});
