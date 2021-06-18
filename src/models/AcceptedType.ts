/* eslint-disable @typescript-eslint/no-type-alias */

// eslint-disable-next-line @typescript-eslint/sort-type-union-intersection-members
export type AcceptedType = null |
void |
BooleanConstructor |
NumberConstructor |
StringConstructor |
ObjectConstructor |
(new (...args: (Object | null | void)[]) => object) |
// extended deserialization
DateConstructor |
SymbolConstructor; // add ArrayBufferConstructor, MapConstructor, RegExpConstructor and many others...

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IRecursiveArray<T> extends Array<IRecursiveArray<T> | T> {
}

export type AcceptedTypes = AcceptedType | IRecursiveArray<AcceptedType>;
