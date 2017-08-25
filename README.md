Serializable
=====

Small library for deserialization and serialization for javascript and typescript

Usage:
------

```typescript
import { jsonProperty, Serializable } from "ts-serializable";

export class User extends Serializable {

    // accepted types from jsons, if property in json will not by found or 
    // haved invalid type, will return default value
    @jsonProperty(Number, null)
    public id: number | null = null; // default value must be setted necessarily
  
    @jsonProperty(String)
    public firstName: string = ''; // default value must be setted necessarily
  
    @jsonProperty(String)
    public familyName: string = ''; // default value must be setted necessarily
  
    @jsonProperty(String, void 0)
    public lastName?: string = void 0; // default value must be setted necessarily
    
    @jsonProperty(Date)
    public birthDate: Date = new Date(); // default value must be setted necessarily
    
    public getFullName(): string {
        return `${this.firstName} ${this.familyName} ${this.lastName}`;
    }

    public getAge(): number {
        return new Date().getFullYear() - this.birthDate.getFullYear();
    }
}

# Without Serialazable
const user: User = JSON.parse(json);
user.getFullName(); // runtime exception: Uncaught TypeError: user.getFullName is not a function
user.getAge(); // runtime exception: Uncaught TypeError: user.getAge is not a function

#With Serialazable
const user: User = new User().fromJSON(json);
user.getFullName(); // work fine and return string
user.getAge(); // work fine and return number
```

Bonus:
------

Deep copy
```
const newUser: User = new User().fromJSON(oldUser);
```
