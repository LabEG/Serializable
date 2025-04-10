import {LogLevels} from "../enums/LogLevels.js";
import {DefaultValueHandling} from "../enums/DefaultValueHandling.js";
import {NullValueHandling} from "../enums/NullValueHandling.js";
import {ReferenceLoopHandling} from "../enums/ReferenceLoopHandling.js";
import {MissingMemberHandling} from "../enums/MissingMemberHandling.js";
import {DateFormatHandling} from "../enums/DateFormatHandling.js";
import type {INamingStrategy} from "../naming-strategies/INamingStrategy.js";

// From newtonsoft https://www.newtonsoft.com/json/help/html/SerializationSettings.htm

/**
 * Class representing serialization settings.
 */
export class SerializationSettings {

    /**
     * Specifies how dates are formatted during serialization.
     */
    public dateFormatHandling: DateFormatHandling = DateFormatHandling.IsoDateFormat;

    /**
     * Specifies how missing members are handled during deserialization.
     */
    public missingMemberHandling: MissingMemberHandling = MissingMemberHandling.Ignore;

    /**
     * Specifies how reference loops are handled during serialization.
     */
    public referenceLoopHandling: ReferenceLoopHandling = ReferenceLoopHandling.Serialize;

    /**
     * Specifies how null values are handled during serialization.
     */
    public nullValueHandling: NullValueHandling = NullValueHandling.Include;

    /**
     * Specifies how default values are handled during serialization.
     */
    public defaultValueHandling: DefaultValueHandling = DefaultValueHandling.Ignore;

    /**
     * Specifies the naming strategy for property names during serialization.
     */
    public namingStrategy: INamingStrategy | null = null;

    /**
     * Specifies the log level for serialization operations.
     */
    public logLevel: LogLevels = LogLevels.Warning;

}
