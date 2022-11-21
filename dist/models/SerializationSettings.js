import { LogLevels } from "../enums/LogLevels.js";
import { DefaultValueHandling } from "../enums/DefaultValueHandling.js";
import { NullValueHandling } from "../enums/NullValueHandling.js";
import { ReferenceLoopHandling } from "../enums/ReferenceLoopHandling.js";
import { MissingMemberHandling } from "../enums/MissingMemberHandling.js";
import { DateFormatHandling } from "../enums/DateFormatHandling.js";
// From newtonsoft https://www.newtonsoft.com/json/help/html/SerializationSettings.htm
export class SerializationSettings {
    constructor() {
        this.dateFormatHandling = DateFormatHandling.IsoDateFormat;
        this.missingMemberHandling = MissingMemberHandling.Ignore;
        this.referenceLoopHandling = ReferenceLoopHandling.Serialize;
        this.nullValueHandling = NullValueHandling.Include;
        this.defaultValueHandling = DefaultValueHandling.Ignore;
        this.namingStrategy = null;
        this.logLevel = LogLevels.Warning;
    }
}
