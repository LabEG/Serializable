"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceLoopHandling = void 0;
var ReferenceLoopHandling;
(function (ReferenceLoopHandling) {
    ReferenceLoopHandling[ReferenceLoopHandling["Error"] = 0] = "Error";
    ReferenceLoopHandling[ReferenceLoopHandling["Ignore"] = 1] = "Ignore";
    ReferenceLoopHandling[ReferenceLoopHandling["Serialize"] = 2] = "Serialize";
})(ReferenceLoopHandling = exports.ReferenceLoopHandling || (exports.ReferenceLoopHandling = {}));
