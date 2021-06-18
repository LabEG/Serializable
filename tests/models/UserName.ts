import {Serializable, jsonProperty, jsonName} from "../../src";

export class UserNaming extends Serializable {

    @jsonName("user::profile::id")
    @jsonProperty(String)
    public id: string = "";

    @jsonName("user::profile::first:name")
    @jsonProperty(String)
    public firstName: string = "";

    @jsonName("user::profile::last:name")
    @jsonProperty(String)
    public lastName: string = "";

}
