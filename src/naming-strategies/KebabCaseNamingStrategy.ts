/* eslint-disable class-methods-use-this */

import type {INamingStrategy} from "./INamingStrategy.js";

/**
 * Naming strategy for converting property names to kebab case.
 */
export class KebabCaseNamingStrategy implements INamingStrategy {

    /**
     * Converts a JSON property name to a kebab case property name.
     *
     * @param {string} name - The JSON property name.
     * @returns {string} - The kebab case property name.
     */
    public fromJsonName (name: string): string {
        return name.replace(
            /-\w/gu,
            (group: string) => group[1].toUpperCase()
        );
    }

    /**
     * Converts a kebab case property name to a JSON property name.
     *
     * @param {string} name - The kebab case property name.
     * @returns {string} - The JSON property name.
     */
    public toJsonName (name: string): string {
        return name
            .split(/(?=[A-Z])/u)
            .join("-")
            .toLowerCase();
    }

}
