[![Build Status](https://travis-ci.org/Orgun109uk/sort-by-key.svg)](https://travis-ci.org/Orgun109uk/sort-by-key)
[![Build Status](https://david-dm.org/orgun109uk/sort-by-key.png)](https://david-dm.org/orgun109uk/sort-by-key)
[![npm version](https://badge.fury.io/js/sort-by-key.svg)](http://badge.fury.io/js/sort-by-key)

[![NPM](https://nodei.co/npm/sort-by-key.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/sort-by-key/)

# Sort By Key

This utility provides a simple means to sort elements of an array or an object by a given key.

### Installation
```sh
$ npm install sort-by-key
```

### Usage

There are two ways of executing the sorting, one is by using the function;

```js
const SortByKey = require('sort-by-key');

const data = [{
    value: 'hello',
    weight: 10
}, {
    value: 'world',
    weight: -10
}, {
    value: 'foo'
}];

SortByKey(data, 'weight');
```

This will sort the array like;

```js
[{
    value: 'world',
    weight: -10
}, {
    value: 'foo'
}, {
    value: 'hello',
    weight: 10
}]
```

This can also be reveresed like;

```js
SortByKey(data, 'weight', true);
```

and would return;

```js
[{
    value: 'hello',
    weight: 10
}, {
    value: 'foo'
}, {
    value: 'world',
    weight: -10
}]
```

You can also use function's to return the key weight value, for example;

```js
[{
    value: 'hello',
    weight: function () { return 10; }
}, {
    value: 'world',
    weight: -10
}, {
    value: 'foo'
}]
```

You can also sort object's like;

```js
const data = {
    world: 'world',
    hello: { weight: -1 },
    foo: 'bar',
    bar: { weight: 1 }
}

SortByKey(data, 'weight');
```

and this will return;

```js
{
    hello: { weight: -1 },
    world: 'world',
    foo: 'bar',
    bar: { weight: 1 }
}
```

### Array and Object

There is an attach function which will attach the sortByKey functions to the Array and Object classes. And this is
done by calling;

```js
require('sort-by-key').attach();
```

Then the sortByKey functions can be access like;

```js
// Array.
Array.sortByKey(data, 'weight');
data.sortByKey('weight');

// Object.
Object.sortByKey(data, 'weight');
data.sortByKey('weight');
```

## Testing
A mocha test suite has been provided and can be run by:
```sh
$ npm test
```
