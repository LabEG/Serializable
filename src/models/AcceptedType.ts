/* eslint-disable @typescript-eslint/no-invalid-void-type */

/**
 * Type definition for accepted types in serialization and deserialization.
 */
export type AcceptedType =
    BooleanConstructor |
    DateConstructor |
    NumberConstructor |
    ObjectConstructor |
    StringConstructor |

    // Extended deserialization
    SymbolConstructor |
    (new (...args: unknown[]) => object) |
    null |
    void;
// Add ArrayBufferConstructor, MapConstructor, RegExpConstructor, and many others...

type IRecursiveArray<T> = (IRecursiveArray<T> | T)[];

/**
 * Type definition for recursive arrays of accepted types.
 */
export type AcceptedTypes = AcceptedType | IRecursiveArray<AcceptedType>;
