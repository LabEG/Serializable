import { IContractResolver } from "../contract-resolvers/IContractResolver";
import { LogLevels } from "../enums/LogLevels";
import { DefaultValueHandling } from "../enums/DefaultValueHandling";
import { NullValueHandling } from "../enums/NullValueHandling";
import { ReferenceLoopHandling } from "../enums/ReferenceLoopHandling";
import { MissingMemberHandling } from "../enums/MissingMemberHandling";
import { DateFormatHandling } from "../enums/DateFormatHandling";

// from newtonsoft https://www.newtonsoft.com/json/help/html/SerializationSettings.htm
export class SerializationSettings {

    public dateFormatHandling: DateFormatHandling = DateFormatHandling.IsoDateFormat;
    public missingMemberHandling: MissingMemberHandling = MissingMemberHandling.Ignore;
    public referenceLoopHandling: ReferenceLoopHandling = ReferenceLoopHandling.Serialize;
    public nullValueHandling: NullValueHandling = NullValueHandling.Include;
    public defaultValueHandling: DefaultValueHandling = DefaultValueHandling.Ignore;
    // public converters: object = {}; // todo: think later
    public contractResolver: IContractResolver = {};
    public logLevel: LogLevels = LogLevels.Warning;

}
