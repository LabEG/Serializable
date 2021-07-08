/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Serializable } from "../classes/Serializable";
export const jsonObject = (settings, extend) => (target) => {
    if (extend === true) {
        Reflect.set(target, "defaultSettings", Serializable.defaultSettings);
        Reflect.set(target, "fromJSON", Serializable.fromJSON);
        Reflect.set(target.prototype, "fromJSON", Serializable.prototype.fromJSON);
        Reflect.set(target.prototype, "deserializeProperty", Serializable.prototype.deserializeProperty);
        Reflect.set(target.prototype, "getJsonPropertyName", Serializable.prototype.getJsonPropertyName);
        Reflect.set(target.prototype, "onWrongType", Serializable.prototype.onWrongType);
        Reflect.set(target.prototype, "toJSON", Serializable.prototype.toJSON);
        Reflect.defineMetadata("ts-serializable:jsonObjectExtended", true, target);
    }
    if (settings) {
        Reflect.defineMetadata("ts-serializable:jsonObject", settings, target);
    }
};
