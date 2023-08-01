/* eslint-disable max-classes-per-file */
import {jsonProperty} from "../../src/decorators/JsonProperty";
import {Serializable} from "../../src/classes/Serializable";

export class Status extends Serializable {

    @jsonProperty(Number)
    public id: number = 0;

    @jsonProperty(String)
    public name: string = "";

}

export class Task extends Serializable {

    @jsonProperty(String)
    public uuid: string | null = null;

    @jsonProperty(String)
    public title: string | null = null;

    @jsonProperty(String)
    public description: string | null = null;

    @jsonProperty(Status)
    public status: Status | null = null;

    @jsonProperty(String)
    public createdAt: string | null = null;

    @jsonProperty([Task])
    public subTasks: Task[] | null = null;

}
