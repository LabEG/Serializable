"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KebabCaseNamingStrategy = void 0;
var KebabCaseNamingStrategy = /** @class */ (function () {
    function KebabCaseNamingStrategy() {
    }
    KebabCaseNamingStrategy.prototype.fromJsonName = function (name) {
        return name.replace(/-\w/gu, function (group) { return group[1].toUpperCase(); });
    };
    KebabCaseNamingStrategy.prototype.toJsonName = function (name) {
        return name
            .split(/(?=[A-Z])/u)
            .join("-")
            .toLowerCase();
    };
    return KebabCaseNamingStrategy;
}());
exports.KebabCaseNamingStrategy = KebabCaseNamingStrategy;
