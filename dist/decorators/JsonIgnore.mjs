/* eslint-disable @typescript-eslint/ban-types */
export const jsonIgnore = () => (target, propertyKey) => {
    Reflect.defineMetadata("ts-serializable:jsonIgnore", true, target, propertyKey);
};
