import getWholeTextUpTo from '../../src/utils/getWholeTextUpTo.js';
import { expect } from 'chai';

describe('getWholeTextUpTo', () => {
  it('should get some tests written', () => {
    expect(getWholeTextUpTo).to.be.a('function');
  });
});
