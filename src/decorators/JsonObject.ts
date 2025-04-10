import type {SerializationSettings} from "../models/SerializationSettings.js";

/**
 * Decorator to mark a class as serializable to JSON.
 *
 * @param {Partial<SerializationSettings>} [settings] - Optional serialization settings.
 */
export const jsonObject = (settings?: Partial<SerializationSettings>): ClassDecorator => (target: object): void => {
    if (settings) {
        Reflect.defineMetadata("ts-serializable:jsonObject", settings, target);
    }
};
