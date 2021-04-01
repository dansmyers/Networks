# JS Functions

## Basic Functions

Declare functions using the `function` keyword.

```
function area(length, width) {
    return length * width;
}

var a = area(3, 4);
console.log(a);  // 12
```

## Passing Arguments

For the most part, passing arguments and returning values works the way you'd expect...**except when it doesn't**.

First, JS doesn't really care about passing the correct number of arguments to a function. The following are still valid.

```
console.log(area());  // No arguments, returns NaN

console.log(area(2, 3, 4, 5));  // More than two arguments, function will use the first two
```

Second, it's possible to write functions that can accept **variable numbers of arguments**. The syntax `...args` creates an array called `args` that automatically
captures all values passed to the function.

```
// Simple function using a loop to caluculate the average
//
// The reduce function provides a more compact solution, see below
function average(...args) {
    var sum = 0;
    
    for (var value of args) {
        sum += value;
    }
    
    return sum / args.length;
}

// Invoke the average function with multiple arguments
var avg = average(2, 3, 4, 5, 6);

console.log(avg);  // 4 
```

**Notice**: The arguments are passed as separate values! This is **not the same** as `average([2, 3, 4, 5, 6])`!


## Super Power: Anonymous Functions

Let's get dangerous.

<img src="https://pics.me.me/thumb_lets-get-dangerous-dark-wing-duck-35791545.png" width="25%" />

Although most of the JS features we've seen so far have been similar to their Java counterparts, the real intellectual heritage of JavaScript reaches back to 
older function languages, notably the Scheme dialect of Lisp. One of the **most important** features that JS inherited from the Scheme tradition is the use of
**first-class anonymous functions**.

```
var avg = function(...args) {
    var sum = 0;
    
    for (var value of args) {
        sum += value;
    }
    
    return sum / args.length;
}

console.log(avg(2, 3, 4, 5, 6));  // 4
```

This is almost the same as the previous example, but now the function **doesn't have a name**. Instead, ***it's been assigned to a variable in an expression***.
Functions in JS are called **first-class** because they can be used in expressions just like other values. You can even have a **function that returns a function** (but
more on that later).

The ability to create anonymous functions enables all kinds of cool tricks. For example, arrays have a method called `forEach` that takes a function as input and
applies it to every element of the array. Here's an example that uses `forEach` with an anonymous function that prints each element of the array.

```
var primes = [2, 3, 5, 7, 11, 13];

primes.forEach(function(item) {
    console.log(item);
});
```

## Arrow Notation

***Anonymous functions are a key element of JavaScript programming***. They're so common that the 2016 language specification introduced a special notation for
declaring them. Use the `=>` operator to create an anonymous function. The left side of the array lists the parameters of the function and the right side gives the
body of the function.


```
primes.forEach( (value) => console.log(value) );
```

Arrow notation is ideal for small functions that have only one or a few body statements. If you need to use multiple body statements they can be enclosed in `{ }`.


## Map, Reduce, Filter

Here are three useful built-in functions that all use the idea of passing a function to control the behavior of another function. Versions of these three operations are 
in every functional programming language.

`map` is an array method that takes a function as input, applies to each element of an array, and returns a new array containing the results:

```
var data = [2, 3, 4, 5, 6];

// Use an anonymous function to square each element
var squares = data.map( x => x * x );

console.log(squares);
// [ 4, 9, 16, 25, 36 ]
```

`reduce` is used to calculate one output from all of the values in an array. The input function (the **reducer**) performs a calculation using each value and uses an accumulator
variable to keep track of the combined output. A common application is summing up the elements of an array.

```
var data = [2, 3, 4, 5, 6];

var sum = (accumulator, value) => accumulator + value;
var total = data.reduce(sum);

console.log(total);  // 20
```

Here's a trickier example: calculating the sum of the squares, which is an important part of many statistical formulas. `reduce` can take a second argument, which
is the initial value of the accumulator. If you don't specify an initial value, reduce sets the accumulator to the first array element, but then doesn't apply the function
to the first element. This is okay for calculating the sum, but will give the wrong result for more complex calculations.

```
var data = [2, 3, 4, 5, 6];

var sumOfSquares = (accumulator, value) => accumulator + value * value;

var total = data.reduce(sumOfSquares, 0);

console.log(total);  // 90
```


`filter` takes a function that produces a boolean output. It applies the function to every element in the array and returns a new array containing only those elements
that evaluate to true.

