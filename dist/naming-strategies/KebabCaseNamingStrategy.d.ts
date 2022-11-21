import type { INamingStrategy } from "./INamingStrategy.js";
export declare class KebabCaseNamingStrategy implements INamingStrategy {
    fromJsonName(name: string): string;
    toJsonName(name: string): string;
}
