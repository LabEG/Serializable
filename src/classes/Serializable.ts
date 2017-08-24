
export type AnyConstructor = (new () => object | String | Number | Boolean | Symbol | Date) | null | void; // ts object it js Object

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

                const acceptedTypes: (AnyConstructor | AnyConstructor[])[] =
                    Reflect.getMetadata('ts-serializable:jsonTypes', this.constructor.prototype, prop);

                const jsonValue: AnyConstructor = Reflect.get(json, prop);

                for (const type in acceptedTypes) { // type Symbol is not a property

                    const acceptedType: AnyConstructor | AnyConstructor[] = acceptedTypes[type];

                    // null
                    if (acceptedType === null && jsonValue === null) {
                        Reflect.set(this, prop, null);
                        break;
                    }

                    // void, for classes only, json don't have void type
                    if (acceptedType === void 0 && jsonValue === void 0) {
                        Reflect.set(this, prop, void 0);
                        break;
                    }

                    // string, String
                    if (acceptedType === String && (typeof jsonValue === 'string' || jsonValue instanceof String)) {
                        Reflect.set(this, prop, String(jsonValue));
                        break;
                    }

                    // number, Number
                    if (acceptedType === Number && (typeof jsonValue === 'number' || jsonValue instanceof Number)) {
                        Reflect.set(this, prop, Number(jsonValue));
                        break;
                    }

                    // boolean, Boolean
                    if (acceptedType === Boolean && (typeof jsonValue === 'boolean' || jsonValue instanceof Boolean)) {
                        Reflect.set(this, prop, Boolean(jsonValue));
                        break;
                    }

                    // Date
                    if (acceptedType === Date && (typeof jsonValue === 'string' || jsonValue instanceof String || jsonValue instanceof Date)) {

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
                        Reflect.set(this, prop, new Date(unicodeTime));
                        break;
                    }

                    // object, Object
                    if (
                        acceptedType !== null &&
                        acceptedType !== void 0 &&
                        acceptedType !== Array &&
                        acceptedType.constructor.prototype instanceof Object &&
                        (typeof jsonValue === 'object' && !Array.isArray(jsonValue))
                    ) {
                        if (acceptedType.constructor.prototype instanceof Serializable) {
                            const typeConstructor: new () => Serializable = acceptedType as new () => Serializable;
                            Reflect.set(this, prop, new typeConstructor().fromJSON(jsonValue as any));
                        } else {
                            Reflect.set(this, prop, Object(jsonValue));
                        }
                        break;
                    }

                    // Array
                    if (Array.isArray(acceptedType) && Array.isArray(jsonValue)) {

                        const arrayType: AnyConstructor = (acceptedType as Array<AnyConstructor>)[0];

                        if (arrayType === void 0) {
                            this.onCriticalException(`${this.constructor.name}.fromJSON: json.${prop} invalid type: ${JSON.stringify(acceptedType)}`);
                        }

                        Reflect.set(
                            this,
                            prop,
                            jsonValue.map((arrayValue: AnyConstructor) => {

                                if (arrayType === null && arrayValue === null) {
                                    return null;
                                }

                                if (arrayType === void 0 && arrayValue === void 0) {
                                    return void 0;
                                }

                                if (arrayType === String && (typeof arrayValue === 'string' || arrayValue instanceof String)) {
                                    return String(arrayValue);
                                }

                                if (arrayType === Number && (typeof arrayValue === 'number' || arrayValue instanceof Number)) {
                                    return Number(arrayValue);
                                }

                                if (arrayType === Boolean && (typeof arrayValue === 'boolean' || arrayValue instanceof Boolean)) {
                                    return Boolean(arrayValue);
                                }

                                if (arrayType === Date && (typeof arrayValue === 'string' || arrayValue instanceof String || arrayValue instanceof Date)) {

                                    let unicodeTime: number = 0;
                                    if (typeof arrayValue === 'string') {
                                        unicodeTime = Date.parse(arrayValue);
                                    } else if (arrayValue instanceof String) {
                                        unicodeTime = Date.parse(String(arrayValue));
                                    } else if (arrayValue instanceof Date) {
                                        unicodeTime = arrayValue.getTime();
                                    }
                                    if (isNaN(unicodeTime) || typeof unicodeTime !== 'number') { // preserve invalid time
                                        this.onCriticalException(`${this.constructor.name}.fromJSON: json.${prop} is invalid date: ${arrayValue}`);
                                    }
                                    return new Date(unicodeTime);
                                }

                                if (
                                    arrayType !== null &&
                                    arrayType !== void 0 &&
                                    arrayType !== Array &&
                                    arrayType.constructor.prototype instanceof Object &&
                                    (typeof arrayValue === 'object' && !Array.isArray(arrayValue))
                                ) {

                                    console.log('222222222222222222222222', prop, arrayType, arrayType.constructor.prototype);

                                    if (arrayType.constructor.prototype instanceof Serializable) {

                                        console.log('3333333333333333333333333', prop, arrayValue);

                                        const typeConstructor: new () => Serializable = arrayType as new () => Serializable;
                                        return new typeConstructor().fromJSON(arrayValue as any);
                                    } else {
                                        return Object(arrayValue);
                                    }
                                }

                                if (true) {
                                    this.onCriticalException(
                                        `${this.constructor.name}.fromJSON: json.${prop} type in array must by ${arrayType}: ${arrayValue}`
                                    );
                                }

                                return arrayType;
                            })
                        );
                        break;
                    }

                    this.onWrongType(prop, jsonValue);

                }

            }
        }

        return this;
    }

    public toJSON(): object {
        return Object.assign({}, this);
    }

    protected onWrongType(propertyKey: string, wrongValue: AnyConstructor): void {
        console.error(`${this.constructor.name}.fromJSON: json.${propertyKey} is invalid: `, wrongValue);
    }

    protected onCriticalException(message: string): void {
        throw new Error(message);
    }

}
