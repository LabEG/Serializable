
import { AcceptedTypes } from './../models/AcceptedType';

/**
 * //todo: write jsdoc
 * 
 * @export
 * @class Serializable
 */
export class Serializable {

    /**
     * //todo: write jsdoc
     * 
     * @static
     * @param {object} json 
     * @returns {Object} 
     * @memberof Serializable
     */
    public static fromJSON(json: object): Object {
        return new this().fromJSON(json);
    }

    /**
     * //todo: write jsdoc
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
            if (json.hasOwnProperty(prop) && this.hasOwnProperty(prop)) {

                const acceptedTypes: AcceptedTypes[] = Reflect.getMetadata(
                    'ts-serializable:jsonTypes',
                    this.constructor.prototype,
                    prop
                );

                const jsonValue: Object | null | void = Reflect.get(json, prop);

                Reflect.set(
                    this,
                    prop,
                    this.deserializeProperty(this, prop, acceptedTypes, jsonValue)
                );

            }
        }

        return this;
    }

    /**
     * //todo: write jsdoc
     * 
     * @returns {object} 
     * @memberof Serializable
     */
    public toJSON(): object {
        return Object.assign({}, this);
    }

    /**
     * //todo: write jsdoc
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

                let unicodeTime: number = new Date("0000-01-01T00:00:00.000").getTime(); // 0 year, 0 month, 0 days, 0 hours, 0 minutes, 0 seconds
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
                    return this.deserializeProperty(this, prop, acceptedType, arrayValue);
                });

            } else if ( // Serializable
                jsonValue !== null &&
                jsonValue !== void 0 &&
                typeof jsonValue === 'object' && !Array.isArray(jsonValue)
            ) {
                const typeConstructor: new () => Serializable = acceptedType as new () => Serializable;
                return new typeConstructor().fromJSON(jsonValue);
            }

        }

        // process wrong type and return default value
        this.onWrongType(prop, `is invalid`, jsonValue);
        return Reflect.get(this, prop);

    }
}
