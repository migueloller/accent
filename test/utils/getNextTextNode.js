import getNextTextNode from '../../src/utils/getNextTextNode.js';
import { expect } from 'chai';

describe('getNextTextNode', () => {
  it('should get some tests written', () => {
    expect(getNextTextNode).to.be.a('function');
  });
});
