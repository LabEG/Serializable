Serializable
=====

Small library for deserialization and serialization for javascript and typescript

Description
------

- For working this library needed Metadata Reflection API. If your platform (browser/nodejs) don't support it you must use polifyll. Example: [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)

- By default library don't crash on wrong types in json and return default value on wrong property. If you need more secure behavior you must override method `onWrongType` on `Serializable` object and drop exception in this method, by your logic want.

Installation
------

You can use the following command to install this package:

``` bash
npm install ts-serializable
```

Usage
------

This example writed on typescript, but if remove typing, then him will work and on javascript.

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
    public birthdate: Date = new Date(); // default value necessarily

    @jsonProperty([String])
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
        return new Date().getFullYear() - this.birthdate.getFullYear();
    }
}

/**
* Without Serializable
*/
const user: object = JSON.parse(json);
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
const user: User = User.fromJSON(json);
user.getFullName(); // work fine and return string
user.getAge(); // work fine and return number
```

Naming strategies
------

Supported conversion between different naming cases, such as SnakeCase, KebabCase, PascalCase and CamelCase. Also you can set custom name for property of json object.

```typescript
const json = {
    first_name: "Jack",
    last_name: "Sparrow",
    date_of_birth: "1690-05-05T21:29:43.000Z",
    "very::strange::json:name": "I love jewelry"
};

@jsonObject({ namingStrategy: new SnakeCaseNamingStrategy() })
class User extends Serializable {

    @jsonProperty(String, null)
    public firstName: string | null = null;

    @jsonProperty(String, null)
    public lastName: string | null = null;

    @jsonProperty(Date, null)
    public dateOfBirth: Date | null = null;

    @jsonName("very::strange::json:name")
    @jsonProperty(String, null)
    public veryStrangePropertyName: string | null = null;

}

const user = new User().fromJSON(json);

user.firstName === json.first_name; // true
user.lastName === json.last_name; // true
user.dateOfBirth?.toISOString() === json.date_of_birth; // true
user.veryStrangePropertyName === json["very::strange::json:name"]; // true
```

Settings
------

How to specify settings:

```typescript
// Global settings
Serializable.defaultSettings: SerializationSettings = { ...options };

// By object settings
@jsonObject(settings?: Partial<SerializationSettings>)
class User extends Serializable { ...code }

// By method settings
new User().fromJSON(json: object, settings?: Partial<SerializationSettings>);
```

Supported settings:

- **namingStrategy**, INamingStrategy, default null - property name conversion strategies.
- **dateFormatHandling**, enum, default IsoDateFormat - ...coming soon.
- **missingMemberHandling**, enum, default Ignore - ...coming soon.
- **referenceLoopHandling**, enum, default Serialize - ...coming soon.
- **nullValueHandling**, enum, default Include - ...coming soon.
- **defaultValueHandling**, enum, default Ignore - ...coming soon.
- **logLevel**, enum, default Warning - ...coming soon.

View-Models from Backend Models
------

If you need to create view-model from dto or entities model you can use same model. Just add VM property to dto or entities model and mark this property by @jsonIgnore() decorator and this property will not be serialized to json.

```typescript
import { jsonProperty, jsonIgnore, Serializable } from "ts-serializable";

export class User extends Serializable {

    @jsonProperty(String)
    public firstName: string = ''; // default value necessarily

    @jsonProperty(String)
    public familyName: string = ''; // default value necessarily

    @jsonIgnore()
    public isExpanded: boolean  = false;

}

const user = new User();
user.isExpanded = true;
JSON.stringify(user);
// Result: {"firstName":"","familyName":""}
```

Bonus
------

Deep copy

```typescript
const newUser: User = new User().fromJSON(oldUser);
```
