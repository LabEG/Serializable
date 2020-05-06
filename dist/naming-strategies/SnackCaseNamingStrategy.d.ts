import { INamingStrategy } from "./INamingStrategy";
export declare class SnackCaseNamingStrategy implements INamingStrategy {
    fromJsonName(name: string): string;
    toJsonName(name: string): string;
}
