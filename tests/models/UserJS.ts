import { jsonObject, jsonIgnore } from "../../src";

@jsonObject(void 0, true)
export class FriendJS {

    public fromJSON!: (json: object) => this;

    public id: number = 0;

    public name: string = "";

}

@jsonObject(void 0, true)
export class UserJS {

    public fromJSON!: (json: object) => this;

    public id?: string = "";

    public index: number = 0;

    public guid: string = "";

    public isActive: boolean = false;

    public balance: string = "";

    public picture: string = "";

    public age: number = 0;

    public eyeColor: string = "";

    public name: string = "";

    public gender: string = "";

    public company: string = "";

    public email: string = "";

    public phone: string = "";

    public address: string = "";

    public about: string = "";

    public registered: Date | null = null;

    public latitude: number = 0;

    public longitude: number = 0;

    public tags: string[] = [];

    public friends: FriendJS[] = [];

    public greeting: string = "";

    public favoriteFruit: string = "";

    @jsonIgnore()
    public isExpanded: boolean = false;

}
