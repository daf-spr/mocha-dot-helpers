Mocha dot helpers [![Build Status](https://travis-ci.org/daf-spr/mocha-dot-helpers.svg?branch=master)](https://travis-ci.org/daf-spr/mocha-dot-helpers.svg?branch=master)
=================

A set of helpers for mocha test suite.

## Valuable
Takes a function executes it before each test an returns a function
that returns the value returned by the original function. If given function 
returns a promise then it returns the value returned by the promise.

It is specially useful for async value handling since it helps 
you work in a more sync way. Of course it is only useful for tests
and most not be used in other contexts.

Example 1:

```javascript
const Promise = require('bluebird');

const createObjectAsync = function() {
  return Promise.resolve({
    attr1: 'val1',
    attr2: 'val2'
  });
};

const d = require('mocha-dot-helpers');
const object = d.val(() => createObjectAsync());

it('returns result of #createObjectAsync() promise', () => {
  expect(object()).to.have.property('attr1', 'val1');
  expect(object()).to.have.property('attr2', 'val2');
});

```

Example 2:

```javascript
const Promise = require('bluebird');

const createUserAsync = function() {
  //Go to db, create an user and return a promise for it
};

const doSomethingAsyncWithUser(user) {
  // This function expects an user instance (not a promise) 
  // does something with the user and returns a promise for 
  // the result
}

const d = require('mocha-dot-helpers');
const user = d.val(() => createUserAsync());
const result = d.val(() => doSomethingAsyncWithUser(user()));

it('do the right thing with user', () => {
  // expect(result())...
});

```

## Install
`npm install mocha-dot-helpers`

## Test
`npm test`

## License
MIT
