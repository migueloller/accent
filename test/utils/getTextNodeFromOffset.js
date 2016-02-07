import getTextNodeFromOffset from '../../src/utils/getTextNodeFromOffset.js';
import { expect } from 'chai';

describe('getTextNodeFromOffset', () => {
  it('should get some tests written', () => {
    expect(getTextNodeFromOffset).to.be.a('function');
  });
});
