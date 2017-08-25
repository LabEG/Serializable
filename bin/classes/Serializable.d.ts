/**
 * //todo: write jsdoc
 *
 * @export
 * @class Serializable
 */
export declare class Serializable {
    /**
     * //todo: write jsdoc
     *
     * @static
     * @param {object} json
     * @returns {Object}
     * @memberof Serializable
     */
    static fromJSON(json: object): Object;
    /**
     * //todo: write jsdoc
     *
     * @param {object} json
     * @returns {this}
     * @memberof Serializable
     */
    fromJSON(json: object): this;
    /**
     * //todo: write jsdoc
     *
     * @returns {object}
     * @memberof Serializable
     */
    toJSON(): object;
    /**
     * //todo: write jsdoc
     *
     * @protected
     * @param {string} prop
     * @param {string} message
     * @param {(Object | null | void)} jsonValue
     * @memberof Serializable
     */
    protected onWrongType(prop: string, message: string, jsonValue: Object | null | void): void;
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
    private deserializeProperty(object, prop, acceptedTypes, jsonValue);
}
