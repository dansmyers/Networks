# JS Objects and Arrays

## Objects are Maps

A JavaScript object is a map from keys to values, similar to a Java `HashMap` or a Python dictionary. Declare objects using curly braces and specifying the list of pairs:

```
> var rect = {length: 3, width: 4};

> typeof(rect)
'object'
```

Like their Java and Python counterparts, maps should be treated as **unordered**. Under the current standards, the ordering for string keys (those that could be the names of valid JS identifiers) is the order in which they were added to the map. Non-string keys are not required to follow that rule, and older browsers may not support the current
standard, so you should not count on any particular ordering when iterating over an object.

## Accessing Objects

You can access the properties of an object using either dot notation or square brackets:

```
> rect.width
4

> rect['length']
3
```

Notice that quotes around the property names are not required when declaring an object, but are required if you're using the square bracket access style. The values can be any type.

The normal case is to use strings identifiers as object keys, but it's possible to use numeric or symbolic keys. Use quotes to create property names that wouldn't be valid identifiers names; for example, to create a numeric key:

```
> var numericKeyExample = {'5': 5555}

> numericKeyExample['5']
5555

> numericKeyExample[5]  // <-- Can also access this field without quotes!
55555
```

Notice how the last case resembles an array access. Keep that idea in mind.

## Overly Permissive JavaScript is Overly Permissive

Accessing a non-existant property returns `undefined` as the result.

```
> rect.doesNotExist
undefined
```

This is another example of JS's overly permissive style. An action that you would probably expect to fail instead returns a value, which can continue to propragate
through the program until it causes an error somewhere else.

## Objects are Mutable

You can change the values within an object and dynamically add new fields.

```
> rect.width = 10;

> rect.color = 'blue';

> rect
{ length: 4, width: 10, color: 'blue' }
```

## Iterating Through an Object's Properties

JS supports a version of the `for` loop for working with objects:

```
for (var property in rect) {
    console.log(property + ': ' + rect[property]);
}
```

This example shows off the utility of the square bracket style of object access.

Also notice that the loop uses `in` as the keyword to drive iteration through the properties of an object. Keep this in mind when we look at iterating through arrays below.

## Objects and Classes

Given that JS objects are really just maps, you may wonder if JS has the concept of classes and object-oriented programming.

The answer is a qualified yes. JS supports a syntax for declaring classes, which can then be used to instantiate objects of a given class having properties and methods
like you would expect. This is really a syntactic wrapper around the basic mechanics of objects as maps of key-value pairs. I'll show you some examples in a future note.

Although JS has the concept of classes, and it's possible to make one class inherit from another, **inheritance in JS is completely and totally different from Java**.
The differences are fun and interesting, so I'll talk about them when we talk about how to declare and use classes.

## Arrays

JS arrays are similar to Python lists.

Declare an empty array with `[]` and append values to the end with `push`.

```
> var a = [];

> a.push('rollins');

> a.push('college');

> a
[ 'rollins', 'college' ]
```

Arrays can hold any mixture of types, including objects and other arrays.

```
var list = [2, 3.14, 'hello', [7, 8, 9]];
```

Individual elements are accessed with square brackets and indexing is from 0, like you'd expect



## Accessing Beyond the End an Array

What about this?

```
> var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23];

> primes[10] = 29;

> primes[100] = 101;
```

**Assigning beyond the end of an array is not an error**. JS expands the array to the new maximum index and fills in the in-between spots with empty items.

```
> primes
[ 2,
  3,
  5,
  7,
  11,
  13,
  17,
  19,
  23,
  <1 empty item>,
  29,
  <89 empty items>,
  101 ]
```

The empty spaces are `undefined`.

```
> primes[99]
undefined
```

Likewise, accessing unassigned elements returns `undefined` rather than an error:

```
> primes[9999]
undefined
```

## The Type of Arrays

**JS does not have a dedicated array type**. 

```
> typeof(primes)
'object'
```

Rather, arrays are a special case of objects. Specifically, **an array is a map where the keys are required to be consecutive
non-negative integers**.

With that mental model, it's easy to see why accesses beyond the end of array behave the way they do: it's equivalent to trying to access an undefined
property of an object. Likewise, extending an array is easy, because it simply requires adding a new key to the map. There's no need to allocate memory
for the empty array spaces.


## Looping Through Arrays

JS's `for` loop is similar to Java's and can be used to iterate through array elements in the way you'd expect:

```
for (var i = 0; i < list.length; i++) {
    console.log(list[i]);
}
```

There is also an enhanced loop that iterates without the using indices. Notice the use of `of` as the keyword to drive iteration!

```
for (var item of list) {
    console.log(item);
}
```

This is almost, but not, identical to the object version of the enhanced `for` loop, which you'll recall used `in` as its keyword and iterated through the object's properties.

- Use `in` to iterate through object properties.

- Use `of` to iterate through the values in an array.

**Question**: what would the following code output? Notice the use of `in` rather than `of`.

```
var fruits = ['aubergine', 'banana', 'cherry', 'durian', 'elderberry', 'fig'];

for (var item in fruits) {
    console.log(item);
}
```

**Answer**: The `for/in` loop iterates through the **keys of an object**. Arrays are a **special kind of objects with integer keys**, so this
loop iterates through the **indices of the array**, not the values it contains!

```
> for (var item in fruits) {
...     console.log(item);
... }
0
1
2
3
4
5
```
