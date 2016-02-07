import isTextLike from '../../src/utils/isTextLike.js';
import { expect } from 'chai';

describe('isTextLike', () => {
  it('should get some tests written', () => {
    expect(isTextLike).to.be.a('function');
  });
});
