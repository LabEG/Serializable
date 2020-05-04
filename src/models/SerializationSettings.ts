import { IContractResolver } from "../contract-resolvers/IContractResolver";

export enum DateFormatHandling {
    IsoDateFormat,
    MicrosoftDateFormat // todo: add later
}

export enum MissingMemberHandling {
    Ignore,
    Error // todo: add later
}

export enum ReferenceLoopHandling {
    Error, // todo: add later
    Ignore, // todo: add later
    Serialize
}

export enum NullValueHandling {
    Include,
    Ignore // todo: add later
}

export enum DefaultValueHandling {
    Include,
    Ignore, // todo: add later
    Populate, // todo: add later
    IgnoreAndPopulate // todo: add later
}

export enum LogLevels {
    Trace,
    Debug,
    Information,
    Warning,
    Error,
    Critical,
    None
}

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