```
var data = [2, 3, 4, 5, 6];

var isEven = (x) => x % 2 == 0;

var evenValues = data.filter(isEven);

console.log(evenValues);
// [2, 4, 6]
```

## Scope

Up to this point, we've used `var` to declare all of our variables. Variables declared using `var` have **function-level scope**, meaning that variables are visible within
the function where they're declared, but not outside of it.

```
function sum(a, b) {
    var result = a + b;
    return result;
}

sum(5, 3);

console.log(result);
// Error because result is out of scope
```

If you forget `var`, however, JS still allows you to create a new variable (overly permissive!), but that variable is instead **promoted to global scope**.

```
function sum(a, b) {
    result = a + b; // <--- forgot to use var
    return result;
}

sum(5, 3);

console.log(result);
// 8, because result was elevated to a global variable
```

This leads to terrible bug: misspelling a variable name creates a new **global** variable.

```
function getName() {
    var firstName, lastName;
    
    frstName = readFirstNameFromSomewhere();  // <-- misspelled
    lastName = readLastNameFromSomewhere();
    
    return firstName + ' ' + lastName;
}

// frstName is now a global variable!
```

This is particularly bad if you do have global variables in your program (which can happen with front-end websites), because you might accidentally overwrite them.

## `strict` Mode

The solution to this problem is to reign in JS's overly permissive style.

Put the string `'use strict';` at the top of your script to turn on **strict mode**, which disallows global variable declaration without `var`. It also causes some errors that 
would previously have failed silently to actually generate errors.

```
'use strict';

aGlobalVariable = 42;  // Fails, because strict mode disallows creating new globals without var
```

**Your scripts should always use strict mode unless you have a good reason not to**.

## Dost Thou Even Hoist?

<img src="https://i.etsystatic.com/12078849/r/il/e80092/1307349821/il_570xN.1307349821_dkgk.jpg" width="33%" />

Ready for more goofy function stuff? Take a look at this, which is totally fine and allowed:

```
huh();  // Call function before it's definition

function huh() {
    a = 2;  // Use a before it's declared
    console.log(a);
    var a;  // WAT?
}
```

JS automatically moves all declarations to the top of their block, which is called **hoisting**. Hoisting allows you to call functions
before they've been declared, which is frequently useful, and also access variables before they're declared, which is usually not what you want.

```
function hoist() {
    console.log(a);  // undefined
    
    var a = "Hello";
    
    console.log(a);  // "Hello"
}
```

## `var` vs. `let`
`var` creates variables that have **function-level scope**. This is different from Java's scoping rules, which use **block-level scope** and restrict variables to the
block (usually an expression or region within curly braces) where they were declared.

```
for (var i = 0; i < data.length; i++) {
    console.log(data[i]);
}

// Try to print the index variable after the loop ends
console.log(i);
```

The last line would fail in Java because the loop variable `i` is only in scope during the `for` loop. It succeeds in JS because `i` does not leave scope when the loop ends.

Function-level scoping led to lots of bugs, so the 2016 language spec introduced a new `let` keyword, which declares variables with block-level scope, as in Java. **This is 
almost always what you want**, so you should use `let` instead of `var` unless you have a good reason not to.

```
for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
}

// Now an error because i left scope when the loop ended
console.log(i);
```

`let` also gives you some other desirable properties:

- Variables declared with `let` can't be redeclared.

```
var x = 5;
var x = 10;  // Accidental redeclaration overwrites x

let y = 3;
let y = 9;  // Fails because let variable can't be redeclared
```

- Variables declared with `let` aren't hoisted, so you can't use them before they're assigned a value.

```
function example() {
    console.log(x);  // Error because x hasn't been assigned yet
    let x = 5;
    console.log(x);
}
```

The language spec calls the time between when a `let` variable is declared and when it's assigned **The Temporal Dead Zone**. Attempting to access a variable in 
**The Temporal Dead Zone** will throw a `ReferenceError`.

***You should prefer `let` over `var` in all your future programs***.

## `const`

ECMAScript 2016 also introduced a `const` declaration to make constant variables.

## Takeaways

- Anonymous functions are important and useful. We'll see them a lot in web pages, where it's common to bind a function to an action like clicking on a button.

- Functions in JS have lots of little quirks, including global declarations, function-level scoping, and hoisting. These are unlikely to cause issues in small programs, but
can lead to unpredictable bugs in large codebases.

- `use strict` and prefer `let` for your variable declarations.
