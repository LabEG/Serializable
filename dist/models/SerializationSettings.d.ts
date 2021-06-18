import { LogLevels } from "../enums/LogLevels";
import { DefaultValueHandling } from "../enums/DefaultValueHandling";
import { NullValueHandling } from "../enums/NullValueHandling";
import { ReferenceLoopHandling } from "../enums/ReferenceLoopHandling";
import { MissingMemberHandling } from "../enums/MissingMemberHandling";
import { DateFormatHandling } from "../enums/DateFormatHandling";
import type { INamingStrategy } from "../naming-strategies/INamingStrategy";
export declare class SerializationSettings {
    dateFormatHandling: DateFormatHandling;
    missingMemberHandling: MissingMemberHandling;
    referenceLoopHandling: ReferenceLoopHandling;
    nullValueHandling: NullValueHandling;
    defaultValueHandling: DefaultValueHandling;
    namingStrategy: INamingStrategy | null;
    logLevel: LogLevels;
}
