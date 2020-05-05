/* eslint-disable arrow-body-style */

export const jsonIgnore = (): PropertyDecorator => {
    return (target: object, propertyKey: string | symbol): void => {
        Reflect.defineMetadata("ts-serializable:jsonIgnore", true, target, propertyKey);
    };
};
