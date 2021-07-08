"use strict";
/* eslint-disable @typescript-eslint/ban-types */
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonProperty = void 0;
const jsonProperty = (...args) => (target, propertyKey) => {
    Reflect.defineMetadata("ts-serializable:jsonTypes", args, target, propertyKey);
};
exports.jsonProperty = jsonProperty;
