import { Serializable } from "./../../src/classes/Serializable";
export declare class Friend extends Serializable {
    id: number;
    name: string;
}
export declare class User extends Serializable {
    _id?: string;
    index: number;
    guid: string;
    isActive: boolean;
    balance: string;
    picture: string;
    age: number;
    eyeColor: string;
    name: string;
    gender: string;
    company: string;
    email: string;
    phone: string;
    address: string;
    about: string;
    registered: string;
    latitude: number;
    longitude: number;
    tags: string[];
    friends: Friend[];
    greeting: string;
    favoriteFruit: string;
}
