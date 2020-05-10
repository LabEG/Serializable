"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SnackCaseNamingStrategy = /** @class */ (function () {
    function SnackCaseNamingStrategy() {
    }
    SnackCaseNamingStrategy.prototype.fromJsonName = function (name) {
        return name.replace(/_\w/gu, function (group) { return group[1].toUpperCase(); });
    };
    SnackCaseNamingStrategy.prototype.toJsonName = function (name) {
        return name
            .split(/(?=[A-Z])/u)
            .join("_")
            .toLowerCase();
    };
    return SnackCaseNamingStrategy;
}());
exports.SnackCaseNamingStrategy = SnackCaseNamingStrategy;
