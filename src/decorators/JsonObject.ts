/* eslint-disable arrow-body-style */

import { SerializationSettings } from "../models/SerializationSettings";

export const jsonObject = (settings?: Partial<SerializationSettings>): ClassDecorator => {
    return (target: object): void => {
        if (settings) {
            Reflect.defineMetadata("ts-serializable:jsonObject", settings, target);
        }
    };
};
