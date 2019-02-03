import { AcceptedTypes } from "./../models/AcceptedType";

export function jsonProperty(...args: AcceptedTypes[]): PropertyDecorator {
    return function(target: object, propertyKey: string | symbol) {
        Reflect.defineMetadata("ts-serializable:jsonTypes", args, target, propertyKey);
    };
}
