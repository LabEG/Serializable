"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function jsonIgnore() {
    return function (target, propertyKey) {
        Reflect.defineMetadata("ts-serializable:jsonIgnore", true, target, propertyKey);
    };
}
exports.jsonIgnore = jsonIgnore;
