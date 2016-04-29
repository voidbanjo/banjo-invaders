import { expect } from 'chai';

describe('sanity', () => {
  it('is sane', () => {
    expect(true).to.equal(true);
    expect(true).to.not.equal(false);
    expect(1+1).to.equal(2);
    expect(2*2).to.equal(4);
  });
});
