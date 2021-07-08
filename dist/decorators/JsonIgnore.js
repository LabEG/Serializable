"use strict";
/* eslint-disable @typescript-eslint/ban-types */
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonIgnore = void 0;
const jsonIgnore = () => (target, propertyKey) => {
    Reflect.defineMetadata("ts-serializable:jsonIgnore", true, target, propertyKey);
};
exports.jsonIgnore = jsonIgnore;
