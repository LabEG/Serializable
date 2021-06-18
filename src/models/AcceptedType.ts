/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/sort-type-union-intersection-members */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable @typescript-eslint/no-type-alias */
export type AcceptedType = null |
void |
BooleanConstructor |
NumberConstructor |
StringConstructor |
ObjectConstructor |
(new (...args: (Object | null | void)[]) => object) |
// Extended deserialization
DateConstructor |
SymbolConstructor; // Add ArrayBufferConstructor, MapConstructor, RegExpConstructor and many others...

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IRecursiveArray<T> extends Array<IRecursiveArray<T> | T> {
}

export type AcceptedTypes = AcceptedType | IRecursiveArray<AcceptedType>;
