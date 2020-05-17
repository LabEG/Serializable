"use strict";
/* eslint-disable arrow-body-style */
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonName = void 0;
exports.jsonName = function (jsonPropertyName) {
    return function (target, propertyKey) {
        Reflect.defineMetadata("ts-serializable:jsonName", jsonPropertyName, target, propertyKey);
    };
};
