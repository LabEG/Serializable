"use strict";
/* eslint-disable @typescript-eslint/ban-types */
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonName = void 0;
const jsonName = (jsonPropertyName) => (target, propertyKey) => {
    Reflect.defineMetadata("ts-serializable:jsonName", jsonPropertyName, target, propertyKey);
};
exports.jsonName = jsonName;
