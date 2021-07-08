"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializationSettings = void 0;
const LogLevels_1 = require("../enums/LogLevels");
const DefaultValueHandling_1 = require("../enums/DefaultValueHandling");
const NullValueHandling_1 = require("../enums/NullValueHandling");
const ReferenceLoopHandling_1 = require("../enums/ReferenceLoopHandling");
const MissingMemberHandling_1 = require("../enums/MissingMemberHandling");
const DateFormatHandling_1 = require("../enums/DateFormatHandling");
// From newtonsoft https://www.newtonsoft.com/json/help/html/SerializationSettings.htm
class SerializationSettings {
    constructor() {
        this.dateFormatHandling = DateFormatHandling_1.DateFormatHandling.IsoDateFormat;
        this.missingMemberHandling = MissingMemberHandling_1.MissingMemberHandling.Ignore;
        this.referenceLoopHandling = ReferenceLoopHandling_1.ReferenceLoopHandling.Serialize;
        this.nullValueHandling = NullValueHandling_1.NullValueHandling.Include;
        this.defaultValueHandling = DefaultValueHandling_1.DefaultValueHandling.Ignore;
        this.namingStrategy = null;
        this.logLevel = LogLevels_1.LogLevels.Warning;
    }
}
exports.SerializationSettings = SerializationSettings;
