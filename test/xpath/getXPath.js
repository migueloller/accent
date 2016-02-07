import getXPath from '../../src/xpath/getXPath.js';
import { expect } from 'chai';

describe('getXPath', () => {
  it('should get some tests written', () => {
    expect(getXPath).to.be.a('function');
  });
});
