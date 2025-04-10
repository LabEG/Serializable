import type {AcceptedTypes} from "./../models/AcceptedType.js";

/**
 * Decorator to specify the accepted types for a JSON property.
 *
 * @param {...AcceptedTypes[]} args - The accepted types for the property.
 */
export const jsonProperty = (...args: AcceptedTypes[]): PropertyDecorator => (
    target: object,
    propertyKey: string | symbol
): void => {
    Reflect.defineMetadata("ts-serializable:jsonTypes", args, target, propertyKey);
};
