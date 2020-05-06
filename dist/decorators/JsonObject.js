"use strict";
/* eslint-disable arrow-body-style */
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonObject = function (settings) {
    return function (target) {
        if (settings) {
            Reflect.defineMetadata("ts-serializable:jsonObject", settings, target);
        }
    };
};
