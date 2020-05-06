import { INamingStrategy } from "./INamingStrategy";
export declare class KebabCaseNamingStrategy implements INamingStrategy {
    fromJsonName(name: string): string;
    toJsonName(name: string): string;
}
