import { jsonProperty } from "../../src/decorators/JsonProperty";
import { Serializable } from "../../src/classes/Serializable";
import { jsonIgnore } from "../../src/decorators/JsonIgnore";

export class FriendSnake extends Serializable {

    @jsonProperty(Number)
    public idSnake: number = 0;

    @jsonProperty(String)
    public nameSnake: string = "";

}

export class UserSnake extends Serializable {

    @jsonProperty(String)
    public idSnake?: string = "";

    @jsonProperty(Number)
    public indexSnake: number = 0;

    @jsonProperty(String)
    public guidSnake: string = "";

    @jsonProperty(Boolean)
    public isActiveSnake: boolean = false;

    @jsonProperty(String)
    public balanceSnake: string = "";

    @jsonProperty(String)
    public pictureSnake: string = "";

    @jsonProperty(Number)
    public ageSnake: number = 0;

    @jsonProperty(String)
    public eyeColorSnake: string = "";

    @jsonProperty(String)
    public nameSnake: string = "";

    @jsonProperty(String)
    public genderSnake: string = "";

    @jsonProperty(String)
    public companySnake: string = "";

    @jsonProperty(String)
    public emailSnake: string = "";

    @jsonProperty(String)
    public phoneSnake: string = "";

    @jsonProperty(String)
    public addressSnake: string = "";

    @jsonProperty(String)
    public aboutSnake: string = "";

    @jsonProperty(Date, null)
    public registeredSnake: Date | null = null;

    @jsonProperty(String)
    public latitudeSnake: string = "";

    @jsonProperty(String)
    public longitudeSnake: string = "";

    @jsonProperty([String])
    public tagsSnake: string[] = [];

    @jsonProperty([FriendSnake])
    public friendsSnake: FriendSnake[] = [];

    @jsonProperty(String)
    public greetingSnake: string = "";

    @jsonProperty(String)
    public favoriteFruitSnake: string = "";

    @jsonIgnore()
    public isExpandedSnake: boolean = false;

}
