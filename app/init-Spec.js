import { expect } from 'chai';
import sinon from 'sinon';

import * as init from './init';

import TickHandler from './utils/TickHandler';

import * as tickHandler from './tickHandler';

describe('init', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    tickHandler.default = new TickHandler();

    sandbox.stub(document);
    sandbox.stub(createjs.Ticker, 'addEventListener');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('default', () => {
    it('should register a `domContentLoaded` listener', () => {
      init.default();

      expect(document.addEventListener).to.have.been.calledWith('DOMContentLoaded', init.ready);
    });

    it('should bind the tick listener', () => {
      init.default();

      expect(createjs.Ticker.addEventListener).to.have.been.calledWith('tick', tickHandler.default.tick);
    });
  });

  describe('ready', () => {
    it('should do nothing', () => {
      init.ready();

      expect('everything').to.be.OK; // shh. it's okay
    });
  });
});
