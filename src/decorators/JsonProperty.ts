/// <reference path="./../../node_modules/reflect-metadata/Reflect.d.ts" />

export function jsonProperty(...args: (Object | null | void)[]): PropertyDecorator {
    return function(target: object, propertyKey: string | symbol) {
        Reflect.defineMetadata('ts-serializable:jsonTypes', args, target, propertyKey);
    };
}
