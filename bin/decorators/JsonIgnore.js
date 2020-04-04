"use strict";
/* eslint-disable func-style */
Object.defineProperty(exports, "__esModule", { value: true });
function jsonIgnore() {
    return function decorator(target, propertyKey) {
        Reflect.defineMetadata("ts-serializable:jsonIgnore", true, target, propertyKey);
    };
}
exports.jsonIgnore = jsonIgnore;
