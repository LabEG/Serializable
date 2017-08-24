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
            for (var prop in json) {
                // json.hasOwnProperty(prop) - preserve for deserialization for other classes with methods
                if (json.hasOwnProperty(prop) && this.hasOwnProperty(prop)) {
                    Reflect.set(this, prop, Reflect.get(json, prop));
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
        return Serializable;
    }());
    exports.Serializable = Serializable;
});
