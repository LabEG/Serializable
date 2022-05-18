export const jsonName = (jsonPropertyName: string): PropertyDecorator => (
    target: object,
    propertyKey: string | symbol
): void => {
    Reflect.defineMetadata("ts-serializable:jsonName", jsonPropertyName, target, propertyKey);
};
