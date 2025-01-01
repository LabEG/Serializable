/* eslint-disable @typescript-eslint/no-unsafe-argument */

import {Serializable} from "../classes/Serializable.js";
import {SerializationSettings} from "../models/SerializationSettings.js";

// eslint-disable-next-line max-statements
export const getPropertyName = (obj: object, property: string, settings?: Partial<SerializationSettings>) => {
    if (Reflect.hasMetadata("ts-serializable:jsonName", obj.constructor.prototype, property)) {
        return Reflect.getMetadata("ts-serializable:jsonName", obj.constructor.prototype, property) as string;
    }

    if (settings?.namingStrategy) {
        return settings.namingStrategy.toJsonName(property);
    }

    if (Reflect.hasMetadata("ts-serializable:jsonObject", obj.constructor)) {
        const objectSettings: Partial<SerializationSettings> = Reflect.getMetadata(
            "ts-serializable:jsonObject",
            obj.constructor
        ) as Partial<SerializationSettings>;
        return objectSettings.namingStrategy?.toJsonName(property) ?? property;
    }

    if (Serializable.defaultSettings.namingStrategy) {
        const {namingStrategy} = Serializable.defaultSettings;
        return namingStrategy.toJsonName(property);
    }

    return property;
};

