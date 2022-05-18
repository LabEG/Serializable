export declare type AcceptedType = null | void | BooleanConstructor | NumberConstructor | StringConstructor | ObjectConstructor | (new (...args: unknown[]) => object) | DateConstructor | SymbolConstructor;
interface IRecursiveArray<T> extends Array<IRecursiveArray<T> | T> {
}
export declare type AcceptedTypes = AcceptedType | IRecursiveArray<AcceptedType>;
export {};
