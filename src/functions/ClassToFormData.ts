/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import {getPropertyName} from "./GetPropertyName.js";

/**
 * Converts a class instance to FormData for use in AJAX forms.
 *
 * @param {object} obj - The class instance to convert.
 * @param {string} [formPrefix] - Optional prefix for form property names.
 * @param {FormData} [formData] - Optional existing FormData to update.
 * @returns {FormData} - The resulting FormData object.
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
