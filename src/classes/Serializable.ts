
import { AcceptedTypes } from './../models/AcceptedType';

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

                const acceptedTypes: AcceptedTypes[] = Reflect.getMetadata(
                    'ts-serializable:jsonTypes',
                    this.constructor.prototype,
                    prop
                );

                const jsonValue: AcceptedTypes = Reflect.get(json, prop);

                Reflect.set(
                    this,
                    prop,
                    this.deserializeProperty(this, prop, acceptedTypes, jsonValue)
                );

            }
        }

        return this;
    }

    public toJSON(): object {
        return Object.assign({}, this);
    }

    protected onWrongType(message: string): void {
        console.error(message);
    }

    private deserializeProperty(
        object: object,
        prop: string,
        acceptedTypes: AcceptedTypes[],
        jsonValue: Object | null | void
    ): Object | null | void {

        for (const type in acceptedTypes) { // type Symbol is not a property

            const acceptedType: AcceptedTypes = acceptedTypes[type];

            if ( // null
                acceptedType === null &&
                jsonValue === null
            ) {

                return null;

            } else if ( // void, for classes only, json don't have void type
                acceptedType === void 0 &&
                jsonValue === void 0
            ) {

                return void 0;

            } else if ( // boolean, Boolean
                acceptedType === Boolean &&
                (typeof jsonValue === 'boolean' || jsonValue instanceof Boolean)
            ) {

                return Boolean(jsonValue);

            } else if ( // number, Number
                acceptedType === Number &&
                (typeof jsonValue === 'number' || jsonValue instanceof Number)
            ) {

                return Number(jsonValue);

            } else if ( // string, String
                acceptedType === String &&
                (typeof jsonValue === 'string' || jsonValue instanceof String)
            ) {

                return String(jsonValue);

            } else if ( // object, Object
                acceptedType === Object &&
                (typeof jsonValue === 'object')
            ) {

                return Object(jsonValue);

            } else if ( // Date
                acceptedType === Date &&
                (typeof jsonValue === 'string' || jsonValue instanceof String || jsonValue instanceof Date)
            ) {

                let unicodeTime: number = 0;
                if (typeof jsonValue === 'string') {
                    unicodeTime = Date.parse(jsonValue);
                } else if (jsonValue instanceof String) {
                    unicodeTime = Date.parse(String(jsonValue));
                } else if (jsonValue instanceof Date) {
                    unicodeTime = jsonValue.getTime();
                }
                if (isNaN(unicodeTime) || typeof unicodeTime !== 'number') { // preserve invalid time
                    this.onWrongType(`${this.constructor.name}.fromJSON: json.${prop} is invalid date: ${jsonValue}`);
                }

                return new Date(unicodeTime);

            } else if ( // Array
                Array.isArray(acceptedType)
                && Array.isArray(jsonValue)
            ) {

                const arrayType: AcceptedTypes = (acceptedType as Array<AcceptedTypes>)[0];

                if (arrayType === void 0) {
                    this.onWrongType(`${this.constructor.name}.fromJSON: json.${prop} invalid type: ${JSON.stringify(acceptedType)}`);
                }

                return jsonValue.map((arrayValue: AcceptedTypes) => {

                });

            } else if ( // Serializable
                typeof jsonValue === 'object' && !Array.isArray(jsonValue)
            ) {
                // acceptedType.constructor.prototype instanceof Serializable

                const typeConstructor: new () => Serializable = acceptedType as new () => Serializable;
                return new typeConstructor().fromJSON(jsonValue as any);

            } else { // process wrong type

                this.onWrongType(`${this.constructor.name}.fromJSON: json.${prop} is invalid: ` + jsonValue);

            }

        }

    }
}
