/* eslint-disable func-style */
import { AcceptedTypes } from "./../models/AcceptedType";

export function jsonProperty(...args: AcceptedTypes[]): PropertyDecorator {
    return function decorator(target: object, propertyKey: string | symbol): void {
        Reflect.defineMetadata("ts-serializable:jsonTypes", args, target, propertyKey);
    };
}
