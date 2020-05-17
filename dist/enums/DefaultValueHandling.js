"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultValueHandling = void 0;
var DefaultValueHandling;
(function (DefaultValueHandling) {
    DefaultValueHandling[DefaultValueHandling["Include"] = 0] = "Include";
    DefaultValueHandling[DefaultValueHandling["Ignore"] = 1] = "Ignore";
    DefaultValueHandling[DefaultValueHandling["Populate"] = 2] = "Populate";
    DefaultValueHandling[DefaultValueHandling["IgnoreAndPopulate"] = 3] = "IgnoreAndPopulate"; // not supported yet
})(DefaultValueHandling = exports.DefaultValueHandling || (exports.DefaultValueHandling = {}));
