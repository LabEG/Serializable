import { INamingStrategy } from "./INamingStrategy";
export declare class PascalCaseNamingStrategy implements INamingStrategy {
    fromJsonName(name: string): string;
    toJsonName(name: string): string;
}
