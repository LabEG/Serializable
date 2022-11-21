export type AcceptedType = BooleanConstructor | DateConstructor | NumberConstructor | ObjectConstructor | StringConstructor | SymbolConstructor | (new (...args: unknown[]) => object) | null | void;
interface IRecursiveArray<T> extends Array<IRecursiveArray<T> | T> {
}
export type AcceptedTypes = AcceptedType | IRecursiveArray<AcceptedType>;
export {};
