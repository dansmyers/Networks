# JS Variables, Types, and Comparisons

## Run the Node Prompt

Our main tool for running JS programs on Mimir will be Node.js, one of the most popular back-end web development frameworks. Node allows you to write server-side
programs using JS and it supports a large ecosystem of packages and frameworks. The project was created by taking the JavaScript interpreter in Chrome, known as V8, stripping
it out of the browser, and making a stand-alone server interface.

Run the `node` command on Mimir and you'll get a prompt:

```
% node
>
```

Like Python, you can type JS code at the prompt and have it execute immediately.

## Printing

Use `console.log` to print. In Node, the output goes the terminal, like you'd expect. In the browser, it shows up in the JavaScript console, which you can access through the
Developer menu.

```
> console.log("Hello, World!");
Hello, World!
undefined
```

You'll notice that the environment also prints `undefined` as an additional output when you use a command that doesn't display the value of a variable. Don't worry about this.
I'll tell you more about `undefined` below.

In the browser, you can use `alert` to create a popup box.

```
alert('I AM HERE!');
```

## Variables

Variables in JS work the way you'd expect them to. Use `var` to declare a variable.

```
> var tempInDegC = 22.5;

> tempInDegC
22.5
```

JS supports all the basic arithmetic operators. Division is exact.

```
> 3 / 5
.6
```

One thing you may notice: it's possible to declare a variable without using `var` and the program will still, apparently, work.

```
> tempInDegF = 72.5;

> tempInDegF
72.5
```

This is the first example of JS letting you do things that it probably shouldn't. You can declare variables without `var`, but it messes up the scoping of your program. We'll
see more examples later.

## Semicolons

The language spec says that statements must be terminated by semicolons, but the interpreter will attempt to help you by **inserting** semicolons at every newline if they 
aren't present. This works fine, until it doesn't, and the absence of a semicolon makes your program fail in a weird way. 

**Terminate all statements with semicolons**.

## Types

JavaScript has six types:

- `number` for all numeric values. Officially, this is a 64-bit double-precision floating point number, but interpreters will still use integers behind the scenes when they can.

- `string` for all text strings, including single characters. Strings can be delimited by **double quotes or single quotes**.

- `boolean` for `true` and `false` values.

- `null` represents a **deliberate non-value**. Unlike in Java, `null` is not the default state of an uninitialized object.

- `undefined` represents a value that is **currently not present**. It's for uninitialized references and unassigned variables.

```
> var y;

> y
undefined
```

- Finally, `object` is everything else. JS objects are really like HashMaps: they store a set of key-value pairs. We'll say more about objects later.

You can ask for the type of a variable using `typeof`.

```
> typeof(5);
'number'

> typeof(3.14);
'number'

> typeof('Tubular!');
'string'

> typeof(true);
'boolean'

> typeof(y);
'undefined' (assuming y is still unassigned from the example above)
```

### `null`

There is one quirk of types that has existed since the beginning of time:

```
typeof(null)
'object'
```

The type of `null` is not `null`, but rather `object`. This is, simply, a bug in the language that has never been fixed because every proposed fix would introduce some
other, more serious, problem.

## Comparisons

Comparisons are one of those *It works the way you expect, unless it doesn't* things.

JS distinguishes between **truthy** and **falsy** values.

- `""`, `0`, `-0`, `NaN`, `null`, `undefined`, and `false` are falsy, and are treated as `false` for the purposes of comparisons and logical statements.

- Everything else is truthy; notably, this includes empty lists and empty objects.

JS will perform **type coercion** on comparisons made with `==`.

```
> '5' == 5
true

> 0 == false
true

> 0 == ''
true

> '' == false
true

> null == undefined
true
```

This has the effect of making falsy values equal to each other, unless it doesn't:

```
> '' == null
false

> NaN == false
false
```

**As a general rule, avoid type coercion unless you know you need it**.

To avoid coercion, use ***`===`*** as your test for equality.

```
> 0 === ''
false
```

Inequality obeys the same rules

- `!=` tests for inequality using coercion.

- `!==` tests for inequality without coercion and is preferred.

