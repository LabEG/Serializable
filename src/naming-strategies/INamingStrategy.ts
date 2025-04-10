/**
 * Interface for defining naming strategies for property names during serialization.
 */
export interface INamingStrategy {

    /**
     * Converts a JSON property name to a class property name.
     *
     * @param {string} name - The JSON property name.
     * @returns {string} - The class property name.
     */
    fromJsonName: (name: string) => string;

    /**
     * Converts a class property name to a JSON property name.
     *
     * @param {string} name - The class property name.
     * @returns {string} - The JSON property name.
     */
    toJsonName: (name: string) => string;

}
