
import {LogLevels} from "../enums/LogLevels.js";
import {DefaultValueHandling} from "../enums/DefaultValueHandling.js";
import {NullValueHandling} from "../enums/NullValueHandling.js";
import {ReferenceLoopHandling} from "../enums/ReferenceLoopHandling.js";
import {MissingMemberHandling} from "../enums/MissingMemberHandling.js";
import {DateFormatHandling} from "../enums/DateFormatHandling.js";
import type {INamingStrategy} from "../naming-strategies/INamingStrategy.js";

// From newtonsoft https://www.newtonsoft.com/json/help/html/SerializationSettings.htm
export class SerializationSettings {

    public dateFormatHandling: DateFormatHandling = DateFormatHandling.IsoDateFormat;

    public missingMemberHandling: MissingMemberHandling = MissingMemberHandling.Ignore;

    public referenceLoopHandling: ReferenceLoopHandling = ReferenceLoopHandling.Serialize;

    public nullValueHandling: NullValueHandling = NullValueHandling.Include;

    public defaultValueHandling: DefaultValueHandling = DefaultValueHandling.Ignore;

    public namingStrategy: INamingStrategy | null = null;

    public logLevel: LogLevels = LogLevels.Warning;

}
