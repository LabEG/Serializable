"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializationSettings = void 0;
var LogLevels_1 = require("../enums/LogLevels");
var DefaultValueHandling_1 = require("../enums/DefaultValueHandling");
var NullValueHandling_1 = require("../enums/NullValueHandling");
var ReferenceLoopHandling_1 = require("../enums/ReferenceLoopHandling");
var MissingMemberHandling_1 = require("../enums/MissingMemberHandling");
var DateFormatHandling_1 = require("../enums/DateFormatHandling");
// from newtonsoft https://www.newtonsoft.com/json/help/html/SerializationSettings.htm
var SerializationSettings = /** @class */ (function () {
    function SerializationSettings() {
        this.dateFormatHandling = DateFormatHandling_1.DateFormatHandling.IsoDateFormat;
        this.missingMemberHandling = MissingMemberHandling_1.MissingMemberHandling.Ignore;
        this.referenceLoopHandling = ReferenceLoopHandling_1.ReferenceLoopHandling.Serialize;
        this.nullValueHandling = NullValueHandling_1.NullValueHandling.Include;
        this.defaultValueHandling = DefaultValueHandling_1.DefaultValueHandling.Ignore;
        this.namingStrategy = null;
        this.logLevel = LogLevels_1.LogLevels.Warning;
    }
    return SerializationSettings;
}());
exports.SerializationSettings = SerializationSettings;
