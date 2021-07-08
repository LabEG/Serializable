/* eslint-disable @typescript-eslint/ban-types */
export const jsonProperty = (...args) => (target, propertyKey) => {
    Reflect.defineMetadata("ts-serializable:jsonTypes", args, target, propertyKey);
};
