/* eslint-disable @typescript-eslint/ban-types */

import type {AcceptedTypes} from "./../models/AcceptedType";

export const jsonProperty = (...args: AcceptedTypes[]): PropertyDecorator => (
    target: object,
    propertyKey: string | symbol
): void => {
    Reflect.defineMetadata("ts-serializable:jsonTypes", args, target, propertyKey);
};
