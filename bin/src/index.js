(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./decorators/jsonProperty", "./classes/Serializable"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var jsonProperty_1 = require("./decorators/jsonProperty");
    var Serializable_1 = require("./classes/Serializable");
    exports.Serializable = Serializable_1.Serializable;
    exports.jsonProperty = jsonProperty_1.jsonProperty;
});
