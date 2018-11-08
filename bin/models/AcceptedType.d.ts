export declare type AcceptedType = null | void | BooleanConstructor | NumberConstructor | StringConstructor | ObjectConstructor | (new (...args: (Object | null | void)[]) => object) | DateConstructor | SymbolConstructor;
interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {
}
export declare type AcceptedTypes = AcceptedType | RecursiveArray<AcceptedType>;
export {};
