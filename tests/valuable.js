'use strict';

const d = require('../');
const Promise = require('bluebird');
const expect = require('chai').expect;

describe('valuable', () => {

  describe('when function returns an async value', () => {
    const object = d.val(() => createObjectAsync());

    it('returns result of #createObjectAsync() promise', () => {
      expect(object()).to.have.property('attr1', 'val1');
      expect(object()).to.have.property('attr2', 'val2');
    });
  });

  describe('when function returns a async value', () => {
    const object = d.val(() => ({ attr1: 'val1', attr2: 'val2' }));

    it('returns the value', () => {
      expect(object()).to.have.property('attr1', 'val1');
      expect(object()).to.have.property('attr2', 'val2');
    });
  });

  describe('#original', () => {
    const object = d.val(() => ({ attr1: 'val1', attr2: 'val2' }));

    beforeEach(() => {
      object().attr1 = 'newValue1';
      object().attr2 = 'newValue2';
    });

    it('returns the original value', () => {
      expect(object.original()).to.have.property('attr1', 'val1');
      expect(object.original()).to.have.property('attr2', 'val2');
      expect(object()).to.have.property('attr1', 'newValue1');
      expect(object()).to.have.property('attr2', 'newValue2');
    });
  });

});

const createObjectAsync = function() {
  return Promise.resolve({
    attr1: 'val1',
    attr2: 'val2'
  });
};
