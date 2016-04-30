import { expect } from 'chai';

import init from './init';

describe('sanity', () => {
  it('should add 2', () => {
    expect(init(2)).to.equal(4);
  });
  it('is sane', () => {
    expect(true).to.equal(true);
    expect(true).to.not.equal(false);
    expect(1+1).to.equal(2);
    expect(2*2).to.equal(4);
  });
});
