import type { INamingStrategy } from "./INamingStrategy";

export class SnackCaseNamingStrategy implements INamingStrategy {

    constructor() {
        // eslint-disable-next-line no-console
        console.warn("TS-Serializable: deprecated. Wrong name. Please use SnakeCaseNamingStrategy.");
    }

    public fromJsonName(name: string): string {
        return name.replace(
            /_\w/gu,
            (group: string) => group[1].toUpperCase()
        );
    }

    public toJsonName(name: string): string {
        return name
            .split(/(?=[A-Z])/u)
            .join("_")
            .toLowerCase();
    }

}
