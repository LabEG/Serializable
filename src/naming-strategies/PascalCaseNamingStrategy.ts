/* eslint-disable class-methods-use-this */

import type {INamingStrategy} from "./INamingStrategy.js";

/**
 * Naming strategy for converting property names to Pascal case.
 */
export class PascalCaseNamingStrategy implements INamingStrategy {

    /**
     * Converts a JSON property name to a Pascal case property name.
     *
     * @param {string} name - The JSON property name.
     * @returns {string} - The Pascal case property name.
     */
    public fromJsonName (name: string): string {
        return name.slice(0, 1).toLowerCase() + name.slice(1, name.length);
    }

    /**
     * Converts a Pascal case property name to a JSON property name.
     *
     * @param {string} name - The Pascal case property name.
     * @returns {string} - The JSON property name.
     */
    public toJsonName (name: string): string {
        return name.slice(0, 1).toUpperCase() + name.slice(1, name.length);
    }

}
