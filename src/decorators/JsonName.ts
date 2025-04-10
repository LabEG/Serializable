/**
 * Decorator to specify a custom JSON property name for a class property.
 *
 * @param {string} jsonPropertyName - The custom JSON property name.
 */
export const jsonName = (jsonPropertyName: string): PropertyDecorator => (
    target: object,
    propertyKey: string | symbol
): void => {
    Reflect.defineMetadata("ts-serializable:jsonName", jsonPropertyName, target, propertyKey);
};
