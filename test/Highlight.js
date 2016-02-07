import Highlight from '../src/Highlight.js';

const assert = require('assert');

describe('Highlight', () => {
  describe('#mount()', () => {
    it('should be of type function', () => {
      assert.equal(typeof Highlight.prototype.mount, 'function');
    });
  });
});
