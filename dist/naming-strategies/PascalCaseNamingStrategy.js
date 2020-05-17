"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PascalCaseNamingStrategy = void 0;
var PascalCaseNamingStrategy = /** @class */ (function () {
    function PascalCaseNamingStrategy() {
    }
    PascalCaseNamingStrategy.prototype.fromJsonName = function (name) {
        return name.slice(0, 1).toLowerCase() + name.slice(1, name.length);
    };
    PascalCaseNamingStrategy.prototype.toJsonName = function (name) {
        return name.slice(0, 1).toUpperCase() + name.slice(1, name.length);
    };
    return PascalCaseNamingStrategy;
}());
exports.PascalCaseNamingStrategy = PascalCaseNamingStrategy;
