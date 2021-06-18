import { LogLevels } from "../enums/LogLevels";
import { DefaultValueHandling } from "../enums/DefaultValueHandling";
import { NullValueHandling } from "../enums/NullValueHandling";
import { ReferenceLoopHandling } from "../enums/ReferenceLoopHandling";
import { MissingMemberHandling } from "../enums/MissingMemberHandling";
import { DateFormatHandling } from "../enums/DateFormatHandling";
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
