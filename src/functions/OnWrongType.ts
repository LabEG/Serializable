/**
 * Default error handler for type mismatch errors during deserialization.
 * This function is called when a JSON value cannot be converted to any of the expected types
 * for a property. By default, it logs an error to the console.
 *
 * @param {object} self - The object instance being deserialized
 * @param {string} prop - The name of the property that has a type mismatch
 * @param {string} message - A descriptive error message explaining the type issue
 * @param {unknown} jsonValue - The actual JSON value that caused the type mismatch
 *
 * @remarks
 * This function is used for objects that don't extend the Serializable class.
 * For Serializable instances, the instance method `onWrongType` is called instead,
 * which can be overridden for custom error handling.
 *
 * @example
 * ```typescript
 * // Called internally when type mismatch occurs:
 * onWrongType(userObj, "age", "is invalid", "not-a-number");
 * // Console output: "User.fromJSON: json.age is invalid: not-a-number"
 * ```
 */
// eslint-disable-next-line max-params
export const onWrongType = (self: object, prop: string, message: string, jsonValue: unknown): void => {
    // eslint-disable-next-line no-console
    console.error(`${self.constructor.name}.fromJSON: json.${prop} ${message}:`, jsonValue);
};
