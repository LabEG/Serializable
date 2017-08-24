
type AnyType = object | String | Number | Boolean | Symbol | Date | null | void; // ts object it js Object

export class Serializable {

    // for next project
    public fromJSON(json: object): this {

        if (
            json === null ||
            Array.isArray(json) ||
            typeof json !== 'object'
        ) {
            this.onCriticalException(`${this.constructor.name}.fromJSON: json is not object: ${json}`);
        }

        for (const prop in json) {

            // json.hasOwnProperty(prop) - preserve for deserialization for other classes with methods
            if (json.hasOwnProperty(prop) && this.hasOwnProperty(prop)) {

                const acceptedTypes: (AnyType | AnyType[])[] =
                    Reflect.getMetadata('ts-serializable:jsonTypes', this.constructor.prototype, prop);

                const jsonValue: AnyType = Reflect.get(json, prop);

                for (const type in acceptedTypes) { // type Symbol is not a property

                    // null
                    if (acceptedTypes[type] === null && jsonValue === null) {
                        console.log('11111111111111111111111111111 to null');
                        Reflect.set(this, prop, null);
                        break;
                    }

                    // void, for classes only, json don't have void type
                    if (acceptedTypes[type] === void 0 && jsonValue === void 0) {
                        console.log('11111111111111111111111111111 to void');
                        Reflect.set(this, prop, void 0);
                        break;
                    }

                    // string, String
                    if (acceptedTypes[type] === String && (typeof jsonValue === 'string' || jsonValue instanceof String)) {
                        console.log('11111111111111111111111111111 to string', jsonValue);
                        Reflect.set(this, prop, String(jsonValue));
                        break;
                    }

                    // number, Number
                    if (acceptedTypes[type] === Number && (typeof jsonValue === 'number' || jsonValue instanceof Number)) {
                        console.log('11111111111111111111111111111 to number', jsonValue);
                        Reflect.set(this, prop, Number(jsonValue));
                        break;
                    }

                    // boolean, Boolean
                    if (acceptedTypes[type] === Boolean && (typeof jsonValue === 'boolean' || jsonValue instanceof Boolean)) {
                        console.log('11111111111111111111111111111 to boolean', jsonValue);
                        Reflect.set(this, prop, Boolean(jsonValue));
                        break;
                    }

                    // Date
                    if (acceptedTypes[type] === Date && (typeof jsonValue === 'string' || jsonValue instanceof String || jsonValue instanceof Date)) {

                        let unicodeTime: number = 0;
                        if (typeof jsonValue === 'string') {
                            unicodeTime = Date.parse(jsonValue);
                        } else if (jsonValue instanceof String) {
                            unicodeTime = Date.parse(String(jsonValue));
                        } else if (jsonValue instanceof Date) {
                            unicodeTime = jsonValue.getTime();
                        }
                        if (isNaN(unicodeTime) || typeof unicodeTime !== 'number') { // preserve invalid time
                            this.onCriticalException(`${this.constructor.name}.fromJSON: json.${prop} is invalid date: ${jsonValue}`);
                        }
                        console.log('11111111111111111111111111111 to date', new Date(unicodeTime));
                        Reflect.set(this, prop, new Date(unicodeTime));
                        break;
                    }

                    // object, Object
                    if (acceptedTypes[type] === Object && (typeof jsonValue === 'object' && !Array.isArray(jsonValue))) {

                        // todo: check on serializable

                        console.log('11111111111111111111111111111 to object', jsonValue);
                        Reflect.set(this, prop, Object(jsonValue));
                        continue;
                    }

                    // Array
                    if (acceptedTypes[type] === Array && Array.isArray(jsonValue)) {
                        console.log('11111111111111111111111111111 to array', jsonValue);
                        Reflect.set(this, prop, Object(jsonValue));
                        continue;
                    }

                }

            }
        }

        return this;
    }

    public toJSON(): object {
        return Object.assign({}, this);
    }

    protected onWrongType(propertyKey: string, wrongValue: Object | null): void {
        console.error(`${this.constructor.name}.fromJSON: json.${propertyKey} is invalid: `, wrongValue);
    }

    protected onCriticalException(message: string): void {
        throw new Error(message);
    }

}
