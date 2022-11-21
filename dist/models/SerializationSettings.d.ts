import { LogLevels } from "../enums/LogLevels.js";
import { DefaultValueHandling } from "../enums/DefaultValueHandling.js";
import { NullValueHandling } from "../enums/NullValueHandling.js";
import { ReferenceLoopHandling } from "../enums/ReferenceLoopHandling.js";
import { MissingMemberHandling } from "../enums/MissingMemberHandling.js";
import { DateFormatHandling } from "../enums/DateFormatHandling.js";
import type { INamingStrategy } from "../naming-strategies/INamingStrategy.js";
export declare class SerializationSettings {
    dateFormatHandling: DateFormatHandling;
    missingMemberHandling: MissingMemberHandling;
    referenceLoopHandling: ReferenceLoopHandling;
    nullValueHandling: NullValueHandling;
    defaultValueHandling: DefaultValueHandling;
    namingStrategy: INamingStrategy | null;
    logLevel: LogLevels;
}
