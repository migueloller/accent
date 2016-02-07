import unfold from '../../src/utils/unfold.js';
import { expect } from 'chai';

describe('unfold', () => {
  it('should get some tests written', () => {
    expect(unfold).to.be.a('function');
  });
});
