export class SnackCaseNamingStrategy {
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
