/* eslint-disable @typescript-eslint/no-invalid-void-type */

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

type IRecursiveArray<T> = (IRecursiveArray<T> | T)[];

export type AcceptedTypes = AcceptedType | IRecursiveArray<AcceptedType>;
