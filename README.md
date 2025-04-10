Serializable
=====

Small library for deserialization and serialization for JavaScript and TypeScript

Description
------

- For working, this library needs the Metadata Reflection API. If your platform (browser/Node.js) doesn't support it, you must use a polyfill. Example: [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)

- By default, the library doesn't crash on wrong types in JSON and returns the default value on the wrong property. If you need more secure behavior, you must override the method `onWrongType` on the `Serializable` object and throw an exception in this method, according to your logic.

Installation
------

You can use the following command to install this package:

``` bash
npm install ts-serializable
```

Usage
------

This example is written in TypeScript, but if you remove typing, it will also work in JavaScript.

```typescript
import { jsonProperty, Serializable } from "ts-serializable";

export class User extends Serializable {

    // @jsonProperty parameters are accepted types for JSON
    // properties. If a property in JSON is not found or
    // has an invalid type, it will return the default value.
    @jsonProperty(Number, null)
    public id: number | null = null; // default value is necessary

    @jsonProperty(String)
    public firstName: string = ''; // default value is necessary

    @jsonProperty(String)
    public familyName: string = ''; // default value is necessary

    @jsonProperty(String, void 0)
    public lastName?: string = void 0; // default value is necessary

    @jsonProperty(Date)
    public birthdate: Date = new Date(); // default value is necessary

    @jsonProperty([String])
    public tags: string[] = []; // default value is necessary

    @jsonProperty(OtherClassConstructor, null)
    public other: OtherClassConstructor | null = null; // default value is necessary

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
user.getFullName(); // works fine and returns a string
user.getAge(); // works fine and returns a number

// or
const user: User = User.fromJSON(json);
user.getFullName(); // works fine and returns a string
user.getAge(); // works fine and returns a number
```

Naming strategies
------

Supported conversion between different naming cases, such as SnakeCase, KebabCase, PascalCase and CamelCase. Also, you can set a custom name for a property of a JSON object.

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

If you need to create a view-model from a DTO or entities model, you can use the same model. Just add a VM property to the DTO or entities model and mark this property with the @jsonIgnore() decorator, and this property will not be serialized to JSON.

```typescript
import { jsonProperty, jsonIgnore, Serializable } from "ts-serializable";

export class User extends Serializable {

    @jsonProperty(String)
    public firstName: string = ''; // default value is necessary

    @jsonProperty(String)
    public familyName: string = ''; // default value is necessary

    @jsonIgnore()
    public isExpanded: boolean  = false;

}

const user = new User();
user.isExpanded = true;
JSON.stringify(user);
// Result: {"firstName":"","familyName":""}
```

Class to FormData
------

Sometimes classes contain properties with the File type. Sending such classes via JSON is a heavy task. Converting a file property to JSON can freeze the interface for a few seconds if the file is large. A much better solution is to send an Ajax form. Example:

```typescript
import { Serializable } from "ts-serializable";

export class User extends Serializable {

    public firstName: string = '';

    public familyName: File | null = null;

}

// ... send file function ...

await fetch("api/sendFile", {
    method: "POST",
    body: user.toFormData() // <- serialization class to FormData
});

```

Naming strategies, custom names, ignoring and other decorators are supported during conversion.

Bonus
------

Deep copy

```typescript
const newUser: User = new User().fromJSON(oldUser);
```
