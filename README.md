Serializable
=====

Small library for deserialization and serialization for javascript and typescript

####Usage:

```
import { jsonProperty, Serializable } from "ts-serializable";

export class User extends Serializable {

    @jsonProperty(Number, null)
    public id: number | null = null;
  
    @jsonProperty(String)
    public firstName: string = '';
  
    @jsonProperty(String)
    public familyName: string = '';
  
    @jsonProperty(String, void 0)
    public lastName?: string = void 0;
    
    @jsonProperty(Date)
    public birthDate: Date = new Date();
    
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

####Bonus:
Deep copy
```
const newUser: User = new User().fromJSON(oldUser);
```
