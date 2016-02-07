import isText from '../../src/utils/isText.js';
import { expect } from 'chai';

describe('isText', () => {
  it('should get some tests written', () => {
    expect(isText).to.be.a('function');
  });
});
