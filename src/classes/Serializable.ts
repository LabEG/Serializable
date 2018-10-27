import {AcceptedTypes} from './../models/AcceptedType';

/**
 * Class how help you deserialize object to classes.
 *
 * @export
 * @class Serializable
 */
export class Serializable {

    /**
     * Deserialize object from static method.
     *
     * Example:
     * const obj: MyObject = MyObject.fromJSON({...data});
     *
     * @static
     * @param {object} json
     * @returns {object}
     * @memberof Serializable
     */
    public static fromJSON(json: object): object {
        return new this().fromJSON(json);
    }

    /**
     * Fill property of current model by data from json.
     *
     * Example:
     * const obj: MyObject = new MyObject().fromJSON({...data});
     *
     * @param {object} json
     * @returns {this}
     * @memberof Serializable
     */
    public fromJSON(json: object): this {

        if (
            json === null ||
            Array.isArray(json) ||
            typeof json !== 'object'
        ) {
            this.onWrongType('', 'is not object', json);

            return this;
        }

        for (const prop in json) {

            // json.hasOwnProperty(prop) - preserve for deserialization for other classes with methods
            if (
                json.hasOwnProperty(prop) &&
                this.hasOwnProperty(prop) &&
                Reflect.hasMetadata('ts-serializable:jsonTypes', this.constructor.prototype)
            ) {

                const acceptedTypes: AcceptedTypes[] = Reflect.getMetadata(
                    'ts-serializable:jsonTypes',
                    this.constructor.prototype,
                    prop
                );

                const jsonValue: Object | null | void = Reflect.get(json, prop);

                Reflect.set(
                    this,
                    prop,
                    this.deserializeProperty(prop, acceptedTypes, jsonValue)
                );

            }
        }

        return this;
    }

    /**
     * Process serelization for @jsonIgnore decorator
     *
     * @returns {object}
     * @memberof Serializable
     */
    public toJSON(): object {

        const json = Object.assign({}, this);

        for (const prop in json) {

            // json.hasOwnProperty(prop) - preserve for deserialization for other classes with methods
            if (json.hasOwnProperty(prop) && this.hasOwnProperty(prop)) {

                const isIgnore: boolean | void = Reflect.getMetadata(
                    'ts-serializable:jsonIgnore',
                    this.constructor.prototype,
                    prop
                );

                if (isIgnore) {
                    Reflect.set(json, prop, void 0);
                }

            }
        }


        return json;
    }

    /**
     * Process exceptions from wrong types.
     * By default just print warning in console, but can by override for drop exception or logging to backend.
     *
     * @protected
     * @param {string} prop
     * @param {string} message
     * @param {(Object | null | void)} jsonValue
     * @memberof Serializable
     */
    protected onWrongType(prop: string, message: string, jsonValue: Object | null | void): void {
        console.error(`${this.constructor.name}.fromJSON: json.${prop} ${message}:`, jsonValue);
    }

    /**
     * //todo: write jsdoc
     *
     * @private
     * @param {object} object
     * @param {string} prop
     * @param {AcceptedTypes[]} acceptedTypes
     * @param {(Object | null | void)} jsonValue
     * @returns {(Object | null | void)}
     * @memberof Serializable
     */
    private deserializeProperty(
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

                // 0 year, 0 month, 0 days, 0 hours, 0 minutes, 0 seconds
                let unicodeTime: number = new Date('0000-01-01T00:00:00.000').getTime();
                if (typeof jsonValue === 'string') {
                    unicodeTime = Date.parse(jsonValue);
                } else if (jsonValue instanceof String) {
                    unicodeTime = Date.parse(String(jsonValue));
                } else if (jsonValue instanceof Date) {
                    unicodeTime = jsonValue.getTime();
                }
                if (isNaN(unicodeTime) || typeof unicodeTime !== 'number') { // preserve invalid time
                    this.onWrongType(prop, 'is invalid date', jsonValue);
                }

                return new Date(unicodeTime);

            } else if ( // Array
                Array.isArray(acceptedType)
                && Array.isArray(jsonValue)
            ) {

                if (acceptedType[0] === void 0) {
                    this.onWrongType(prop, 'invalid type', jsonValue);
                }

                return jsonValue.map((arrayValue: Object | void | null) => {
                    return this.deserializeProperty(prop, acceptedType, arrayValue);
                });

            } else if ( // Serializable
                acceptedType !== null &&
                acceptedType !== void 0 &&
                !Array.isArray(acceptedType) &&
                acceptedType.prototype instanceof Serializable &&
                jsonValue !== null &&
                jsonValue !== void 0 &&
                typeof jsonValue === 'object' && !Array.isArray(jsonValue)
            ) {

                const typeConstructor: new () => Serializable = acceptedType as new () => Serializable;

                return new typeConstructor().fromJSON(jsonValue);

            } else if ( // instance any other class, not Serializable, for parse from other classes instance
                acceptedType instanceof Function &&
                jsonValue instanceof acceptedType
            ) {

                return jsonValue;

            }

        }

        // process wrong type and return default value
        this.onWrongType(prop, `is invalid`, jsonValue);

        return Reflect.get(this, prop);

    }
}
