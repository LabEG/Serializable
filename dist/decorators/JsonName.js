/* eslint-disable arrow-body-style */
export const jsonName = (jsonPropertyName) => {
    return (target, propertyKey) => {
        Reflect.defineMetadata("ts-serializable:jsonName", jsonPropertyName, target, propertyKey);
    };
};
