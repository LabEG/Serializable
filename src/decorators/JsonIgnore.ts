/* eslint-disable func-style */

export function jsonIgnore(): PropertyDecorator {
    return function decorator(target: object, propertyKey: string | symbol): void {
        Reflect.defineMetadata("ts-serializable:jsonIgnore", true, target, propertyKey);
    };
}
