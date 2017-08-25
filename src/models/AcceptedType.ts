
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

export type AcceptedTypes = AcceptedType |
                            Array<AcceptedType> |
                            Array<Array<AcceptedType>> |
                            Array<Array<Array<AcceptedType>>> |
                            Array<Array<Array<Array<AcceptedType>>>> |
                            Array<Array<Array<Array<Array<AcceptedType>>>>> |
                            Array<Array<Array<Array<Array<Array<AcceptedType>>>>>> |
                            Array<Array<Array<Array<Array<Array<Array<AcceptedType>>>>>>> |
                            Array<Array<Array<Array<Array<Array<Array<Array<AcceptedType>>>>>>>> |
                            Array<Array<Array<Array<Array<Array<Array<Array<Array<AcceptedType>>>>>>>>> |
                            Array<Array<Array<Array<Array<Array<Array<Array<Array<Array<AcceptedType>>>>>>>>>>;
