/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-prototype-builtins */

import {Serializable} from "../classes/Serializable";
import {getPropertyName} from "./GetPropertyName";

export const toJSON = (obj: Serializable | object): Record<string, unknown> => {
    const toJson: Record<string, unknown> = {};
    const keys = Reflect.ownKeys(obj);

    for (const key of keys) {
        if (typeof key === "symbol") {
            // eslint-disable-next-line no-continue
            continue;
        }

        if (obj.hasOwnProperty(key)) {
            if (Reflect.getMetadata("ts-serializable:jsonIgnore", obj.constructor.prototype, key) !== true) {
                const toProp = obj instanceof Serializable ?
                    obj.getJsonPropertyName(key) :
                    getPropertyName(obj, key);
                Reflect.set(toJson, toProp, Reflect.get(obj, key));
            }
        }
    }

    return toJson;
};
