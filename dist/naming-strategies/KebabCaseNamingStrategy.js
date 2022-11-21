export class KebabCaseNamingStrategy {
    fromJsonName(name) {
        return name.replace(/-\w/gu, (group) => group[1].toUpperCase());
    }
    toJsonName(name) {
        return name
            .split(/(?=[A-Z])/u)
            .join("-")
            .toLowerCase();
    }
}
