import type { INamingStrategy } from "./INamingStrategy";
export declare class SnackCaseNamingStrategy implements INamingStrategy {
    constructor();
    fromJsonName(name: string): string;
    toJsonName(name: string): string;
}
