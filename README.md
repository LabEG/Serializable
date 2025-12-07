# ts-serializable

[![npm version](https://img.shields.io/npm/v/ts-serializable.svg)](https://www.npmjs.com/package/ts-serializable)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Powerful and flexible TypeScript/JavaScript library for serialization and deserialization with decorators

## ✨ Features

- 🎯 **Type-safe** - Convert JSON to strongly-typed class instances
- 🎨 **Decorator-based** - Clean and intuitive API using TypeScript decorators
- 🔄 **Bidirectional** - Serialize to JSON and deserialize from JSON
- 🐍 **Naming Strategies** - Support for snake_case, camelCase, PascalCase, kebab-case
- 📦 **Nested Objects** - Handle complex object hierarchies and arrays
- 🔒 **Flexible** - Works with or without class inheritance
- 📝 **FormData Support** - Built-in conversion to FormData for file uploads
- ⚡ **Lightweight** - Minimal dependencies and small bundle size

## 📋 Table of Contents

- [ts-serializable](#ts-serializable)
  - [✨ Features](#-features)
  - [📋 Table of Contents](#-table-of-contents)
  - [🚀 Installation](#-installation)
  - [🎯 Quick Start](#-quick-start)
    - [Why Use ts-serializable?](#why-use-ts-serializable)
  - [🎓 Core Concepts](#-core-concepts)
    - [Type Safety](#type-safety)
    - [Default Values](#default-values)
    - [Error Handling](#error-handling)
  - [🎨 Decorators](#-decorators)
    - [@jsonProperty](#jsonproperty)
    - [@jsonIgnore](#jsonignore)
    - [@jsonName](#jsonname)
    - [@jsonObject](#jsonobject)
  - [🔧 Advanced Usage](#-advanced-usage)
  - [🔧 Standalone Functions](#-standalone-functions)
  - [🐍 Naming Strategies](#-naming-strategies)
  - [⚙️ Configuration Settings](#️-configuration-settings)
  - [🎭 View Models and DTOs](#-view-models-and-dtos)
  - [📤 FormData Conversion](#-formdata-conversion)
    - [Basic Usage](#basic-usage)
    - [Complex Object Graphs](#complex-object-graphs)
    - [With Custom Prefix](#with-custom-prefix)
    - [Appending to Existing FormData](#appending-to-existing-formdata)
    - [Special Type Handling](#special-type-handling)
  - [💡 Additional Features](#-additional-features)
    - [Deep Copy](#deep-copy)
    - [Nested Objects](#nested-objects)
    - [Arrays of Objects](#arrays-of-objects)
  - [📚 API Reference](#-api-reference)
    - [Serializable Class Methods](#serializable-class-methods)
      - [Static Methods](#static-methods)
      - [Instance Methods](#instance-methods)
    - [Standalone Functions](#standalone-functions)
    - [Available Naming Strategies](#available-naming-strategies)
  - [🤝 Contributing](#-contributing)
  - [📄 License](#-license)
  - [🙏 Acknowledgments](#-acknowledgments)

## 🚀 Installation

```bash
npm install ts-serializable reflect-metadata
```

**Important:** This library requires the Metadata Reflection API. Import `reflect-metadata` at the entry point of your application:

```typescript
// At the top of your main file (e.g., index.ts or main.ts)
import "reflect-metadata";
```

## 🎯 Quick Start

Here's a simple example to get you started:

```typescript
import { jsonProperty, Serializable } from "ts-serializable";

class User extends Serializable {
    @jsonProperty(String)
    public firstName: string = '';

    @jsonProperty(String)
    public lastName: string = '';

    @jsonProperty(Number)
    public age: number = 0;

    public getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}

// Deserialize from JSON
const json = { firstName: "John", lastName: "Doe", age: 30 };
const user = User.fromJSON(json);

console.log(user.getFullName()); // "John Doe"
console.log(user instanceof User); // true

// Serialize back to JSON
const jsonOutput = user.toJSON();
console.log(JSON.stringify(jsonOutput)); // {"firstName":"John","lastName":"Doe","age":30}
```

### Why Use ts-serializable?

**Without ts-serializable:**

```typescript
const user: object = JSON.parse(jsonString);
user.getFullName(); // ❌ Runtime Error: user.getFullName is not a function
```

**With ts-serializable:**

```typescript
const user: User = User.fromJSON(jsonString);
user.getFullName(); // ✅ Works perfectly and returns a string
```

## 🎓 Core Concepts

### Type Safety

The `@jsonProperty` decorator tells the library what types are acceptable for each property. If a JSON value doesn't match the expected type, the property will retain its default value.

```typescript
class Product extends Serializable {
    @jsonProperty(String)
    public name: string = '';

    @jsonProperty(Number)
    public price: number = 0;

    @jsonProperty(Date)
    public releaseDate: Date = new Date();
}
```

### Default Values

Always provide default values for properties decorated with `@jsonProperty`. This ensures type safety and provides fallback values when deserialization encounters issues.

### Error Handling

By default, the library logs errors to the console but doesn't throw exceptions. For stricter behavior, override the `onWrongType` method:

```typescript
class StrictUser extends Serializable {
    @jsonProperty(String)
    public name: string = '';

    protected onWrongType(prop: string, message: string, value: unknown): void {
        throw new Error(`Invalid property "${prop}": ${message}`);
    }
}
```

## 🎨 Decorators

### @jsonProperty

Specifies the accepted types for a property during deserialization.

```typescript
@jsonProperty(...types: AcceptedTypes[])
```

**Examples:**

```typescript
// Single type
@jsonProperty(String)
public name: string = '';

// Multiple types (union)
@jsonProperty(Number, null)
public age: number | null = null;

// Arrays
@jsonProperty([String])
public tags: string[] = [];

// Nested objects
@jsonProperty(Address)
public address: Address = new Address();

// Optional properties
@jsonProperty(String, void 0)
public middleName?: string = void 0;
```

### @jsonIgnore

Excludes a property from serialization.

```typescript
@jsonIgnore()
```

**Example:**

```typescript
class User extends Serializable {
    @jsonProperty(String)
    public username: string = '';

    @jsonIgnore()
    public password: string = ''; // Won't be included in toJSON()
}
```

### @jsonName

Specifies a custom JSON property name.

```typescript
@jsonName(name: string)
```

**Example:**

```typescript
class User extends Serializable {
    @jsonName("user_id")
    @jsonProperty(Number)
    public userId: number = 0; // Maps to "user_id" in JSON
}
```

### @jsonObject

Configures serialization settings at the class level.

```typescript
@jsonObject(settings?: Partial<SerializationSettings>)
```

**Example:**

```typescript
@jsonObject({ namingStrategy: new SnakeCaseNamingStrategy() })
class User extends Serializable {
    @jsonProperty(String)
    public firstName: string = ''; // Automatically maps to "first_name"
}
```

## 🔧 Advanced Usage

This example is written in TypeScript, but it also works in JavaScript (without type annotations).

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

## 🔧 Standalone Functions

The library provides standalone utility functions `fromJSON` and `toJSON` that can be used with any objects, not just classes that extend `Serializable`. This is useful when you want to use the serialization features without inheritance.

fromJSON Function:

The `fromJSON` function deserializes JSON data into a class instance. It can accept either an existing object instance or a class constructor.

**Usage with instance:**

```typescript
import { fromJSON, jsonProperty } from "ts-serializable";

class Product {
    @jsonProperty(String)
    public name: string = '';

    @jsonProperty(Number)
    public price: number = 0;

    @jsonProperty(Date)
    public releaseDate: Date = new Date();
}

const json = {
    name: "Laptop",
    price: 999.99,
    releaseDate: "2024-01-15T10:00:00.000Z"
};

// Pass an existing instance
const product = new Product();
fromJSON(product, json);

console.log(product.name); // "Laptop"
console.log(product.price); // 999.99
console.log(product.releaseDate instanceof Date); // true
```

**Usage with class constructor:**

```typescript
// Pass a class constructor - the function will create an instance automatically
const product = fromJSON(Product, json);

console.log(product instanceof Product); // true
console.log(product.name); // "Laptop"
console.log(product.price); // 999.99
```

Benefits:

- Works with plain classes (no need to extend `Serializable`)
- Accepts both instance and constructor for flexibility
- Respects all decorators (`@jsonProperty`, `@jsonName`, `@jsonIgnore`)
- Supports naming strategies
- Handles nested objects and arrays
- Type-safe deserialization
- Perfect for generic programming patterns

toJSON Function:

The `toJSON` function serializes an object to a plain JavaScript object, respecting decorators and naming strategies.

```typescript
import { toJSON, jsonProperty, jsonIgnore, jsonName } from "ts-serializable";

class User {
    @jsonProperty(String)
    public firstName: string = 'John';

    @jsonProperty(String)
    @jsonName("family_name")
    public lastName: string = 'Doe';

    @jsonIgnore()
    public password: string = 'secret123';

    @jsonProperty(Number)
    public age: number = 30;
}

const user = new User();
const json = toJSON(user);

console.log(json);
// Output: {
//   firstName: "John",
//   family_name: "Doe",
//   age: 30
// }
// Note: password is excluded due to @jsonIgnore
```

Benefits:

- Works with both `Serializable` instances and plain objects
- Respects `@jsonIgnore` decorator
- Applies `@jsonName` transformations
- Supports naming strategies
- Returns plain object ready for `JSON.stringify()`

Using Functions Together:

You can use both functions together for complete serialization/deserialization workflows:

```typescript
import { fromJSON, toJSON, jsonProperty, jsonObject } from "ts-serializable";
import { SnakeCaseNamingStrategy } from "ts-serializable";

@jsonObject({ namingStrategy: new SnakeCaseNamingStrategy() })
class ApiRequest {
    @jsonProperty(String)
    public requestId: string = '';

    @jsonProperty(String)
    public userName: string = '';

    @jsonProperty([String])
    public userTags: string[] = [];
}

// Deserialize from API response using constructor
const apiData = {
    request_id: "REQ-12345",
    user_name: "john_doe",
    user_tags: ["premium", "verified"]
};

// Using class constructor - creates new instance automatically
const request = fromJSON(ApiRequest, apiData);

console.log(request instanceof ApiRequest); // true
console.log(request.requestId); // "REQ-12345"
console.log(request.userName); // "john_doe"

// Serialize for sending to API
const jsonToSend = toJSON(request);
console.log(jsonToSend);
// Output: {
//   request_id: "REQ-12345",
//   user_name: "john_doe",
//   user_tags: ["premium", "verified"]
// }
```

**Alternative approach using instance:**

```typescript
// Using instance
const request = new ApiRequest();
fromJSON(request, apiData);

console.log(request.requestId); // "REQ-12345"
console.log(request.userName); // "john_doe"

// Serialize for sending to API
const jsonToSend = toJSON(request);
console.log(jsonToSend);
// Output: {
//   request_id: "REQ-12345",
//   user_name: "john_doe",
//   user_tags: ["premium", "verified"]
// }
```

## 🐍 Naming Strategies

The library supports automatic conversion between different naming conventions, making it easy to work with APIs that use different naming styles. Supported strategies include:

- **SnakeCaseNamingStrategy** - `user_name`
- **CamelCaseNamingStrategy** - `userName`
- **PascalCaseNamingStrategy** - `UserName`
- **KebabCaseNamingStrategy** - `user-name`

You can also use the `@jsonName` decorator for custom property names.

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

## ⚙️ Configuration Settings

You can customize serialization behavior at three levels:

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

## 🎭 View Models and DTOs

If you need to create view-models from DTO or entity models, you can add view-specific properties and mark them with `@jsonIgnore()` to exclude them from serialization.

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

## 📤 FormData Conversion

When working with file uploads, converting files to JSON (base64) can freeze the UI for large files. The library provides built-in FormData conversion as a more efficient alternative.

### Basic Usage

```typescript
import { Serializable, jsonProperty } from "ts-serializable";

class UserProfile extends Serializable {
    @jsonProperty(String)
    public name: string = '';

    @jsonProperty(Number)
    public age: number = 0;

    @jsonProperty(File, null)
    public avatar: File | null = null;
}

const profile = new UserProfile();
profile.name = "John Doe";
profile.age = 30;
profile.avatar = fileInput.files[0]; // File from <input type="file">

// Convert to FormData
const formData = profile.toFormData();

// Send via fetch
await fetch("/api/profile", {
    method: "POST",
    body: formData
});
```

**Resulting FormData entries:**

```text
name: "John Doe"
age: "30"
avatar: [File object]
```

### Complex Object Graphs

The library handles nested objects and arrays intelligently, using dot notation for nested properties and indices for arrays:

```typescript
import { Serializable, jsonProperty, jsonIgnore } from "ts-serializable";

class Address extends Serializable {
    @jsonProperty(String)
    public street: string = '';

    @jsonProperty(String)
    public city: string = '';

    @jsonProperty(String)
    public country: string = '';
}

class Document extends Serializable {
    @jsonProperty(String)
    public title: string = '';

    @jsonProperty(File, null)
    public file: File | null = null;
}

class Employee extends Serializable {
    @jsonProperty(String)
    public firstName: string = '';

    @jsonProperty(String)
    public lastName: string = '';

    @jsonProperty(Number)
    public salary: number = 0;

    @jsonProperty(Address)
    public homeAddress: Address = new Address();

    @jsonProperty([Document])
    public documents: Document[] = [];

    @jsonProperty(File, null)
    public photo: File | null = null;

    @jsonIgnore()
    public password: string = ''; // Will be excluded
}

// Create instance with nested data
const employee = new Employee();
employee.firstName = "John";
employee.lastName = "Doe";
employee.salary = 75000;

employee.homeAddress.street = "123 Main St";
employee.homeAddress.city = "New York";
employee.homeAddress.country = "USA";

const doc1 = new Document();
doc1.title = "Resume";
doc1.file = resumeFile; // File object

const doc2 = new Document();
doc2.title = "ID Card";
doc2.file = idCardFile; // File object

employee.documents = [doc1, doc2];
employee.photo = photoFile; // File object
employee.password = "secret123"; // Will be ignored

// Convert to FormData
const formData = employee.toFormData();

// Inspect the FormData
for (const [key, value] of formData.entries()) {
    console.log(key, value);
}
```

**Resulting FormData structure:**

```text
firstName: "John"
lastName: "Doe"
salary: "75000"
homeAddress.street: "123 Main St"
homeAddress.city: "New York"
homeAddress.country: "USA"
documents[0].title: "Resume"
documents[0].file: [File object - resume.pdf]
documents[1].title: "ID Card"
documents[1].file: [File object - id-card.jpg]
photo: [File object - photo.jpg]
```

**Note:** The `password` property is excluded because of `@jsonIgnore()`.

### With Custom Prefix

You can add a prefix to all form field names:

```typescript
const formData = employee.toFormData("employee");

// Results in:
// employee.firstName: "John"
// employee.lastName: "Doe"
// employee.homeAddress.street: "123 Main St"
// etc.
```

### Appending to Existing FormData

You can append to an existing FormData instance:

```typescript
const existingFormData = new FormData();
existingFormData.append("companyId", "12345");
existingFormData.append("department", "Engineering");

// Append employee data
employee.toFormData("employee", existingFormData);

// existingFormData now contains:
// companyId: "12345"
// department: "Engineering"
// employee.firstName: "John"
// employee.lastName: "Doe"
// ... etc.
```

### Special Type Handling

The FormData conversion handles different types intelligently:

| Type | Conversion |
|------|------------|
| `string`, `number`, `boolean` | Converted to string |
| `File` | Added as-is (native File object) |
| `Date` | Converted to ISO string |
| `null` | Skipped (not added to FormData) |
| `undefined` | Skipped (not added to FormData) |
| `Array` | Items added with `[index]` notation |
| `Object` | Properties added with dot notation |

**Note:** All decorators (`@jsonIgnore`, `@jsonName`, naming strategies) are respected during FormData conversion.

## 💡 Additional Features

### Deep Copy

Create a deep copy of an object by deserializing it:

```typescript
const originalUser = new User();
originalUser.firstName = "John";
originalUser.age = 30;

const copiedUser: User = new User().fromJSON(originalUser);
// copiedUser is a completely separate instance with the same values
```

### Nested Objects

Handle complex object hierarchies with ease:

```typescript
class Address extends Serializable {
    @jsonProperty(String)
    public street: string = '';

    @jsonProperty(String)
    public city: string = '';
}

class User extends Serializable {
    @jsonProperty(String)
    public name: string = '';

    @jsonProperty(Address)
    public address: Address = new Address();
}

const json = {
    name: "John",
    address: {
        street: "123 Main St",
        city: "New York"
    }
};

const user = User.fromJSON(json);
console.log(user.address instanceof Address); // true
```

### Arrays of Objects

```typescript
class Team extends Serializable {
    @jsonProperty(String)
    public name: string = '';

    @jsonProperty([User])
    public members: User[] = [];
}

const json = {
    name: "Dev Team",
    members: [
        { firstName: "John", lastName: "Doe", age: 30 },
        { firstName: "Jane", lastName: "Smith", age: 28 }
    ]
};

const team = Team.fromJSON(json);
console.log(team.members[0] instanceof User); // true
```

## 📚 API Reference

### Serializable Class Methods

#### Static Methods

- **`fromJSON<T>(json: object, settings?: Partial<SerializationSettings>): T`**

  Creates a new instance and deserializes JSON data into it.

- **`fromString<T>(str: string, settings?: Partial<SerializationSettings>): T`**

  Parses a JSON string and deserializes it into a new instance.

#### Instance Methods

- **`fromJSON(json: object, settings?: Partial<SerializationSettings>): this`**

  Populates the current instance with data from JSON.

- **`fromString(str: string, settings?: Partial<SerializationSettings>): this`**

  Parses a JSON string and populates the current instance.

- **`toJSON(): Record<string, unknown>`**

  Serializes the instance to a plain JavaScript object.

- **`toString(): string`**

  Serializes the instance to a JSON string.

- **`toFormData(formPrefix?: string, formData?: FormData): FormData`**

  Converts the instance to FormData for multipart requests.

- **`onWrongType(prop: string, message: string, value: unknown): void`**

  Error handler for type mismatches. Override to customize error behavior.

### Standalone Functions

- **`fromJSON<T>(obj: T | (new () => T), json: object, settings?: Partial<SerializationSettings>): T`**

  Deserializes JSON into an object instance. Accepts either:
  - An existing object instance to populate
  - A class constructor to create a new instance

  **Examples:**

  ```typescript
  // With instance
  const product = new Product();
  fromJSON(product, jsonData);

  // With constructor
  const product = fromJSON(Product, jsonData);
  ```

- **`toJSON(obj: Serializable | object): Record<string, unknown>`**

  Serializes an object to a plain JavaScript object.

- **`classToFormData(obj: object, formPrefix?: string, formData?: FormData): FormData`**

  Converts an object to FormData format.

### Available Naming Strategies

- `SnakeCaseNamingStrategy` - Converts to snake_case
- `CamelCaseNamingStrategy` - Converts to camelCase
- `PascalCaseNamingStrategy` - Converts to PascalCase
- `KebabCaseNamingStrategy` - Converts to kebab-case

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Special thanks to all contributors and users of this library.
