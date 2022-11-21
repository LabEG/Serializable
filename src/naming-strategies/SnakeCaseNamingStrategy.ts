import type {INamingStrategy} from "./INamingStrategy.js";

export class SnakeCaseNamingStrategy implements INamingStrategy {

    public fromJsonName (name: string): string {
        return name.replace(
            /_\w/gu,
            (group: string) => group[1].toUpperCase()
        );
    }

    public toJsonName (name: string): string {
        return name
            .split(/(?=[A-Z])/u)
            .join("_")
            .toLowerCase();
    }

}
