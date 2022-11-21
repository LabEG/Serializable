import type { INamingStrategy } from "./INamingStrategy.js";
export declare class SnakeCaseNamingStrategy implements INamingStrategy {
    fromJsonName(name: string): string;
    toJsonName(name: string): string;
}
