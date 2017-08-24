export declare class Serializable {
    fromJSON(json: object): this;
    toJSON(): object;
    protected onWrongType(propertyKey: string, wrongValue: Object | null): void;
}
