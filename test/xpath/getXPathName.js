import getXPathName from '../../src/xpath/getXPathName.js';
import { expect } from 'chai';

describe('getXPathName', () => {
  it('should get some tests written', () => {
    expect(getXPathName).to.be.a('function');
  });
});
