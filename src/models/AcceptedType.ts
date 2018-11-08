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

interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {
}

export type AcceptedTypes = AcceptedType | RecursiveArray<AcceptedType>;
