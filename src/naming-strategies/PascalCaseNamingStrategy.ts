import type {INamingStrategy} from "./INamingStrategy.js";

export class PascalCaseNamingStrategy implements INamingStrategy {

    public fromJsonName (name: string): string {
        return name.slice(0, 1).toLowerCase() + name.slice(1, name.length);
    }

    public toJsonName (name: string): string {
        return name.slice(0, 1).toUpperCase() + name.slice(1, name.length);
    }

}
