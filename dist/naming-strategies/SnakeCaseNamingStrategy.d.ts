import type { INamingStrategy } from "./INamingStrategy";
export declare class SnakeCaseNamingStrategy implements INamingStrategy {
    fromJsonName(name: string): string;
    toJsonName(name: string): string;
}
