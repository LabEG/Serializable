/* eslint-disable @typescript-eslint/ban-types */

export const jsonIgnore = (): PropertyDecorator => (
    target: object,
    propertyKey: string | symbol
): void => {
    Reflect.defineMetadata("ts-serializable:jsonIgnore", true, target, propertyKey);
};
