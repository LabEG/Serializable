import { jsonProperty } from "./../../src/decorators/JsonProperty";
import { Serializable } from "./../../src/classes/Serializable";

export class Friend extends Serializable {

  @jsonProperty(Number)
  public id: number;

  @jsonProperty(String)
  public name: string;

  constructor(text?: number){
    super();
  }

}

export class User extends Serializable {

  @jsonProperty(String, void 0, null)
  public _id?: string = "";

  @jsonProperty(Number)
  public index: number = 0;

  @jsonProperty(String)
  public guid: string = "";

  @jsonProperty(Boolean)
  public isActive: boolean = false;

  @jsonProperty(String)
  public balance: string = "";

  @jsonProperty(String)
  public picture: string = "";

  @jsonProperty(Number)
  public age: number = 0;

  @jsonProperty(String)
  public eyeColor: string = "";

  @jsonProperty(String)
  public name: string = "";

  @jsonProperty(String)
  public gender: string = "";

  @jsonProperty(String)
  public company: string = "";

  @jsonProperty(String)
  public email: string = "";

  @jsonProperty(String)
  public phone: string = "";

  @jsonProperty(String)
  public address: string = "";

  @jsonProperty(String)
  public about: string = "";

  @jsonProperty(Date, null)
  public registered: Date | null = null;

  @jsonProperty(Number)
  public latitude: number = 0;

  @jsonProperty(Number)
  public longitude: number = 0;

  @jsonProperty([String])
  public tags: string[] = [];

  @jsonProperty([Friend])
  public friends: Friend[] = [];

  @jsonProperty(String)
  public greeting: string = "";

  @jsonProperty(String)
  public favoriteFruit: string = "";

}
