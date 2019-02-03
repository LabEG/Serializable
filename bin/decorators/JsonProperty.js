"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function jsonProperty() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (target, propertyKey) {
        Reflect.defineMetadata("ts-serializable:jsonTypes", args, target, propertyKey);
    };
}
exports.jsonProperty = jsonProperty;
