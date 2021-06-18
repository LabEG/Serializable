/* eslint-disable arrow-body-style */

import type { AcceptedTypes } from "./../models/AcceptedType";

export const jsonProperty = (...args: AcceptedTypes[]): PropertyDecorator => {
    return (target: object, propertyKey: string | symbol): void => {
        Reflect.defineMetadata("ts-serializable:jsonTypes", args, target, propertyKey);
    };
};
