export const jsonName = (jsonPropertyName) => (target, propertyKey) => {
    Reflect.defineMetadata("ts-serializable:jsonName", jsonPropertyName, target, propertyKey);
};
