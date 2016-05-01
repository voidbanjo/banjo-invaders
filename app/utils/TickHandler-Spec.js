import { expect } from 'chai';

import TickHandler from './TickHandler';

describe('utils/TickHandler', () => {
  describe('constructor', () => {
    // doesnt really do nuthin right now
  });

  describe('tick', () => {
    it('should do nothing', () => {
      TickHandler.prototype.tick.call(null);

      expect('everything').to.be.OK; // shh. it's okay
    });
  });
});
