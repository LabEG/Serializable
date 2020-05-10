"use strict";
/* eslint-disable arrow-body-style */
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonIgnore = function () {
    return function (target, propertyKey) {
        Reflect.defineMetadata("ts-serializable:jsonIgnore", true, target, propertyKey);
    };
};
