import fuzzyStringSearch from '../../src/utils/fuzzyStringSearch.js';
import { expect } from 'chai';

describe('fuzzyStringSearch', () => {
  it('should get some tests written', () => {
    expect(fuzzyStringSearch).to.be.a('function');
  });
});
