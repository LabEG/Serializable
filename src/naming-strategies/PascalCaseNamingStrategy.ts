import { INamingStrategy } from "./INamingStrategy";

export class KebabCaseNamingStrategy implements INamingStrategy {

    public fromJsonName(name: string): string {
        throw new Error("Method not implemented.");
    }

    public toJsonName(name: string): string {
        throw new Error("Method not implemented.");
    }

}
