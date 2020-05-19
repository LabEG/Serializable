/* eslint-disable arrow-body-style */
export const jsonIgnore = () => {
    return (target, propertyKey) => {
        Reflect.defineMetadata("ts-serializable:jsonIgnore", true, target, propertyKey);
    };
};
