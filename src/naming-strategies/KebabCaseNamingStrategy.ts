import type {INamingStrategy} from "./INamingStrategy.js";

export class KebabCaseNamingStrategy implements INamingStrategy {

    public fromJsonName (name: string): string {
        return name.replace(
            /-\w/gu,
            (group: string) => group[1].toUpperCase()
        );
    }

    public toJsonName (name: string): string {
        return name
            .split(/(?=[A-Z])/u)
            .join("-")
            .toLowerCase();
    }

}
