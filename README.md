Serializable
=====

Small library for deserialization and serialization for javascript and typescript

Description:
------
- For working this library needed Metadata Reflection API. If your platform (browser/nodejs) don't support it you must use polifyll. Example: [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)
- By default library don't crash on wrong types in json and return default value on wrong property. If you need more secure behavior you must override method `onWrongType` on `Serializable` object and drop exception in this method, by your logic want.

Usage:
------

```typescript
import { jsonProperty, Serializable } from "ts-serializable";

export class User extends Serializable {

    // @jsonProperty parrameters is accepted types for json
    // properties, if property in json will not by found or
    // will have invalid type, then will return default value
    @jsonProperty(Number, null)
    public id: number | null = null; // default value necessarily
  
    @jsonProperty(String)
    public firstName: string = ''; // default value necessarily
  
    @jsonProperty(String)
    public familyName: string = ''; // default value necessarily
  
    @jsonProperty(String, void 0)
    public lastName?: string = void 0; // default value necessarily
    
    @jsonProperty(Date)
    public birthDate: Date = new Date(); // default value necessarily
    
    @jsonProperty([String]])
    public tags: string[] = []; // default value necessarily
    
    @jsonProperty(OtherClassConstructor, null)
    public other: OtherClassConstructor | null = null; // default value necessarily
    
    public getFullName(): string {
        return [
            this.firstName,
            this.familyName,
            this.lastName
        ].join(' ');
    }

    public getAge(): number {
        return new Date().getFullYear() - this.birthDate.getFullYear();
    }
}

/**
* Without Serializable
*/
const user: Object = JSON.parse(json);
user.getFullName();
// runtime exception: Uncaught TypeError: user.getFullName is not a function
user.getAge();
// runtime exception: Uncaught TypeError: user.getAge is not a function

/**
* With Serializable
*/
const user: User = new User().fromJSON(json);
user.getFullName(); // work fine and return string
user.getAge(); // work fine and return number

// or
const user: Object = User.fromJSON(json);
// next line in typescript only, typescript limitation
user = user instanceof User ? user : user;
user.getFullName(); // work fine and return string
user.getAge(); // work fine and return number
```

Bonus:
------

Deep copy
```typescript
const newUser: User = new User().fromJSON(oldUser);
```
