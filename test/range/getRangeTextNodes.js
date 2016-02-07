import getRangeTextNodes from '../../src/range/getRangeTextNodes.js';
import { expect } from 'chai';

describe('getRangeTextNodes', () => {
  it('should get some tests written', () => {
    expect(getRangeTextNodes).to.be.a('function');
  });
});
