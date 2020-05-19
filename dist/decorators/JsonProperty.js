/* eslint-disable arrow-body-style */
export const jsonProperty = (...args) => {
    return (target, propertyKey) => {
        Reflect.defineMetadata("ts-serializable:jsonTypes", args, target, propertyKey);
    };
};
