
// eslint-disable-next-line max-params
export const onWrongType = (self: object, prop: string, message: string, jsonValue: unknown): void => {
    // eslint-disable-next-line no-console
    console.error(`${self.constructor.name}.fromJSON: json.${prop} ${message}:`, jsonValue);
};
