import evaluateXPath from '../../src/xpath/evaluateXPath.js';
import { expect } from 'chai';

describe('evaluateXPath', () => {
  it('should get some tests written', () => {
    expect(evaluateXPath).to.be.a('function');
  });
});
