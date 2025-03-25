import type {SerializationSettings} from "../models/SerializationSettings.js";

export const jsonObject = (settings?: Partial<SerializationSettings>): ClassDecorator => (target: object): void => {
    if (settings) {
        Reflect.defineMetadata("ts-serializable:jsonObject", settings, target);
    }
};
