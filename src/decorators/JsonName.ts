/* eslint-disable arrow-body-style */

export const jsonName = (jsonPropertyName: string): PropertyDecorator => {
    return (target: object, propertyKey: string | symbol): void => {
        Reflect.defineMetadata("ts-serializable:jsonName", jsonPropertyName, target, propertyKey);
    };
};
