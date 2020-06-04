export class SnackCaseNamingStrategy {
    constructor() {
        // eslint-disable-next-line no-console
        console.warn("TS-Serializable: deprecated. Wrong name. Please use SnakeCaseNamingStrategy.");
    }
    fromJsonName(name) {
        return name.replace(/_\w/gu, (group) => group[1].toUpperCase());
    }
    toJsonName(name) {
        return name
            .split(/(?=[A-Z])/u)
            .join("_")
            .toLowerCase();
    }
}
