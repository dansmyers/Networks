# JS Classes

## Declaring Classes

We're now ready to get deep.

Here's an example of a JavaScript class declaration.

```
class Person {

    constructor(firstName, lastName, employer) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.employer = employer;
    }
    
    greeting() {
        return (`${this.firstName} ${this.lastName} works at ${this.employer}.`);
    }

}
```

There's a lot of stuff happening here, so let's break it down:

- Recall that all JS objects are **maps of key-value pairs**. This style of declaring classes, which was introduced in the 2016 standard, was created to give you way
to create objects using [A Form You Are Comfortable With](https://tvtropes.org/pmwiki/pmwiki.php/Main/AFormYouAreComfortableWith), as opposed to older styles of
implementing object-oriented programming in JS. Older versions of OOP are now obsolete, but you may still see them in older documentation.

- By convention, classes are named with a capital letter.

- The constructor function is always named `constructor`.

- `this` usually does what you expect and functions as the **object self-reference**, but sometimes it binds to other things. We don't have time to get into the details,
but [here's a link to the MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) on `this`.

- The `greeting` function shows off **template strings**, a convenient way to assemble string output out of multiple string variables. Note that the template string is 
enclosed in backticks (\``) rather than single quotes.

- You don't need the `function` keyword when declaring class methods.

- Everything is public. JS doesn't have the concept of private instance variables.

## Using Classes

Use the `new` keyword to instantiate objects of a class.

```
let drMyers = new Person('Dan', 'Myers', 'Rollins College');

console.log(drMyers);
// Person { firstName: 'Dan', lastName: 'Myers', employer: 'Rollins' }
```

Unlike in Java, you can add new properties to an object after it's been instantiated.

```
drMyers.likes = ['pointy guitars', 'mash-ups', 'memes'];
```

Calling object methods works the way you would expect.

```
console.log(drMyers.greeting());
```

Think about this for a second. `drMyers` is a object that stores a set of key-value pairs. What is the relationship between the `greeting` function and the `drMyers`
object?

- `drMyers` is a hash table and `greeting` is one of the keys in that table.

- The value associated with the `greeting` key is the first-class function implementing the method.

## Inheritance

Java's inheritance is **class-based**. When you say that one class `extends` another, the child class gets access to the methods and instance variables of the parent. JS
implements inheritance, but it's pretty different from Java's.

Here's an example of one JS class extending another.

```
class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }
    
    area() {
        return this.length * this.width;
    }
}

class Square extends Rectangle {
   constructor(side) {
       super(side, side);  // Call superclass constructor
   }
}
```

Creating these classes works the way you would expect.

```
let r = new Rectangle(3, 4);

let sq = new Square(5);
```

`Square` extends `Rectangle`, so it has access to the `area` method.

```
console.log(sq.area());
```

So far, this seems equivalent to Java, but what's happening behind the scenes is different.

## Protoypal Inheritance

Every JS object has a special hidden field called `prototype`. This is **like** Java's concept of a parent class. If you invoke a method or property on an object
that it doesn't have, JS checks the prototype to see if it's defined there.

In the previous example, `Square` doesn't have an `area` method, but `Square` extends `Rectangle`, so JS is able to find and use the method there.

Prototypes exist in a chain back to the top-level super-prototype, which is `Object`.

```
Square ---------> Rectangle ---------> Object
```

What happens if you add something to a class's prototype? It is automatically inherited by all objects that extend that prototype.

```
Rectangle.prototype.isBox = true;

console.log(sq.isBox);  // true, because it's inherited from Rectangle.prototype
```

One of the interesting things about prototypal inheritance is that it can apply at the level of **individual objects**. It's possible to assign an object to inherit
from **a specific instance of another object**. For example,

```
let student = new Person('A', 'Student', 'Rollins College');
Object.setPrototypeOf(student, drMyers);

console.log(student.likes);  // Prints the same likes as Dr. Myers
```

The prototype chain for `student` looks like

```
student -----> drMyers -----> Person -----> Object
```
