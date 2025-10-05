/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import {getPropertyName} from "./GetPropertyName.js";

/**
 * Converts a class instance to FormData format for multipart/form-data HTTP requests.
 * This function recursively processes nested objects, arrays, and handles special types like File and Date.
 * Properties marked with @JsonIgnore decorator are excluded from the conversion.
 *
 * @param {object} obj - The class instance or object to convert to FormData
 * @param {string} [formPrefix] - Optional prefix for form property names (used for nested objects, e.g., "user.address")
 * @param {FormData} [formData] - Optional existing FormData instance to append to. If not provided, creates a new one
 * @returns {FormData} The FormData object containing all serialized properties
 *
 * @example
 * ```typescript
 * const user = {
 *   name: "John",
 *   age: 30,
 *   avatar: fileInput.files[0],
 *   address: { city: "New York" }
 * };
 * const formData = classToFormData(user);
 * // Results in FormData with entries:
 * // name: "John"
 * // age: "30"
 * // avatar: [File object]
 * // address.city: "New York"
 * ```
 *
 * @remarks
 * - File objects are appended directly to FormData
 * - Date objects are converted to ISO strings
 * - Null values are skipped
 * - Arrays are processed recursively with indices for nested objects
 * - Nested objects use dot notation for property names
 */
export const classToFormData = (obj: object, formPrefix?: string, formData?: FormData) => {
    const newFormData = formData ?? new FormData();
    const keys = Reflect.ownKeys(obj);

    for (const key of keys) {
        if (typeof key === "symbol") {
            // eslint-disable-next-line no-continue
            continue;
        }

        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            if (Reflect.getMetadata("ts-serializable:jsonIgnore", obj.constructor.prototype, key) !== true) {
                const name = formPrefix ?
                    `${formPrefix}.${getPropertyName(obj, key)}` :
                    getPropertyName(obj, key);

                /*
                 * The function is defined inside the function to capture variables and
                 * solve the problem of order of definition.
                 */
                const processValue = (value: unknown, index?: number): void => {
                    if (Array.isArray(value)) {
                        for (const [oneIndex, oneVal] of value.entries()) {
                            processValue(oneVal, oneIndex);
                        }
                    } else if (value === null) {
                        // Null is not sent in the form.
                    } else if (value instanceof File) {
                        newFormData.append(name, value);
                    } else if (value instanceof Date) {
                        newFormData.append(name, value.toISOString());
                    } else if (typeof value === "object") {
                        let prefix = name;

                        // For arrays of objects in form need add index
                        if (typeof index === "number") {
                            prefix += `[${index.toString()}]`;
                        }

                        classToFormData(value, prefix, newFormData);
                    } else {
                        // eslint-disable-next-line @typescript-eslint/no-base-to-string
                        newFormData.append(name, String(value));
                    }
                };

                const uValue: unknown = Reflect.get(obj, key);
                processValue(uValue);
            }
        }
    }

    return newFormData;
};
