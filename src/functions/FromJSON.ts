

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import {Serializable} from "../classes/Serializable";
import {AcceptedTypes} from "../models/AcceptedType";
import {SerializationSettings} from "../models/SerializationSettings";
import {deserializeProperty} from "./DeserializeProperty";
import {getPropertyName} from "./GetProperyName.js";
import {onWrongType} from "./OnWrongType.js";

// eslint-disable-next-line max-statements
export const fromJSON = <T extends (Serializable | object)>(obj: T, json: object, settings?: Partial<SerializationSettings>): T => {
    const unknownJson: unknown = json;

    if (
        unknownJson === null ||
        Array.isArray(unknownJson) ||
        typeof unknownJson !== "object"
    ) {
        if (obj instanceof Serializable) {
            obj.onWrongType(String(unknownJson), "is not an object", unknownJson);
        } else {
            onWrongType(obj, String(unknownJson), "is not an object", unknownJson);
        }
        return obj;
    }

    // eslint-disable-next-line guard-for-in
    for (const thisProp in obj) {
        // Naming strategy and jsonName decorator
        let jsonProp: string = obj instanceof Serializable ?
            obj.getJsonPropertyName(thisProp, settings) :
            getPropertyName(obj, thisProp, settings);

        // For deep copy
        if (!unknownJson?.hasOwnProperty(jsonProp) && unknownJson?.hasOwnProperty(thisProp)) {
            jsonProp = thisProp;
        }

        if (
            unknownJson?.hasOwnProperty(jsonProp) &&
            obj.hasOwnProperty(thisProp) &&
            Reflect.hasMetadata("ts-serializable:jsonTypes", obj.constructor.prototype, thisProp)
        ) {
            const acceptedTypes: AcceptedTypes[] = Reflect.getMetadata(
                "ts-serializable:jsonTypes",
                obj.constructor.prototype,
                thisProp
            ) as [];
            const jsonValue: unknown = Reflect.get(unknownJson, jsonProp) as unknown;

            const extractedValue = obj instanceof Serializable ?
                obj.deserializeProperty(thisProp, acceptedTypes, jsonValue, settings) :
                deserializeProperty(obj, thisProp, acceptedTypes, jsonValue, settings);

            Reflect.set(obj, thisProp, extractedValue);
        }
    }

    return obj;
};

