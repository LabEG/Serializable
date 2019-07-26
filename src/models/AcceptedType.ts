export type AcceptedType = null |
    void |
    BooleanConstructor |
    NumberConstructor |
    StringConstructor |
    ObjectConstructor |
    (new (...args: (Object | null | void)[]) => object) |
    // extended deserialization
    DateConstructor |
    SymbolConstructor; // todo: ArrayBufferConstructor, MapConstructor, RegExpConstructor and many others...

interface IRecursiveArray<T> extends Array<T | IRecursiveArray<T>> {
}

export type AcceptedTypes = AcceptedType | IRecursiveArray<AcceptedType>;
