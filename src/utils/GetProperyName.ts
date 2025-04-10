/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {Serializable} from "../classes/Serializable.js";
import {SerializationSettings} from "../models/SerializationSettings.js";

/**
 * Retrieves the correct property name for serialization, considering decorators and settings.
 *
 * @param {object} obj - The object containing the property.
 * @param {string} property - The source name of the property.
 * @param {Partial<SerializationSettings>} [settings] - Optional serialization settings.
 * @returns {string} - The correct property name for serialization.
 */
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

