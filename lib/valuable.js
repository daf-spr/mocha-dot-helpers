'use strict';

const Promise = require('bluebird');
const _ = require('lodash');

module.exports = function(fn) {
  let ready = false;
  let result;
  let original;

  beforeEach(function() {
    context = this;

    return Promise.resolve(fn()).then(value => {
      result = value;
      original = _.cloneDeep(value);

      ready = true;
    });
  });

  const resultFn = function() {
    if (!ready) {
      throw new Error('Must be executed in the context of a test');
    }

    return result;
  };

  resultFn.original = function() {
    return original;
  };

  return resultFn;
};
