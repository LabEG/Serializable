
export function jsonIgnore(): PropertyDecorator {
    return function(target: object, propertyKey: string | symbol) {
        Reflect.defineMetadata("ts-serializable:jsonIgnore", true, target, propertyKey);
    };
}
