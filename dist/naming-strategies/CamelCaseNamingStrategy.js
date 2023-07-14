export class CamelCaseNamingStrategy {
    fromJsonName(name) {
        return name.slice(0, 1).toUpperCase() + name.slice(1, name.length);
    }
    toJsonName(name) {
        return name.slice(0, 1).toLowerCase() + name.slice(1, name.length);
    }
}
