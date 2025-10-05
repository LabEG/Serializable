/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {Serializable} from "../classes/Serializable.js";
import {SerializationSettings} from "../models/SerializationSettings.js";

/**
 * Determines the final JSON property name based on decorators, settings, and naming strategies.
 * This function applies transformations in the following priority order:
 * 1. @JsonName decorator (highest priority)
 * 2. Naming strategy from method-level settings parameter
 * 3. Naming strategy from @JsonObject decorator on the class
 * 4. Naming strategy from Serializable.defaultSettings
 * 5. Original property name (no transformation)
 *
 * @param {object} obj - The object instance containing the property
 * @param {string} property - The original property name as defined in the class
 * @param {Partial<SerializationSettings>} [settings] - Optional settings that may include a naming strategy
 * @returns {string} The transformed property name to use in JSON output
 *
 * @example
 * ```typescript
 * // With @JsonName decorator
 * class User {
 *   @JsonName("user_id")
 *   userId: string;
 * }
 * getPropertyName(user, "userId"); // Returns "user_id"
 *
 * // With snake_case naming strategy
 * class Product {
 *   @JsonProperty()
 *   productName: string;
 * }
 * getPropertyName(product, "productName", { namingStrategy: new SnakeCaseNamingStrategy() });
 * // Returns "product_name"
 * ```
 *
 * @remarks
 * The @JsonName decorator always takes precedence over any naming strategy.
 * Naming strategies can transform property names to conventions like snake_case, kebab-case, PascalCase, etc.
 */
export const getPropertyName = (obj: object, property: string, settings?: Partial<SerializationSettings>) => {
    if (Reflect.hasMetadata("ts-serializable:jsonName", obj.constructor.prototype, property)) {
        return Reflect.getMetadata("ts-serializable:jsonName", obj.constructor.prototype, property) as string;
    }

    if (settings?.namingStrategy) {
        return settings.namingStrategy.toJsonName(property);
    }

    if (Reflect.hasMetadata("ts-serializable:jsonObject", obj.constructor)) {
        const objectSettings: Partial<SerializationSettings> = Reflect.getMetadata(
            "ts-serializable:jsonObject",
            obj.constructor
        ) as Partial<SerializationSettings>;
        return objectSettings.namingStrategy?.toJsonName(property) ?? property;
    }

    if (Serializable.defaultSettings.namingStrategy) {
        const {namingStrategy} = Serializable.defaultSettings;
        return namingStrategy.toJsonName(property);
    }

    return property;
};

