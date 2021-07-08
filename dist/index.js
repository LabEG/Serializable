"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KebabCaseNamingStrategy = exports.PascalCaseNamingStrategy = exports.SnakeCaseNamingStrategy = exports.SerializationSettings = exports.LogLevels = exports.ReferenceLoopHandling = exports.NullValueHandling = exports.MissingMemberHandling = exports.DefaultValueHandling = exports.DateFormatHandling = exports.Serializable = exports.jsonProperty = exports.jsonObject = exports.jsonName = exports.jsonIgnore = void 0;
// Decoratore
var JsonIgnore_1 = require("./decorators/JsonIgnore");
Object.defineProperty(exports, "jsonIgnore", { enumerable: true, get: function () { return JsonIgnore_1.jsonIgnore; } });
var JsonName_1 = require("./decorators/JsonName");
Object.defineProperty(exports, "jsonName", { enumerable: true, get: function () { return JsonName_1.jsonName; } });
var JsonObject_1 = require("./decorators/JsonObject");
Object.defineProperty(exports, "jsonObject", { enumerable: true, get: function () { return JsonObject_1.jsonObject; } });
var JsonProperty_1 = require("./decorators/JsonProperty");
Object.defineProperty(exports, "jsonProperty", { enumerable: true, get: function () { return JsonProperty_1.jsonProperty; } });
// Base class
var Serializable_1 = require("./classes/Serializable");
Object.defineProperty(exports, "Serializable", { enumerable: true, get: function () { return Serializable_1.Serializable; } });
// Enums
var DateFormatHandling_1 = require("./enums/DateFormatHandling");
Object.defineProperty(exports, "DateFormatHandling", { enumerable: true, get: function () { return DateFormatHandling_1.DateFormatHandling; } });
var DefaultValueHandling_1 = require("./enums/DefaultValueHandling");
Object.defineProperty(exports, "DefaultValueHandling", { enumerable: true, get: function () { return DefaultValueHandling_1.DefaultValueHandling; } });
var MissingMemberHandling_1 = require("./enums/MissingMemberHandling");
Object.defineProperty(exports, "MissingMemberHandling", { enumerable: true, get: function () { return MissingMemberHandling_1.MissingMemberHandling; } });
var NullValueHandling_1 = require("./enums/NullValueHandling");
Object.defineProperty(exports, "NullValueHandling", { enumerable: true, get: function () { return NullValueHandling_1.NullValueHandling; } });
var ReferenceLoopHandling_1 = require("./enums/ReferenceLoopHandling");
Object.defineProperty(exports, "ReferenceLoopHandling", { enumerable: true, get: function () { return ReferenceLoopHandling_1.ReferenceLoopHandling; } });
var LogLevels_1 = require("./enums/LogLevels");
Object.defineProperty(exports, "LogLevels", { enumerable: true, get: function () { return LogLevels_1.LogLevels; } });
// Settings
var SerializationSettings_1 = require("./models/SerializationSettings");
Object.defineProperty(exports, "SerializationSettings", { enumerable: true, get: function () { return SerializationSettings_1.SerializationSettings; } });
var SnakeCaseNamingStrategy_1 = require("./naming-strategies/SnakeCaseNamingStrategy");
Object.defineProperty(exports, "SnakeCaseNamingStrategy", { enumerable: true, get: function () { return SnakeCaseNamingStrategy_1.SnakeCaseNamingStrategy; } });
var PascalCaseNamingStrategy_1 = require("./naming-strategies/PascalCaseNamingStrategy");
Object.defineProperty(exports, "PascalCaseNamingStrategy", { enumerable: true, get: function () { return PascalCaseNamingStrategy_1.PascalCaseNamingStrategy; } });
var KebabCaseNamingStrategy_1 = require("./naming-strategies/KebabCaseNamingStrategy");
Object.defineProperty(exports, "KebabCaseNamingStrategy", { enumerable: true, get: function () { return KebabCaseNamingStrategy_1.KebabCaseNamingStrategy; } });
