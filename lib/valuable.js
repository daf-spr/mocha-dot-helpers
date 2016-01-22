'use strict';

const Promise = require('bluebird');

module.exports = function(fn) {
  let ready = false;
  let result;

  beforeEach(function() {
    context = this;

    return Promise.resolve(fn()).then(value => {
      result = value;

      ready = true;
    });
  });

  return function() {
    if (!ready) {
      throw new Error('Must be executed in the context of a test');
    }

    return result;
  };
};
