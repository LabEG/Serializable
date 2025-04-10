/**
 * Decorator to mark a property to be ignored during serialization.
 */
export const jsonIgnore = (): PropertyDecorator => (
    target: object,
    propertyKey: string | symbol
): void => {
    Reflect.defineMetadata("ts-serializable:jsonIgnore", true, target, propertyKey);
};
