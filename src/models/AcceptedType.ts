/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable @typescript-eslint/no-type-alias */

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
    // Add ArrayBufferConstructor, MapConstructor, RegExpConstructor and many others...

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IRecursiveArray<T> extends Array<IRecursiveArray<T> | T> {
}

export type AcceptedTypes = AcceptedType | IRecursiveArray<AcceptedType>;
