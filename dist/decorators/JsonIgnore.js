export const jsonIgnore = () => (target, propertyKey) => {
    Reflect.defineMetadata("ts-serializable:jsonIgnore", true, target, propertyKey);
};
