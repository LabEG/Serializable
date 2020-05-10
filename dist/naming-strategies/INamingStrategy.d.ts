export interface INamingStrategy {
    fromJsonName: (name: string) => string;
    toJsonName: (name: string) => string;
}
